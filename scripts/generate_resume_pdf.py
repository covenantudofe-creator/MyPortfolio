"""Generate the downloadable A4 resume PDF from src/data/resumeData.json.

This uses only Python's standard library so the PDF can be regenerated without
adding a frontend or Python package dependency.
"""

import json
import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src" / "data" / "resumeData.json"
CONTACT_PATH = ROOT / "src" / "data" / "contactDetails.json"
OUTPUT_PATH = ROOT / "public" / "documents" / "Godscovenant_Patrick_Udofe_Resume.pdf"

PAGE_W, PAGE_H = 595.28, 841.89  # A4, points
LEFT, RIGHT, TOP, BOTTOM = 46, 46, 48, 48
CONTENT_W = PAGE_W - LEFT - RIGHT
BURGUNDY = (0.45, 0.16, 0.25)
CHARCOAL = (0.15, 0.15, 0.15)
MUTED = (0.42, 0.41, 0.39)
RULE = (0.83, 0.81, 0.77)


def pdf_text(value):
    """Encode a text string as a PDF hex string in WinAnsi (CP1252)."""
    value = str(value).replace("\u2022", "- ").replace("\u2011", "-")
    raw = value.encode("cp1252", errors="replace")
    return "<" + raw.hex().upper() + ">"


def approximate_width(text, size):
    width = 0.0
    for char in text:
        if char in " il.,:;'!|":
            factor = 0.25
        elif char in "mwMW@%&":
            factor = 0.82
        elif char.isupper():
            factor = 0.64
        elif char.isdigit():
            factor = 0.55
        else:
            factor = 0.51
        width += factor * size
    return width


def wrap_text(text, size, width):
    words = re.sub(r"\s+", " ", str(text)).strip().split(" ")
    lines, line = [], ""
    for word in words:
        candidate = word if not line else f"{line} {word}"
        if line and approximate_width(candidate, size) > width:
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    return lines or [""]


class Page:
    def __init__(self, number):
        self.number = number
        self.ops = []
        self.links = []
        self.y = PAGE_H - TOP
        if number > 1:
            self.text("GODSCOVENANT PATRICK UDOFE", LEFT, self.y, 8, "F2", MUTED)
            self.text("RESUME & PROFESSIONAL JOURNEY", PAGE_W - RIGHT - 164, self.y, 7, "F1", MUTED)
            self.y -= 12
            self.line(LEFT, self.y, PAGE_W - RIGHT, self.y)
            self.y -= 22

    def text(self, value, x, y, size=9, font="F1", color=CHARCOAL):
        self.ops.append(
            f"{color[0]:.3f} {color[1]:.3f} {color[2]:.3f} rg\n"
            f"BT /{font} {size:.2f} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm {pdf_text(value)} Tj ET"
        )

    def line(self, x1, y1, x2, y2, color=RULE, thickness=0.55):
        self.ops.append(
            f"{color[0]:.3f} {color[1]:.3f} {color[2]:.3f} RG {thickness:.2f} w "
            f"{x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S"
        )

    def ensure(self, height):
        if self.y - height < BOTTOM + 15:
            return False
        return True

    def paragraph(self, text, size=9, color=CHARCOAL, indent=0, leading=None, font="F1"):
        leading = leading or size * 1.42
        lines = wrap_text(text, size, CONTENT_W - indent)
        if not self.ensure(len(lines) * leading + 2):
            return False
        for line_text in lines:
            self.text(line_text, LEFT + indent, self.y, size, font, color)
            self.y -= leading
        self.y -= 3
        return True

    def bullet(self, text, size=8.7):
        lines = wrap_text(text, size, CONTENT_W - 26)
        if not self.ensure(len(lines) * size * 1.4 + 2):
            return False
        self.text("•", LEFT + 2, self.y, size + 1, "F2", BURGUNDY)
        for index, line_text in enumerate(lines):
            self.text(line_text, LEFT + 15, self.y, size, "F1", CHARCOAL)
            self.y -= size * 1.4
        self.y -= 1
        return True

    def section(self, title):
        if not self.ensure(35):
            return False
        self.y -= 6
        self.text(title.upper(), LEFT, self.y, 9, "F2", BURGUNDY)
        self.y -= 7
        self.line(LEFT, self.y, PAGE_W - RIGHT, self.y, BURGUNDY, 0.8)
        self.y -= 17
        return True

    def item_heading(self, title, detail=""):
        if not self.ensure(30):
            return False
        self.text(title, LEFT, self.y, 10, "F2", CHARCOAL)
        if detail:
            self.text(detail, LEFT, self.y - 13, 8, "F3", MUTED)
            self.y -= 26
        else:
            self.y -= 15
        return True

    def link_line(self, label, value, uri, size=8.5):
        text = f"{label}: "
        self.text(text, LEFT, self.y, size, "F2", MUTED)
        x = LEFT + approximate_width(text, size)
        self.text(value, x, self.y, size, "F1", BURGUNDY)
        width = approximate_width(value, size)
        self.links.append({"x1": x - 1, "x2": x + width + 2, "y1": self.y - 2, "y2": self.y + size + 3, "uri": uri})
        self.y -= 13


def draw_document(data):
    pages = [Page(1)]

    def page():
        return pages[-1]

    def ensure_for(height):
        if not page().ensure(height):
            pages.append(Page(len(pages) + 1))

    def section(title):
        ensure_for(40)
        page().section(title)

    def paragraph(text, **kwargs):
        size = kwargs.get("size", 9)
        lines = wrap_text(text, size, CONTENT_W - kwargs.get("indent", 0))
        ensure_for(len(lines) * kwargs.get("leading", size * 1.42) + 5)
        page().paragraph(text, **kwargs)

    def bullets(items):
        for item in items:
            lines = wrap_text(item, 8.7, CONTENT_W - 26)
            ensure_for(len(lines) * 8.7 * 1.4 + 4)
            page().bullet(item)

    p = page()
    p.text(data["name"], LEFT, p.y - 7, 23, "F2", CHARCOAL)
    p.y -= 26
    p.text("  |  ".join(data["titles"]), LEFT, p.y, 9.3, "F2", BURGUNDY)
    p.y -= 17
    p.text(data["location"], LEFT, p.y, 8.5, "F1", MUTED)
    p.y -= 18
    p.link_line("Email", data["email"], f"mailto:{data['email']}")
    p.link_line("Phone", data["phone"], f"tel:{data['phone']}")
    p.link_line("LinkedIn", "Profile", data["linkedin"])
    p.link_line("GitHub", "Profile", data["github"])
    if data.get("portfolioUrl"):
        p.link_line("Portfolio", "Website", data["portfolioUrl"])
    p.y -= 5

    section("Professional Summary")
    paragraph(data["summary"], size=9.2, leading=13.1)
    paragraph("Professional focus: software development, frontend and backend engineering, API integration, databases, and collaborative project work.", size=8.6, color=MUTED)

    section("Technical Experience & Project Work")
    for job in data["experience"]:
        detail = f"{job['role']}  |  {job['period']}"
        ensure_for(36)
        page().item_heading(job["organization"], detail)
        paragraph(job["summary"], size=8.6, color=MUTED)
        bullets(job["highlights"])

    current_group = None
    for project in data["projects"]:
        group = project.get("catalogueGroup", "Selected Projects")
        if group != current_group:
            section(group)
            current_group = group
        ensure_for(42)
        page().item_heading(project["title"], f"{project['category']}  |  {project['status']}")
        paragraph(project["summary"], size=8.6)
        if project.get("purpose"):
            paragraph("Purpose: " + project["purpose"], size=8.1, color=MUTED)
        if project.get("problem"):
            paragraph("Problem / context: " + project["problem"], size=8.1, color=MUTED)
        if project.get("role"):
            paragraph("Role & contribution: " + project["role"], size=8.2, color=MUTED)
        if project.get("ownership"):
            paragraph("Ownership: " + project["ownership"], size=7.9, color=MUTED)
        if project.get("technologies"):
            paragraph("Technology: " + ", ".join(project["technologies"]), size=8.2, color=MUTED)
        if project.get("implemented"):
            bullets(project["implemented"])
        if project.get("planned"):
            page().text("PLANNED / NOT VERIFIED AS IMPLEMENTED", LEFT + 2, page().y, 7.2, "F2", BURGUNDY)
            page().y -= 11
            bullets(project["planned"])
        if project.get("notes"):
            paragraph("Project notes: " + " ".join(project["notes"]), size=7.8, color=MUTED)
        for link in project.get("links", []):
            if link["url"].startswith("/"):
                continue
            ensure_for(18)
            page().link_line(link["label"], "Open", link["url"], size=7.6)

    section("Professional Contributions")
    for contribution in data["contributions"]:
        ensure_for(36)
        page().item_heading(contribution["title"], f"{contribution['organization']}  |  {contribution['status']}")
        if contribution.get("purpose"):
            paragraph("Purpose: " + contribution["purpose"], size=8.0, color=MUTED)
        if contribution.get("problem"):
            paragraph("Problem / context: " + contribution["problem"], size=8.0, color=MUTED)
        if contribution.get("role"):
            paragraph("Role: " + contribution["role"], size=8.0, color=MUTED)
        if contribution.get("technologies"):
            paragraph("Technology: " + ", ".join(contribution["technologies"]), size=7.9, color=MUTED)
        paragraph(contribution["summary"], size=8.5)
        ensure_for(15)
        page().link_line("Pull request", "Open", contribution["url"], size=7.5)
        if contribution.get("notes"):
            paragraph("Contribution note: " + " ".join(contribution["notes"]), size=7.8, color=MUTED)

    if data.get("additionalProjects"):
        section("Additional Development Projects")
        for project in data["additionalProjects"]:
            ensure_for(36)
            page().item_heading(project["title"], f"{project['category']}  |  {project['ownership']}")
            paragraph(project["summary"], size=8.3)
            if project.get("purpose"):
                paragraph("Purpose: " + project["purpose"], size=7.9, color=MUTED)
            if project.get("problem"):
                paragraph("Problem / context: " + project["problem"], size=7.9, color=MUTED)
            if project.get("role"):
                paragraph("Role: " + project["role"], size=7.9, color=MUTED)
            if project.get("technologies"):
                paragraph("Technology: " + ", ".join(project["technologies"]), size=7.9, color=MUTED)
            if project.get("implemented"):
                bullets(project["implemented"])
            for link in project.get("links", []):
                ensure_for(18)
                page().link_line(link["label"], "Open", link["url"], size=7.5)

    section("Skills")
    for group in data["skills"]:
        ensure_for(32)
        page().text(group["category"], LEFT, page().y, 9.3, "F2", CHARCOAL)
        page().y -= 13
        paragraph(", ".join(group["items"]), size=8.1, color=CHARCOAL)
        paragraph(group["basis"], size=7.4, color=MUTED)

    section("Education")
    for edu in data["education"]:
        ensure_for(30)
        page().item_heading(edu["qualification"], f"{edu['institution']}  |  {edu['period']}")

    section("Technical Learning")
    paragraph("Course titles and selected years were supplied by the owner. Certificate documents and completion records were not available in the project; these are listed as training, not verified certifications.", size=8.1, color=MUTED)
    for course in data["professionalDevelopment"]:
        ensure_for(15)
        page().text(f"{course['name']}  —  {course['provider']} ({course['year']})", LEFT + 2, page().y, 8.1, "F1", CHARCOAL)
        page().y -= 12

    if data.get("notes", {}).get("portfolioUrl"):
        ensure_for(32)
        paragraph("Portfolio: " + data["notes"]["portfolioUrl"], size=8, color=MUTED)

    return pages


def pdf_literal(value):
    return "(" + str(value).replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)") + ")"


def make_pdf(pages, output):
    objects = [None, None, None, None, None, None]
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>"
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"
    objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>"
    objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>"
    page_ids = []
    for index, page in enumerate(pages):
        page_number = index + 1
        page.text(f"{page_number}  /  {len(pages)}", PAGE_W - RIGHT - 31, 25, 8, "F1", MUTED)
        page.line(LEFT, 39, PAGE_W - RIGHT, 39)
        stream = "\n".join(page.ops).encode("ascii")
        stream_id = len(objects)
        objects.append(f"<< /Length {len(stream)} >>\nstream\n".encode("ascii") + stream + b"\nendstream")
        annotation_ids = []
        for link in page.links:
            uri = quote(link["uri"], safe=":/?=&@+-._~%")
            annotation = (
                f"<< /Type /Annot /Subtype /Link /Rect [{link['x1']:.2f} {link['y1']:.2f} "
                f"{link['x2']:.2f} {link['y2']:.2f}] /Border [0 0 0] "
                f"/A << /S /URI /URI {pdf_literal(uri)} >> >>"
            )
            annotation_ids.append(len(objects))
            objects.append(annotation)
        page_id = len(objects)
        page_ids.append(page_id)
        annots = f" /Annots [{' '.join(f'{item} 0 R' for item in annotation_ids)}]" if annotation_ids else ""
        objects.append(
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W:.2f} {PAGE_H:.2f}] "
            f"/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> "
            f"/Contents {stream_id} 0 R{annots} >>"
        )
    objects[2] = f"<< /Type /Pages /Kids [{' '.join(f'{item} 0 R' for item in page_ids)}] /Count {len(page_ids)} >>"
    info_id = len(objects)
    objects.append(f"<< /Title {pdf_literal('Godscovenant Patrick Udofe — Resume')} /Author {pdf_literal('Godscovenant Patrick Udofe')} /Subject {pdf_literal('Resume and professional journey')} >>")

    document = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for object_id in range(1, len(objects)):
        offsets.append(len(document))
        body = objects[object_id]
        if isinstance(body, str):
            body = body.encode("cp1252", errors="replace")
        document.extend(f"{object_id} 0 obj\n".encode("ascii"))
        document.extend(body)
        document.extend(b"\nendobj\n")
    xref_offset = len(document)
    document.extend(f"xref\n0 {len(objects)}\n".encode("ascii"))
    document.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        document.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    document.extend(
        f"trailer\n<< /Size {len(objects)} /Root 1 0 R /Info {info_id} 0 R >>\n"
        f"startxref\n{xref_offset}\n%%EOF\n".encode("ascii")
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(document)


def main():
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    data.update(json.loads(CONTACT_PATH.read_text(encoding="utf-8")))
    pages = draw_document(data)
    make_pdf(pages, OUTPUT_PATH)
    print(f"Generated {OUTPUT_PATH.relative_to(ROOT)} ({len(pages)} pages, {OUTPUT_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()

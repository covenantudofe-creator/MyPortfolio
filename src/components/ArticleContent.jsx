import TechnicalDiagram from './TechnicalDiagram.jsx';
import ArticleFigure from './ArticleFigure.jsx';

export default function ArticleContent({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === 'p') return <p key={index}>{block.text}</p>;
    if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>;
    if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>;
    if (block.type === 'diagram') return <TechnicalDiagram key={index} type={block.name} />;
    if (block.type === 'image') return <ArticleFigure block={block} key={index} />;
    if (block.type === 'ul' || block.type === 'ol') {
      const List = block.type;
      return <List key={index}>{block.items.map(item => <li key={item}>{item}</li>)}</List>;
    }
    if (block.type === 'refs') return <section className="article-references" key={index}>
      <h2>Further reading</h2>
      <ul>{block.items.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a></li>)}</ul>
    </section>;
    return null;
  });
}

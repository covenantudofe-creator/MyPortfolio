import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">Search writing by title</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search writing..." />
      {value && <button type="button" aria-label="Clear search" onClick={() => onChange('')}><X size={15} /></button>}
    </label>
  )
}

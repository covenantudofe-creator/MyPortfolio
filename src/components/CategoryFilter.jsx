export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="filter-row" role="group" aria-label="Filter writing by category">
      {categories.map((category) => <button key={category} className={`filter-chip ${selected === category ? 'selected' : ''}`} onClick={() => onSelect(category)} aria-pressed={selected === category}>{category}</button>)}
    </div>
  )
}

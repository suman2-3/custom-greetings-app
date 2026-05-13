function CategoryTabs({ categories, selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setSelected(category)}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
            selected === category
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;

import { useEffect, useMemo, useState } from "react";

import GreetingCard from "../components/GreetingCard";
import CategoryTabs from "../components/CategoryTabs";
import Navbar from "../components/Navbar";
import { getTemplates } from "../services/templateService";

function Home() {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTemplates().then((data) => {
      setTemplates(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(templates.map((item) => item.category))),
    ],
    [templates],
  );

  const filteredTemplates =
    selected === "All"
      ? templates
      : templates.filter((item) => item.category === selected);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />

        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-green-600 font-semibold">
                Trending for Today
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
                Pick a template and personalize it.
              </h1>
            </div>
          </div>

          <div className="mt-6">
            <CategoryTabs
              categories={categories}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </section>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">Loading templates...</p>
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((item) => (
              <GreetingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              No templates found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

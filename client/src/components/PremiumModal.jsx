import { useState } from "react";

const plans = [
  {
    name: "Monthly",
    price: "$4.99",
    detail: "Unlock every premium greeting template.",
  },
  {
    name: "Yearly",
    price: "$39.99",
    detail: "Best value for frequent celebrations.",
  },
];

function PremiumModal({ closeModal }) {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].name);
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    setMessage(`${selectedPlan} plan selected for demo checkout.`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Premium Template
        </h1>
        <p className="text-slate-600 mb-6 text-center">
          This greeting is part of our premium collection. Upgrade to access
          exclusive templates and share them without restrictions.
        </p>

        <div className="space-y-3 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => {
                setSelectedPlan(plan.name);
                setMessage("");
              }}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                selectedPlan === plan.name
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center justify-between gap-4">
                <span>
                  <span className="block font-semibold text-slate-900">
                    {plan.name}
                  </span>
                  <span className="block text-sm text-slate-500">
                    {plan.detail}
                  </span>
                </span>
                <span className="font-bold text-green-700">{plan.price}</span>
              </span>
            </button>
          ))}
        </div>

        {message && (
          <p className="mb-4 rounded-2xl bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
            {message}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-2xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100 transition"
          >
            Maybe Later
          </button>
          <button
            type="button"
            onClick={handleSubscribe}
            className="rounded-2xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
          >
            Start Premium
          </button>
        </div>
      </div>
    </div>
  );
}

export default PremiumModal;

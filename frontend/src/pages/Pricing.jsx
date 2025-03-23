import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [currency, setCurrency] = useState("INR");

  const plans = [
    {
      name: "Free",
      priceINR: "₹0",
      priceUSD: "$0",
      description: "Basic queue management for individuals and small teams.",
      features: [
        "Up to 3 queues",
        "Maximum 25 people per queue",
        "Basic email notifications",
        "1 admin user",
        "Community support",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      priceINR: "₹2,399",
      priceUSD: "$29",
      period: "per month",
      description: "Advanced features for growing businesses.",
      features: [
        "Unlimited queues",
        "Maximum 100 people per queue",
        "Email and SMS notifications",
        "5 admin users",
        "Priority support",
        "Basic analytics",
        "Custom branding",
      ],
      popular: true,
      buttonText: "Start Free Trial",
    },
    {
      name: "Enterprise",
      priceINR: "Custom",
      priceUSD: "Custom",
      description: "Tailored solutions for large organizations.",
      features: [
        "Unlimited everything",
        "Advanced analytics and reporting",
        "Dedicated account manager",
        "Custom integration support",
        "SLA guarantees",
        "Training and onboarding",
        "API access",
        "24/7 phone support",
      ],
      popular: false,
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#C9F7FD]">
      <section className="py-10 px-6 text-center ">
        <h1 className="text-5xl font-bold mb-4 text-[#1B1924]">
          Simple, Transparent <span className="text-primary">Pricing</span>
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-[#131123]">
          Choose the plan that fits your needs. All plans come with a 14-day
          free trial.
        </p>

        <div className="mt-6">
          <button
            className={`px-4 py-2 text-lg rounded-md mx-2 ${
              currency === "INR"
                ? "bg-[#1B1924] text-white"
                : "bg-[#E6F9FC] border"
            }`}
            onClick={() => setCurrency("INR")}
          >
            INR ₹
          </button>
          <button
            className={`px-4 py-2 text-lg rounded-md mx-2 ${
              currency === "USD"
                ? "bg-[#1B1924] text-white"
                : "bg-[#E6F9FC] border"
            }`}
            onClick={() => setCurrency("USD")}
          >
            USD $
          </button>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-lg shadow-md border ${
                plan.popular
                  ? "border-[#1B1924] shadow-lg relative"
                  : "border-gray-300"
              } transition-transform transform hover:scale-105 hover:bg-[#fafeff]`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#1B1924] text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-semibold text-[#1B1924]">
                {plan.name}
              </h3>
              <div className="mt-4 text-4xl font-bold">
                {currency === "INR" ? plan.priceINR : plan.priceUSD}
                {plan.period && (
                  <span className="text-lg text-[#131123]"> {plan.period}</span>
                )}
              </div>
              <p className="text-[#131123] mt-2">{plan.description}</p>

              <ul className="space-y-2 mt-6 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-[#1B1924] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#131123]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <button
                  className={`w-full py-2 text-lg font-semibold rounded-md ${
                    plan.popular
                      ? "bg-[#1B1924] text-white"
                      : "border border-[#1B1924] text-[#1B1924]"
                  } hover:bg-gray-800 hover:text-white transition duration-300`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-whte">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1B1924] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              {
                question: "Can I switch plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time.",
              },
              {
                question: "How does the free trial work?",
                answer:
                  "All paid plans come with a 14-day free trial. No credit card required.",
              },
              {
                question: "Do you offer discounts?",
                answer:
                  "Yes, discounts are available for non-profits and educational institutions.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept UPI, Credit/Debit Cards, and Net Banking.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-[#fafeff] p-6 rounded-lg border shadow-md"
              >
                <h3 className="font-semibold text-[#1B1924]">{faq.question}</h3>
                <p className="text-[#131123] mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

"use client";
import React, { useState } from "react";
import PaymentDiv from "./PaymentDiv"; // Assumes PaymentDiv is in the same folder

const SubscribePage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<
    "energy" | "projects" | null
  >(null);

  // If a plan is chosen, render the payment div with the proper target prop mapping
  if (selectedPlan) {
    return (
      <div className="mx-auto h-[80vh] flex flex-col justify-center items-center px-4">
        {/* Back Button to clear selection state */}
        <button
          onClick={() => setSelectedPlan(null)}
          className="mb-4 text-sm font-semibold text-gray-500 hover:text-primary flex items-center gap-1 self-center sm:self-auto"
        >
          ⬅️ Choose a different plan
        </button>

        <PaymentDiv
          target={selectedPlan === "projects" ? "projects" : "energy data"}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto h-[85vh] md:h-[80vh] flex flex-col gap-6 w-full px-4 max-w-4xl justify-center">
      {/* Page Title Context Header */}
      <div className="text-center max-w-xl mx-auto flex flex-col gap-1.5">
        <h3 className="text-2xl font-bold tracking-wide text-primary-dark">
          Select Your Subscription Plan
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Get complete, unrestricted annual access to premium datasets and
          platform features. Select a dataset category below to proceed.
        </p>
      </div>

      {/* Plans Selection Grid Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
        {/* Plan 2: Projects Portal */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all hover:border-primary/20 hover:shadow-md">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
              🏗️
            </div>
            <h4 className="text-xl font-bold text-gray-900">
              Project Data Portal
            </h4>
            <p className="text-lg text-gray-600 leading-relaxed">
              Instant access to reliable and real-time project data.
            </p>
          </div>
          <button
            onClick={() => setSelectedPlan("projects")}
            className="mt-6 w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-sm hover:bg-blue-700 active:scale-[0.98]"
          >
            Select Project Data Plan
          </button>
        </div>{" "}
        {/* Plan 1: Energy Data Portal */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all hover:border-accent/40 hover:shadow-md">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-xl">
              ⚡
            </div>
            <h4 className="text-xl font-bold text-primary-dark">
              Energy Data Portal
            </h4>
            <p className="text-lg text-gray-600 leading-relaxed">
              Full access to reliable & extensive energy data.
            </p>
          </div>
          <button
            onClick={() => setSelectedPlan("energy")}
            className="mt-6 w-full bg-primary text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-sm hover:bg-primary-dark active:scale-[0.98]"
          >
            Select Energy Data Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;

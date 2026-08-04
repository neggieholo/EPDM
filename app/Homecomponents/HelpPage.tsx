"use client";
import React, { useState } from "react";

interface ComplaintFormData {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  recordId?: string; // Optional field in case they want to reference a broken data record
}

const complaintCategories = [
  { id: "account_access", title: "🔑 Account & Login Issues" },
  { id: "subscription_billing", title: "💳 Subscription & Payments" },
  { id: "data_error", title: "📊 Energy Record/Data Discrepancies" },
  { id: "download_issue", title: "📥 File Download Failures" },
  { id: "general_feedback", title: "💬 General Feedback & Suggestions" },
];

const HelpComplaintsPage: React.FC = () => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    name: "",
    email: "",
    category: "data_error",
    subject: "",
    message: "",
    recordId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Mocking submission logic - replace with your direct API route or email forwarder action
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitStatus({
        type: "success",
        message:
          "Your complaint form has been safely transmitted. Our support team will review it shortly!",
      });
      setFormData({
        name: "",
        email: "",
        category: "data_error",
        subject: "",
        message: "",
        recordId: "",
      });
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send form. Please verify your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto h-[85vh] md:h-[80vh] flex flex-col gap-4 w-full px-2 sm:px-4 overflow-y-auto pb-6">
      {/* Top Welcome Context Panel */}
      <div className="p-4 rounded-xl bg-accent/30 text-primary border border-accent/20 flex flex-col gap-1.5">
        <h4 className="text-lg font-bold tracking-wide text-primary-dark leading-tight">
          Customer Care Support Desk
        </h4>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-2xl">
          Encountered an issue with your data access, payment ledger, or noticed
          a bug in an entry? Submit a ticket below and our operations desk will
          investigate immediately.
        </p>
      </div>

      {/* Main Core Layout Form Grid */}
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-100 rounded-xl shadow-sm p-4 sm:p-6">
        {/* Banner Alert Prompts */}
        {submitStatus.type && (
          <div
            className={`mb-5 p-3.5 rounded-lg text-xs sm:text-sm font-semibold border ${
              submitStatus.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {submitStatus.type === "success" ? "✅ " : "⚠️ "}
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Identity Block Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-primary">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Simon Peter"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-primary">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="simon@example.com"
              />
            </div>
          </div>

          {/* Form Context Control Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-primary">
                Issue Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                >
                  {complaintCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-xs uppercase tracking-wider text-primary">
                Reference Record ID{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="recordId"
                value={formData.recordId || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. 64f2b1a..."
              />
            </div>
          </div>

          {/* Subject Block Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-xs uppercase tracking-wider text-primary">
              Subject Summary
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Brief summary of the issue..."
            />
          </div>

          {/* Core Body Message Box */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-xs uppercase tracking-wider text-primary">
              Detailed Description
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              placeholder="Please provide explicit details regarding what went wrong..."
            />
          </div>

          {/* Form Action Transmission Triggers */}
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[160px] bg-primary text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm hover:bg-primary-dark disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "🚀 Dispatch Complaint"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpComplaintsPage;

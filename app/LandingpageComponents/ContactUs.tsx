"use client";

import React from "react";

interface Contact {
  companyName: string;
  address?: string;
  phones?: string[];
  email?: string;
  mapEmbedUrl?: string;
}

interface ContactUsProps {
  contact: Contact;
}

const ContactUs: React.FC<ContactUsProps> = ({ contact }) => {
  const phones = contact.phones || [];

  const inputClass =
    "w-full border border-gray-300 bg-white rounded-md p-2 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400";

  const labelClass = "block mb-1 text-sm font-medium text-black";

  return (
    <section className="w-full min-h-0 flex flex-col items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-3xl mx-auto bg-accent/50 shadow-md rounded-lg border border-gray-200 p-5 sm:p-6">
        {/* Page Header */}
        <h1 className="text-2xl font-bold mb-6 text-black">Contact Us</h1>

        {/* Contact Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6"
          action="/submit"
          method="POST"
        >
          {/* Full Name */}
          <div>
            <label className={labelClass} htmlFor="contactName">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="contactName"
              placeholder="e.g. John Smith"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass} htmlFor="contactEmail">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="contactEmail"
              placeholder="e.g. john@example.com"
              required
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="contactMessage">
              Message
            </label>
            <textarea
              name="message"
              id="contactMessage"
              rows={4}
              placeholder="Enter your message here..."
              required
              className={inputClass}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Or reach us directly:
          </h2>

          <div className="space-y-2 text-gray-700">
            <p className="font-semibold text-black">{contact.companyName}</p>

            {contact.address && (
              <address className="whitespace-pre-line not-italic">
                {contact.address}
              </address>
            )}

            {contact.email && (
              <p>
                <strong className="text-black">Email:</strong>{" "}
                <a
                  className="text-blue-700 hover:underline"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </p>
            )}

            {phones.length > 0 && <p>📞 {phones.join(", ")}</p>}

            {contact.mapEmbedUrl && (
              <div className="mt-4">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="250"
                  className="border rounded-md"
                  allowFullScreen
                  loading="lazy"
                  title="Company Location"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

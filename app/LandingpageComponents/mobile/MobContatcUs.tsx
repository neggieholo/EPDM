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

const MobContactUs: React.FC<ContactUsProps> = ({ contact }) => {
  const phones = contact.phones || [];

  return (
    <section className="bg-white w-full px-5 py-10">
      {/* Header */}
      <div className="bg-primary shadow-strong rounded-lg px-6 py-8 flex items-center justify-center">
        <h1 className="text-4xl font-extrabold text-white text-center leading-tight">
          CONTACT
          <br />
          US
        </h1>
      </div>

      {/* Contact Content */}
      <div className="w-full bg-accent/50 p-5 sm:p-8 border border-accent/20 rounded-lg mt-8">
        {/* Contact Form */}
        <form className="space-y-4 mb-8" action="/submit" method="POST">
          <div>
            <label className="block mb-1 font-medium" htmlFor="contactName">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="contactName"
              required
              className="w-full border border-gray-300 bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="contactEmail">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="contactEmail"
              required
              className="w-full border border-gray-300 bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="contactMessage">
              Message
            </label>
            <textarea
              name="message"
              id="contactMessage"
              rows={4}
              required
              className="w-full border border-gray-300 bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-md hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4">Or reach us directly:</h2>

          <div className="space-y-3">
            <p className="font-semibold text-lg">{contact.companyName}</p>

            {contact.address && (
              <address className="not-italic whitespace-pre-line text-gray-700">
                {contact.address}
              </address>
            )}

            {contact.email && (
              <p className="break-words">
                <strong>Email:</strong>{" "}
                <a
                  className="text-primary hover:underline"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </p>
            )}

            {phones.length > 0 && (
              <p className="text-gray-700 break-words">
                <strong>Phone:</strong> {phones.join(", ")}
              </p>
            )}

            {contact.mapEmbedUrl && (
              <div className="mt-5">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="250"
                  className="border rounded-md"
                  allowFullScreen
                  loading="lazy"
                  title="Company Location"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobContactUs;

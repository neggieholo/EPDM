'use client';

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
        <section className="w-full min-h-screen flex items-center justify-center bg-white pt-20 pb-5">
            <div className="w-[95%] sm:w-[500px] bg-accent/50 p-8 border border-accent/20">
                {/* Page Header */}
                <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

                {/* Contact Form */}
                <form className="space-y-4 mb-6" action="/submit" method="POST">
                    <div>
                        <label className="block mb-1 font-medium" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="contactName"
                            required
                            className="w-full border border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="contactEmail"
                            required
                            className="w-full border border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="contactMessage"
                            rows={4}
                            required
                            className="w-full border border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Contact Information */}
                <div className="border-t border-gray-200 pt-4">
                    <h2 className="text-xl font-semibold mb-2">Or reach us directly:</h2>
                    <div className="space-y-2">
                        <p className="font-semibold">{contact.companyName}</p>

                        {contact.address && (
                            <address className="whitespace-pre-line">{contact.address}</address>
                        )}

                        {contact.email && (
                            <p>
                                <strong>Email:</strong>{" "}
                                <a className="text-blue-700" href={`mailto:${contact.email}`}>
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

export default MobContactUs;

"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";
import { submitRegistration, fetchDocuments } from "../utils/SignUpFetchers";
import { validateFields } from "../utils/LandingPageFetchers";
import LegalDocBtn from "./legalDocBtn";

const RegisterCard: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [nature, setNature] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Status messages
  const [usernameStatus, setUsernameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [phoneStatus, setPhoneStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  // Documents
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");

  // Load terms & privacy
  useEffect(() => {
    const loadDocs = async () => {
      const { terms, privacy } = await fetchDocuments();
      setTermsContent(terms);
      setPrivacyContent(privacy);
    };

    loadDocs();
  }, []);

  // Field validations
  useEffect(() => {
    validateFields({
      username,
      email,
      phone,
      password,
      setUsernameStatus,
      setIsUsernameValid,
      setEmailStatus,
      setIsEmailValid,
      setPhoneStatus,
      setIsPhoneValid,
      setPasswordStatus,
      setIsPasswordValid,
    });
  }, [username, email, phone, password]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !isUsernameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isPasswordValid
    ) {
      toast.error("Please correct the form before submitting.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await submitRegistration(formData);
      const result = await response?.json();

      if (response?.ok && result.success) {
        toast.success("Registration successful! Verification email sent.");

        (e.target as HTMLFormElement).reset();

        setUsername("");
        setEmail("");
        setPhone(undefined);
        setPassword("");
        setPosition("");
        setCompany("");
        setAddress("");
        setNature("");

        setUsernameStatus("");
        setEmailStatus("");
        setPhoneStatus("");
        setPasswordStatus("");

        setIsUsernameValid(false);
        setIsEmailValid(false);
        setIsPhoneValid(false);
        setIsPasswordValid(false);

        setTimeout(() => {
          window.location.href = result.redirectUrl;
        }, 2000);
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (err) {
      toast.error(`Unable to connect to server: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full min-w-0 px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 text-gray-700 focus:ring-accent placeholder:text-gray-400";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const fieldClass = "min-w-0";

  return (
    <section className="w-full min-h-0 h-fit flex items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-3xl bg-accent/50 p-5 sm:p-8 border border-accent/20 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* Username */}
          <div className={fieldClass}>
            <label className={labelClass}>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="e.g. johnsmith"
              className={inputClass}
              required
            />
            {usernameStatus && (
              <p
                className={`text-sm mt-1 ${
                  usernameStatus.includes("taken") || !isUsernameValid
                    ? "text-red-500"
                    : "text-primary"
                }`}
              >
                {usernameStatus}
              </p>
            )}
          </div>

          {/* Password */}
          <div className={fieldClass}>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-accent font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordStatus && (
              <p className="text-sm mt-1 text-red-500">{passwordStatus}</p>
            )}
          </div>

          {/* Email */}
          <div className={fieldClass}>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="e.g. john@example.com"
              className={inputClass}
              required
            />
            {emailStatus && (
              <p
                className={`text-sm mt-1 ${
                  emailStatus.includes("taken") || !isEmailValid
                    ? "text-red-500"
                    : "text-primary"
                }`}
              >
                {emailStatus}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className={fieldClass}>
            <label className={labelClass}>Phone Number</label>
            <div className="bg-white rounded-md px-2 py-1 border border-accent/30 min-w-0">
              <PhoneInput
                international
                defaultCountry="NG"
                value={phone}
                onChange={setPhone}
                placeholder="e.g. 801 234 5678"
                className="phone-input"
              />
            </div>
            {phoneStatus && (
              <p
                className={`text-sm mt-1 ${
                  phoneStatus.includes("taken") || !isPhoneValid
                    ? "text-red-500"
                    : "text-primary"
                }`}
              >
                {phoneStatus}
              </p>
            )}
          </div>

          {/* Position */}
          <div className={fieldClass}>
            <label className={labelClass}>Position</label>
            <input
              type="text"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Managing Director"
              className={inputClass}
              required
            />
          </div>

          {/* Company */}
          <div className={fieldClass}>
            <label className={labelClass}>Company Name</label>
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. ABC Technologies Ltd."
              className={inputClass}
              required
            />
          </div>

          {/* Business Address */}
          <div className={fieldClass}>
            <label className={labelClass}>Business Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 15 Marina Road, Lagos"
              className={inputClass}
              required
            />
          </div>

          {/* Nature of Business */}
          <div className={fieldClass}>
            <label className={labelClass}>Nature of Business</label>
            <input
              type="text"
              name="nature"
              value={nature}
              onChange={(e) => setNature(e.target.value)}
              placeholder="e.g. Engineering and Construction"
              className={inputClass}
              required
            />
          </div>

          {/* Terms and Privacy */}
          <div className="md:col-span-2 space-y-2 mt-2">
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" required />I agree to the{" "}
              <LegalDocBtn docType="terms" content={termsContent} />
            </label>

            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" required />I agree to the{" "}
              <LegalDocBtn docType="privacy" content={privacyContent} />
            </label>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-white font-semibold py-2 rounded-md mt-2 hover:bg-accent/90 transition"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterCard;

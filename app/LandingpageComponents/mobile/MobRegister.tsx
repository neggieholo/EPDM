'use client';

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number, isValidPhoneNumber } from "libphonenumber-js";
import { submitRegistration, fetchDocuments } from "@/app/utils/SignUpFetchers";
import { validateFields } from "@/app/utils/LandingPageFetchers";
// import TermsPrivacyDialog from "./TermsPrivacyDialog";

const MobRegisterCard: React.FC = () => {
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

    // Dialogs
    const [termsContent, setTermsContent] = useState("");
    const [privacyContent, setPrivacyContent] = useState("");
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

   
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

        if (!isUsernameValid || !isEmailValid || !isPhoneValid || !isPasswordValid) {
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
            toast.error("Unable to connect to server.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-white pt-20 pb-5">
            <div className="w-[95%] sm:w-[500px] bg-accent/50 p-8 border border-accent/20">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.trim())}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                        {usernameStatus && (
                            <p
                                className={`text-xs mt-1 ${usernameStatus.includes("taken") ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {usernameStatus}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white pr-12 focus:outline-none focus:ring-2 focus:ring-accent"
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
                            <p className="text-xs mt-1 text-red-500">{passwordStatus}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                        {emailStatus && (
                            <p
                                className={`text-xs mt-1 ${emailStatus.includes("taken") ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {emailStatus}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <div className="bg-white rounded-md px-2 py-1 border border-accent/30">
                            <PhoneInput
                                international
                                defaultCountry="NG"
                                value={phone}
                                onChange={setPhone}
                                className="phone-input"
                            />
                        </div>
                        {phoneStatus && (
                            <p
                                className={`text-xs mt-1 ${phoneStatus.includes("taken") ? "text-red-500" : "text-green-500"
                                    }`}
                            >
                                {phoneStatus}
                            </p>
                        )}
                    </div>

                    {/* Extra fields */}
                    <input
                        type="text"
                        name="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Position"
                        className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company"
                        className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Business Address"
                        className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />

                    <input
                        type="text"
                        name="nature"
                        value={nature}
                        onChange={(e) => setNature(e.target.value)}
                        placeholder="Nature of Business"
                        className="w-full px-4 py-2 border border-accent/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                        required
                    />

                    {/* Terms and Privacy */}
                    <div className="space-y-2 mt-2">
                        <label className="text-sm flex items-center gap-2">
                            <input type="checkbox" required />
                            I agree to the{" "}
                            <span
                                onClick={() => setShowTerms(true)}
                                className="text-accent underline cursor-pointer"
                            >
                                Terms and Conditions
                            </span>
                        </label>

                        <label className="text-sm flex items-center gap-2">
                            <input type="checkbox" required />
                            I agree to the{" "}
                            <span
                                onClick={() => setShowPrivacy(true)}
                                className="text-accent underline cursor-pointer"
                            >
                                Privacy and Cookie Policy
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-accent text-white font-semibold py-2 rounded-md mt-4 hover:bg-accent/90 transition"
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>

            {/* Dialogs
            <TermsPrivacyDialog
                open={showTerms}
                onClose={() => setShowTerms(false)}
                docType="terms"
                content={termsContent}
            />
            <TermsPrivacyDialog
                open={showPrivacy}
                onClose={() => setShowPrivacy(false)}
                docType="privacy"
                content={privacyContent}
            /> */}
        </section>
    );
};

export default MobRegisterCard;

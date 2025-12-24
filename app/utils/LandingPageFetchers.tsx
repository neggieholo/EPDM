/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { toast } from "react-toastify";
import {
    userNameFind,
    emailFind,
    phoneFind,
    submitRegistration,
    fetchDocuments,
} from "./SignUpFetchers";
import { E164Number, isValidPhoneNumber } from "libphonenumber-js";

async function resendVerificationMail(user: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/api/resend-email-verification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: user }),
        });

        const data = await response.json();
        console.log("VerData:", data)

        const timeLeft = data.timeLeft || 30;
        console.log('time left:', timeLeft)
        if (data.timeLeft) {
            toast.error(data.message)
        } else {
            toast.success(data.message)
        }
    } catch (error: any) {
        console.error("Error:", error);
        toast.error(error.message || "An error occurred")
    }
}

export function filterAndFormatProfileData(data: Record<string, any>) {
    const allowedKeys = [
        "Username",
        "Email",
        "Phone",
        "Address",
        "Position",
        "Nature of Business",
        "Subscription Expiry Date"
    ];

    // Tell TypeScript this object can be indexed by strings
    const filtered: Record<string, any> = {};

    for (const key of allowedKeys) {
        if (key in data) {
            let value = data[key];

            if (key === "Subscription Expiry Date" && value) {
                try {
                    const date = new Date(value);
                    value = date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    });
                } catch (e) {
                    console.warn("Date parse error:", e);
                }
            }

            filtered[key] = value;
        }
    }

    return filtered;
}

export function revertToDatabaseKeys(formattedData: Record<string, any>) {
    const reverseFieldMap: Record<string, string> = {
        "Username": "username",
        "Email": "email",
        "Phone": "phone",
        "Address": "address",
        "Position": "position",
        "Nature of Business": "nature",
        "Subscription Expiry Date": "subscriptionExpiry"
    };

    // Tell TypeScript this object can be indexed by strings
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(formattedData)) {
        const dbKey = reverseFieldMap[key];
        if (dbKey) {
            result[dbKey] = value;
        }
    }
    return result;
}


// ✅ Function to check all fields
export const validateFields = async ({
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
}: {
    username: string;
    email: string;
    phone: E164Number | undefined;
    password: string;
    setUsernameStatus: (msg: string) => void;
    setIsUsernameValid: (valid: boolean) => void;
    setEmailStatus: (msg: string) => void;
    setIsEmailValid: (valid: boolean) => void;
    setPhoneStatus: (msg: string) => void;
    setIsPhoneValid: (valid: boolean) => void;
    setPasswordStatus: (msg: string) => void;
    setIsPasswordValid: (valid: boolean) => void;
}) => {
    // ✅ Username
    if (username) {
        if (username.length >= 4) {
            try {
                const result = await userNameFind(username);
                setUsernameStatus(result.exists ? "Username Taken" : "Available");
                setIsUsernameValid(!result.exists);
            } catch (error) {
                console.error("Error checking username:", error);
            }
        } else {
            setUsernameStatus("Username must be more than 3 letters");
            setIsUsernameValid(false);
        }
    } else {
        setUsernameStatus("");
    }

    // ✅ Email
    if (email) {
        if (email.length >= 5 && email.includes("@")) {
            try {
                const result = await emailFind(email);
                setEmailStatus(result.exists ? "Email Taken" : "Available");
                setIsEmailValid(!result.exists);
            } catch (error) {
                console.error("Error checking email:", error);
            }
        } else {
            setEmailStatus("Enter a valid email");
            setIsEmailValid(false);
        }
    } else {
        setEmailStatus("");
    }

    // ✅ Phone
    if (phone) {
        if (isValidPhoneNumber(phone)) {
            try {
                const result = await phoneFind(phone.trim());
                setPhoneStatus(result.exists ? "Phone number Taken" : "Available");
                setIsPhoneValid(!result.exists);
            } catch (error) {
                console.error("Error checking phone:", error);
            }
        } else {
            setPhoneStatus("Enter a valid phone number");
            setIsPhoneValid(false);
        }
    } else {
        setPhoneStatus("");
    }

    // ✅ Password
    if (password) {
        if (password.length < 8) {
            setPasswordStatus("Must be at least 8 characters");
            setIsPasswordValid(false);
        } else {
            setPasswordStatus("");
            setIsPasswordValid(true);
        }
    } else {
        setPasswordStatus("");
    }
};


// export const validateFields = async ({
//     username,
//     email,
//     phone,
//     password,
//     setUsernameStatus,
//     setIsUsernameValid,
//     setEmailStatus,
//     setIsEmailValid,
//     setPhoneStatus,
//     setIsPhoneValid,
//     setPasswordStatus,
//     setIsPasswordValid,
// }: {
//     username: string;
//     email: string;
//     phone: E164Number | undefined;
//     password: string;
//     setUsernameStatus: (msg: string) => void;
//     setIsUsernameValid: (valid: boolean) => void;
//     setEmailStatus: (msg: string) => void;
//     setIsEmailValid: (valid: boolean) => void;
//     setPhoneStatus: (msg: string) => void;
//     setIsPhoneValid: (valid: boolean) => void;
//     setPasswordStatus: (msg: string) => void;
//     setIsPasswordValid: (valid: boolean) => void;
// }) => {
//     // Prepare promises for parallel execution
//     const promises: Promise<void>[] = [];

//     // ✅ Username
//     if (username) {
//         if (username.length >= 4) {
//             promises.push(
//                 (async () => {
//                     try {
//                         const result = await userNameFind(username);
//                         setUsernameStatus(result.exists ? "Username Taken" : "Available");
//                         setIsUsernameValid(!result.exists);
//                     } catch (error) {
//                         console.error("Error checking username:", error);
//                     }
//                 })()
//             );
//         } else {
//             setUsernameStatus("Username must be more than 3 letters");
//             setIsUsernameValid(false);
//         }
//     } else {
//         setUsernameStatus("");
//     }

//     // ✅ Email
//     if (email) {
//         if (email.length >= 5 && email.includes("@")) {
//             promises.push(
//                 (async () => {
//                     try {
//                         const result = await emailFind(email);
//                         setEmailStatus(result.exists ? "Email Taken" : "Available");
//                         setIsEmailValid(!result.exists);
//                     } catch (error) {
//                         console.error("Error checking email:", error);
//                     }
//                 })()
//             );
//         } else {
//             setEmailStatus("Enter a valid email");
//             setIsEmailValid(false);
//         }
//     } else {
//         setEmailStatus("");
//     }

//     // ✅ Phone
//     if (phone) {
//         if (isValidPhoneNumber(phone)) {
//             promises.push(
//                 (async () => {
//                     try {
//                         const result = await phoneFind(phone.toString());
//                         setPhoneStatus(result.exists ? "Phone number Taken" : "Available");
//                         setIsPhoneValid(!result.exists);
//                     } catch (error) {
//                         console.error("Error checking phone:", error);
//                     }
//                 })()
//             );
//         } else {
//             setPhoneStatus("Enter a valid phone number");
//             setIsPhoneValid(false);
//         }
//     } else {
//         setPhoneStatus("");
//     }

//     // ✅ Password (local, no async)
//     if (password) {
//         if (password.length < 8) {
//             setPasswordStatus("Must be at least 8 characters");
//             setIsPasswordValid(false);
//         } else {
//             setPasswordStatus("");
//             setIsPasswordValid(true);
//         }
//     } else {
//         setPasswordStatus("");
//     }

//     // Wait for all async checks to finish
//     await Promise.all(promises);
// };


export default resendVerificationMail
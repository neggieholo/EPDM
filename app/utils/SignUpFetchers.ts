import { toast } from "react-toastify";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/api";
export const userNameFind = async (value: string) => {
    if (typeof value === 'string' && value.length >= 4) {
        try {
            const response = await fetch(`${baseUrl}/username?username=${value}`);
            if (!response.ok) {
                console.warn("Non-OK response from server:", response.status);
                return;
            }

            const data = await response.json();
            return data

        } catch (error) {
            console.error("Network error checking username:", error);
            // showToast("Network error — please check your internet connection.");
        }
    }

}

export const emailFind = async (value: string) => {
    if (value.length >= 5 && value.includes("@")) {
        try {
            const response = await fetch(`${baseUrl}/email?email=${encodeURIComponent(value)}`);

            if (!response.ok) {
                console.warn("Non-OK response from server:", response.status);
                return;
            }

            const data = await response.json();
            return data

        } catch (error) {
            console.error("Network error checking username:", error);
            // showToast("Network error — please check your internet connection.");
        }
    }

}

export const phoneFind = async (value: string) => {
    if (value.length >= 10) {
        try {
            const response = await fetch(`${baseUrl}/phone?phone=${encodeURIComponent(value)}`);

            if (!response.ok) {
                console.warn("Non-OK response from server:", response.status);
                return;
            }

            const data = await response.json();
            return data

        } catch (error) {
            console.error("Network error checking username:", error);
            // showToast("Network error — please check your internet connection.");
        }
    }

}

export async function submitRegistration(formData:any) {
    try {
        const data = new URLSearchParams(formData); // converts FormData to x-www-form-urlencoded

        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString(),
        });

        return response;
    } catch (error) {
        toast.error("Error during registration. Please try again.");
        console.error("Registration error:", error);

    }
}

export const verifyEmailToken = async (token: string) => {
    try {
        const res = await fetch(`${baseUrl}/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }), // Wrap in object
        });

        if (!res.ok) throw new Error("Verification failed");

        const data = await res.json();
        return data; // Expecting something like { success: true }
    } catch (err) {
        toast.error('An error occurred during verification');
        return { success: false };
    }
};

export const fetchDocuments = async () => {
    try {
        const [termsRes, privacyRes] = await Promise.all([
            fetch(`${baseUrl}/terms_socials/legalDocs/terms`),
            fetch(`${baseUrl}/terms_socials/legalDocs/privacy`)
        ]);

        const [termsData, privacyData] = await Promise.all([
            termsRes.json(),
            privacyRes.json()
        ]);

        return {
            terms: termsData.success && termsData.doc
                ? termsData.doc.content
                : "No Terms document found.",
            privacy: privacyData.success && privacyData.doc
                ? privacyData.doc.content
                : "No Privacy document found."
        };
    } catch (err) {
        return { terms: "", privacy: "" };
    }
};


export default userNameFind
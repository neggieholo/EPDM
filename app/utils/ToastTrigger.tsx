// components/ToastTrigger.tsx
"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

interface ToastTriggerProps {
    message?: string;
    type?: "success" | "error" | "info" | "warning";
}

export default function ToastTrigger({ message, type = "info" }: ToastTriggerProps) {
    useEffect(() => {
        if (message) {
            switch (type) {
                case "success":
                    toast.success(message);
                    break;
                case "error":
                    toast.error(message);
                    break;
                case "warning":
                    toast.warning(message);
                    break;
                default:
                    toast.info(message);
            }
        }
    }, [message, type]);

    return null;
}

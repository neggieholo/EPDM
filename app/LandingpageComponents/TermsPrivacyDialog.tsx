"use client";

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import html2pdf from "html2pdf.js";

interface TermsPrivacyDialogProps {
    open: boolean;
    onClose: () => void;
    docType: "terms" | "privacy";
    content: string;
}

const TermsPrivacyDialog: React.FC<TermsPrivacyDialogProps> = ({
    open,
    onClose,
    docType,
    content,
}) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleClose = () => onClose?.();

        dialog.addEventListener("close", handleClose);
        dialog.addEventListener("cancel", handleClose);

        if (open) {
            if (typeof dialog.showModal === "function") {
                try {
                    dialog.showModal();
                } catch {
                    dialog.setAttribute("open", "");
                }
            } else {
                dialog.setAttribute("open", "");
            }
            document.body.classList.add("overflow-hidden");
        } else {
            dialog.close();
            dialog.removeAttribute("open");
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            dialog.removeEventListener("close", handleClose);
            dialog.removeEventListener("cancel", handleClose);
        };
    }, [open, onClose]);

    const handleDownload = () => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const element = dialog.querySelector(".doc-content") as HTMLElement;
        if (!element) return;

        html2pdf()
            .from(element)
            .set({
                margin: 0.5,
                filename: `${docType}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            })
            .save();
    };

    if (!open) return null;

    return ReactDOM.createPortal(
        <dialog
            ref={dialogRef}
            className="rounded-lg w-[70%] min-w-[320px] max-h-[80vh] p-0 border-0 shadow-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-labelledby="terms-title"
        >
            {/* Header */}
            <div className="bg-primary text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
                <h4 id="terms-title" className="text-lg font-semibold">
                    {docType === "terms"
                        ? "⚖️ Terms & Conditions"
                        : "🔒 Privacy & Cookies Policy"}
                </h4>
                <button
                    type="button"
                    onClick={() => dialogRef.current?.close()}
                    className="text-white hover:text-gray-200 text-xl"
                    aria-label="Close"
                >
                    ❌
                </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] bg-white text-gray-800">
                <div
                    className="doc-content prose prose-sm max-w-none text-justify"
                    dangerouslySetInnerHTML={{ __html: content || "<p>No content</p>" }}
                />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 flex justify-end gap-3 bg-primary rounded-b-lg">
                <button
                    type="button"
                    className="bg-white text-primary py-1.5 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition"
                    onClick={handleDownload}
                >
                    Download PDF
                </button>
            </div>
        </dialog>,
        document.body
    );
};

export default TermsPrivacyDialog;

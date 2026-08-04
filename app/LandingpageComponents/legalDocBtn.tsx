'use client'

import React, { useState } from 'react'
import TermsPrivacyDialog from './TermsPrivacyDialog'

interface LegalDocBtnProps {
  docType: "terms" | "privacy"
  content: string
}

const LegalDocBtn: React.FC<LegalDocBtnProps> = ({ docType, content }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hover:text-blue-400 underline-offset-2"
      >
        {docType === 'terms' ? 'Terms and Conditions' : 'Privacy Policy'}
      </button>

      {open && (
        <TermsPrivacyDialog
          open={open}
          onClose={() => setOpen(false)}
          docType={docType}
          content={content}
        />
      )}
    </>
  )
}

export default LegalDocBtn

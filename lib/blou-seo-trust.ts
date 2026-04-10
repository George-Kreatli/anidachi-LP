/** YMYL disclosure — set NEXT_PUBLIC_MEDICAL_REVIEWER_* in production when a named reviewer is assigned. */
export const medicalReview = {
  reviewerName:
    process.env.NEXT_PUBLIC_MEDICAL_REVIEWER_NAME || "Clinical content reviewer (assign in env)",
  reviewerTitle:
    process.env.NEXT_PUBLIC_MEDICAL_REVIEWER_TITLE || "Physician review",
  credentialLine:
    process.env.NEXT_PUBLIC_MEDICAL_REVIEWER_CREDENTIALS ||
    "Replace with credentials when a named reviewer is available.",
  lastReviewed: "2026-04-10",
  scope:
    "General health education aligned with NHS, CDC, and WHO public guidance. Not individualized medical advice.",
} as const;

export const sitePublishDate = "2026-04-01";

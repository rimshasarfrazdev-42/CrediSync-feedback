export const MAX_SIZE_MB = 5;
export const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export const DOC_RULES = {
  GovernmentID: {
    accept: ".jpg,.jpeg,.png",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    label: "JPG, PNG (Max 5MB)",
  },
  DegreeDiploma: {
    accept: ".pdf,.jpg,.jpeg,.png",
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    label: "PDF, JPG, PNG (Max 5MB)",
  },
  MedicalLicense: {
    accept: ".pdf,.jpg,.jpeg,.png",
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    label: "PDF, JPG, PNG (Max 5MB)",
  },
  BoardCertification: {
    accept: ".pdf,.jpg,.jpeg,.png",
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    label: "PDF, JPG, PNG (Max 5MB)",
  },
  CertificateOfInsurance: {
    accept: ".pdf,.jpg,.jpeg,.png",
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    label: "PDF, JPG, PNG (Max 5MB)",
  },
  DEAcertificate: {
    accept: ".pdf,.jpg,.jpeg,.png",
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    label: "PDF, JPG, PNG (Max 5MB)",
  },
  ResumeCV: {
    accept: ".pdf,.doc,.docx",
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    label: "PDF, DOC, DOCX (Max 5MB)",
  },
  VaccinationProof: {
    accept: ".pdf,.jpg,.jpeg,.png",
    allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    label: "PDF, JPG, PNG (Max 5MB)",
  },
  SupportingDocuments: {
    accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ],
    label: "PDF, DOC, DOCX, JPG, PNG (Max 5MB)",
  },
};

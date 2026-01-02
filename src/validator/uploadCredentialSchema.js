import * as Yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Some browsers may not set file.type properly for .doc files, so we also check extension.
const getExt = (name = "") => {
  const parts = String(name).toLowerCase().split(".");
  return parts.length > 1 ? `.${parts.pop()}` : "";
};

// If your list ever contains objects (saved metadata), this makes it safer.
// It still works perfectly if all entries are real File objects.
const normalizeFile = (f) => {
  if (!f) return null;
  // if you store { file: File } or similar in future
  if (f?.file instanceof File) return f.file;
  return f;
};

const validateFileArray = ({
  required = true,
  allowedMimes = [],
  allowedExts = [],
  label = "this document",
}) => {
  let schema = Yup.array()
    .transform((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .test("minFiles", `This document is required`, (arr) => {
      if (!required) return true;
      return Array.isArray(arr) && arr.length > 0;
    })
    .of(
      Yup.mixed()
        .test("fileSize", "One or more files are too large (Max 5MB)", (file) => {
          const f = normalizeFile(file);
          if (!f) return true;

          // If it isn't a File, skip size check (or you can fail it)
          const size = f?.size;
          if (typeof size !== "number") return true;

          return size <= MAX_FILE_SIZE;
        })
        .test("fileFormat", () => `Unsupported format for ${label}`, (file) => {
          const f = normalizeFile(file);
          if (!f) return true;

          const mime = String(f?.type || "").toLowerCase();
          const ext = getExt(f?.name);

          const mimeOk = allowedMimes.length ? allowedMimes.includes(mime) : true;
          const extOk = allowedExts.length ? allowedExts.includes(ext) : true;

          // ✅ allow if either mime matches OR extension matches
          // (because .doc sometimes has empty mime)
          return mimeOk || extOk;
        })
    );

  if (!required) {
    // Optional: allow empty array
    schema = schema.notRequired();
  } else {
    schema = schema.required("This document is required");
  }

  return schema;
};

// -----------------------
// Per-field rules (same as your UI rules)
// -----------------------
const RULES = {
  GovernmentID: {
    allowedMimes: ["image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".jpg", ".jpeg", ".png"],
    label: "Government-issued ID (JPG/PNG)",
    required: true,
  },

  DegreeDiploma: {
    allowedMimes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".pdf", ".jpg", ".jpeg", ".png"],
    label: "Degree / Diploma (PDF/JPG/PNG)",
    required: true,
  },

  MedicalLicense: {
    allowedMimes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".pdf", ".jpg", ".jpeg", ".png"],
    label: "Medical License (PDF/JPG/PNG)",
    required: true,
  },

  BoardCertification: {
    allowedMimes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".pdf", ".jpg", ".jpeg", ".png"],
    label: "Board Certification (PDF/JPG/PNG)",
    required: true,
  },

  CertificateOfInsurance: {
    allowedMimes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".pdf", ".jpg", ".jpeg", ".png"],
    label: "Certificate of Insurance (PDF/JPG/PNG)",
    required: true,
  },

  DEAcertificate: {
    allowedMimes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".pdf", ".jpg", ".jpeg", ".png"],
    label: "DEA Certificate (PDF/JPG/PNG)",
    required: false,
  },

  // ✅ Resume: PDF/DOC/DOCX only
  ResumeCV: {
    allowedMimes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    allowedExts: [".pdf", ".doc", ".docx"],
    label: "Resume/CV (PDF/DOC/DOCX)",
    required: false,
  },

  VaccinationProof: {
    allowedMimes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    allowedExts: [".pdf", ".jpg", ".jpeg", ".png"],
    label: "Vaccination Proof (PDF/JPG/PNG)",
    required: false,
  },

  // ✅ Supporting: PDF/DOC/DOCX + images
  SupportingDocuments: {
    allowedMimes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ],
    allowedExts: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
    label: "Supporting Documents (PDF/DOC/DOCX/JPG/PNG)",
    required: false,
  },
};

export const uploadCredentialSchema = Yup.object().shape({
  GovernmentID: validateFileArray(RULES.GovernmentID),
  DegreeDiploma: validateFileArray(RULES.DegreeDiploma),
  MedicalLicense: validateFileArray(RULES.MedicalLicense),
  BoardCertification: validateFileArray(RULES.BoardCertification),
  CertificateOfInsurance: validateFileArray(RULES.CertificateOfInsurance),

  DEAcertificate: validateFileArray(RULES.DEAcertificate),
  ResumeCV: validateFileArray(RULES.ResumeCV),
  VaccinationProof: validateFileArray(RULES.VaccinationProof),
  SupportingDocuments: validateFileArray(RULES.SupportingDocuments),
});

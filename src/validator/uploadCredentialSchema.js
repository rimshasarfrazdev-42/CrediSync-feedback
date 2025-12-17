import * as Yup from 'yup';

const MAX_FILE_SIZE = 10 * 1024 * 1024; 
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const fileValidation = (isRequired = true) => {
  let schema = Yup.mixed();
  
  if (isRequired) {
    schema = schema.required('This document is required');
  }

  return schema
    .test('fileSize', 'File size too large (Max 10MB)', (value) => {
      if (!value) return !isRequired; 
      return value.size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported Format. Only JPG and PNG are allowed', (value) => {
      if (!value) return !isRequired; 
      return SUPPORTED_FORMATS.includes(value.type);
    });
};

export const uploadCredentialSchema = Yup.object().shape({
  GovernmentID: fileValidation(true),
  DegreeDiploma: fileValidation(true),
  MedicalLicense: fileValidation(true),
  BoardCertification: fileValidation(true),
  CertificateOfInsurance: fileValidation(true),
  DEAcertificate: fileValidation(false),
  ResumeCV: fileValidation(false),
  VaccinationProof: fileValidation(false),
  SupportingDocuments: fileValidation(false),
});
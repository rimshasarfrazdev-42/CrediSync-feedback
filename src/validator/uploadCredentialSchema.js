import * as Yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const fileValidation = (isRequired = true) => {
  let schema = Yup.array()
    .of(
      Yup.mixed()
        .test('fileSize', 'One or more files are too large (Max 5MB)', (file) => {
          if (!file) return true;
          return file.size <= MAX_FILE_SIZE;
        })
        .test('fileFormat', 'Unsupported Format. Only JPG and PNG allowed', (file) => {
          if (!file) return true;
          return SUPPORTED_FORMATS.includes(file.type);
        })
    );
    
  if (isRequired) {
    schema = schema
      .min(1, 'This document is required')
      .required('This document is required');
  } else {
    schema = schema.nullable();
  }

  return schema;
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
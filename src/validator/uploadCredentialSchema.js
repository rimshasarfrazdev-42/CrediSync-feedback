import * as Yup from 'yup';


const MAX_SIZE_MB = 10;

export const uploadCredentialSchema = Yup.object().shape({
  GovernmentID: Yup.mixed().required('Government ID is required'),
  DegreeDiploma: Yup.mixed().required('Degree/Diploma is required'),
  MedicalLicense: Yup.mixed().required('Medical certification is required'),
  BoardCertification: Yup.mixed().required('Board certification is required'),
  CertificateOfInsurance: Yup.mixed().required('Insurance certificate is required'),
  DEAcertificate: Yup.mixed().notRequired(),
  ResumeCV: Yup.mixed().notRequired(),
  VaccinationProof: Yup.mixed().notRequired(),
  SupportingDocuments: Yup.mixed().notRequired(),
});
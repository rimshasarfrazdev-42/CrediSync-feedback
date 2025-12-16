import * as Yup from 'yup';

export const licenseSchema = Yup.object().shape({
  licenseNumber: Yup.string().required('License number is required'),
  issuingState: Yup.string().required('Issuing state is required'),
  issueDate: Yup.string().required('Issue date is required'),
  expiryDate: Yup.string().required('Expiry date is required'),
  boardName: Yup.string(),
  specialty: Yup.string(),
  uploadLicense: Yup.mixed(),
  uploadCertificate: Yup.mixed(),
});

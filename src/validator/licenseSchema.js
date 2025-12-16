import * as Yup from 'yup';

export const licenseSchema = Yup.object().shape({
  licenseNumber: Yup.string().required('License number is required'),
  issuingState: Yup.string().trim()
    .matches(/^[A-Za-z]{2}$/, 'Issuing State must be 2-letter code (e.g. CA)')
    .required('Issuing State is required'),
  issueDate: Yup.string()
        .required('Issue date is required')
        .matches(
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 
            'Date must be in MM/DD/YYYY format'
        ),
  expiryDate: Yup.string()
        .required('Expiry date is required')
        .matches(
            /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 
            'Date must be in MM/DD/YYYY format'
        ),
  boardName: Yup.string(),
  specialty: Yup.string(),
  uploadLicense: Yup.mixed(),
  uploadCertificate: Yup.mixed(),
});

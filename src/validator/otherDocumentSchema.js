import * as Yup from 'yup';

export const documentSchema = Yup.object({
  Documents: Yup.array().of(
    Yup.object().shape({
      documentType: Yup.string().required('Document type is required'),
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
      uploadFile: Yup.mixed().required('Upload file is required'),
    }),
  ),
});
import * as Yup from 'yup';

export const documentSchema = Yup.object({
  Documents: Yup.array().of(
    Yup.object().shape({
      documentType: Yup.string().required('Document type is required'),
      issueDate: Yup.string().required('Issue date is required'),
      expiryDate: Yup.string().required('Expiry date is required'),
      uploadFile: Yup.mixed().required('Upload file is required'),
    }),
  ),
});
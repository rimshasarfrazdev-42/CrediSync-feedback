import * as Yup from 'yup';

export const insuranceSchema = Yup.object({
  Insurance: Yup.array().of(
    Yup.object().shape({
      insurerName: Yup.string().required('Insurer name is required'),
      policyNumber: Yup.string().required('Policy number is required'),
      coverageLimits: Yup.string().required('Coverage limit is required'),
      startDate: Yup.string().required('Start date is required'),
      endDate: Yup.string().required('End date is required'),
      uploadCertificate: Yup.mixed().required('Upload certificate is required'),
    }),
  ),
});
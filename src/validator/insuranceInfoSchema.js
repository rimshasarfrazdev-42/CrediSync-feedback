import * as Yup from 'yup';

export const insuranceSchema = Yup.object({
  Insurance: Yup.array().of(
    Yup.object().shape({
      insurerName: Yup.string().required('Insurer name is required'),
      policyNumber: Yup.string().required('Policy number is required'),
      coverageLimits: Yup.string().required('Coverage limit is required'),
      startDate: Yup.string()
        .required('Start Date is required.')
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 'Date must be in MM/DD/YYYY format.'),
      endDate: Yup.string()
        .required('End Date is required.')
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 'Date must be in MM/DD/YYYY format.'),
      uploadCertificate: Yup.mixed().required('Upload certificate is required'),
    }),
  ),
});
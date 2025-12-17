import * as Yup from 'yup';

export const affiliationSchema = Yup.object({
  Affiliation: Yup.array().of(
    Yup.object().shape({
      hospital: Yup.string().required("Hospital name is required"),
      startDate: Yup.string()
        .required('Start Date is required.')
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 'Date must be in MM/DD/YYYY format.'),
      endDate: Yup.string()
        .required('End Date is required.')
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 'Date must be in MM/DD/YYYY format.'),
    })
  ),
});
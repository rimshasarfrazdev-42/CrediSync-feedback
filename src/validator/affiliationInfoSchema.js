import * as Yup from 'yup';

export const affiliationSchema = Yup.object({
  Affiliation: Yup.array().of(
    Yup.object().shape({
      hospital: Yup.string().required("Hospital name is required"),
      startDate: Yup.string().required("Start Date required"),
      endDate: Yup.string().required("End Date required"),
    })
  ),
});
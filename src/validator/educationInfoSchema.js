import * as Yup from 'yup';

export const educationSchema = Yup.object({
  Education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string().required("Institution is required"),
      degree: Yup.string().required("Degree is required"),
      specialty: Yup.string().required("Specialty is required"),
      startDate: Yup.string()
        .required('Start Date is required.')
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 'Date must be in MM/DD/YYYY format.'),
      endDate: Yup.string()
        .required('End Date is required.')
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, 'Date must be in MM/DD/YYYY format.'),
      uploadDiploma: Yup.mixed().required("Upload Diploma required"),
    })
  ),
});
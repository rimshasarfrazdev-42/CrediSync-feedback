import * as Yup from 'yup';

export const educationSchema = Yup.object({
  Education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string().required("Institution is required"),
      degree: Yup.string().required("Degree is required"),
      specialty: Yup.string().required("Specialty is required"),
      startDate: Yup.string().required("Start Date required"),
      endDate: Yup.string().required("End Date required"),
      uploadDiploma: Yup.mixed().required("Upload Diploma required"),
    })
  ),
});
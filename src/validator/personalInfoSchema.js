import * as Yup from 'yup';

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  middleInitial: Yup.string(),
  lastName: Yup.string().required('Last Name is required'),
  otherName: Yup.string(),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string().required('Contact is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().required('Zip is required'),
  country: Yup.string().required('Country is required'),
});

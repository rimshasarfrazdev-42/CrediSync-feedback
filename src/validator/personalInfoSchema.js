import * as Yup from 'yup';

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().
    trim().
    min(2, 'First Name must be at least 2 characters').
    max(50, 'First Name is too long').
    required('First Name is required'),
  middleInitial: Yup.string(),
  lastName: Yup.string().
    min(2, 'Last Name must be at least 2 characters').
    max(50, 'Last Name is too long').
    required('Last Name is required'),
  otherName: Yup.string(),
  dateOfBirth: Yup.string().
    required('Date of Birth is required').
    matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
      'Date must be in MM/DD/YYYY format'
    ),
  email: Yup.string()
    .trim()
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),
  contact: Yup.string()
    .trim()
    .required('Contact is required')
    .matches(
      /^(\+\d{1,3}\s?)?(\(\d{3}\)\s\d{3}-\d{4}|\d{7,15})$/,
      'Invalid phone number format'
    ),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Prefer not to say'], 'Invalid gender selection')
    .required('Gender is required'),
  address: Yup.string()
    .trim()
    .min(5, 'Address is too short')
    .max(200, 'Address is too long')
    .required('Address is required'),
  city: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s'-]+$/, 'City can only contain letters')
    .required('City is required'),
  state: Yup.string()
    .trim()
    .matches(/^[A-Za-z]{2}$/, 'State must be 2-letter code (e.g. CA)')
    .required('State is required'),
  zip: Yup.string()
    .trim()
    .required('Zip is required'),
  country: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s'-]+$/, 'Country can only contain letters')
    .required('Country is required'),
});

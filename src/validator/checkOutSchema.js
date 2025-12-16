import * as Yup from 'yup';

export const checkOutSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  billingAddress: Yup.string().required('Billing Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().matches(/^[0-9]{5}$/, "Zip must be 5 digits").required('Zip is required'),
  cardNumber: Yup.string().matches(/^[0-9]{16}$/, "Card Number must be 16 digits").required('Card Number is required'),
  cvc: Yup.string().matches(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits").required('CVC is required'),
});

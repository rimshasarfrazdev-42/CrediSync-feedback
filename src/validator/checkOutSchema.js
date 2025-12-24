import * as Yup from 'yup';

export const checkOutSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please enter a valid email address'),
 expiryDate: Yup.string()
  .required("Expiration Date is required")
  .test("valid-date", "Invalid expiration date", (value) => {
    if (!value) return true; // let required() handle empty
    const d = new Date(value);
    return !Number.isNaN(d.getTime());
  })
  .test("not-expired", "Card has expired", (value) => {
    if (!value) return true; // let required() handle empty

    const expiry = new Date(value);
    expiry.setMonth(expiry.getMonth() + 1, 0); // end of expiry month

    return expiry >= new Date();
  }),

  billingAddress: Yup.string().required('Billing Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),

  zip: Yup.string()
    .matches(/^[0-9]{5}$/, 'Zip must be 5 digits')
    .required('Zip is required'),

  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, 'Card Number must be 16 digits')
    .required('Card Number is required'),

  cvc: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits')
    .required('CVC is required'),
});

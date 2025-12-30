import * as Yup from 'yup';

export const documentSchema = Yup.object({
  Documents: Yup.array().of(
    Yup.object().shape({
      documentType: Yup.string().notRequired(),
      issueDate: Yup.string()
        .notRequired()
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, { message: 'Date must be in MM/DD/YYYY format', excludeEmptyString: true }),
      expiryDate: Yup.string()
        .notRequired()
        .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/, { message: 'Date must be in MM/DD/YYYY format', excludeEmptyString: true }),
      uploadFile: Yup.mixed().notRequired(),
    }),
  ),
});

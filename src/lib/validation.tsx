import * as Yup from 'yup';

const formDataValidationSchema = Yup.object({
    firstName: Yup.string()
        .required("First Name cannot be empty"),
    lastName: Yup.string()
        .required("Last Name cannot be empty"),
    emailAddress: Yup.string()
        .email('Email Address must be a valid email')
        .required("Email address cannot be empty"),
    option: Yup.string()
        .required("Option cannot be empty"),
});

export { 
    formDataValidationSchema,
}
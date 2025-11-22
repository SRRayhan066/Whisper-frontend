import { SignUpFormFields } from "@/lib/form-fields/SignUpFormFields";
import { Regex } from "@/lib/constants/Regex";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/lib/constants/ApplicationConstant";

const validateName = {
  required: "Name is required",
  minLength: {
    value: NAME_MIN_LENGTH,
    message: `Name must be at least ${NAME_MIN_LENGTH} characters`,
  },
  maxLength: {
    value: NAME_MAX_LENGTH,
    message: `Name must not exceed ${NAME_MAX_LENGTH} characters`,
  },
  pattern: {
    value: Regex.NAME,
    message: "Name can only contain letters and spaces",
  },
};

const validateEmail = {
  required: "Email is required",
  pattern: {
    value: Regex.EMAIL,
    message: "Please enter a valid email address",
  },
};

const validatePassword = {
  required: "Password is required",
  minLength: {
    value: PASSWORD_MIN_LENGTH,
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  },
  maxLength: {
    value: PASSWORD_MAX_LENGTH,
    message: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`,
  },
  pattern: {
    value: Regex.PASSWORD,
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

const validationRules = {
  [SignUpFormFields.NAME]: validateName,
  [SignUpFormFields.EMAIL]: validateEmail,
  [SignUpFormFields.PASSWORD]: validatePassword,
};

export const getValidationRules = (field) => {
  return validationRules[field] || {};
};

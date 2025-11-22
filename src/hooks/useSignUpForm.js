import { SignUpFormFields } from "@/lib/form-fields/SignUpFormFields";
import { getValidationRules } from "@/lib/validators/SignUpFormValidators";
import {
  resolveResponse,
  isErrorResponse,
} from "@/lib/wrapper/ResolveResponse";
import { signUpApi } from "@/lib/constants/ApiRoutes";
import { Message } from "@/lib/constants/Message";
import { useForm } from "react-hook-form";

export default function useSignUpForm({ onToggle }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [SignUpFormFields.NAME]: "",
      [SignUpFormFields.EMAIL]: "",
      [SignUpFormFields.PASSWORD]: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await resolveResponse(signUpApi(data));

    if (isErrorResponse(response)) {
      alert(`${Message.SIGN_UP_FAILED}: ${response.error}`);
      console.error("Sign up error:", response.error);
      return;
    }

    alert(Message.SIGN_UP_SUCCESS);
    console.log("Sign up success:", response.data);
    onToggle();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isValid,
    getValidationRules,
  };
}

"use client";

import InputField from "@/components/ui/input/InputField";
import Button from "@/components/ui/button/Button";
import useSignUpForm from "@/hooks/useSignUpForm";
import { SignUpFormFields } from "@/lib/form-fields/SignUpFormFields";

export default function SignUpForm({ onToggle = () => {} }) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    getValidationRules,
  } = useSignUpForm({ onToggle });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col items-center gap-3 p-6 bg-neutral-900 rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold text-slate-200 mb-2">Sign Up</h1>
      <p className="text-slate-400 mb-6 text-center">
        Create an account to get started.
      </p>

      <InputField
        placeholder="Name"
        type="text"
        error={errors[SignUpFormFields.NAME]}
        {...register(
          SignUpFormFields.NAME,
          getValidationRules(SignUpFormFields.NAME)
        )}
      />

      <InputField
        placeholder="Email"
        type="email"
        error={errors[SignUpFormFields.EMAIL]}
        {...register(
          SignUpFormFields.EMAIL,
          getValidationRules(SignUpFormFields.EMAIL)
        )}
      />

      <InputField
        placeholder="Password"
        type="password"
        error={errors[SignUpFormFields.PASSWORD]}
        {...register(
          SignUpFormFields.PASSWORD,
          getValidationRules(SignUpFormFields.PASSWORD)
        )}
      />

      <Button
        className={"w-32"}
        type="submit"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Sign Up
      </Button>

      <p>
        Already have an account?{" "}
        <span className="font-bold cursor-pointer" onClick={onToggle}>
          Log In
        </span>
      </p>
    </form>
  );
}

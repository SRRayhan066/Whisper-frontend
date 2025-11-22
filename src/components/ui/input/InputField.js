import React from "react";
import Input from "@/components/ui/input/Input";

const InputField = React.forwardRef(({ error, className, ...props }, ref) => {
  return (
    <div className="w-full">
      <Input ref={ref} className={className} {...props} />
      {error && (
        <p className="text-red-400 text-sm mt-1 ml-1">{error.message}</p>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;

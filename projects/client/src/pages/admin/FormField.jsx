import { ErrorMessage, Field } from "formik";
import React from "react";

function FormField({ label, name, type, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-3 font-medium">{label}</label>
      <Field
        className="border border-black rounded-md py-2 px-4 placeholder:text-gray-500 text-black"
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
}

export default FormField;

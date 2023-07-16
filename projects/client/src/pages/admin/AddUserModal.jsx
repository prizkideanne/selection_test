import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";

const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  role_id: Yup.string().required("Role is Required"),
  salary: Yup.number().required("Salary is Required"),
  full_name: Yup.string().required("Name is Required"),
  birth_date: Yup.date().required("Birth Date is Required"),
  join_date: Yup.date().required("Join Date is Required"),
});

export default function AddUserModal({ isOpen, closeModal, handleAddUser }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 pb-6 text-left align-middle shadow-xl transition-all">
                <Formik
                  initialValues={{
                    email: "",
                    role_id: "",
                    salary: "",
                    full_name: "",
                    birth_date: "",
                    join_date: "",
                  }}
                  validationSchema={UserSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    handleAddUser(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4 flex flex-col w-full mt-5">
                      <FormField
                        label={"Name"}
                        name="full_name"
                        type={"text"}
                        placeholder={"John Doe"}
                      />
                      <FormField
                        label={"Email Address"}
                        name="email"
                        type={"email"}
                        placeholder={"Email"}
                      />
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-3">Role</label>
                        <Field
                          className="select-role border border-black rounded-md py-2 px-4 "
                          as="select"
                          name="role_id"
                        >
                          <option value="">Select Role</option>
                          <option value={1}>Admin</option>
                          <option value={2}>Employee</option>
                        </Field>
                        <ErrorMessage
                          name="role_id"
                          component="div"
                          className="text-red-500"
                        />
                      </div>

                      <FormField
                        label={"Salary"}
                        name="salary"
                        type={"number"}
                        placeholder={"3500000"}
                      />

                      <div className="flex flex-row justify-between">
                        <FormField
                          label={"Birth Date"}
                          name="birth_date"
                          type={"date"}
                          placeholder={"01/01/1998"}
                        />

                        <FormField
                          label={"Join Date"}
                          name="join_date"
                          type={"date"}
                          placeholder={"01/01/1998"}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        Add User
                      </button>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

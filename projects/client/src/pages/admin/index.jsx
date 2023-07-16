import React, { useEffect, useState } from "react";
import TablesWithTitle from "./TablesWithTitle";
import axios from "axios";
import AddUserModal from "./AddUserModal";
import { toast } from "react-toastify";

function AdminLandingPage() {
  const [employees, setEmployees] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getUsers().then((data) => setEmployees(data));
  }, []);

  const getUsers = async () => {
    const users = await axios
      .get("http://localhost:8000/admin/getAllUser")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.log("err", err));

    return users;
  };

  const registerUser = async (values) => {
    const token = localStorage.getItem("accessToken");
    console.log(values);
    await axios
      .post("http://localhost:8000/auth/register-employee", values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        const users = await getUsers();
        setEmployees(users);
        closeModal();
        toast("User Registered Successfully", {
          delay: 200,
          type: "success",
        });
      })
      .catch((err) => {
        closeModal();
        toast(err.response.data.message, {
          delay: 400,
          type: "error",
        });
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <AddUserModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleAddUser={registerUser}
      />
      <TablesWithTitle
        title={"Employee Directory"}
        subtitle={"Comprehensive list of all employees in the organization"}
        content={employees}
        addUserHandler={openModal}
      />
    </>
  );
}

export default AdminLandingPage;

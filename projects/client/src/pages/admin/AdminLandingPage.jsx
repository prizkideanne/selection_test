import React from "react";
import TablesWithTitle from "../../components/TablesWithTitle";

function AdminLandingPage() {
  const addUser = () => {
    console.log("add user");
  };
  return (
    <TablesWithTitle
      title={"Employee Directory"}
      subtitle={"Comprehensive list of all employees in the organization"}
      content={[]}
      addUserHandler={addUser}
    />
  );
}

export default AdminLandingPage;

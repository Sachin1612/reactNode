import React, { useEffect, useState } from "react";

export const AddUser = ({addUser, editDetail}) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editDetail != null) {
      setName(editDetail.name)
      setDob(editDetail.dob)
      setContact(editDetail.contact)
      setIsEditMode(true);
    }
    return () => {
      
    }
  }, [editDetail])
  

  const onSumbit = (e) => {
    e.preventDefault()

    if (isEditMode) {
      edit(editDetail.id);
    } else {
      add();
    }
  };

  const add = () => {
    fetch("http://localhost:1111/user/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, dob, contact }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        addUser(res);
      });
  }

  const edit = (id) => {
    fetch("http://localhost:1111/user/edit/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, dob, contact }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <>
      <div>AddUser</div>

      <form onSubmit={onSumbit}>
        <div>
          <label>Name :</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>DOB :</label>
          <input
            type={"date"}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <label>Contact :</label>
          <input
            type={"number"}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <button>Submit</button>
      </form>
    </>
  );
};

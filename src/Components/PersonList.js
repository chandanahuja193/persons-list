import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const ProductList = ({ persons, getCurrentPerson }) => {
  const [personsList, setpersons] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setpersons(persons);
  }, [persons]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (name) {
      const updatedpersons = personsList.filter(
        (el) => (el.first_name.toLowerCase().indexOf(name.toLowerCase()) > -1) ||
                 (el.last_name.toLowerCase().indexOf(name.toLowerCase()) > -1)
      );
       setpersons(updatedpersons);
    } else {
      setpersons(persons);
    }
  }, [name,persons]);

  return (
    <div className="product-list">
      <table className="table" id="table">
        <thead className="thead-light">
          <tr>
            <th style={{ width: "40%" }}>
              Full Name
              <span>
                <input
                  className="form-control d-inline-block"
                  id="myInput"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Search.."
                  style={{ width: "inherit", marginLeft: "10px" }}
                ></input>
              </span>
            </th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personsList && personsList.map((person) => (
            <tr key={person.id} id={person.id}>
              <td>{`${person.first_name} ${person.last_name}`}</td>
              <td>{person.email}</td>
              <td>{person.mobile}</td>
              <td>
                <>
                  <IconButton
                    aria-label="delete"
                    onClick={() => getCurrentPerson(person,'edit')}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => getCurrentPerson(person,'delete')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

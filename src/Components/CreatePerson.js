import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import CustomAlert from "./CustomAlert";

/*fdescribe*/
/*eslint no-restricted-globals: ["error", "fdescribe"]*/
const CreateProduct = ({
  isOpen,
  setOpen,
  loading,
  state,
  setState,
  handleAddPerson,
  currentPerson,
  handleEditPerson,
  editPersonLoading,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, mobile, password, id } = state;
    if (!firstName) {
      CustomAlert({
        message: "Please enter the first name",
      });
    } else if (!lastName) {
      CustomAlert({
        message: "Please enter the last name",
      });
    } else if (Object.keys(currentPerson).length === 0 && !password) {
      CustomAlert({
        message: "Please enter the password",
      });
    } else if (!email) {
      CustomAlert({
        message: "Please enter the email",
      });
    } else if (!mobile) {
      CustomAlert({
        message: "Please enter the mobile",
      });
    } else {
      let data = {};
      data.first_name = firstName;
      data.last_name = lastName;
      data.email = email;
      data.mobile = mobile;

      if (Object.keys(currentPerson).length > 0) {
        data.id = id;
        handleEditPerson(data);
      } else {
        data.password = password;
        handleAddPerson(data);
      }
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={() => setOpen(false)} size="large">
        <ModalHeader>{`${
          Object.keys(currentPerson).length > 0
            ? "Edit Product "
            : "Create Person "
        }`}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-sm-12">
              <form noValidate onSubmit={handleSubmit}>
                <div>
                  <h5>First Name</h5>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    value={state.firstName}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "25px", width: "100%" }}
                  />
                </div>

                <div>
                  <h5>Last Name</h5>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    value={state.lastName}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "25px", width: "100%" }}
                  />
                </div>

                <div>
                  <h5>Email</h5>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "25px", width: "100%" }}
                  />
                </div>

                <div>
                  <h5>Mobile</h5>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="number"
                    name="mobile"
                    value={state.mobile}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "25px", width: "100%" }}
                  />
                </div>

                {Object.keys(currentPerson).length === 0 && (
                  <div>
                    <h5>Password</h5>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                      required
                      style={{ marginBottom: "25px", width: "100%" }}
                    />
                  </div>
                )}

                {Object.keys(currentPerson).length > 0 ? (
                  <div className="text-center">
                    {editPersonLoading ? (
                      <Button color="primary">
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "20px", color: "white" }}
                        ></i>
                        ...Loading
                      </Button>
                    ) : (
                      <Button color="primary">Edit Person</Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    {loading ? (
                      <Button color="primary">
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "20px", color: "white" }}
                        ></i>
                        ...Loading
                      </Button>
                    ) : (
                      <Button color="primary">Create Person</Button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CreateProduct;

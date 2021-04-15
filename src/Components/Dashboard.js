import React, { useState, useEffect } from "react";
import Header from "./Header";
import PersonList from "./PersonList";
import { connect } from "react-redux";
import {
  getPersonsBegin,
  getPersonsSuccess,
  getPersonsFailure,
  addPersonBegin,
  addPersonSuccess,
  addPersonFailure,
  editPersonBegin,
  editPersonSuccess,
  editPersonFailure,
  deletePersonBegin,
  deletePersonSuccess,
  deletePersonFailure,
} from "../actions/personAction";
import CreatePerson from "./CreatePerson";
import WithSpinner from "./WithSpinner";
import DeleteModal from "./DeleteModal";

const Dashboard = ({
  persons,
  getPersonsBegin,
  getPersonsSuccess,
  getPersonsFailure,
  addPersonBegin,
  addPersonSuccess,
  addPersonFailure,
  editPersonBegin,
  editPersonSuccess,
  editPersonFailure,
  deletePersonBegin,
  deletePersonSuccess,
  deletePersonFailure,
  history,
  loading,
  editPersonLoading,
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => setOpen(true);
  const [currentPerson, setCurrentPerson] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const resetForm = () => {
    setState({
      ...state,
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    });
    setCurrentPerson({})
  };

  const fetchPersons = () => {
    getPersonsBegin();
    fetch("http://api.vuetestapi.cobold.xyz/api/persons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => getPersonsSuccess(res))
      .catch((error) => getPersonsFailure(error));
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  useEffect(() => {
    if (currentPerson && Object.keys(currentPerson).length > 0) {
      setState({
        ...state,
        firstName: currentPerson.first_name,
        lastName: currentPerson.last_name,
        email: currentPerson.email,
        mobile: currentPerson.mobile,
        id: currentPerson.id,
      });
    }
  }, [currentPerson]);

  const getCurrentPerson = (person, actionType) => {
    if (actionType === "edit") {
      setCurrentPerson(person);
      setOpen(true);
    } else {
      setCurrentPerson(person);
      setOpenDeleteModal(true);
    }
  };

  const handleAddPerson = (state) => {
    addPersonBegin();

    fetch("http://api.vuetestapi.cobold.xyz/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((res) => {
        addPersonSuccess(res);
        setOpen(false);
        resetForm();
        fetchPersons();
      });
  };

  const handleEditPerson = (state) => {
    editPersonBegin();

    fetch(`http://api.vuetestapi.cobold.xyz/api/persons/${state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((res) => {
        editPersonSuccess(res);
        setOpen(false);
        resetForm();
        fetchPersons();
      })
      .catch((error) => {
        editPersonFailure(error);
        setOpen(false);
        resetForm();
        fetchPersons();
      });
  };

  const handleDelete = () => {
    setOpenDeleteModal(false);
    deletePersonBegin();

    fetch(`http://api.vuetestapi.cobold.xyz/api/persons/${currentPerson.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(currentPerson),
    })
      .then((res) => res.json())
      .then((res) => {
        deletePersonSuccess(res);
        setOpen(false);
        resetForm();
        fetchPersons();
      });
  };

  return (
    <>
      <Header history={history} />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ marginTop: "30px" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title">Persons List </h4>
                    <button
                      type="button"
                      className="btn btn-info sign-out-button"
                      onClick={handleModal}
                    >
                      Create Person
                    </button>
                  </div>
                  <WithSpinner loading={loading}>
                    <PersonList
                      persons={persons}
                      getCurrentPerson={getCurrentPerson}
                    />
                  </WithSpinner>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <CreatePerson
            isOpen={isOpen}
            setOpen={setOpen}
            loading={loading}
            state={state}
            setState={setState}
            handleAddPerson={handleAddPerson}
            currentPerson={currentPerson}
            handleEditPerson={handleEditPerson}
            editPersonLoading={editPersonLoading}
          />
        )}

        {openDeleteModal && (
          <DeleteModal
            isOpen={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            handleDelete={handleDelete}
          />
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    persons: state.persons.persons,
    history: props.history,
    loading: state.persons.loading,
    editPersonLoading: state.persons.editPersonLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonsBegin: (_) => dispatch(getPersonsBegin()),
    getPersonsSuccess: (data) => dispatch(getPersonsSuccess(data)),
    getPersonsFailure: (data) => dispatch(getPersonsFailure(data)),
    addPersonBegin: (_) => dispatch(addPersonBegin()),
    addPersonSuccess: (data) => dispatch(addPersonSuccess(data)),
    addPersonFailure: (data) => dispatch(addPersonFailure(data)),
    editPersonBegin: (_) => dispatch(editPersonBegin()),
    editPersonSuccess: (data) => dispatch(editPersonSuccess(data)),
    editPersonFailure: (data) => dispatch(editPersonFailure(data)),
    deletePersonBegin: (_) => dispatch(deletePersonBegin()),
    deletePersonSuccess: (data) => dispatch(deletePersonSuccess(data)),
    deletePersonFailure: (data) => dispatch(deletePersonFailure(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

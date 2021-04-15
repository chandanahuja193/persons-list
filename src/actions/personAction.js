import {
  GET_PERSONS_BEGIN,
  GET_PERSONS_SUCCES,
  GET_PERSONS_FAILURE,
  ADD_PERSON_BEGIN,
  ADD_PERSON_SUCCES,
  ADD_PERSON_FAILURE,
  EDIT_PERSON_BEGIN,
  EDIT_PERSON_SUCCES,
  EDIT_PERSON_FAILURE,
  DELETE_PERSON_BEGIN,
  DELETE_PERSON_SUCCES,
  DELETE_PERSON_FAILURE
} from "./types";


export const getPersonsBegin = () => ({
  type: GET_PERSONS_BEGIN,
});

export const getPersonsSuccess = (data) => {
  return{
    type: GET_PERSONS_SUCCES,
    payload: data,
  }
}  ;

export const getPersonsFailure = (error) => ({
  type: GET_PERSONS_FAILURE,
  payload: error ,
});

export const addPersonBegin = (data) => {
  return {
    type: ADD_PERSON_BEGIN,
    payload: data,
  };
};

export const addPersonSuccess = (data) => {
  return {
    type: ADD_PERSON_SUCCES,
    payload: data,
  };
};

export const addPersonFailure = (data) => {
  return {
    type: ADD_PERSON_FAILURE,
    payload: data,
  };
};

export const editPersonBegin = (data) => {
  return {
    type: EDIT_PERSON_BEGIN,
    payload: data,
  };
};

export const editPersonSuccess = (data) => {
  return {
    type: EDIT_PERSON_SUCCES,
    payload: data,
  };
};

export const editPersonFailure = (data) => {
  return {
    type: EDIT_PERSON_FAILURE,
    payload: data,
  };
};

export const deletePersonBegin = () => {
  return {
    type: DELETE_PERSON_BEGIN
  };
};

export const deletePersonSuccess = (data) => {
  return {
    type: DELETE_PERSON_SUCCES,
    payload: data,
  };
};

export const deletePersonFailure = (data) => {
  return {
    type: DELETE_PERSON_FAILURE,
    payload: data,
  };
};

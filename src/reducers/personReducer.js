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
  DELETE_PERSON_FAILURE,
} from "../actions/types";

const initialState = {
  persons: [],
  currentPerson: {},
  loading: false,
  editPersonLoading : false,
  errors: {},
};

export default function personReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PERSONS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_PERSONS_SUCCES:
      return {
        ...state,
        loading: false,
        persons: action.payload,
      };

    case GET_PERSONS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case ADD_PERSON_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_PERSON_SUCCES:
      return {
        ...state,
        loading: false,
        persons: [...state.persons, action.payload],
      };

    case ADD_PERSON_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case EDIT_PERSON_BEGIN:
      return {
        ...state,
        editPersonLoading: true,
      };

    case EDIT_PERSON_SUCCES:
      return {
        ...state,
        editPersonLoading: false,
        persons: [...state.persons, action.payload],
      };

    case EDIT_PERSON_FAILURE:
      return {
        ...state,
        editPersonLoading: false,
        errors: action.payload,
      };

    case DELETE_PERSON_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PERSON_SUCCES:
      return {
        ...state,
        loading: false,
       // persons: action.payload,
      };

    case DELETE_PERSON_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}

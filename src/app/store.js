import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  contactInfo: [],
};

const rootReducer = (state = initialState, action) => {
  // Handle different actions here
  switch (action.type) {
    case 'SET_CONTACT_INFO':
      return { ...state, contactInfo: [...action.payload] };
    default:
      return state;
  }
};


const store = configureStore({
    reducer: rootReducer,
  });

export default store;

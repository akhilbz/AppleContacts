import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    contactInfo: [],
    selectedContact: 0,
  };
  
  const rootReducer = (state = initialState, action) => {
    // Handle different actions here
    switch (action.type) {
        case 'SET_CONTACT_INFO':
            return { ...state, contactInfo: [...action.payload] };
        case 'SET_SELECTED_CONTACT':
            return { ...state, selectedContact: action.payload };
      default:
        return state;
    }
  };

const store = configureStore({
 reducer: rootReducer
 });
export default store;

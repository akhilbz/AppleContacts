import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    contactInfo: [],
    lists: [],
    selectedContact: 0,
    selectedList: 1,
    showModal: false,
    showDropUpModal: false,
    showDropUp: false,
    uploadAlert: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    // Handle different actions here
    switch (action.type) {
        case 'SET_CONTACT_INFO':
            return { ...state, contactInfo: [...action.payload] };
        case 'SET_SELECTED_CONTACT':
            return { ...state, selectedContact: action.payload };
        case 'SET_SELECTED_LIST':
            return { ...state, selectedList: action.payload };
        case 'SET_SHOW_MODAL':
            return { ...state, showModal: action.payload };
        case 'SET_SHOW_DROPUP_MODAL':
            return { ...state, showDropUpModal: action.payload };
        case 'SET_SHOW_DROP_UP':
            return { ...state, showDropUp: action.payload };
        case 'SET_UPLOAD_ALERT':
            return { ...state, uploadAlert: action.payload };
      default:
        return state;
    }
  };

const store = configureStore({
 reducer: rootReducer
 });
export default store;

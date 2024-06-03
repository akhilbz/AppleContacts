import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    contactInfo: [],
    lists: [],
    contactsLength: 0,
    selectedContact: 0,
    selectedList: 0,
    deletedList: null,
    showModal: false,
    showListManagementModal: 0, // 0: Default, 1: New List, 2: Empty List, 3: Delete List
    showDropUp: false,
    uploadAlert: 0,
    uploadNotification: 0,
  };
  
  const rootReducer = (state = initialState, action) => {
    // Handle different actions here
    switch (action.type) {
        case 'SET_CONTACT_INFO':
            return { ...state, contactInfo: [...action.payload] };
        case 'SET_LISTS':
            return { ...state, lists: [...action.payload] };
        case 'SET_CONTACTS_LENGTH':
            return { ...state, contactsLength: action.payload };
        case 'SET_SELECTED_CONTACT':
            return { ...state, selectedContact: action.payload };
        case 'SET_SELECTED_LIST':
            return { ...state, selectedList: action.payload };
        case 'SET_DELETED_LIST':
            return { ...state, deletedList: action.payload };
        case 'SET_SHOW_MODAL':
            return { ...state, showModal: action.payload };
        case 'SET_SHOW_LIST_MANAGEMENT_MODAL':
            return { ...state, showListManagementModal: action.payload };
        case 'SET_SHOW_DROP_UP':
            return { ...state, showDropUp: action.payload };
        case 'SET_UPLOAD_ALERT':
            return { ...state, uploadAlert: action.payload };
        case 'SET_UPLOAD_NOTIFICATION':
            return { ...state, uploadNotification: action.payload };
      default:
        return state;
    }
  };

const store = configureStore({
 reducer: rootReducer
 });
export default store;

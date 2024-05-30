// action types
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_LISTS = 'SET_LISTS';
export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL';
export const SET_SHOW_LIST_MANAGEMENT_MODAL = 'SET_SHOW_LIST_MANAGEMENT_MODAL';
export const SET_SHOW_DROP_UP = 'SET_SHOW_DROP_UP';
export const SET_SELECTED_LIST = 'SET_SELECTED_LIST';
export const SET_UPLOAD_ALERT = 'SET_UPLOAD_ALERT';

// action creators
export const setContactInfo = (contactInfo) => ({
    type: SET_CONTACT_INFO,
    payload: contactInfo
});

export const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
});

export const setSelectedContact = (selectedContact) => ({
    type: SET_SELECTED_CONTACT,
    payload: selectedContact
});

export const setSelectedList = (selectedList) => ({
    type: SET_SELECTED_LIST,
    payload: selectedList
});

export const setShowModal = (showModal) => ({
    type: SET_SHOW_MODAL,
    payload: showModal
});

export const setShowListManagementModal = (showListManagementModal) => ({
    type: SET_SHOW_LIST_MANAGEMENT_MODAL,
    payload: showListManagementModal
});

export const setShowDropUp = (showDropUp) => ({
    type: SET_SHOW_DROP_UP,
    payload: showDropUp
});

export const setUploadAlert = (uploadAlert) => ({
    type: SET_UPLOAD_ALERT,
    payload: uploadAlert
});
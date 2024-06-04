// action types
export const SET_NEW_CONTACT_INSTANCE = 'SET_NEW_CONTACT_INSTANCE';
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_LISTS = 'SET_LISTS';
export const SET_CONTACTS_LENGTH = 'SET_CONTACTS_LENGTH';
export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL';
export const SET_SHOW_LIST_MANAGEMENT_MODAL = 'SET_SHOW_LIST_MANAGEMENT_MODAL';
export const SET_SHOW_DROP_UP = 'SET_SHOW_DROP_UP';
export const SET_SHOW_EDIT_DROP_DOWN = 'SET_SHOW_EDIT_DROP_DOWN';
export const SET_SELECTED_LIST = 'SET_SELECTED_LIST';
export const SET_DELETED_LIST = 'SET_DELETED_LIST';
export const SET_DELETED_CONTACT = 'SET_DELETED_CONTACT';
export const SET_UPLOAD_ALERT = 'SET_UPLOAD_ALERT';
export const SET_UPLOAD_NOTIFICATION = 'SET_UPLOAD_NOTIFICATION';

// action creators
export const setNewContactInstance = (newContactInstance) => ({
    type: SET_NEW_CONTACT_INSTANCE,
    payload: newContactInstance
});

export const setContactInfo = (contactInfo) => ({
    type: SET_CONTACT_INFO,
    payload: contactInfo
});

export const setLists = (lists) => ({
    type: SET_LISTS,
    payload: lists
});

export const setContactsLength = (contactsLength) => ({
    type: SET_CONTACTS_LENGTH,
    payload: contactsLength
});

export const setSelectedContact = (selectedContact) => ({
    type: SET_SELECTED_CONTACT,
    payload: selectedContact
});

export const setSelectedList = (selectedList) => ({
    type: SET_SELECTED_LIST,
    payload: selectedList
});

export const setDeletedList = (deletedList) => ({
    type: SET_DELETED_LIST,
    payload: deletedList
});

export const setDeletedContact = (deletedContact) => ({
    type: SET_DELETED_CONTACT,
    payload: deletedContact
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

export const setShowEditDropDown = (showEditDropDown) => ({
    type: SET_SHOW_EDIT_DROP_DOWN,
    payload: showEditDropDown
});

export const setUploadAlert = (uploadAlert) => ({
    type: SET_UPLOAD_ALERT,
    payload: uploadAlert
});

export const setUploadNotification = (uploadNotification) => ({
    type: SET_UPLOAD_NOTIFICATION,
    payload: uploadNotification
});
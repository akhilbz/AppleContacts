// action types
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL';
export const SET_SHOW_DROP_UP = 'SET_SHOW_DROP_UP';

// action creators
export const setContactInfo = (contactInfo) => ({
    type: SET_CONTACT_INFO,
    payload: contactInfo
});

export const setSelectedContact = (selectedContact) => ({
    type: SET_SELECTED_CONTACT,
    payload: selectedContact
});

export const setShowModal = (showModal) => ({
    type: SET_SHOW_MODAL,
    payload: showModal
});

export const setShowDropUp = (showDropUp) => ({
    type: SET_SHOW_DROP_UP,
    payload: showDropUp
});
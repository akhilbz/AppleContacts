// action types
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';
export const SET_SHOW_MODAL = 'SET_SHOW_MODAL';
export const SET_SHOW_DROPUP_MODAL = 'SET_SHOW_DROPUP_MODAL';
export const SET_SHOW_DROP_UP = 'SET_SHOW_DROP_UP';
export const SET_SELECTED_LIST = 'SET_SELECTED_LIST';

// action creators
export const setContactInfo = (contactInfo) => ({
    type: SET_CONTACT_INFO,
    payload: contactInfo
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

export const setShowDropupModal = (showDropUpModal) => ({
    type: SET_SHOW_DROPUP_MODAL,
    payload: showDropUpModal
});


export const setShowDropUp = (showDropUp) => ({
    type: SET_SHOW_DROP_UP,
    payload: showDropUp
});
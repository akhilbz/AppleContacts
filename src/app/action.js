// action types
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';

// action creators
export const setContactInfo = (contactInfo) => ({
    type: SET_CONTACT_INFO,
    payload: contactInfo
});

export const setSelectedContact = (selectedContact) => ({
    type: SET_SELECTED_CONTACT,
    payload: selectedContact
});
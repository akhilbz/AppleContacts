    // action types
    export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';

    // action creators
    export const setContactInfo = (contactInfo) => ({
        type: SET_CONTACT_INFO,
        payload: contactInfo
    });
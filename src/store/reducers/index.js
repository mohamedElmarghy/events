import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import {eventReducer} from "./eventsReducer";
import {modalsReducer} from '../../modals/modalsReducer';
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from 'redux-firestore';
import {reducer as toastrReducer} from 'react-redux-toastr';
import asyncReducer from '../../async/asyncReducer';

export default combineReducers({
    firestore : firestoreReducer,
    firebase : firebaseReducer,
    events : eventReducer,
    form : formReducer,
    modals : modalsReducer,
    toastr: toastrReducer,
    async : asyncReducer
})
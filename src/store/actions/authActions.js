import {SubmissionError, reset} from 'redux-form';
export const logIn = cred => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    try {
       await firebase.auth().signInWithEmailAndPassword(cred.email, cred.password);
        dispatch({type : 'CLOSE_MODAL'});
    }
    catch (error) {
        throw new SubmissionError({
          _error : 'log in failed'
        })
    }
}

export const signOut = () => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    try {
       await firebase.auth().signOut();
        
        dispatch({type : 'CLOSE_MODAL'});
    }
    catch (error) {
        console.log(error);
    }
}

export const signIn = cred => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
     let userCredential = await firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password);
     await userCredential.user.updateProfile({
         displayName : cred.displayName
     })
     let newUser = {
         displayName : cred.displayName,
         createdAt : firestore.FieldValue.serverTimestamp()
     }
     await firestore.collection('users').doc(userCredential.user.uid).set({...newUser})
     dispatch({type : 'CLOSE_MODAL'});
    }
    catch (error) {
        throw new SubmissionError({
          _error : error.message    
    })
    }
}
export const socialLogin = selectedProvider => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
       let user = await firebase.login({
            provider : selectedProvider,
            type : 'popup'
        });
        // console.log(user.additionalUserInfo);
        if (user.additionalUserInfo.isNewUser) {
            await firestore.collection('users').doc(user.user.uid).set({
                displayName : user.profile.displayName,
                photoURL : user.profile.avatarUrl,
                createdAt : firestore.FieldValue.serverTimestamp()
            })
        }
        dispatch({type : 'CLOSE_MODAL'});
    }
    catch(error) {
        throw new SubmissionError({
            _error : error.message
        })
    }
}
export const updatePassword = newPassword => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    try {
        let user = firebase.auth().currentUser;
        await user.updatePassword(newPassword.newPassword1);
        dispatch(reset('account'));
    }
    catch (error) {
        console.log(error);
    }
}
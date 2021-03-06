import firebase from '../../firebase/config/fbConfig';
import { reset } from "redux-form";
import {asyncActionStart ,asyncActionFinish } from "../../async/asyncReducer";
import {toastr} from 'react-redux-toastr';
export const updateProfile = user => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const {isEmpty, isLoaaded, ...updatedUser} = user;
    try {
       await firebase.updateProfile(updatedUser);
       toastr.success('Success', 'Your profile has been updated');
    }
    catch(error) {
        console.log(error);
    }
}
export function uploadToFirebaseStorage(file, filename) {
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}
export async function updateUserProfilePhoto(downloadURL, filename) {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const userDocRef = db.collection('users').doc(user.uid);
    try {
      const userDoc = await userDocRef.get();
      if (!userDoc.data().photoURL) {
        await db.collection('users').doc(user.uid).update({
          photoURL: downloadURL,
        });
        await user.updateProfile({
          photoURL: downloadURL,
        });
      }
      return await db.collection('users').doc(user.uid).collection('photos').add({
        name: filename,
        url: downloadURL,
      });
    } catch (error) {
      throw error;
    }
  }
  
export const uploadProfileImage = (file, fileName) => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
        name : fileName
    }
    try {
      dispatch(asyncActionStart())
      let uploadedFile= await firebase.uploadFile(path, file, null, options );
      let downloadUrl = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      let userDoc = await firestore.get(`users/${user.uid}`);
      if (!userDoc.data().photoURL) {
          await firebase.updateProfile({
              photoURL : downloadUrl
          });
          await user.updateProfile({
              photoURL : downloadUrl
          })
      }
        await firestore.add({
          collection : 'users',
          doc : user.uid,
          subcollections : [{collection : 'photos'}] 
      },{
          name : fileName,
          url: downloadUrl
      })
      dispatch(asyncActionFinish())

    } catch(error) {
        console.log(error);
    }
}
export const deletePhoto = (photo) => async (dispatch, getState,{getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection : 'users',
      doc : user.uid,
      subcollections : [{
        collection : 'photos',
        doc : photo.id
      }]
    })
  }catch(error) {
    throw new Error('Something went wrong');
  }
}
export const setMainPhoto = photo => async (dispatch, getState,{getFirebase}) => {
   const firebase = getFirebase();
   const user = firebase.auth().currentUser;
   try {
       await firebase.updateProfile({
         photoURL : photo.url
       });
       await user.updateProfile({
         photoURL : photo.url
       })
   }catch(error) {
     throw new Error('Something went wrong');
   }
}
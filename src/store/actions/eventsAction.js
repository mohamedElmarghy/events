import {toastr} from 'react-redux-toastr';
export const createEvent = event => async (dispatch,getState,{getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const currentUser = firebase.auth().currentUser;
    const newEvent = {...event,
      hostedBy: currentUser.displayName,
      hostedUid : currentUser.uid,
      hostPhotoURL: currentUser.photoURL,
      created : new Date(),
      attendees : {
          [currentUser.uid] : {
              going : true,
              joinDAte : new Date(),
              photoURL : currentUser.photoURL,
              displayName : currentUser.displayName,
              host : true
          }
      }}
    try {
       let createdEvent = await firestore.add('events', newEvent)  
       await firestore.set(`event_attendee/${createdEvent.id}_${currentUser.uid}`,{
           eventId : createdEvent.id,
           userId : currentUser.uid,
           eventDate : event.date,
           host : true
       });
       return createdEvent
    }
    catch(error) {
        console.log(error);
    }
}

export const updateEvent = (event, newData) =>async (dispatch, getState, {getFirebase,getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
        await firestore.update(`events/${event.id}`,{...newData})
    } catch(error) {
        console.log(error);
    }
}
export const cancelOrActiveEvent = (event) => async (dispatch, getState,{getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const message = event.isCancelled ? 'Are you sure you want to reactive the event' : 'Are you sure you want to cancel the evnet'; 
    const cancelled = event.isCancelled ? false : true;
    try {
        toastr.confirm(message,{
            onOk :async () => await firestore.update(`events/${event.id}`,{isCancelled : cancelled})})
        
    }catch(error) {
        console.log(error);
    }
}
export const addAttendee = (event) => async (dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    let newAttendee = {
       displayName : getState().firebase.profile.displayName,
       going : true,
       host : false,
       photoURL : getState().firebase.profile.photoURL || 'assets/user.png',
       joinDAte : firestore.FieldValue.serverTimestamp()
    }           
      try {
          await firestore.update(`events/${event.id}`,{
          [`attendees.${user.uid}`] : newAttendee
          });
          await firestore.set(`event_attendee/${event.id}_${user.uid}`,{
              eventId : event.id,
              userId : user.uid,
              eventDate : event.date,
              host : false
          });
          toastr.success('Success', 'You have joined the event');
      }   catch(error) {
          console.log(error);
          toastr.error('Oops', 'Problem signing up to the event');
      } 
}
export const cancelMyPlace = event => async (dispatch,getState,{getFirebase,getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
        await firestore.update(`events/${event.id}`,{
            [`attendees.${user.uid}`] : firestore.FieldValue.delete()
        });
        await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
        toastr.success('Success', 'You have cancelled your Place');
    }catch(error) {
        console.log(error);
        toastr.error('Oops', 'Something went wrong')
    }

}
import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProfileInfoDesc from './ProfileInfoDesc';
import ProfileInfoEvents from './ProfileInfoEvents';
import  ProfileInfoHeader  from './ProfileInfoHeader';
import ProfileInfoPhotos from './ProfileInfoPhotos';
import ProfileInfoSidebar from './ProfileInfoSidebar';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';

const mapStateToProps = (state, ownProps) => {
    let profile = {};
    let userUid = null;
    if (ownProps.match.params.id === state.firebase.auth.uid) {
        profile = state.firebase.profile;
         
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }
    return {
       auth : state.firebase.auth,
       userUid,
       profile,
       photos : state.firestore.ordered.photos     
    }

}
class ProfileInfo extends Component {
    render() {
      const {profile, auth, photos} = this.props;
      
        return (
            <Grid>
              
                <ProfileInfoHeader profile={profile}/>
                <ProfileInfoDesc profile={profile}/>
                <ProfileInfoSidebar />
                {photos && photos.length > 0 &&
                <ProfileInfoPhotos photos={photos}/>}
                <ProfileInfoEvents />
            </Grid>

        );
    }
}
const query = ({auth, userUid}) => {
    if (userUid !== null) {
        return [
            {
            collection : 'users',
            doc : userUid,
            storeAs : 'profile'
        },
        {
            collection : 'users',
            doc : userUid,
            subcollections : [{collection : 'photos'}],
            storeAs : 'photos'
        }];
    } else {
    return [
        {
            collection : 'users',
            doc : auth.uid,
            subcollections : [{collection : 'photos'}],
            storeAs : 'photos'
        }
    ]
}
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect((auth, userUid) => query(auth, userUid))
    )(ProfileInfo);
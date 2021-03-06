import React, { useState, useEffect, Fragment } from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import {toastr} from 'react-redux-toastr';
import CropperInput from './photos/CropperInput';
import DropzoneInput from './photos/DropzoneInput';
import {uploadProfileImage, deletePhoto, setMainPhoto} from '../../store/actions/userAction';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import UserPhotos from './photos/UserPhotos';
import cuid from 'cuid';
import { getFileExtension } from '../../util/helpers/helpers';
const MyPhotos = ({photos, profile,  uploadProfileImage, deletePhoto, setMainPhoto}) => {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleUploadImage = async () => {
      try {
          await uploadProfileImage(image, files[0].name);
          handleCancelCrop();
          toastr.success('Success', 'The photo has been uploaded');
      }catch(error) {
        console.log(error);
        toastr.error('Oops','Something went wrong')
      }
    }
    const handleDeletingPhoto = async (photo) => {
        try {
          await deletePhoto(photo);
          toastr.success('Success', 'The photo has been removed');
        }catch(error) {
          toastr.error('Oops', error.message);
        }
    }
    const handleSettingMainPhoto = async (photo) => {
      try {
       await setMainPhoto(photo);
      
      }catch(error) {
        toastr.error(error.message)
      }
    }
    const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  }
    
    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    },[files])
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <DropzoneInput setFiles={setFiles}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {files.length > 0 &&
                        <CropperInput setImage={setImage} imagePreview={files[0].preview} />}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />
                        {files.length > 0 &&
                         <Fragment>
                             <div
                                className='img-preview' 
                                style={{minWidth : '200px', minHeight : '200px', overflow : 'hidden'}}/>
                             <Button.Group>
                                 <Button onClick={handleUploadImage} style={{width : '100px'}} 
                                   positive icon='check'/>
                                 <Button onClick={handleCancelCrop} style={{width : '100px'}}
                                   icon='close'/>
                             </Button.Group>
                         </Fragment>
                        
                        }
                    </Grid.Column>

                </Grid>

                <Divider/>
                <UserPhotos photos={photos} profile={profile} 
                   handleDeletingPhoto={handleDeletingPhoto}
                   handleSettingMainPhoto={handleSettingMainPhoto}/>
            </Segment>
        );
}
const query = ({auth}) => {
  return [{
    collection : 'users',
    doc : auth.uid,
    subcollections : [{collection : 'photos'}],
    storeAs : 'photos'
  }]
}
const mapStateToProps = state => {
  return {
    auth : state.firebase.auth,
    photos : state.firestore.ordered.photos,
    profile : state.firebase.profile
  }
}
export default compose(connect(mapStateToProps,{uploadProfileImage, deletePhoto, setMainPhoto}),
          firestoreConnect(auth => query(auth)))(MyPhotos);
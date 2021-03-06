import React, { Fragment } from 'react';
import { Header, Card, Image, Button} from 'semantic-ui-react';

import { connect } from 'react-redux';
const UserPhotos = ({photos, profile, handleDeletingPhoto, handleSettingMainPhoto}) => {
    return (
        <Fragment>
            <Header sub color='teal' content='All Photos'/>

            <Card.Group itemsPerRow={5}>
               <Card>
                  <Image src={profile.photoURL || 'assets/user.png'}/>
                  <Button positive>Main Photo</Button>
                </Card>
                {photos && photos.map(photo => {
                    return (
                          <Card key={photo.id}>
                  
                          <Image
                              src={photo.url}
                          />
                          <div className='ui two buttons'>
                              <Button basic color='green' onClick={()=>handleSettingMainPhoto(photo)}>Main</Button>
                              <Button basic icon='trash' color='red' onClick={()=>handleDeletingPhoto(photo)} />
                          </div>
                      </Card>)
                    })}
              
          </Card.Group>

        </Fragment>
    )
}
export default connect(null)(UserPhotos);
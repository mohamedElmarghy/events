import { Grid, Segment, Header, Image } from 'semantic-ui-react';
const ProfileInfoPhotos = ({photos}) => {
    return (
      
        <Grid.Column width={12}>
        <Segment attached>
            <Header icon='image' content='Photos'/>
            
            <Image.Group size='small'>
                {photos.length > 0 && 
                   photos.map(photo => {
                       return (
                           <Image key={photo.id} src={photo.url} />
                       )
                   })
                }

            </Image.Group>
        </Segment>
    </Grid.Column>
    )
}
export default ProfileInfoPhotos;
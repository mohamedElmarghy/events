import { Grid, Segment, Button } from 'semantic-ui-react';
const ProfileInfoSidebar = () => {
    return (
        <Grid.Column width={4}>
        <Segment>
            <Button color='teal' fluid basic content='Edit Profile'/>
        </Segment>
    </Grid.Column>
    )
}
export default ProfileInfoSidebar;
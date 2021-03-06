import { Grid, Segment, Header, List, Item, Icon} from 'semantic-ui-react';
import { format } from 'date-fns';

const ProfileInfoDesc = ({profile}) => {
    console.log(profile);
    return (
        <Grid.Column width={12}>
        <Segment>
            <Grid columns={2}>
                <Grid.Column width={10}>
                    <Header icon='smile' content='About Display Name'/>
                    <p>I am a: <strong>{profile.occupation}</strong></p>
                    <p>Originally from <strong>{profile.city}</strong></p>
                    {/* <p>Member Since: <strong>{format(profile.createdAt.toDate(),'EEEE do LLLL')}</strong></p> */}
                    <p>{profile.about}</p>

                </Grid.Column>
                <Grid.Column width={6}>

                    <Header icon='heart outline' content='Interests'/>
                    <List>
                        {profile.interests && profile.interests.map((interest, index) => {
                            return (
                        <Item key={index}>
                            <Icon name='heart'/>
                            <Item.Content>{interest}</Item.Content>
                        </Item>
                            )
                        })}
                       
                    </List>
                </Grid.Column>
            </Grid>

        </Segment>
    </Grid.Column>
    )
}
export default ProfileInfoDesc;
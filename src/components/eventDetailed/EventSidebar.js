import React, { Fragment } from 'react';
import { Item, Label, Segment } from 'semantic-ui-react';
import { objectToArray } from '../../util/helpers/helpers';
import {Link} from 'react-router-dom';
class EventSidebar extends React.Component {
    render() {
        const { event } = this.props;
        
        const attendees = objectToArray(event.attendees); 
        return (
               <Fragment>
                 <Segment
                   textAlign='center'
                   style={{ border: 'none' }}
                   attached='top'
                   secondary
                   inverted
                   color='teal'
                 >
                   {attendees && attendees.length} {attendees.length == 1 ? 'person' : 'people'} going
                 </Segment>
                  {attendees.map(attendee =>{
                     return (
                        <Segment attached>
                        <Item.Group divided>
                          <Item style={{ position: 'relative' }}>
                            {attendee.host == true &&
                            <Label
                              style={{ position: 'absolute' }}
                              color='orange'
                              ribbon='right'
                            >
                              Host
                            </Label>}
                            <Item.Image size='tiny' src={attendee.photoURL} />
                            <Item.Content verticalAlign='middle'>
                              <Item.Header as='h3'><Link to={`/profile/${attendee.id}`}>
                                {attendee.displayName}</Link></Item.Header>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Segment>
                     ) 
                  })} 
                
               </Fragment>
            )
    }
}
export default EventSidebar;
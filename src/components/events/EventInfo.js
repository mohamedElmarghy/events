import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import EventAtendee from './EventAtendee';
import { objectToArray } from '../../util/helpers/helpers';
class EventInfo extends React.Component {
    render() {
      const {event} = this.props;
        return (
            <Segment.Group>
            <Segment>
            {event.isCancelled && <Label as='a' color='red' ribbon='right'>cancelled</Label>}
              <Item.Group>
                <Item>
                  <Item.Image size='tiny' circular src={event.hostPhotoURL} />
                  <Item.Content>
                    <Item.Header 
                      as={Link}
                      to={`/events/${event.id}`}    
                     content={event.title} />
                    <Item.Description
                    >Hosted by <Link to={`profile/${event.hostedUid}`}>{event.hostedBy}</Link></Item.Description>
                    
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment>
              <span>
                <Icon name='clock' />
                {format(event.date.toDate(),'EEEE do LLLL')} at {' '}
                {format(event.date.toDate(),'h:mm a')}

                <Icon name='marker' /> {event.address}
              </span>
            </Segment>
            <Segment secondary>
              <List horizontal>
                  {event.attendees && objectToArray(event.attendees).map((attendee) =>{
                     return <EventAtendee  key={attendee.id} attendee={attendee}/> 
                   }) 
                 }
              </List>
            </Segment>
            <Segment clearing>
              <div>{event.description}</div>
             
              <Button
                color='teal'
                floated='right'
                content='View'
                as={Link} to={`/events/${event.id}`}
              />
            </Segment>
          </Segment.Group>
        )
    }
}
export default EventInfo
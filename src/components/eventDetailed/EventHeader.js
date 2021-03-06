import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Button,  Header, Image, Item, Label, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addAttendee, cancelMyPlace } from '../../store/actions/eventsAction';
import { format } from 'date-fns';
import { objectToArray } from '../../util/helpers/helpers';
class EventHeader extends React.Component {
   renderJoinManageButton = () => {
    const {event, userId} = this.props;
    // if (event.isCancelled) {
    //   return (
    //     <Segment attached="bottom">
    //       <Label size="large" color="red">The Event Was Cancelled</Label>
    //     </Segment>
    //   )
    // }
    if (event.hostedUid === userId) {
      return (
        <Segment attached="bottom" clearing>
        <Button 
        as={Link} to={`/manageEvent/${event.id}`}
        color="orange" floated="right">
          Manage Event
        </Button>
        </Segment>
      )
    }else {
      const attendees = objectToArray(event.attendees);
      const isGoing = attendees && attendees.some((attendee) => attendee.id === userId);
      return (
        <Segment attached="bottom">
          {isGoing && !event.isCancelled &&
          <Button onClick={()=>this.props.cancelMyPlace(event)}>Cancel My Place</Button>}
          {!isGoing && !event.isCancelled &&
          <Button color="teal"
            onClick = {()=>this.props.addAttendee(event)}
          >JOIN THIS EVENT</Button>} 
           {event.isCancelled && <Label size="large" color="red">The Event Was Cancelled</Label>}
        </Segment>
      )
    }
     
   }
    render() {
      const eventImageStyle = {
          filter: 'brightness(30%)'
      };
      
      const eventImageTextStyle = {
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: '100%',
          height: 'auto',
          color: 'white'
      };
      const {event, userId} = this.props;
        return (
             <Segment.Group>
                <Segment basic attached="top" style={{ padding: '0' }}>
                  <Image src="/assets/categoryImages/drinks.jpg" fluid style={eventImageStyle} />
          
                  <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <Header
                                                   
                            size="huge"
                            content={event.title}
                            style={{ color: 'white' }}
                          />
                          
                          <p>{format(event.date.toDate(),'EEEE do LLLL')}</p>
                          <p>
                            Hosted by <strong>{event.hostedBy}</strong>
                          </p>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Segment>
                </Segment>
                  {this.renderJoinManageButton()}
              </Segment.Group>
        )
    }
}
const mapStateToProps = state => {
  return {
    userId : state.firebase.auth.uid
  }
}
export default connect(mapStateToProps, {addAttendee, cancelMyPlace})(EventHeader);
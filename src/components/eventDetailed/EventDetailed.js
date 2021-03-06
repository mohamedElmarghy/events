import React from "react";
import { Grid } from "semantic-ui-react";
import EventHeader from './EventHeader';
import EventAbout from './EventAbout';
import EventChat from './EventChat';
import EventSidebar from './EventSidebar';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import NotFound from "../layout/NotFound";
class EventDetailed extends React.Component {
  // async componentDidMount() {
  //   try {
  //   let event = await this.props.firestore.get(`events/${this.props.match.params.id}`);
  //   } catch(error) {
  //     console.log(error);
  //   } 
  // }
  async componentDidMount() {
    let eventId = this.props.match.params.id;
    let event =  await this.props.firestore.setListener(`events/${eventId}`);
    
  }
  async componentWillUnmount() {
    let eventId = this.props.match.params.id;
    await this.props.firestore.unsetListener(`events/${eventId}`);
  }
  render() {
         const { event } = this.props;
       if (Object.keys(event).length === 0) return <NotFound />
                 
        return (
         <Grid>
              <Grid.Column width={10}>
                <EventHeader event={event} />
                <EventAbout event={event}/>
                <EventChat />
             </Grid.Column>
             <Grid.Column width={6}>
                 <EventSidebar event={event}/>
             </Grid.Column> 
            
          </Grid> 
        )
    }
}
const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
   let event = {};
   
     
   if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
     event = state.firestore.ordered.events.filter(elem => elem.id === eventId)[0] || {};
   }
   return {
      event
   }
}
export default compose(
  withFirestore,
  connect(mapStateToProps))
  (EventDetailed)

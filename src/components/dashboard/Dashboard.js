import React from 'react';
import { connect } from 'react-redux';
import NotificationMain from './NotificationMain';
import EventsList from '../events/EventsList';
import { Button, Grid } from 'semantic-ui-react'
import CreateEvent from '../events/createEvent';
import cuid from "cuid";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
class Dashboard extends React.Component {
    render() {
        const { events } = this.props;
        return (
            // <div>
            //     <EventsList />
            //     <NotificationMain />
            // </div>
            <Grid>
                <Grid.Column width= {10}>
                   <EventsList events={events}/>
                </Grid.Column>
                <Grid.Column width= {6}>
                  
                </Grid.Column>
            </Grid>
        )
    }
}
const mapStateToProps = state => {
    return {
        events : state.firestore.ordered.events
    }
}
export default compose(firestoreConnect(()=>['events']),connect(mapStateToProps))(Dashboard)
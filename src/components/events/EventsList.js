import React from 'react';
import EventInfo from './EventInfo';
class EventsList extends React.Component {
    renderEvents = () => {
        if ( this.props.events ){
        return this.props.events.map(event => {
            return <EventInfo key={event.id} event={event} />
        })
    }
    }
    render() {
        return (
           <div>
             {this.renderEvents()}
           </div>
        )
    }
}
export default EventsList
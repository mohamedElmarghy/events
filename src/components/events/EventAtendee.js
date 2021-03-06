import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
class EventAtendee extends React.Component {
    render() {
        const {attendee} = this.props
        return (
            <List.Item>
            <Image as={Link} to={`/profile/${attendee.id}`} size='mini' circular src={attendee.photoURL} />
        </List.Item>
        )
    }
}
export default EventAtendee;
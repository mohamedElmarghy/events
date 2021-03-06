import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import {compose} from 'redux'
const SignedInLink = ({signOut, user, history}) =>{
 
  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={user.photoURL || 'assets/user.png'} />
      <Dropdown pointing='top left' text={user.displayName || 'user'}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item as={Link}  text='My Events' icon='calendar' />
          <Dropdown.Item as={Link}  text='My Network' icon='users' />
          <Dropdown.Item as={Link}  text='My profile' icon='user' />
          <Dropdown.Item as={Link}  to='/settings/basic' text='My account' icon='settings' />
          <Dropdown.Item
            text='Sign out'
            icon='power'
            onClick={()=> {
              signOut();
              history.push('/');
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
const mapStateToProps = state => {
  
  return {
    user : state.firebase.auth
  }
}
export default compose(connect(mapStateToProps,{signOut}),withRouter)(SignedInLink);
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';
import { connect } from 'react-redux';
class Navbar extends React.Component {
    render() {
        return (
               <Menu inverted>
                 <Container>
                   <Menu.Item header as={NavLink} exact to='/'>
                     <img src="assets/logo.png" alt="logo" />
                     Re-vents
                   </Menu.Item>
                   <Menu.Item as={NavLink} to='/Dashboard' name="Events" />
                   {/*
                   <Menu.Item  as={NavLink} to='/test'>
                     <Button floated="right" positive inverted content="Test" />
                   </Menu.Item> */}
                 
                   {this.props.user.uid ? <SignedInLink user={this.props.user}/> :  <SignedOutLink />}
                   
                 </Container>
               </Menu>
        )
    }
}
const mapStateToProps = state => {
  return {
    user : state.firebase.auth
  }
}
export default connect(mapStateToProps)(Navbar);
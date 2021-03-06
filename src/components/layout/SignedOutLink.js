import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import {openModal} from '../../modals/modalsAction';
import {connect} from 'react-redux';
function SignedOutLink(props) {
  return (
    <Menu.Item position='right'>
      <Button  content='Login' onClick={()=>props.openModal('LoginModal')}/>
      <Button
        content='Register'
        style={{ marginLeft: '0.5em' }}
        onClick={()=>props.openModal('RegisterModal')}
      />
    </Menu.Item>
  );
}
export default connect(null,{openModal})(SignedOutLink)
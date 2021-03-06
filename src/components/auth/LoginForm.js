import React from 'react';
import {reduxForm , Field} from 'redux-form'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TextInput from '../../util/form/TextInput';
import { logIn } from '../../store/actions/authActions';
import { compose } from 'redux';
import SocialLogin from './SocialLogin';
const LoginForm = (props) => {
  return (
    <Form error size="large" onSubmit={props.handleSubmit(props.logIn)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {props.error && <Label basic color='red'>{props.error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
     
      </Segment>
      <Divider horizontal>Or</Divider>
      <SocialLogin />
    </Form>
  );
};

export default compose(connect(null,{logIn}),reduxForm({form:'LoginForm'}))(LoginForm);
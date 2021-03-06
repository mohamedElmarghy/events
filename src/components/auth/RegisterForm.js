import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import TextInput from '../../util/form/TextArea';
import { signIn } from '../../store/actions/authActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SocialLogin from './SocialLogin';


const RegisterForm = (props) => {
  return (
    <div>
      <Form size="large" onSubmit={props.handleSubmit(props.signIn)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {props.error && <Label basic color='red'>{props.error}</Label>} 
          <Button fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
        <Divider horizontal>Or</Divider>
        <SocialLogin />
      </Form>
    </div>
  );
};

export default compose(connect(null,{signIn}),reduxForm({form:'registerForm'}))(RegisterForm);
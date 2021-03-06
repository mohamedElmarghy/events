import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../util/form/DateInput";
// import PlaceInput from "../../../app/common/form/PlaceInput";
import { connect } from 'react-redux';
import TextInput from '../../util/form/TextInput';
import RadioInput from '../../util/form/RadioInput'
import { updateProfile } from '../../store/actions/userAction';
import { compose } from 'redux';
class Basic extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                      {/* todo: Gender Radio button */}
                      <label>Gender</label>
                      <Field
                        name='gender'
                        type='radio'
                        component={RadioInput}
                        value='male'
                        label='male'
                      />
                       <Field 
                        name='gender'
                        type='radio'
                        component={RadioInput}
                        value='female'
                        label='female'
                      />
                    </Form.Group>
                    <Field
                      width={8}
                      name='dateOfBirth'
                      component={DateInput}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholder='Date of Birth'
                        // width={8}
                        // name='dateOfBirth'
                        // dateFormat="MMMM d, yyyy h:mm aa"
                        // component={DateInput}
                        // placeholder='Date of Birth'
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={TextInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default compose(connect(null,{updateProfile}),reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount : false}))(Basic);
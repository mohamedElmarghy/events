import React from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Header, Segment, Form, MyTextInput, MySelectInput, categoryData, MyTextArea, MyPlaceInput, MyDateInput } from 'semantic-ui-react';
import { createEvent, updateEvent, cancelOrActiveEvent } from '../../store/actions/eventsAction';
import TextInput from '../../util/form/TextInput';
import TextArea from '../../util/form/TextArea';
import DateInput from '../../util/form/DateInput';
import SelectInput from '../../util/form/SelectInput';
import { combineValidators, isRequired } from 'revalidate';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];
const validate = combineValidators({
  title : isRequired({message: 'the event title is required'}),
  date : isRequired({message: 'the date is required'})
})
class CreateEvent extends React.Component {
    
    onFormSubmit = async (values) => {
       if(Object.keys(this.props.initialValues).length > 0) {
         this.props.updateEvent(this.props.initialValues,values);
         this.props.history.push(`/events/${this.props.initialValues.id}`)
       }
       else {
        let event = await this.props.createEvent(values);
         this.props.history.push(`/dashboard`);
         toastr.success('Success', 'You added New Event');
       }
      }
      async componentDidMount() {
        let eventId = this.props.match.params.id;
        let event =  await this.props.firestore.setListener(`events/${eventId}`);
      }
      async componentWillUnmount() {
        let eventId = this.props.match.params.id;
        await this.props.firestore.unsetListener(`events/${eventId}`);
      }
    render() {
      
        return (
            <Segment clearing>
                <Form className='ui form' onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                  <Header sub color='teal' content='Event Details' />
                  <Field 
                     name='title'
                     component={TextInput}
                     placeholder='Event Title'
                     />
                     <Field 
                     name='description'
                     component={TextArea}
                     placeholder='describe ur event'
                     rows={5}
                     />
                       <Field 
                     name='address'
                     component={TextInput}
                     placeholder='your location'
                     />
                      <Field 
                     name='category'
                     component={SelectInput}
                     placeholder='choose the category'
                     options = {category}
                     multiple={false}
                     />
                      <Field 
                     name='date'
                     component={DateInput}
                     dateFormat="MMMM d, yyyy h:mm aa"
                     placeholder='event date'
                     />
                  <Button
                    type='submit'
                    floated='right'
                    positive
                    content='Submit'
                  />
                  <Button
                    floated='right'
                    content='Cancel'
                    onClick={this.props.initialValues?()=>this.props.history.push(`/events/${this.props.initialValues.id}`):()=>{this.props.history.push('/dashboard')}}
                  />
                  {Object.keys(this.props.initialValues).length > 0 && 
                  <Button
                    floated='left'
                    content = {this.props.event.isCancelled? 'Reactive the event' : 'Cancel the event'}
                    color = {this.props.event.isCancelled? 'green' : 'red'}
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.cancelOrActiveEvent(this.props.event);} }
                  />
                  }
                </Form>
          </Segment>
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
     initialValues : event,
     event
   }
}
export default withFirestore(connect(mapStateToProps,{createEvent, updateEvent, cancelOrActiveEvent})(reduxForm({form:'eventForm',enableReinitialize: true, validate})(CreateEvent)));
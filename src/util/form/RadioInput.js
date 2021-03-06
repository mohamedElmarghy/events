import { Form, Radio} from 'semantic-ui-react'
const RadioInput = ({input, label, type}) => {
   return (
       <Form.Field>
            <div className='ui radio'>
              <input {...input}
                     type={type}                
              />{' '}
              <label>{label}</label>
            </div>
          
       </Form.Field>
   )
}
export default RadioInput
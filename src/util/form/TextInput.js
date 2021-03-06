import { Form, Label } from "semantic-ui-react";

const TextInput = ({input,type,placeholder,meta:{error,touched}}) => {
    return (
          <Form.Field error={touched && !!error}>
        {touched && error ? (
            <Label basic color='red'>{error}</Label>
        ) : null}
             <input {...input} placeholder={placeholder} type={type}/>
       </Form.Field>
    )
}
export default TextInput;
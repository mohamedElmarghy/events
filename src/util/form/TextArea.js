import { Form, TextArea } from "semantic-ui-react";

const TextInput = ({input,type,placeholder,rows,meta:{error,touched}}) => {
    return (
          <Form.Field error={touched && !!error}>
             <TextArea {...input} placeholder={placeholder} rows={rows}/>
          </Form.Field>

    )
}
export default TextInput;
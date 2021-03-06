import { Form, Select } from "semantic-ui-react";

const SelectInput = ({input,type,placeholder,options,multiple,meta:{error,touched}}) => {
    return (
          <Form.Field error={touched && !!error}>
             <Select placeholder={placeholder} 
                    //  onChange={input.value}
                     value={input.value || null}
                     onChange={(e, data)=>input.onChange(data.value)}
                     options={options}
                     multiple={multiple}/>
          </Form.Field>

    )
}
export default SelectInput;
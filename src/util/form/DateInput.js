import React from 'react';
import DatePicker from 'react-datepicker';
import {Form, Label} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css'
const DateInput = ({input, placeholder, meta:{touched, error}, dateFormat,...rest}) => {
    return (
        <Form.Field error={touched && !!error}>
            <DatePicker 
              {...rest}
              placeholderText={placeholder}
              selected={input.value? (Object.prototype.toString.call(input.value) !== '[object Date]')?
              input.value.toDate():input.value : null}
              onChange={input.onChange}
            //   onBlur={input.onBlur}
              dateFormat = {dateFormat}
              showTimeSelect
              // showFourColumnMonthYearPicker
              timeFormat='HH:mm'
              onChangeRaw={(e)=>e.preventDefault()}
            />
             {touched && error ? (<Label basic color='red'>{error}</Label>) : null}
        </Form.Field>
    )
}
export default DateInput
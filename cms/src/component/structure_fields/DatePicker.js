import React, { Component } from 'react';
import DatePickerModule from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePicker extends Component {
    constructor (props) {
      super(props)
      this.state = {
        startDate: moment()
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(date) {
      this.setState({
        startDate: date
      });
    }
  
    render() {
      return (
        <div className="form-group">
        <label>{this.props.component.componentLabel}</label>
        <DatePickerModule
            id={this.props.component.componentLabel}
            selected={this.state.startDate}
            onChange={this.handleChange}
        />
        </div>
      ) 
    }
  }

  export default DatePicker;
import React, { Component } from "react";
import DatePickerModule from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(this.props.data.value)
    };
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });

    date.target = {type: 'date-picker', id: this.props.data.label};
    this.props.handleInputChange(date);
  }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
        <div className="col-sm-10">
          <DatePickerModule id={this.props.data.label} selected={this.state.startDate} onChange={e => this.handleChange(e)} />
        </div>
      </div>
    );
  }
}

export default DatePicker;

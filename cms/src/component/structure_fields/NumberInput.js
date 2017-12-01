import React, { Component } from 'react';

class NumberInput extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.component.componentLabel}</label>
                <input type="number" id={this.props.component.componentLabel} value={this.props.component.value} onChange={this.props.handleChange} />
            </div>
       )
    }
}

export default NumberInput;
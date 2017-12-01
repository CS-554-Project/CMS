import React, { Component } from 'react';

class CheckBox extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.component.componentLabel}</label>
                <input type="checkbox" id={this.props.component.componentLabel} checked={this.props.component.value} value={this.props.component.value} onChange={this.props.handleChange} />
            </div>
        )
    }
}

export default CheckBox;
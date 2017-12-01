import React, { Component } from 'react';

class TextArea extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.component.componentLabel}</label>
                <textarea rows="4" cols="40" id={this.props.component.componentLabel} value={this.props.component.value} onChange={this.props.handleChange} />
            </div>
       )
    }
}

export default TextArea;
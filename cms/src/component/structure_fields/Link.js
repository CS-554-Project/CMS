import React, { Component } from 'react';

class Link extends Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.component.componentLabel}</label>
                <input type="text" id={this.props.component.componentLabel} value={this.props.component.value} onChange={this.props.handleChange} />
                <input type="text" id={this.props.component.componentLabel} value={this.props.component.value} onChange={this.props.handleChange} />
            </div>
        )
    }
}

export default Link;
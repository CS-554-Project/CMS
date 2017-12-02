import React, { Component } from 'react';

class ListFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureFields: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({structureFields: nextProps.data});
    }

    _removeField(number) {
        this.props.removeField(number);
    }

    render() {
        if(this.state.structureFields.length > 0) {
            return (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Field Label</th>
                        <th>Field Type</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.structureFields.map((field, item) => {
                            return (
                                <tr key = {item}>
                                    <td>{field.label}</td>
                                    <td>{field.type}</td>
                                    <td><button className="btn btn-danger" value={field.number} onClick={() => {this._removeField(field.number)}}>Remove</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )
        } else {
            return null;
        }
    }
}

export default ListFields;
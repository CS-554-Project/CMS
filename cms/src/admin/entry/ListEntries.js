import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance';

class ListEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: []
        }
        this._getEntryList = this._getEntryList.bind(this);
        this._editEntry = this._editEntry.bind(this);
        this._deleteEntry = this._deleteEntry.bind(this);
    }

    componentWillMount() {
        this._getEntryList()
    }

    async _getEntryList() {
        let response = await axiosInstance.get("/admin/listentries");
        this.setState({
            entryList: response.data
        });   
    }

    _editEntry(structure) {
        this.props.history.push({
            pathname: `/admin/structures/${structure.slug}`,
            state: {structure: structure}
        });
    }

    async _deleteEntry(structure) {
        let payload = {
            slug: structure.slug
        }
        let response = await axiosInstance.delete("/admin/deleteentry", {data : payload});
        this._getStructureList();
    }

    render() {
        const { match } = this.props;
        const { url } = match;
        if(this.state.structureList.length > 0) {
            return (
                <div>
                <h1>Total Structures: {this.state.structureList.length}</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th> 
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>New Entry</th> 
                        <th>List Entries</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.structureList.map((structure, index) =>
                            <tr key={index}>
                                <td>{structure.name}</td>
                                <td>{structure.description}</td> 
                                <td><button className="btn btn-warning" onClick={() => this._editStructure(structure)}>Edit</button></td>                            
                                <td><button className="btn btn-danger" onClick={() => this._deleteStructure(structure)}>Delete</button></td>                            
                                <td><button className="btn btn-primary" onClick={() => this._newEntryForm(structure)}>Add Entry</button></td>
                                <td><button className="btn btn-primary" onClick={() => this._listEntries(structure)}>List Entries</button></td>                
                            </tr>
                        )}  
                    </tbody>          
                </table>
            </div>
            )
        } else {
            return (
                <div className="error">
                    No Structure entry yet !!
                </div>
            )
        }
    }
}

export default ListEntries;
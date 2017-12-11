import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance';

class ListEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureSlug: this.props.location.state.structure.slug,
            entryList: [],
            
        }
        this._getEntryList = this._getEntryList.bind(this);
        this._editEntry = this._editEntry.bind(this);
        this._deleteEntry = this._deleteEntry.bind(this);
    }

    componentWillMount() {
        this._getEntryList();
    }

    async _getEntryList() {
        let response = await axiosInstance.get(`/admin/${this.state.structureSlug}/listentries`);
        console.log(response);
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

    async _deleteEntry(entry) {
        let payload = {
            slug: entry.slug
        }
        let response = await axiosInstance.delete("/admin/deleteentry", {data : payload});
        this._getEntryList();
    }

    render() {
        const { match } = this.props;
        const { url } = match;
        if(this.state.entryList.length > 0) {
            return (
                <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th> 
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.entryList.map((entry, index) =>
                            <tr key={index}>
                                <td>{entry.title}</td>
                                <td>{entry.blurb}</td> 
                                <td><button className="btn btn-warning" onClick={() => this._editEntry(entry)}>Edit</button></td>                            
                                <td><button className="btn btn-danger" onClick={() => this._deleteEntry(entry)}>Delete</button></td>                            
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
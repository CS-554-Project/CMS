import React, { Component } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import FieldsLoading from '../components/FieldsLoading';
import moment from 'moment';

class AddEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entryTitle: "",
            structureSlug: this.props.location.state.structure.slug,
            entrySlug: "",
            entryDescription: "",
            author: "user",
            createdDate: moment().format('MM-DD-YYYY'),
            structureFields: this.props.location.state.structure.fields
        }
        this._getStructure = this._getStructure.bind(this);
    }

    componentWillMount() {
        this._getStructure(this.state.structureSlug);
    }

    async _getStructure(slug) {
        let response = await axiosInstance.get(`/admin/getstructuredetails/${slug}`);
    }

    _handleChange(e) {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.id;
        this.setState({
          [name]: value
        });
    }  

    render() {
        return (
            <div className="container"> 
                <h1>Add Entry</h1>
                <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Structure Type</label>
                    <div className="col-sm-10">
                        <input type="text" id="structureSlug" className="form-control" disabled placeholder="Structure Slug" value={this.state.structureSlug} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Entry Title</label>
                    <div className="col-sm-10">
                        <input type="text" id="entryTitle" className="form-control" placeholder="Entry Title" value={this.state.entryTitle} onChange={this._handleChange} />
                    </div>
                </div>         
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Entry Slug</label>
                    <div className="col-sm-10">
                        <input type="text" id="entrySlug" className="form-control" placeholder="Entry Slug" value={this.state.entrySlug} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Entry Desc</label>
                    <div className="col-sm-10">
                        <input type="text" id="entryDescription" className="form-control" placeholder="Entry Description" value={this.state.entryDescription} onChange={this._handleChange} />
                    </div>
                </div>
                </form>

                <br/>
                <FieldsLoading data={this.state.structureFields}/>

                <form onSubmit={this._addStructure}>
                    <button className="btn btn-success">Add Entry</button>
                </form>
                
            </div>
        );
    }
}

export default AddEntry;
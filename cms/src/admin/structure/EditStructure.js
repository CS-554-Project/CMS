import React, { Component } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import ListFields from '../structure/ListFields';

class EditStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureName: this.props.location.state.structure.name,
            structureSlug: this.props.location.state.structure.slug,
            structureDescription: this.props.location.state.structure.description,
            structurePageSize: this.props.location.state.structure.pagesize,
            structureFields: this.props.location.state.structure.fields,
            fieldLabel: "",
            selectedField: "small-text-input"
        }
        this._editStructure = this._editStructure.bind(this);
        this._addField = this._addField.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._validateFields = this._validateFields.bind(this);   
        this._removeField = this._removeField.bind(this);
    }

    async _editStructure(e) {
        e.preventDefault();
        //if(!this._validateFields()) return;
        let payload = {
            name: this.state.structureName,
            slug: this.state.structureSlug,
            description: this.state.structureDescription,
            pagesize: this.state.structurePageSize,
            fields: this.state.structureFields
        }
        let response = await axiosInstance.put("/admin/editstructure", payload);
    }

    _addField(e) {
        e.preventDefault();
        this.setState({
            structureFields: [...this.state.structureFields, {
                label: this.state.fieldLabel,
                type: this.state.selectedField
            }],
            fieldLabel: ""          
        });
    }

    _removeField(_field) {
        let updatedFields = this.state.structureFields.filter((field) => {
            return field !== _field
        });
        this.setState({
            structureFields: updatedFields
        });
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

    _validateFields() {
        if(this.state.structureName === "" || this.state.structureName === undefined) {
            alert("Structure Name Required");
            return false;
        }
        if(this.state.structureDescription === "" || this.state.structureDescription === undefined) {
            alert("Structure Description Required");
            return false;
        }
        if(this.state.structurePageSize === 0 || this.state.structurePageSize === undefined) {
            alert("Structure Page Size Required");
            return false;
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Edit Structure</h1>
                <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Structure Name</label>
                    <div className="col-sm-10">
                        <input type="text" id="structureName" className="form-control" placeholder="Structure Name" value={this.state.structureName} onChange={this._handleChange} />
                    </div>
                </div>         
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Structure Slug</label>
                    <div className="col-sm-10">
                        <input type="text" id="structureSlug" className="form-control" disabled placeholder="Structure Slug" value={this.state.structureSlug} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Structure Desc</label>
                    <div className="col-sm-10">
                        <input type="text" id="structureDescription" className="form-control" placeholder="Structure Description" value={this.state.structureDescription} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Structure Page Size</label>
                    <div className="col-sm-10">
                        <input type="number" id="structurePageSize" className="form-control" placeholder="Structure Page Size" value={this.state.structurePageSize} onChange={this._handleChange} />
                    </div>
                </div>
                </form>
                <form onSubmit={this._addField}>                
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Field Label</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="fieldLabel" placeholder="Field Label" value={this.state.fieldLabel} onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                    <label className="col-sm-2 col-form-label">Field Type</label>
                        <div className="col-auto">
                            <select id="selectedField" className="custom-select mb-2 mr-sm-2 mb-sm-0" value={this.state.selectedField} onChange={this._handleChange}>     
                                <option value="small-text-input">Small Text Input</option>
                                <option value="number-input">Number Input</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="text-area">Text Area</option>
                                <option value="image-uploader">Image Uploader</option>
                                <option value="link">Link</option>
                                <option value="wysiwyg-editor">WYSIWYG Editor</option>
                                <option value="datepicker">Datepicker</option>
                                <option value="embeddable-youtube">Embeddable Youtube</option>
                                <option value="reference-entry">Reference Entry</option>
                                <option value="file-uploader">Upload File</option>
                            </select>    
                        </div>
                        <div className="col-auto">
                            <input className="btn btn-secondary dropdown-toggle" type="submit" value="Add Field" />
                        </div>
                    </div> 
                </form>
                <br/>
                <ListFields data={this.state.structureFields} removeField={this._removeField}/>
                <form onSubmit={this._editStructure}>
                    <button className="btn btn-success">Update Structure</button>
                </form>
            </div>
        );
    }
}

export default EditStructure;
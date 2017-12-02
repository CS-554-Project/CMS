import React, { Component } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import ComponentsMain from '../../component/structure_fields/ComponentsMain';

class EditStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureName: this.props.location.state.structure.name,
            structureSlug: this.props.location.state.structure.slug,
            structureDescription: this.props.location.state.structure.description,
            structurePageSize: this.props.location.state.structure.pagesize,
            structureFields: this.props.location.state.structure.fields,
            componentLabel: "",
            selectedComponent: "small-text-input"
        }
        this._handleChange = this._handleChange.bind(this);
        this._addComponent = this._addComponent.bind(this);
        this._updateStructure = this._updateStructure.bind(this);
    }

    async _updateStructure(e) {
        e.preventDefault();
        let payload = {
            name: this.state.structureName,
            description: this.state.structureDescription,
            pagesize: this.state.structurePageSize,
            fields: this.state.structureFields
        }
        let response = await axiosInstance.post("/admin/editstructure", payload);
        console.log(response);
    }

    _addComponent(e) {
        e.preventDefault();
        this.setState({
            structureFields: [...this.state.structureFields, {
                label: this.state.componentLabel,
                type: this.state.selectedComponent,
                number: this.state.componentNumber+1
            }],
            componentLabel: ""          
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

    render() {
        return (
            <div className="container">
                <h1>Create Structure</h1>
                <form onSubmit={this._addComponent}>
                    <input type="text" className="form-control" id="componentLabel" placeholder="Component Label" value={this.state.componentLabel} onChange={this._handleChange}/>
                    <select id="selectedComponent" value={this.state.selectedComponent} onChange={this._handleChange}>     
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
                    <input className="btn btn-primary" type="submit" value="Add Component" />
                </form>
                <br/>
                <form onSubmit={this._updateStructure}>
                <div className="form-group">
                    <label>Structure Name: </label>
                    <input type="text" id="structureName" className="form-control" placeholder="Structure Name" value={this.state.structureName} onChange={this._handleChange} />
                </div>
                <br/>                        
                <div className="form-group">
                    <label>Structure Slug: </label>
                    <input type="text" id="structureSlug" disabled className="form-control" placeholder="Structure Slug" value={this.state.structureSlug} onChange={this._handleChange} />
                </div>
                <br/>
                <div className="form-group">
                    <label>Structure Description: </label>
                    <input type="text" id="structureDescription" className="form-control" placeholder="Structure Description" value={this.state.structureDescription} onChange={this._handleChange} />
                </div>
                <br/>
                <div className="form-group">
                    <label>Structure Page Size: </label>
                    <input type="number" id="structurePageSize" className="form-control" placeholder="Structure Page Size" value={this.state.structurePageSize} onChange={this._handleChange} />
                </div>
                <br/>
                <button className="btn btn-success" onClick={this._addStructure}>Add Structure</button>
                </form>

                <ComponentsMain structureFields = {this.state.structureFields} />
                
            </div>
        );
    }
}

export default EditStructure;
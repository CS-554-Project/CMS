import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../utils/AxiosInstance';
import ListFields from '../structure/ListFields';

class AddStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureName: '',
            structureSlug: '',
            structureDescription: '',
            structurePageSize: 1,
            structureFields: [],
            fieldLabel: '',
            selectedField: 'small-text-input'
        }
        this._addStructure = this._addStructure.bind(this);
        this._addField = this._addField.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._validateFields = this._validateFields.bind(this);   
        this._removeField = this._removeField.bind(this);
    }

    async _addStructure(e) {
        e.preventDefault();
        if(!this._validateFields()) return;
        let payload = {
            name: this.state.structureName,
            slug: this.state.structureSlug,
            description: this.state.structureDescription,
            pagesize: this.state.structurePageSize,
            fields: this.state.structureFields
        }
        let response = await axiosInstance.post('/admin/addstructure', payload);
        if(!response.data.error) {
            toast.success('Structure Added Successfully!', {
                position: toast.POSITION.TOP_CENTER,
                onClose: () => {
                    this.setState({
                        structureName: '',
                        structureSlug: '',
                        structureDescription: '',
                        structurePageSize: 1,
                        structureFields: [],
                        fieldLabel: '',
                        selectedField: 'small-text-input'
                    });
                    this.props.history.push(`/admin/structures`);
                }
            });
        } else {
            toast.error(response.data.error, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    _addField(e) {
        e.preventDefault();
        if(this.state.fieldLabel === '' || this.state.fieldLabel === undefined) {
            return false;
        }
        this.setState({
            structureFields: [...this.state.structureFields, {
                label: this.state.fieldLabel,
                type: this.state.selectedField
            }],
            fieldLabel: ''          
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
        let target = e.target;
        let value = target.value;
        let name = target.id;
        this.setState({
          [name]: value
        });
    }    

    _validateFields() {
        if(this.state.structureName === '' || this.state.structureName === undefined) {
            toast.warn('Structure Name Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.structureSlug === '' || this.state.structureSlug === undefined) {
            toast.warn('Structure Slug Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.structureDescription === '' || this.state.structureDescription === undefined) {
            toast.warn('Structure Description Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.structurePageSize === 0 || this.state.structurePageSize === undefined) {
            toast.warn('Structure Page Size Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.structureFields.length === 0) {
            toast.warn('Atleast One Field Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        return true;
    }

    render() {
        return (
            
            <div className='container'>
                <ToastContainer autoClose={1000} />
                <h1>Create Structure</h1>

                <form>

                <div className='form-group row'>
                    <label className='col-sm-2 col-form-label' for="structureName">Structure Name</label>
                    <div className='col-sm-10'>
                        <input type='text' id='structureName' className='form-control' placeholder='Structure Name' value={this.state.structureName} onChange={this._handleChange} />
                    </div>
                </div>         

                <div className='form-group row'>
                    <label className='col-sm-2 col-form-label' for="structureSlug">Structure Slug</label>
                    <div className='col-sm-10'>
                        <input type='text' id='structureSlug' className='form-control'  placeholder='Structure Slug' value={this.state.structureSlug} onChange={this._handleChange} />
                    </div>
                </div>

                <div className='form-group row'>
                    <label className='col-sm-2 col-form-label' for="structureDescription">Structure Desc</label>
                    <div className='col-sm-10'>
                        <input type='text' id='structureDescription' className='form-control' placeholder='Structure Description' value={this.state.structureDescription} onChange={this._handleChange} />
                    </div>
                </div>

                <div className='form-group row'>
                    <label className='col-sm-2 col-form-label' for="structurePageSize">Structure Page Size</label>
                    <div className='col-sm-10'>
                        <input type='number' id='structurePageSize' className='form-control'  placeholder='Structure Page Size' value={this.state.structurePageSize} onChange={this._handleChange} />
                    </div>
                </div>
                
                </form>

                <form onSubmit={this._addField}>
                
                    <div className='form-group row'>
                        <label className='col-sm-2 col-form-label' for="fieldLabel">Field Label</label>
                        <div className='col-sm-10'>
                            <input type='text' className='form-control' id='fieldLabel'  placeholder='Field Label' value={this.state.fieldLabel} onChange={this._handleChange}/>
                        </div>
                    </div>

                    <div className='form-row align-items-center'>
                    <label className='col-sm-2 col-form-label'>Field Type</label>
                        <div className='col-auto'>
                            <select id='selectedField' className='custom-select mb-2 mr-sm-2 mb-sm-0' value={this.state.selectedField} onChange={this._handleChange}>     
                                <option value='small-text-input'>Small Text Input</option>
                                <option value='number-input'>Number Input</option>
                                <option value='checkbox'>Checkbox</option>
                                <option value='text-area'>Text Area</option>
                                <option value='image-uploader'>Image Uploader</option>
                                <option value='link'>Link</option>
                                <option value='wysiwyg-editor'>WYSIWYG Editor</option>
                                <option value='datepicker'>Datepicker</option>
                                <option value='embeddable-youtube'>Embeddable Youtube</option>
                                <option value='reference-entry'>Reference Entry</option>
                                <option value='file-uploader'>Upload File</option>
                            </select>    
                        </div>

                        <div className='col-auto'>
                            <input className='btn btn-secondary dropdown-toggle' type='submit' value='Add Field' />
                        </div>
                    </div> 
                </form>

                <br/>
                <ListFields data={this.state.structureFields} removeField={this._removeField}/>
                <br/>

                <form onSubmit={this._addStructure}>
                    <button className='btn btn-success'>Add Structure</button>
                </form>
            </div>
        );
    }
}

export default AddStructure;
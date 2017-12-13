import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance';
import SmallTextInput from '../components/SmallTextInput';
import NumberInput from '../components//NumberInput';
import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';
import ImageUpload from '../components/ImageUpload';
import Link from '../components/Link';
import WysiwygEditor from '../components/WysiwygEditor';
import DatePicker from '../components/DatePicker';
import YouTube from '../components/YouTube';
import ReferenceEntry from '../components/ReferenceEntry';
import FileUpload from '../components/FileUpload';
import moment from 'moment';

const youTubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

class AddEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureSlug: this.props.location.state.structure.slug,
            entryTitle: "",
            entrySlug: "",
            entryBlurb: "",
            author: "admin",
            createdDate: moment().format('MM-DD-YYYY'),
            structureFields: this.props.location.state.structure.fields
        }
        this._addEntry = this._addEntry.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._addFieldsToForm = this._addFieldsToForm.bind(this);
    }

    async _addEntry(e) {
        e.preventDefault();
        if(!this._validateFields()) return;
        let payload = {
            structureslug: this.state.structureSlug,
            title: this.state.entryTitle,
            slug: this.state.entrySlug,
            blurb: this.state.entryBlurb,
            author: this.state.author,
            createdDate: this.state.createdDate,
            fields: this.state.structureFields
        }
        let response = await axiosInstance.post('/admin/addentry', payload);
        if(!response.data.error) {
            toast.success("Entry Added Successfully!", {
                position: toast.POSITION.TOP_CENTER
            });
            const redirect = this.props.history;
            setTimeout(function() {
                redirect.push(`/admin/structures`);
            }, 1050);
        } else {
            toast.error(response.data.error, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    _validateFields() {
        if(this.state.entryTitle === '' || this.state.entryTitle === undefined) {
            toast.warn('Entry Title Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.entrySlug === '' || this.state.entrySlug === undefined) {
            toast.warn('Entry Slug Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        if(this.state.entryBlurb === '' || this.state.entryBlurb === undefined) {
            toast.warn('Entry Blurb Required', {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        return true;
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

    _handleInputChange(e, fieldType) {
        let value = '';

        switch(e.target.type) {

            case 'checkbox':
                value = e.target.checked;  
            break;

            case 'file':
                let temp = e.target.value.split('\\');
                if(fieldType === 'image-uploader') {
                    value = temp[temp.length-1];
                } else {
                    let tempName = temp[temp.length-1];
                    value = tempName.substr(0, tempName.lastIndexOf('.')).concat('.zip');
                }
                let formData = new FormData();
                fieldType === 'image-uploader' ? formData.append('image', e.target.files[0]) : formData.append('file', e.target.files[0]);
                axiosInstance.post(fieldType === 'image-uploader' ? '/admin/uploadimage' : '/admin/uploadfile', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                });
            break;

            case 'date-picker':
                value = e._d;
            break;

            case 'reference-entry':
                value = e.entryID;
            break;

            case 'link':
                value = e.data;
            break;

            case 'wysiwyg-editor': 
                value = e.data;
            break;

            default:
                if(fieldType === 'embeddable-youtube') {
                    let videoId = (e.target.value).match(youTubeRegex);
                    console.log(videoId);
                    if(videoId) {
                        value = videoId[1];
                    }
                } else {
                    value = e.target.value;
                }
            break;
        }

        for(let i = 0; i < this.state.structureFields.length; i++) {
            if(this.state.structureFields[i].label === e.target.id) {
                this.state.structureFields[i].value = value
            }
        }

        this.setState({
            structureFields: this.state.structureFields
        });
    }

    _addFieldsToForm(field, index) {

        switch (field.type) {
            
            case "small-text-input":
            return (
                <div key={index}>
                    <SmallTextInput data={field} handleInputChange={e => this._handleInputChange(e, field.type)} />
                </div>
            )

            case "number-input":
            return (
                <div key={index}>
                    <NumberInput data={field} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            )

            case "checkbox":
            return (
                <div key={index}>
                    <CheckBox data={field} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            )

            case "text-area":
            return (
                <div key={index}>
                    <TextArea data={field} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            )

            case "image-uploader":
            return (
                <div key={index}>
                    <ImageUpload data={field} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            )

            case "link":
            return (
                <div key={index}>
                    <Link data={field} handleInputChange={e => this._handleInputChange(e, field.type)} />
                </div>
            )

            case "wysiwyg-editor":
            return (
                <div key={index}>
                    <WysiwygEditor data={field} handleInputChange={e => this._handleInputChange(e, field.type)} />
                </div>
            )

            case "datepicker":
            return (
                <div key={index}>
                    <DatePicker data={field} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            )

            case "embeddable-youtube":
            return (
                <div key={index}>
                    <YouTube data={field} handleInputChange={e => this._handleInputChange(e, field.type)} />
                </div>
            )

            case "reference-entry":
            return (
                <div key={index}>
                    <ReferenceEntry data={field} structureSlug={this.state.structureSlug} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            );

            case "file-uploader":
            return (
                <div key={index}>
                    <FileUpload data={field} handleInputChange={e => this._handleInputChange(e, field.type)}/>
                </div>
            )
        
            default:
                break;
        }
    }

    render() {
        return (
            <div className="container">
                <ToastContainer autoClose={1000} /> 
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
                    <label className="col-sm-2 col-form-label">Entry Blurb</label>
                    <div className="col-sm-10">
                        <input type="text" id="entryBlurb" className="form-control" placeholder="Entry Blurb" value={this.state.entryBlurb} onChange={this._handleChange} />
                    </div>
                </div>
                </form>

                <br/>

                {this.state.structureFields.map((field, index) => (
                    this._addFieldsToForm(field, index)
                ))} 

                <form onSubmit={this._addEntry}>
                    <button className="btn btn-success">Add Entry</button>
                </form>
                
            </div>
        );
    }
}

export default AddEntry;
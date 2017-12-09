import React, { Component } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import SmallTextInput from '../components/SmallTextInput';
import NumberInput from '../components//NumberInput';
import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';
import ImageUpload from '../components/ImageUpload';
import Link from '../components/Link';
//import WysiwygEditor from '../components/WysiwygEditor';
import DatePicker from '../components/DatePicker';
import YouTube from '../components/YouTube';

import moment from 'moment';

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
        this._handleInputChange = this._handleInputChange.bind(this);
        this._addFieldsToForm = this._addFieldsToForm.bind(this);
    }

    async _addEntry(e) {
        e.preventDefault();
        //if(!this._validateFields()) return;
        let payload = {
            structureslug: this.state.structureSlug,
            title: this.state.entryTitle,
            slug: this.state.entrySlug,
            blurb: this.state.entryBlurb,
            author: this.state.author,
            createdDate: this.state.createdDate,
            fields: this.state.structureFields
        }
        let response = await axiosInstance.post('/admin/addstructureentry', payload);
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

    _handleInputChange(e) {
        let value = '';
        if(e.target.type === 'checkbox') {
            value = e.target.checked;
        } else {
            value = e.target.value;
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
                            <SmallTextInput data={field} handleInputChange={this._handleInputChange} />
                        </div>
                    )
        
                    case "number-input":
                    return (
                        <div key={index}>
                            <NumberInput data={field} handleInputChange={this._handleInputChange}/>
                        </div>
                    )
        
                    case "checkbox":
                    return (
                        <div key={index}>
                            <CheckBox data={field} handleInputChange={this._handleInputChange}/>
                        </div>
                    )
        
                    case "text-area":
                    return (
                        <div key={index}>
                            <TextArea data={field} handleInputChange={this._handleInputChange}/>
                        </div>
                    )
        
                    case "image-uploader":
                    return (
                        <div key={index}>
                            <ImageUpload data={field} />
                        </div>
                    )
        
                    case "link":
                    return (
                        <div key={index}>
                            <Link data={field} />
                        </div>
                    )
        
                    // case "wysiwyg-editor":
                    // return (
                    //     <div key={index}>
                    //         {/* <WysiwygEditor data={field} /> */}
                    //     </div>
                    // )
        
                    case "datepicker":
                    return (
                        <div key={index}>
                            <DatePicker data={field} />
                        </div>
                    )
        
                    // case "embeddable-youtube":
                    // return (
                    //     <div key={index}>
                    //         <YouTube data={field} />
                    //     </div>
                    // )
                
                    default:
                        break;
                }
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
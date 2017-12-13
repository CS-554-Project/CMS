// /******************************************
//  *  Author : Harsh Jagdishbhai Kevadia
//  *  Created On : Fri Dec 01 2017
//  *  File : SingleEntry.js
//  *******************************************/
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import EntriesListLeftNav from "../../component/EntriesListLeftNav";
// import axiosInstance from "../../utils/AxiosInstance";

// class SingleEntry extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       entry: undefined,
//       structure: undefined,
//       loading: false
//     };
//   }

//   async getStructure(reqSlug) {
//     try {
//       this.setState({ loading: true });
//      //console.log("/user/entries?slug=" + reqSlug);
//       let response = await axiosInstance.get("/user/entries",{
//         params: {
//           slug: reqSlug
//         }
//       });
//       //console.log(response.data);
//       const structureData = response.data;
//       this.setState({
//         loading: false,
//         structure: structureData
//       });
//     } catch (e) {
//       this.setState({ loading: false });
//     }
//   }


//   async getEntry(reqSlug) {
//     try {
//       this.setState({ loading: true });
//       //console.log("/user/entries?slug=" + reqSlug);
//       let response = await axiosInstance.get("/user/entry", {
//         params: {
//           slug: reqSlug
//         }
//       });
//       console.log(response.data);
//       const entryData = response.data;
//       this.setState({
//         loading: false,
//         entry: entryData
//       });
//     } catch (e) {
//       this.setState({ loading: false });
//     }
//   }

//   async componentDidMount() {
//     let entrySlug = this.props.match.params.entry;
//     let structureSlug = this.props.match.params.structure;
//     await this.getEntry(entrySlug);
//     await this.getStructure(structureSlug);
//   }

//   render() {
//     // let structure = {
//     //   name: this.props.match.params.structure,
//     //   blurb: "This is Structure Discription",
//     //   structureSlug: this.props.match.params.structure,
//     //   entries: [
//     //     { name: "Entry one", slug: "One", blurb: "This is Entry one blurb" },
//     //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
//     //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
//     //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" },
//     //     { name: "Entry Two", slug: "Two", blurb: "This is Entry two blurb" }
//     //   ]
//     // };

//     // let entry = {
//     //   name: this.props.match.params.entry,
//     //   blurb: "Harsh Kevadia"
//     // };
//     let body = null;
//     if (this.state.loading) {
//       body = <div className="row">Loading...</div>;
//     } else if (this.state.structure && this.state.entry) {
//       body = (
//         <div className="row">
//           <div className="col-md-2">
//             <div className="mycontent-left">
//               <EntriesListLeftNav structure={this.state.structure} />
//             </div>
//           </div>
//           <div className="col-md-10">
//             <div className="mycontent-right">
//               <div className="row">
//                 <h2>{this.state.entry.title}</h2>
//               </div>
//               <div className="row">
//                 <p>{this.state.entry.blurb}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }
//     return body;
//   }
// }
// export default SingleEntry;



import React, { Component } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import SmallTextInput from '../components/SmallTextInput';
import NumberInput from '../components//NumberInput';
import CheckBox from '../components/CheckBox';
import TextArea from '../components/TextArea';
import ImagePreview from '../components/ImagePreview';
import Link from '../components/Link';
import WysiwygEditor from '../components/WysiwygEditor';
import DatePicker from '../components/DatePicker';
import YouTube from '../components/YouTube';
import ReferenceEntry from '../components/ReferenceEntry';
import FileDownload from '../components/FileDownload';
import moment from 'moment';

const youTubeRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

class SingleEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true, 
          entry: undefined,
        }
        this._getEntry = this._getEntry.bind(this);
        // this._handleChange = this._handleChange.bind(this);
        this._addFieldsToForm = this._addFieldsToForm.bind(this);
    }

    componentWillMount() {
      this._getEntry()
    }

    async _getEntry(reqSlug) {
        console.log(reqSlug);
      try {
       this.setState({ loading: true });
        let response = await axiosInstance.get("/user/entry", {
          params: {
            slug: 'total1'
          }
        });
        console.log(response.data);
        let entryData = response.data;
        this.setState({
          loading: false,
          entry: entryData
        });
      } catch (e) {
        this.setState({ loading: false });
      }
      console.log(this.state.entry.title);
    }

    // _handleChange(e) {
    //     e.preventDefault();
    //     const target = e.target;
    //     const value = target.value;
    //     const name = target.id;
    //     this.setState({
    //       [name]: value
    //     });
    // }

    // _handleInputChange(e, fieldType) {
    //     let value = '';

    //     switch(e.target.type) {

    //         case 'checkbox':
    //             value = e.target.checked;  
    //         break;

    //         case 'file':
    //             let temp = e.target.value.split('\\');
    //             if(fieldType === 'image-uploader') {
    //                 value = temp[temp.length-1];
    //             } else {
    //                 let tempName = temp[temp.length-1];
    //                 value = tempName.substr(0, tempName.lastIndexOf('.')).concat('.zip');
    //             }
    //             let formData = new FormData();
    //             fieldType === 'image-uploader' ? formData.append('image', e.target.files[0]) : formData.append('file', e.target.files[0]);
    //             axiosInstance.post(fieldType === 'image-uploader' ? '/admin/uploadimage' : '/admin/uploadfile', formData, {
    //                 headers: {
    //                   'Content-Type': 'multipart/form-data'
    //                 }
    //             });
    //         break;

    //         case 'date-picker':
    //             value = e._d;
    //         break;

    //         case 'reference-entry':
    //             value = e.entryID;
    //         break;

    //         case 'link':
    //             value = e.data;
    //         break;

    //         case 'wysiwyg-editor': 
    //             value = e.data;
    //         break;

    //         default:
    //             if(fieldType === 'embeddable-youtube') {
    //                 let videoId = (e.target.value).match(youTubeRegex);
    //                 console.log(videoId);
    //                 if(videoId) {
    //                     value = videoId[1];
    //                 }
    //             } else {
    //                 value = e.target.value;
    //             }
    //         break;
    //     }

    //     for(let i = 0; i < this.state.structureFields.length; i++) {
    //         if(this.state.structureFields[i].label === e.target.id) {
    //             this.state.structureFields[i].value = value
    //         }
    //     }

    //     this.setState({
    //         structureFields: this.state.structureFields
    //     });
    // }

    _addFieldsToForm(field, index) {

      switch (field.type) {
          
          case "small-text-input":
          return (
              <div key={index}>
                  <SmallTextInput data={field} />
              </div>
          )

          case "number-input":
          return (
              <div key={index}>
                  <NumberInput data={field} />
              </div>
          )

          case "checkbox":
          return (
              <div key={index}>
                  <CheckBox data={field} />
              </div>
          )

          case "text-area":
          return (
              <div key={index}>
                  <TextArea data={field} />
              </div>
          )

          case "image-uploader":
          return (
              <div key={index}>
                  <ImagePreview data={field} />
              </div>
          )

          case "link":
          return (
              <div key={index}>
                  <Link data={field} />
              </div>
          )

          case "wysiwyg-editor":
          return (
              <div key={index}>
                  <WysiwygEditor data={field} />
              </div>
          )

          case "datepicker":
          return (
              <div key={index}>
                  <DatePicker data={field} />
              </div>
          )

          case "embeddable-youtube":
          return (
              <div key={index}>
                  <YouTube data={field} />
              </div>
          )

          // case "reference-entry":
          // return (
          //     <div key={index}>
          //         <ReferenceEntry data={field} structureSlug={this.state.structureSlug} handleInputChange={e => this._handleInputChange(e, field.type)}/>
          //     </div>
          // );

          case "file-uploader":
          return (
              <div key={index}>
                  <FileDownload data={field} />
              </div>
          )
      
          default:
          break;
      }
    }

    render() {
      if(!this.state.loading) {

        return (
            <div className="container"> 
                <h1>Entry</h1>
                <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Entry Title</label>
                    <div className="col-sm-10">
                        <input type="text" id="entryTitle" className="form-control" readOnly value={this.state.entry.title} onChange={this._handleChange} />
                    </div>
                </div>         
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Entry Slug</label>
                    <div className="col-sm-10">
                        <input type="text" id="entrySlug" className="form-control" readOnly value={this.state.entry.slug} onChange={this._handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Entry Blurb</label>
                    <div className="col-sm-10">
                        <input type="text" id="entryBlurb" className="form-control" readOnly value={this.state.entry.blurb} onChange={this._handleChange} />
                    </div>
                </div>
                </form>
                
                <br/>

                {this.state.entry.fields.map((field, index) => (
                    this._addFieldsToForm(field, index)
                ))}
            </div>
        );

      } else {

        return (
          <div>
            Loading ...
          </div>
        )
      }
        
    }
}

export default SingleEntry;

import React, { Component } from 'react';

import SmallTextInput from './SmallTextInput'
import NumberInput from './NumberInput';
import CheckBox from './CheckBox';
import TextArea from './TextArea';
import ImageUpload from './ImageUpload';
import Link from './Link';
//import WysiwygEditor from './WysiwygEditor';
import DatePicker from './DatePicker';
import YouTube from './YouTube';

class FieldsLoading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            structureFields: props.data
        }
        this._addFieldsToForm = this._addFieldsToForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            structureFields: nextProps.data
        });
    }

    _addFieldsToForm(field, index) {

        switch (field.type) {
            
            case "small-text-input":
            return (
                <div key={index}>
                    <SmallTextInput data={field}/>
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
            //         {/* <WysiwygEditor component={component} /> */}
            //         <button className="btn btn-danger" value={component.label}>Remove</button>
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
            //         <YouTube component={component} />
            //         <button className="btn btn-danger" value={component.label}>Remove</button>
            //     </div>
            // )
        
            default:
                break;
        }
    }

    /* From Stackoverflow https://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map */
    render(){
        return(
            <div>
                {this.state.structureFields.map((field, index) => (
                    this._addFieldsToForm(field, index)
                ))} 
            </div>
        )
    }
}

export default FieldsLoading;
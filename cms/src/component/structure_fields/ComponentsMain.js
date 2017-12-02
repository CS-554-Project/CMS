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

class ComponentsMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            structureFields: this.props.structureFields
        }
        this._addComponentToStructure = this._addComponentToStructure.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            structureFields: nextProps.structureFields
        });
    }

    _addComponentToStructure(component, index) {

        switch (component.type) {
            
            case "small-text-input":
            return (
                <div key={index}>
                    <SmallTextInput component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )
            break;

            case "number-input":
            return (
                <div key={index}>
                    <NumberInput component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "checkbox":
            return (
                <div key={index}>
                    <CheckBox component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "text-area":
            return (
                <div key={index}>
                    <TextArea component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "image-uploader":
            return (
                <div key={index}>
                    <ImageUpload component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "link":
            return (
                <div key={index}>
                    <Link component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "wysiwyg-editor":
            return (
                <div key={index}>
                    {/* <WysiwygEditor component={component} /> */}
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "datepicker":
            return (
                <div key={index}>
                    <DatePicker component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )

            case "embeddable-youtube":
            return (
                <div key={index}>
                    <YouTube component={component} />
                    <button className="btn btn-danger" value={component.label}>Remove</button>
                </div>
            )
        
            default:
                break;
        }
    }

    /* From Stackoverflow https://stackoverflow.com/questions/29149169/how-to-loop-and-render-elements-in-react-js-without-an-array-of-objects-to-map */
    render(){
        return(
            <div>
                {this.state.structureFields.map((component, index) => (
                    this._addComponentToStructure(component, index)
                ))} 
            </div>
        )
    }
}

export default ComponentsMain;
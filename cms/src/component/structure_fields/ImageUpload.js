import React, { Component } from 'react';

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: ""
        }
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file
          });
        }
        reader.readAsDataURL(file)
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <input type="file" onChange={this._handleImageChange} />
                    <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
                </form>
            </div>
        )
    }
}

export default ImageUpload;
import React, { Component } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class WysiwygEditor extends Component {
  constructor(props) {
    super(props);
    // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    // const contentBlock = htmlToDraft(html);
    // if (contentBlock) {
      // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      // const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    // }

  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState: editorState
    }, () => {
      this.props.handleInputChange({data: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent() )), target: {id: this.props.data.label, type: 'wysiwyg-editor'} });
    });
  }
  render() {
    return (
      <div className="form-group row">
            <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
            <div className="col-sm-10">
              <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={e => this.onEditorStateChange(e)}
              />
            </div>
      </div>
    );
  }
}

export default WysiwygEditor;

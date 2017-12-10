import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import axiosInstance from '../../utils/AxiosInstance';
import {Button} from 'react-bootstrap';

class ReferenceEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStructures: null,
            activeButton: ''
        };

        this._fetchAllStructures().then(data => this.setState({
            allStructures: data
        }));
    }

    async _fetchAllStructures() {
        let response = await axiosInstance.get("/admin/listallstructures", {});
        return response.data;
    }

    handleClick(e, entry, eidx) {
        this.setState({activeButton: eidx})
        return this.props.handleInputChange({entryID: entry._id, target: {id: this.props.data.label , type: 'reference-entry'}});    
    }

    renderStructures(structureSlug) {
        const {allStructures} = this.state;
        if (allStructures) {
            return allStructures.map((struct, sidx) => {
                return (
                    <Collapsible trigger={struct.name} key={sidx}>
                        {struct.entries.map((entry, eidx) => {
                            return (
                                <div key={entry.title+eidx}>
                                    <Button 
                                        type="button" onClick={(e) => this.handleClick(e, entry, eidx)} 
                                        bsStyle={this.state.activeButton === eidx ? "primary" : undefined}
                                    >
                                        {entry.title}
                                    </Button>
                                </div>
                            );
                        })}
                    </Collapsible>
                );
            });
        }
    }

    render() {
        return (
            <div>
                {this.renderStructures(this.props.structureSlug)}
            </div>
        )
    }
}

const styles = {
    active: {
        backgroundColor: 'blue',
        fontColor: 'white'
    }
}

export default ReferenceEntry;
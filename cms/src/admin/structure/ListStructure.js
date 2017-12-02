import React, { Component } from 'react';
import axiosInstance from '../../utils/AxiosInstance';

class ListStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structureList: []
        }
        this._getStructureList = this._getStructureList.bind(this);
        this._editStructure = this._editStructure.bind(this);
    }

    componentWillMount() {
        this._getStructureList()
    }

    async _getStructureList() {
        let response = await axiosInstance.get("/admin/liststructures");
        this.setState({
            structureList: response.data
        });   
    }

    _editStructure(structure) {
        this.props.history.push({
            pathname: `/admin/structures/${structure.slug}`,
            state: {structure: structure}
        });
    }

    async _deleteStructure(structure) {
        let payload = {
            slug: structure.slug
        }
        let response = await axiosInstance.delete("/admin/deletestructure", {data : payload});
        this._getStructureList();

        // axios.delete('/remove-structure', deletePayload).then((response) => {
        //     console.log(response);
        //     if(response.data.error) {
        //         alert("Failed to remove structure")
        //         return
        //     }
        //     else {
        //         this.getStructureList()
        //         alert(response.data);                
        //     }
        // });
    }

    render() {
        const { match } = this.props;
        const { url } = match;
        if(this.state.structureList.length > 0) {
            return (
                <div>
                <h1>Total Structures: {this.state.structureList.length}</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th> 
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.structureList.map((structure, index) =>
                            <tr key={index}>
                                <td>{structure.name}</td>
                                <td>{structure.description}</td>                           
                                <td><button className="btn btn-info" onClick={() => this._editStructure(structure)} value={structure.slug}>Edit</button></td>                            
                                <td><button className="btn btn-danger" onClick={() => this._deleteStructure(structure)} value={structure.slug}>Delete</button></td>                            
                            </tr>
                        )}  
                    </tbody>          
                </table>
            </div>
            )
        } else {
            return (
                <div className="error">
                    No Structure entry yet !!
                </div>
            )
        }
    }
}

export default ListStructure;
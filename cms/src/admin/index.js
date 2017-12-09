import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import AddStructure from './structure/AddStructure';
import ListStructure from './structure/ListStructure';
import EditStructure from './structure/EditStructure';
import AddEntry from './entry/AddEntry';

class Admin extends Component {
    render() {
        const { match } = this.props;
        const { url } = match;
        return (     
            <div className="container">                
                <div className="admin-panel">
                    <h1>Admin Panel</h1>
                </div>
                <Router>
                    <div>
                        <ul className="admin-panel-routes">
                            <li><Link to={`${url}/structures/new`}>Add Structure</Link></li>
                            <li><Link to={`${url}/structures`}>List Structures</Link></li>
                            <li><Link to='/users'>List User(s)</Link></li>
                        </ul>
                        <Switch>
                            <Route exact path={`${url}/structures/new`} component={AddStructure}/>
                            <Route exact path={`${url}/structures/:slug/new`} component={AddEntry}/> 
                            <Route exact path={`${url}/structures/:slug`} component={EditStructure}/>                             
                            <Route exact path={`${url}/structures`} component={ListStructure}/>

                            {/* <Route exact path='/admin/structures/:slug/new' component={EntryFormContainer}/>
                            <Route exact path='/admin/structures/:slug' component={EditStructurePage}/>
                            <Route exact path="/admin/structures/:slug/list" component={StructureEntries} /> 
                            <Route exact path="/admin/structures/:slug/:entrySlug" component={EditEntryContainer} /> 
                            <Route path='/admin/structures' component={StructureList}/>
                            <Route exact path='/admin/users' component={UserList}/>                            */}
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Admin;
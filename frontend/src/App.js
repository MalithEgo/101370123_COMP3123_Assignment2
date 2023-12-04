import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/employee-list" component={EmployeeList} />
                <Route path="/add-employee" component={AddEmployee} />
                <Route path="/view-employee/:id" component={ViewEmployee} />
                <Route path="/update-employee/:id" component={UpdateEmployee} />
            </Switch>
        </Router>
    );
};

export default App;

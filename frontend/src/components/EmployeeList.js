import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
            .then((response) => setEmployees(response.data))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee._id}>
                        {employee.name} - {employee.position} - {employee.salary}
                        <Link to={`/view-employee/${employee._id}`}>View</Link>
                        <Link to={`/update-employee/${employee._id}`}>Update</Link>
                    </li>
                ))}
            </ul>
            <Link to="/add-employee">Add Employee</Link>
        </div>
    );
};

export default EmployeeList;

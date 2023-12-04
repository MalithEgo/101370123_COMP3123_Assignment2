import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddEmployee = () => {
    const history = useHistory();
    const [employee, setEmployee] = useState({ name: '', position: '', salary: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/employees', employee);
            history.push('/employee-list');
        } catch (error) {
            console.error('Error adding employee: ', error);
        }
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={employee.name} onChange={handleInputChange} required />
                <label>Position:</label>
                <input type="text" name="position" value={employee.position} onChange={handleInputChange} required />
                <label>Salary:</label>
                <input type="number" name="salary" value={employee.salary} onChange={handleInputChange} required />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;

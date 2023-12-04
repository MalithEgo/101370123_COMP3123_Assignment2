import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams();
    const history = useHistory();
    const [employee, setEmployee] = useState({ name: '', position: '', salary: '' });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/employees/${id}`)
            .then((response) => setEmployee(response.data))
            .catch((error) => console.error('Error fetching employee data: ', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
            history.push('/employee-list');
        } catch (error) {
            console.error('Error updating employee: ', error);
        }
    };

    return (
        <div>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={employee.name} onChange={handleInputChange} required />
                <label>Position:</label>
                <input type="text" name="position" value={employee.position} onChange={handleInputChange} required />
                <label>Salary:</label>
                <input type="number" name="salary" value={employee.salary} onChange={handleInputChange} required />
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;

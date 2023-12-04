import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/employees/${id}`)
            .then((response) => setEmployee(response.data))
            .catch((error) => console.error('Error fetching employee data: ', error));
    }, [id]);

    return (
        <div>
            <h2>View Employee</h2>
            <p>Name: {employee.name}</p>
            <p>Position: {employee.position}</p>
            <p>Salary: {employee.salary}</p>
        </div>
    );
};

export default ViewEmployee;

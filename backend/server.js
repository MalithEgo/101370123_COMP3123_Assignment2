const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MongoDB schema and model
const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/employees', async (req, res) => {
    const { name, position, salary } = req.body;
    const newEmployee = new Employee({ name, position, salary });

    try {
        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/employees/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, position, salary },
            { new: true }
        );
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Employee.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

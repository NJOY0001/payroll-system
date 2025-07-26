const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    empName: {
        type: String,
        required: true
    },
    address: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    bankAccount: String,
    position: String,
    startDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    lastWorkingDay: Date,
    salary: {
        type: Number,
        required: true
    },
    attendance: Number,
    welfare: Number,
    additionalIncome: [{
        type: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
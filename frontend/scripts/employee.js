document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const employeeTable = document.getElementById('employeeTable');
    const statusSelect = document.getElementById('status');
    const lastDayContainer = document.getElementById('lastDayContainer');

    // Handle status change
    statusSelect.addEventListener('change', (e) => {
        if (e.target.value === 'inactive') {
            lastDayContainer.style.display = 'block';
        } else {
            lastDayContainer.style.display = 'none';
        }
    });

    // Load employees
    async function loadEmployees() {
        try {
            const response = await fetch('/api/employees');
            const employees = await response.json();
            renderEmployeeTable(employees);
        } catch (error) {
            console.error('Error loading employees:', error);
        }
    }

    // Save employee
    async function saveEmployee(employeeData) {
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });
            const result = await response.json();
            if (result.success) {
                loadEmployees();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    }

    // Form submission
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(employeeForm);
        const employeeData = Object.fromEntries(formData.entries());
        saveEmployee(employeeData);
    });

    // Initialize
    loadEmployees();
});
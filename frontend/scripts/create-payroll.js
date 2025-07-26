document.addEventListener('DOMContentLoaded', () => {
    const payrollMonth = document.getElementById('payrollMonth');
    const payrollTable = document.getElementById('payrollCreateTable');
    const saveButton = document.getElementById('savePayroll');
    const calculateButton = document.getElementById('calculateAll');

    // Set default month
    const today = new Date();
    payrollMonth.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    // Load employee data
    async function loadEmployeeData() {
        try {
            const response = await fetch('/api/employees');
            const employees = await response.json();
            renderPayrollTable(employees);
        } catch (error) {
            console.error('Error loading employees:', error);
        }
    }

    // Calculate totals
    function calculateTotals(row) {
        const inputs = row.querySelectorAll('input[type="number"]');
        let total = 0;
        inputs.forEach(input => {
            if (input.dataset.type === 'income') {
                total += parseFloat(input.value || 0);
            } else if (input.dataset.type === 'deduction') {
                total -= parseFloat(input.value || 0);
            }
        });
        row.querySelector('.total-amount').textContent = total.toFixed(2);
    }

    // Save payroll
    async function savePayroll() {
        const rows = payrollTable.querySelectorAll('tbody tr');
        const payrollData = Array.from(rows).map(row => {
            const inputs = row.querySelectorAll('input');
            const data = {
                employeeId: row.dataset.employeeId,
                month: payrollMonth.value
            };
            inputs.forEach(input => {
                data[input.name] = parseFloat(input.value || 0);
            });
            return data;
        });

        try {
            const response = await fetch('/api/payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payrollData)
            });
            const result = await response.json();
            if (result.success) {
                alert('บันทึกข้อมูลเรียบร้อยแล้ว');
            }
        } catch (error) {
            console.error('Error saving payroll:', error);
        }
    }

    // Event listeners
    saveButton.addEventListener('click', savePayroll);
    calculateButton.addEventListener('click', () => {
        const rows = payrollTable.querySelectorAll('tbody tr');
        rows.forEach(calculateTotals);
    });

    // Initialize
    loadEmployeeData();
});
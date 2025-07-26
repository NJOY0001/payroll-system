document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dataForm');
    const output = document.getElementById('output');
    const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';

    // Handle month selection
    document.getElementById('monthPicker').addEventListener('change', loadPayrollData);

    // Load payroll data
    async function loadPayrollData() {
        const selectedMonth = document.getElementById('monthPicker').value;
        try {
            const response = await fetch(`${SCRIPT_URL}?action=getPayrollData&month=${selectedMonth}`);
            const data = await response.json();
            renderPayrollTable(data);
            updateTotalPayroll(data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Render table data
    function renderPayrollTable(data) {
        const tbody = document.getElementById('payrollData');
        tbody.innerHTML = '';
        
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.employeeId}</td>
                <td>${row.employeeName}</td>
                <td>${row.position}</td>
                <td>${formatCurrency(row.totalIncome)}</td>
                <td>${formatCurrency(row.netPay)}</td>
                <td>${formatCurrency(row.totalSalary)}</td>
                <td>${formatCurrency(row.totalOtherIncome)}</td>
                <td>${formatCurrency(row.totalDeductions)}</td>
                <td>${formatCurrency(row.baseSalary)}</td>
                <td>${formatCurrency(row.diligenceAllowance)}</td>
                <td>${formatCurrency(row.overtime)}</td>
                <td>${formatCurrency(row.welfare)}</td>
                <td>${formatCurrency(row.socialSecurity)}</td>
                <td>${formatCurrency(row.studentLoan)}</td>
                <td>${formatCurrency(row.advance)}</td>
                <td>${formatCurrency(row.tax)}</td>
                <td>${formatCurrency(row.late)}</td>
                <td>${formatCurrency(row.others)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(amount);
    }

    // Export functions
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
    document.getElementById('exportExcel').addEventListener('click', exportToExcel);

    function exportToPDF() {
        google.script.run.exportToPDF();
    }

    function exportToExcel() {
        google.script.run.exportToExcel();
    }

    // Initial load
    window.onload = loadPayrollData;
});
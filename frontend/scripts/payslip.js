document.addEventListener('DOMContentLoaded', () => {
    const employeeSearch = document.getElementById('employeeSearch');
    const payslipMonth = document.getElementById('payslipMonth');
    const createPDFBtn = document.getElementById('createPDF');
    const printBtn = document.getElementById('print');
    const sendEmailBtn = document.getElementById('sendEmail');
    const actionScope = document.getElementById('actionScope');
    const payslipContent = document.getElementById('payslipContent');

    // Set default month to current month
    const today = new Date();
    payslipMonth.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    let employeeData = [];
    let selectedEmployee = null;

    // Fetch employee data
    async function fetchEmployeeData() {
        try {
            const response = await fetch('/api/employees');
            employeeData = await response.json();
            initializeEmployeeSearch();
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    // Initialize employee search with autocomplete
    function initializeEmployeeSearch() {
        employeeSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const matches = employeeData.filter(employee => 
                employee.id.toLowerCase().includes(searchTerm) ||
                employee.name.toLowerCase().includes(searchTerm)
            );
            
            if (matches.length === 1) {
                selectedEmployee = matches[0];
                generatePayslip(selectedEmployee);
            }
        });
    }

    // Generate payslip content
    async function generatePayslip(employee) {
        try {
            const response = await fetch(`/api/payslip/${employee.id}/${payslipMonth.value}`);
            const payslipData = await response.json();
            
            payslipContent.innerHTML = `
                <div class="payslip-header">
                    <h2>ใบแจ้งเงินเดือน</h2>
                    <p>ประจำเดือน: ${formatThaiMonth(payslipMonth.value)}</p>
                </div>
                <div class="payslip-details">
                    <div>
                        <p>รหัสพนักงาน: ${employee.id}</p>
                        <p>ชื่อ-นามสกุล: ${employee.name}</p>
                        <p>ตำแหน่ง: ${employee.position}</p>
                    </div>
                    <div>
                        <p>แผนก: ${employee.department}</p>
                        <p>เลขที่บัญชี: ${employee.bankAccount}</p>
                    </div>
                </div>
                ${generatePayslipTable(payslipData)}
            `;
        } catch (error) {
            console.error('Error generating payslip:', error);
        }
    }

    // Handle PDF creation
    createPDFBtn.addEventListener('click', async () => {
        const scope = actionScope.value;
        try {
            if (scope === 'single' && !selectedEmployee) {
                alert('กรุณาเลือกพนักงาน');
                return;
            }
            
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    scope,
                    employeeId: selectedEmployee?.id,
                    month: payslipMonth.value
                })
            });
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `payslip_${payslipMonth.value}.pdf`;
            a.click();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    });

    // Handle print functionality
    printBtn.addEventListener('click', () => {
        if (actionScope.value === 'single' && !selectedEmployee) {
            alert('กรุณาเลือกพนักงาน');
            return;
        }
        window.print();
    });

    // Handle email sending
    sendEmailBtn.addEventListener('click', async () => {
        const scope = actionScope.value;
        if (scope === 'single' && !selectedEmployee) {
            alert('กรุณาเลือกพนักงาน');
            return;
        }

        try {
            const response = await fetch('/api/send-payslip-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    scope,
                    employeeId: selectedEmployee?.id,
                    month: payslipMonth.value
                })
            });
            
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('เกิดข้อผิดพลาดในการส่งอีเมล');
        }
    });

    // Helper function to format date in Thai
    function formatThaiMonth(dateString) {
        const [year, month] = dateString.split('-');
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
            'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        return `${thaiMonths[parseInt(month) - 1]} ${parseInt(year) + 543}`;
    }

    // Initialize the page
    fetchEmployeeData();
});
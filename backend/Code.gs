const SHEET_NAME = 'Payroll';

function doGet(e) {
  if (e.parameter.action === 'getPayrollData') {
    return getPayrollData(e.parameter.month);
  }
}

function getPayrollData(month) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Payroll');
  const data = sheet.getDataRange().getValues();
  // Process and filter data based on month
  const filteredData = processPayrollData(data, month);
  
  return ContentService.createTextOutput(JSON.stringify(filteredData))
    .setMimeType(ContentService.MimeType.JSON);
}

function exportToPDF() {
  // PDF export logic
}

function exportToExcel() {
  // Excel export logic
}

function processPayrollData(data, month) {
  // Data processing logic
}

function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  if (params.action === 'add') {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([params.name, params.position, params.salary, params.date]);
    return ContentService.createTextOutput(JSON.stringify({result: 'success'})).setMimeType(ContentService.MimeType.JSON);
  }
}
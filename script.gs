function convertDatesToUTC() {
  const SHEET_NAME = "Sheet2"; // Updated to Sheet2
  const COLUMN_INDEX = 4; // Column D (A=1, B=2, C=3, D=4)

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    Logger.log(`Sheet "${SHEET_NAME}" not found.`);
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow === 0) return; // Exit if the sheet is empty

  const range = sheet.getRange(1, COLUMN_INDEX, lastRow, 1);
  const data = range.getValues();

  for (let i = 0; i < data.length; i++) {
    let cellValue = data[i][0]; // Get existing value in column D

    if (cellValue instanceof Date) {
      // If cell contains a Date object
      let formattedUTC = formatToUTC(cellValue);
      sheet.getRange(i + 1, COLUMN_INDEX).setValue(formattedUTC);
    }
  }
}

function formatToUTC(dateObj) {
  let year = dateObj.getFullYear();
  let month = padZero(dateObj.getMonth() + 1); // Months are 0-indexed
  let day = padZero(dateObj.getDate());

  let randomTime = getRandomTime(); // Generate a random time

  return `${year}-${month}-${day} ${randomTime}+00`; // PostgreSQL UTC format
}

function getRandomTime() {
  let hours = Math.floor(Math.random() * 24); // 0 - 23
  let minutes = Math.floor(Math.random() * 60); // 0 - 59
  let seconds = Math.floor(Math.random() * 60); // 0 - 59

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0'); // Ensures two-digit format (e.g., 01, 09, 12)
}

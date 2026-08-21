const SHEET_ID = '1UOENv7pk5oQG1KPkSOHMgHtR-tXHZtKgFH8xe-k-Tso';
const SHEET_NAME = 'Sheet1';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('เอกสารของฉัน · My Documents')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getUserData() {
  const email = Session.getActiveUser().getEmail().trim().toLowerCase();

  if (!email.endsWith('@mfu.ac.th')) {
    return { error: 'not_mfu', email: email };
  }

  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const rowEmail = String(r[1]).trim().toLowerCase();
    if (rowEmail !== email) continue;

    return {
      email:            email,
      name:             val(r[2]),
      project_title:    val(r[3]),
      grant_type:       val(r[4]),
      school:           val(r[5]),
      budget:           val(r[6]),
      doc_status:       val(r[7]),
      comment:          val(r[8]),
      comment_link:     val(r[9]),
      reviewer:         val(r[10]),
      bank_name:        val(r[11]),
      bank_account:     val(r[12]),
      bank:             val(r[13]),
      bank_branch:      val(r[14]),
      proposal_link:    val(r[15]),
      bookbank_link:    val(r[16]),
      other_docs:       val(r[17]),
      appointment_date: val(r[18]),
    };
  }

  return { error: 'not_found', email: email };
}

function val(v) {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

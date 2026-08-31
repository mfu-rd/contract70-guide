const SHEET_ID   = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const SHEET_NAME = PropertiesService.getScriptProperties().getProperty('SHEET_NAME') || 'Sheet1';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('เอกสารของฉัน · My Documents')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes')
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

// เปิดสิทธิ์ดูเอกสารในคอลัมน์ J ให้อีเมลในคอลัมน์ B ของแต่ละแถว
function shareColumnJDocs() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const log = [];

  for (let i = 1; i < rows.length; i++) {
    const email = String(rows[i][1]).trim();
    const link  = String(rows[i][9]).trim();

    if (!email || !link) continue;

    const fileIds = extractAllFileIds(link);
    if (fileIds.length === 0) {
      log.push(`Row ${i + 1}: ดึง file ID ไม่ได้ — "${link}"`);
      continue;
    }

    for (const fileId of fileIds) {
      try {
        const file = DriveApp.getFileById(fileId);
        file.addViewer(email);
        log.push(`Row ${i + 1}: ✓ share "${file.getName()}" → ${email}`);
      } catch (e) {
        log.push(`Row ${i + 1}: ✗ ${e.message} (fileId: ${fileId}, email: ${email})`);
      }
    }
  }

  Logger.log(log.join('\n'));
  return log;
}

// ดึง file ID ทั้งหมดที่อยู่ใน string (รองรับหลายลิงก์ต่อช่อง)
function extractAllFileIds(text) {
  const ids = [];
  const re = /(?:\/d\/|id=|\/file\/d\/)([A-Za-z0-9_-]{25,})/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    ids.push(m[1]);
  }
  return ids;
}

# new-research-portal

สร้าง project ใหม่สำหรับระบบ Handbook + GAS Portal สำหรับโครงการทุนวิจัย มฟล.

---

## สถาปัตยกรรม

```
GitHub repo (private)
  ├── index.html          → Netlify → https://[name].netlify.app
  └── gas/
        ├── Code.gs       → clasp push → GAS deployment URL
        ├── index.html    ↗
        └── appsscript.json
```

## Checklist: เริ่ม project ใหม่

### 1. Google Sheet
- [ ] สร้าง Sheet: Row 1 = header, Col B = email (lowercase)
- [ ] จด Spreadsheet ID จาก URL
- [ ] นับ column index ทุก field ที่จะใช้ (เริ่ม 0) — **อย่าเดา**

### 2. GitHub repo
- [ ] `git init` + สร้าง repo บน GitHub (private)
- [ ] สร้าง `.claude/commands/` สำหรับ slash commands

### 3. GAS Portal
- [ ] `npm install -g @google/clasp` (ถ้ายังไม่มี)
- [ ] `clasp login` (ใช้ account @mfu.ac.th)
- [ ] `mkdir gas && cd gas && clasp create --type webapp --rootDir .`
- [ ] เขียน `Code.gs` (doGet + getUserData + val helper)
- [ ] เขียน `gas/index.html` (UI + language toggle + dark mode)
- [ ] เพิ่ม `"timeZone": "Asia/Bangkok"` ใน `appsscript.json`
- [ ] `clasp push` → GAS editor → New deployment (เก็บ ID!)
- [ ] บันทึก Deployment ID ใน `.claude/commands/gas-deploy.md`

### 4. Handbook
- [ ] สร้าง `index.html` ที่ root
- [ ] สร้าง `.claude/commands/edit-handbook.md` บันทึกโครงสร้าง + placeholder

### 5. Netlify
- [ ] app.netlify.com → Add site → GitHub → เว้นว่างทุก build field → Deploy
- [ ] Site settings → Change project name
- [ ] ตั้ง GitHub repo เป็น private

---

## Code templates

### Code.gs
```javascript
const SHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('ชื่อระบบ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getUserData() {
  const email = Session.getActiveUser().getEmail().trim().toLowerCase();
  if (!email.endsWith('@mfu.ac.th')) return { error: 'not_mfu', email };
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (String(r[1]).trim().toLowerCase() !== email) continue;
    return { email, name: val(r[2]) /* เพิ่ม field ตาม sheet */ };
  }
  return { error: 'not_found', email };
}

function val(v) { if (v===null||v===undefined) return ''; return String(v).trim(); }
```

### Language toggle CSS
```css
[data-lang="th"] .en { display: none !important; }
[data-lang="en"] .th { display: none !important; }
```

### Dark mode token pattern
```css
:root { --bg: #f2f5fa; --text: #1a2535; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --bg: #111c2d; --text: #d0dcea; }
}
:root[data-theme="dark"]  { --bg: #111c2d; --text: #d0dcea; }
:root[data-theme="light"] { --bg: #f2f5fa; --text: #1a2535; }
body { background: var(--bg); color: var(--text); }
```

### Mobile viewport JS fallback (GAS)
ดูรายละเอียดและ fix ที่สมบูรณ์ใน memory `project_gas_portal.md` — ต้องทำ 2 วิธีพร้อมกัน: `addMetaTag()` ใน doGet() และ JS `screen.width` check ใน `<head>`

### Multi-file links (comment_link field)
```javascript
var links = d.comment_link.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
var wrap = document.getElementById('comment-link-wrap');
wrap.innerHTML = '';
links.forEach((url, i) => {
  var a = document.createElement('a');
  a.href = url; a.target = '_blank'; a.className = 'fbtn';
  var label = links.length > 1 ? ' ('+(i+1)+')' : '';
  a.innerHTML = '<span class="th">📄 ดูเอกสาร'+label+'</span>'
              + '<span class="en">View Document'+label+'</span>';
  wrap.appendChild(a);
});
```

---

## Deploy workflow

- **Handbook:** `/deploy`
- **GAS portal:** `/gas-deploy`

---

## Gotchas

1. **Column mapping** — นับ index จาก Sheets จริงเสมอ อย่าเดาจาก header
2. **GAS Deployment ID** — จดทันทีหลัง deploy ครั้งแรก ห้าม create new จาก UI
3. **Mobile viewport** — ต้องทำทั้ง addMetaTag() และ JS fallback
4. **Netlify vs GitHub Pages** — GitHub Pages ต้องการ repo public; Netlify ไม่ต้อง
5. **comment_link** — split ด้วย `/[\n,]+/` รับทั้ง newline และ comma
6. **clasp login** — รัน `clasp login` ใหม่ถ้า token หมดอายุ
7. **dark mode** — สีต้องกำหนดทั้งใน media query และ [data-theme] selector แยกกัน

---

## อ้างอิง project มฟล. 70

ดู `gas-deploy.md` สำหรับ Script ID, Deployment ID, และ Live URL
ดู `deploy.md` สำหรับ Netlify URL และ repo info

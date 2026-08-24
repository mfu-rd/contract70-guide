# sync-content

อ่าน `content.md` (source of truth) แล้ว sync เนื้อหาที่เปลี่ยนแปลงไปยัง `index.html`

## วิธีทำงาน

1. อ่าน `content.md` ทั้งไฟล์เพื่อเข้าใจเนื้อหาปัจจุบัน
2. อ่าน `index.html` เพื่อหาตำแหน่งที่ต้องอัปเดต
3. อัปเดตเฉพาะส่วนเนื้อหา (ข้อความ TH/EN, รายการ checklist, วันที่, URL) — **ห้ามแตะ CSS, JS, หรือโครงสร้าง HTML**
4. รายงานสิ่งที่เปลี่ยนแปลงไปให้ผู้ใช้ทราบ

## กฎสำคัญ

- `content.md` คือ source of truth — ถ้า index.html ต่างจาก content.md ให้ถือว่า content.md ถูกต้อง
- ข้อความ TH ต้องอยู่ใน `<span class="th">` เสมอ เพื่อให้ font Prompt ทำงาน
- ข้อความ EN ต้องอยู่ใน `<span class="en">` เสมอ
- Placeholder URL (`GOOGLE_FORM_URL`, `PORTAL_URL_HERE` ฯลฯ) และวันที่ (`[วันที่]`, `[ช่วงวันที่]`) — ถ้ายังไม่มีค่าจริงใน content.md ให้คงไว้เหมือนเดิม
- หลังแก้แล้วให้แจ้งผู้ใช้ว่า sync เสร็จ พร้อมสรุปสิ่งที่เปลี่ยน — **อย่า commit โดยอัตโนมัติ** รอให้ผู้ใช้รีวิวก่อน

## โครงสร้างไฟล์

```
index.html   — ไฟล์หลัก (bilingual TH/EN, deploy ผ่าน Netlify)
content.md   — source of truth สำหรับเนื้อหา
DESIGN.md    — design system (CSS tokens, layout rules)
```

## Mapping หลัก content.md → index.html

| Section content.md | Element ใน index.html |
|---|---|
| SECTION 1 (เอกสารแนบ) | card `id="docs"` |
| SECTION 2 (บัญชีธนาคาร) | card `id="account"` |
| SECTION 3 (จัดส่งเอกสาร) | card `id="submit"` |
| SECTION 4 (ลงนามสัญญา) | card `id="sign"` |
| PORTAL | div `id="portal"` |
| DATES | ทุก element ที่มี `[วันที่]` / `[ช่วงวันที่]` |
| LINKS | `href` ของปุ่ม/ลิงก์ทุกอัน |

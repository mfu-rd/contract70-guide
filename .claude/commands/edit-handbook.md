# edit-handbook

แก้ไขเนื้อหาใน `index.html` (คู่มือจัดทำสัญญาทุนวิจัย มฟล. session 1)

---

## โครงสร้างไฟล์ `index.html`

### Header (`<header class="site-header">`)
- ชื่อเรื่องหน้าเว็บ, ปีงบประมาณ
- **ไม่มี** placeholder วันที่หรือลิ้งค์

### Nav (`<nav class="site-nav">`)
- ปุ่ม TH/EN toggle, dark mode toggle
- ลิ้งค์ไปแต่ละ section (#docs, #account, #submit, #sign, #portal)
- **ไม่ต้องแก้ไขเนื้อหา**

### Sidebar (desktop) + Mobile Timeline
- แสดง 4 ขั้นตอนพร้อม **วันที่/กำหนดการ**
- placeholder: `tl-dt` class ใน mobile timeline
- Timeline step 3 = deadline ส่งเอกสาร PDF
- Timeline step 4 = ช่วงวันลงนาม

---

## Section 1 — เอกสารแนบท้ายสัญญา (`id="docs"`)

**เนื้อหา:** ขั้นตอนเตรียม + ลงนามข้อเสนอโครงการ 2 ฉบับ

- checklist: พิมพ์ / ลงนามทุกหน้า / ลงนาม PI / co-PI
- warning: ให้ตรวจสอบและแก้ไขก่อน (ลิ้งค์ไป #portal)
- info: แนะนำใช้ปากกาสีน้ำเงิน

**ห้ามวางที่นี่:** ลิ้งค์ประกาศรายชื่อผู้ได้รับทุน (อยู่ใน section 2)

---

## Section 2 — การเปิดบัญชี (`id="account"`)

**เนื้อหา:** เปิดบัญชีออมทรัพย์บุคคลธรรมดาสำหรับโครงการวิจัย

- info: เงื่อนไขการใช้บัญชีเก่า
- **เอกสารบุคลากรไทย** (cl th / cl en):
  1. **ประกาศรายชื่อผู้ได้รับทุน** → `ANNOUNCEMENT_URL` placeholder (ลิ้งค์ dlink)
  2. บัตรประชาชน
  3. บัตรพนักงาน (บัตรขาว)
  4. เงินสด 500 บาท
- **เอกสารบุคลากรต่างชาติ** (cl th / cl en):
  1. **ประกาศรายชื่อผู้ได้รับทุน** → `ANNOUNCEMENT_URL` placeholder (ลิ้งค์ dlink)
  2. Passport / TD / CI
  3. Non-Immigrant Visa (B, EX, F, IB, RS, Smart, LTR)
  4. เอกสารแสดงตน

> ลิ้งค์ประกาศรายชื่อผู้ได้รับทุนอยู่ใน section นี้เท่านั้น — ไม่ใช่ section 1 และไม่ใช่ notice แยกก่อน section 1

---

## Section 3 — การจัดส่งเอกสาร (`id="submit"`)

**เนื้อหา:** ส่ง PDF ผ่าน Google Form **2 ส่วนแยกกัน** deadline ต่างกัน

### ส่วนที่ 1 — ข้อเสนอโครงการ
- deadline badge: `DEADLINE_PROPOSAL` placeholder
- checklist: Scan ข้อเสนอโครงการที่ลงนามแล้ว 1 ไฟล์
- ปุ่ม: `GOOGLE_FORM_URL_PROPOSAL` placeholder

### ส่วนที่ 2 — สมุดบัญชีและข้อมูลธนาคาร
- deadline badge: `DEADLINE_BANK` placeholder
- checklist: Scan สมุดบัญชี + กรอกข้อมูลธนาคาร
- ปุ่ม: `GOOGLE_FORM_URL_BANK` placeholder

---

## Section 4 — การลงนามสัญญา (`id="sign"`)

**เนื้อหา:** มาลงนามด้วยตัวเองในช่วงวันที่กำหนด

- ช่วงวันลงนาม: placeholder ในทั้ง `.al.ok.th` และ `.al.ok.en`
- สถานที่: ส่วนบริหารงานวิจัย อาคาร AS ชั้น 2
- เอกสารที่ต้องนำมา:
  1. ข้อเสนอโครงการลงนามแล้ว 2 ฉบับ
  2. สำเนาบัญชีธนาคาร รับรองสำเนา 3 ฉบับ
  3. สำเนาบัตรประชาชน รับรองสำเนา 1 ฉบับ
  4. **หนังสือแจ้งยืนยันการโอนเงิน** → `BANK_TRANSFER_FORM_URL` placeholder (dlink)

---

## Portal block (`id="portal"`)

- ปุ่มเข้าระบบ "เอกสารของฉัน"
- placeholder: `PORTAL_URL_HERE`

---

## Placeholder ทั้งหมดและค่าปัจจุบัน

| Placeholder | ค่าที่เติมแล้ว | หมาย |
|---|---|---|
| ประกาศรายชื่อฯ (section 2) | ✅ เติมแล้ว | ลิ้งค์ Google Drive ไฟล์ประกาศ |
| Deadline ส่งข้อเสนอโครงการ | ✅ 30 สิงหาคม 2569 | section 3 ส่วนที่ 1 + timeline |
| Deadline ส่งสมุดบัญชี | ✅ 4 กันยายน 2569 | section 3 ส่วนที่ 2 |
| ช่วงวันลงนาม | ✅ 7–11 กันยายน 2569 | section 4 + timeline |
| `BANK_TRANSFER_FORM_URL` | ✅ เติมแล้ว | section 4 ข้อ 4 |
| `GOOGLE_FORM_URL_PROPOSAL` | ⏳ รอลิ้งค์ | ปุ่ม section 3 ส่วนที่ 1 |
| `GOOGLE_FORM_URL_BANK` | ⏳ รอลิ้งค์ | ปุ่ม section 3 ส่วนที่ 2 |
| `PORTAL_URL_HERE` | ⏳ รอลิ้งค์ | ปุ่ม portal block |

---

## กฎสำคัญ

1. **อ่านโครงสร้างนี้ก่อนแก้ไขทุกครั้ง** — ห้ามสร้าง section ใหม่หรือเพิ่ม block เพิ่มเติมโดยไม่จำเป็น
2. ถ้าผู้ใช้บอกว่า "ลิ้งค์ X อยู่ในรายการเอกสาร Y" ให้ค้นหา placeholder ที่มีอยู่แล้วใน section นั้น **ก่อน** สร้าง element ใหม่
3. เมื่อแก้วันที่ — อัปเดตทั้ง `.th` และ `.en` เสมอ (BE สำหรับไทย, CE สำหรับอังกฤษ: BE − 543 = CE)
4. เมื่อเติมลิ้งค์ — ใช้ `replace_all: true` เมื่อ placeholder เดียวกันปรากฏหลายจุด
5. หลังแก้ไข — รัน `/deploy` เพื่อ push ขึ้น GitHub Pages

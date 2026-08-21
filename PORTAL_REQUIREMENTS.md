# Portal Requirements — เอกสารของฉัน / My Documents

> **Session 2** ของโปรเจกต์จัดทำสัญญาทุนวิจัย มฟล. ปีงบประมาณ 2570  
> Session 1 = หน้า handbook (`index.html`) ✅ เสร็จแล้ว  
> Session 2 = Portal สำหรับนักวิจัยตรวจสอบสถานะเอกสาร (ไฟล์นี้)

---

## 1. ภาพรวมระบบ / System Overview

Portal คือหน้าเว็บแอปที่สร้างด้วย **Google Apps Script (GAS)** เชื่อมต่อกับ **Google Sheets** เพื่อให้นักวิจัย (หัวหน้าโครงการ) ล็อกอินด้วย Google Account แล้วดูสถานะเอกสารของตัวเองได้ทันที โดยไม่ต้องติดต่อเจ้าหน้าที่

---

## 2. ผู้ใช้งาน / User Roles

| Role | คำอธิบาย | การเข้าถึง |
|------|-----------|-----------|
| **Researcher** | หัวหน้าโครงการวิจัย | ล็อกอิน → ดูข้อมูลของตัวเองเท่านั้น |
| **Admin** | เจ้าหน้าที่ส่วนบริหารงานวิจัย | จัดการข้อมูลใน Google Sheets โดยตรง (ไม่ต้องมีหน้า admin ใน portal) |

---

## 3. Authentication & Authorization

- ใช้ **Google OAuth** ผ่าน GAS (`Session.getActiveUser().getEmail()`)
- ล็อกอินด้วย **MFU Google Account** (`@mfu.ac.th`) เท่านั้น
- ถ้าอีเมลไม่ใช่ `@mfu.ac.th` → แสดงข้อความให้ใช้อีเมลมหาวิทยาลัย
- ถ้าอีเมลเป็น `@mfu.ac.th` แต่ไม่มีในรายการ Sheets → แสดง "ไม่พบข้อมูลของท่านในระบบ" (ไม่มีสิทธิ์เข้าถึง)
- **Row-level authorization:** นักวิจัยเห็นเฉพาะแถวที่ `email` ตรงกับตัวเองเท่านั้น — ไม่มีทางเข้าถึงข้อมูลคนอื่นได้แม้แก้ URL

---

## 4. Data Source — Google Sheets

**Spreadsheet ID:** `1UOENv7pk5oQG1KPkSOHMgHtR-tXHZtKgFH8xe-k-Tso`  
**Sheet name:** `Sheet1`

### 4.1 Column Structure

| col | ชื่อ Field | กรอกโดย | portal แสดงผล |
|-----|-----------|---------|--------------|
| A | ลำดับ | admin | ไม่แสดง |
| B | email | admin | ใช้ lookup เท่านั้น |
| C | หัวหน้าโครงการ | admin | ✅ แสดงชื่อ |
| D | ชื่อโครงการ | admin | ✅ แสดงชื่อโครงการ |
| E | ประเภททุน | admin | ✅ แสดง |
| F | สำนักวิชา/หน่วยงาน | admin | ✅ แสดง |
| G | งบประมาณทั้งโครงการ | admin | ✅ แสดง |
| H | สถานะเอกสาร | admin | ✅ status badge |
| I | รายละเอียดการแก้ไข(ถ้ามี) | admin | ✅ แสดง comment |
| J | ไฟล์เอกสารที่ต้องแก้ไข | admin | ✅ ปุ่มลิงก์ (ถ้ามี) |
| K | ชื่อบัญชี | **อาจารย์กรอกผ่าน Form** | ✅ แสดงถ้าไม่ว่าง |
| L | เลขบัญชี | **อาจารย์กรอกผ่าน Form** | ✅ แสดงถ้าไม่ว่าง |
| M | ธนาคาร | **อาจารย์กรอกผ่าน Form** | ✅ แสดงถ้าไม่ว่าง |
| N | สาขา | **อาจารย์กรอกผ่าน Form** | ✅ แสดงถ้าไม่ว่าง |
| O | ไฟล์ proposal | **อาจารย์กรอกผ่าน Form** | ✅ ปุ่มลิงก์ถ้าไม่ว่าง |
| P | ไฟล์หน้า bookbank | **อาจารย์กรอกผ่าน Form** | ✅ ปุ่มลิงก์ถ้าไม่ว่าง |
| Q | เอกสารแนบอื่น(ถ้ามี) | **อาจารย์กรอกผ่าน Form** | ✅ ปุ่มลิงก์ถ้าไม่ว่าง |
| R | วันนัดหมาย | admin | ✅ แสดงถ้าไม่ว่าง |

> **หมายเหตุ:** K–R จะว่างจนกว่าอาจารย์จะกรอกผ่าน Google Form — portal แสดงเฉพาะ field ที่ไม่ว่างเท่านั้น

### 4.2 Status Values (H)

| ค่าใน Sheet | ความหมาย | badge สี | แสดง comment+link? |
|------------|---------|---------|-------------------|
| `มีแก้ไข` | ต้องแก้ไขเอกสาร | 🔴 แดง | ✅ ใช่ |
| `ไม่มีแก้ไข` | ไม่มีการแก้ไข | ✅ เขียว | ไม่แสดง |
| *(ว่าง)* | รอการตรวจสอบ | ⚪ เทา | ไม่แสดง |

> Status เพิ่มเติมสามารถเพิ่มทีหลังได้

---

## 5. หน้าที่แสดงผล / Page Layout

### 5.1 หน้าหลัก (หลังล็อกอิน)

```
┌─────────────────────────────────────────────────────┐
│  [Header] เอกสารของฉัน · My Documents               │
│  [email ที่ล็อกอิน] · [ชื่อ-นามสกุล]               │
├─────────────────────────────────────────────────────┤
│  รหัสโครงการ: MFU-2570-001                          │
│  ชื่อโครงการ: ...                                   │
├─────────────────────────────────────────────────────┤
│  [STATUS BADGE] สถานะเอกสาร: ต้องแก้ไขเอกสาร       │
│                                                     │
│  [ถ้า correction_needed]                            │
│  ⚠️ กรุณาแก้ไขตามข้อเสนอแนะที่ได้รับเท่านั้น        │
│     ห้ามมีการเปลี่ยนแปลงงบประมาณอื่นใดเพิ่มเติม     │
│  [🔗 ดูความคิดเห็น / View Comments]                │
├─────────────────────────────────────────────────────┤
│  [ถ้ามีวันนัดหมาย]                                 │
│  📅 วันนัดหมายลงนาม: จันทร์ที่ 15 กันยายน 2568     │
│     เวลา 09:00 – 12:00 น.                          │
│     ส่วนบริหารงานวิจัย อาคาร AS ชั้น 2            │
├─────────────────────────────────────────────────────┤
│  [notes ถ้ามี]                                      │
└─────────────────────────────────────────────────────┘
```

### 5.2 Logic การแสดง Comment Link

- แสดงเฉพาะเมื่อ `doc_status === 'correction_needed'` **และ** `comment_link` ไม่ว่าง
- ถัดจาก link ต้องมีคำเตือน: "กรุณาแก้ไขตามข้อเสนอแนะที่ได้รับ**เท่านั้น** — ห้ามมีการเปลี่ยนแปลงงบประมาณอื่นใดเพิ่มเติม"

### 5.3 Logic การแสดงวันนัดหมาย

- แสดงเฉพาะเมื่อ `appointment_date_th` ไม่ว่าง
- แสดงทั้ง TH และ EN

### 5.4 กรณีพิเศษ

| สถานการณ์ | สิ่งที่แสดง |
|-----------|-----------|
| อีเมลไม่ตรง | ข้อความ "ไม่พบข้อมูลของท่าน" + ช่องทางติดต่อเจ้าหน้าที่ |
| อีเมลไม่ใช่ `@mfu.ac.th` | "กรุณาล็อกอินด้วยอีเมลมหาวิทยาลัย" |
| `doc_status = pending` | แสดง status badge สีเทา ไม่มี comment link |
| `doc_status = approved` | แสดง status badge สีเขียว ไม่มี comment link |

---

## 6. Bilingual Support

- มี **language toggle TH / EN** ที่ header (ปุ่มข้างๆ email pill)
- ค่าเริ่มต้น: ภาษาไทย (`data-lang="th"`)
- กด toggle สลับเป็น EN ได้ — ซ่อน `.th` labels, แสดง `.en` labels
- **กฎ CSS:** `[data-lang="th"] .en { display:none }` / `[data-lang="en"] .th:not(.field-value):not(.loc-date) { display:none }`
  - `.th` class ใช้คู่กับ font Prompt — data field values ที่เป็น `.field-value.th` ต้องแสดงทั้งสองโหมด (เป็นข้อมูล ไม่ใช่ label)
- ใช้ฟอนต์และสีจาก `DESIGN.md` เพื่อให้ match กับ handbook

---

## 7. Design & Styling

- ใช้ design system จาก `DESIGN.md` (QuestUI) เช่นเดียวกับ `index.html`
- Status badge ใช้ Chip component จาก design system
- Warning box (`correction_needed`) ใช้สีแดง/ส้มให้เด่นชัด เหมือน warning ใน index.html

---

## 8. Technical Stack

| ส่วน | เทคโนโลยี |
|------|-----------|
| Backend / Auth | Google Apps Script (GAS) |
| Data | Google Sheets |
| Frontend | HTML + CSS + JS ใน GAS HtmlService |
| Deploy | GAS Web App (publish as web app) |
| Auth method | `Session.getActiveUser().getEmail()` |

---

## 9. Security

- GAS Web App ตั้งค่า: **"Execute as: Me"** + **"Who has access: Anyone with Google account"**
- ตรวจ `@mfu.ac.th` ใน GAS code ก่อนดึงข้อมูล — ถ้าไม่ตรงปฏิเสธทันที
- Researcher เห็นแค่ข้อมูลของตัวเอง (filter by email ใน server-side) — client ไม่ได้รับข้อมูลคนอื่น
- ไม่มี URL parameter ที่ expose project code หรือ email
- ข้อมูลทั้งหมดดึงจาก server-side GAS — client side ไม่ได้เข้าถึง Sheets โดยตรง

---

## 10. Out of Scope (Session 2)

สิ่งเหล่านี้ **ไม่อยู่ใน session 2** — ทำทีหลังถ้าต้องการ:

- [ ] หน้า Admin สำหรับเจ้าหน้าที่อัปเดตสถานะ (ใช้ Sheets โดยตรงแทน)
- [ ] Email notification อัตโนมัติ
- [ ] Upload เอกสารผ่าน portal
- [ ] ประวัติการแก้ไข
- [ ] รองรับผู้ร่วมโครงการ (co-investigator)

---

## 11. Acceptance Criteria

- [ ] นักวิจัย login ด้วย MFU account แล้วเห็นข้อมูลโครงการของตัวเองถูกต้อง
- [ ] Status badge แสดงสีและข้อความตรงกับค่าใน Sheets
- [ ] Comment link และ warning ปรากฏเฉพาะเมื่อ `correction_needed`
- [ ] วันนัดหมายแสดง TH + EN ถูกต้อง
- [ ] อีเมลที่ไม่ตรงกับรายการ → แสดงข้อความ error ชัดเจน
- [ ] Design match กับ QuestUI ใน index.html

---

## CHANGELOG

| วันที่ | การเปลี่ยนแปลง |
|--------|----------------|
| 2026-08-21 | สร้างไฟล์ requirements ครั้งแรก — portal "เอกสารของฉัน" |
| 2026-08-21 | อัปเดต: auth เฉพาะ @mfu.ac.th + row-level authz + bilingual ไม่มี toggle + security model |
| 2026-08-21 | อัปเดต: map column จาก Sheet จริง (DataBase/Sheet1) — R=วันนัดหมาย, K-R กรอกผ่าน Google Form |
| 2026-08-21 | เพิ่ม language toggle TH/EN ที่ header — ค่าเริ่มต้น TH, CSS rule `.en`/`.th` + ข้อยกเว้น `.field-value` |
| 2026-08-21 | แก้ bug budget NaN — strip `,` และ non-numeric chars ก่อน `Number()` (รองรับ admin กรอก "100,000 บาท") |
| 2026-08-21 | ปรับ dark mode tokens ให้ตรงกับ DESIGN.md — cool gray `#24242a`, amber `#dba758` accent |

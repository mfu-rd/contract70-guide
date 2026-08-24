# deploy

Commit และ push การเปลี่ยนแปลงไปยัง Netlify (ผ่าน `master` branch → GitHub)

## ขั้นตอน

1. รัน `git status` เพื่อดูไฟล์ที่เปลี่ยน
2. ถ้าไม่มีอะไรเปลี่ยน — แจ้งผู้ใช้และหยุด
3. รัน `git diff` เพื่อสรุปสิ่งที่เปลี่ยนแปลง
4. ร่าง commit message ภาษาอังกฤษ ตาม conventional commits:
   - `content:` สำหรับเนื้อหา/ข้อความ
   - `fix:` สำหรับแก้บัก
   - `feat:` สำหรับฟีเจอร์ใหม่
   - `style:` สำหรับ CSS/design
   - `docs:` สำหรับ DESIGN.md / README
5. **แสดง commit message ให้ผู้ใช้เห็นก่อน** รอการยืนยัน
6. หลังได้รับการยืนยัน:
   - `git add` เฉพาะไฟล์ที่เกี่ยวข้อง (ไม่ใช้ `git add -A` สุ่มสี่สุ่มห้า)
   - `git commit -m "..."`
   - `git push origin master`
7. แจ้ง URL ที่ deploy: `https://mfucontract70-guid.netlify.app/`
   (Netlify auto-deploy จาก GitHub — รอประมาณ 30 วินาทีหลัง push)

## กฎ

- ห้าม push โดยไม่รอการยืนยัน commit message ก่อน
- ไม่ใช้ `--force` เด็ดขาด
- ถ้ามีไฟล์ที่น่าสงสัย (`.env`, credentials ฯลฯ) ให้แจ้งเตือนก่อน stage

## Remote

- Branch: `master`
- Remote: `origin` → `https://github.com/ptrsswnr/contract70-guide`
- Netlify URL: `https://mfucontract70-guid.netlify.app/`
- Hosting: Netlify (auto-deploy จาก GitHub master branch)

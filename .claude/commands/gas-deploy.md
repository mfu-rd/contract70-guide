# gas-deploy

Deploy การเปลี่ยนแปลง GAS portal (`gas/` folder) ขึ้น Google Apps Script

## ขั้นตอน

1. `cd` เข้าโฟลเดอร์ `gas/` ก่อนเสมอ (clasp จะหา `.clasp.json` ที่นั่น)
2. รัน `clasp push` เพื่ออัพโหลดไฟล์ขึ้น HEAD
3. รัน `clasp deploy --deploymentId <id>` เพื่ออัพเดต URL เดิม
   - Deployment ID ปัจจุบัน: `AKfycbx9641x1NncsGsaCKjNKbkbXvZfNCVdBqIqdUv0zaeESRWwnq9LTc3e-fWfOhc5nQW6nQ`
4. Live URL: `https://script.google.com/a/macros/mfu.ac.th/s/AKfycbx9641x1NncsGsaCKjNKbkbXvZfNCVdBqIqdUv0zaeESRWwnq9LTc3e-fWfOhc5nQW6nQ/exec`

```bash
cd gas
clasp push
clasp deploy --deploymentId AKfycbx9641x1NncsGsaCKjNKbkbXvZfNCVdBqIqdUv0zaeESRWwnq9LTc3e-fWfOhc5nQW6nQ
```

## กฎ

- ห้าม create new deployment จาก GAS editor UI เด็ดขาด (จะทำให้กลับไปใช้ code เวอร์ชันเก่า)
- ถ้า `clasp push` fail ด้วย "No credentials" → รัน `clasp login` ก่อน
- ถ้า `clasp push` fail ด้วย "Apps Script API not enabled" → เปิดที่ script.google.com/home/usersettings
- Script ID: `17hHkIfhywCtk-ZgAdUvKSawBp3q6IkLiHy79wo4jkGS-dIksp6O9h7DT`
- GAS Project URL: `https://script.google.com/u/0/home/projects/17hHkIfhywCtk-ZgAdUvKSawBp3q6IkLiHy79wo4jkGS-dIksp6O9h7DT/edit`

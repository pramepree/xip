const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // เพื่อให้สามารถอ่าน JSON จาก body ของคำขอ POST ได้

// เส้นทางสำหรับรับคำขอ GET ที่ /api1
app.get('/api1', async (req, res) => {
  try {
    // ส่งคำขอไปยัง API ภายนอก
    const response = await axios.get('https://servermongodb-angular.onrender.com/articles');
    
    // ส่งค่าตอบกลับจาก API ภายนอกมายังผู้เรียกใช้
    res.json(response.data);
  } catch (error) {
    // จัดการข้อผิดพลาดและส่งข้อความกลับไปยังผู้เรียกใช้
    res.status(500).send('Failed to fetch data from API 1');
  }
});

// เส้นทางสำหรับรับคำขอ POST ที่ /api1
app.post('/api1', async (req, res) => {
  try {
    // ส่งคำขอไปยัง API ภายนอก
    const response = await axios.post('https://servermongodb-angular.onrender.com/articles', req.body);
    
    // ส่งค่าตอบกลับจาก API ภายนอกมายังผู้เรียกใช้
    res.status(response.status).json(response.data);
    console.log(response.data);
  } catch (error) {
    // จัดการข้อผิดพลาดและส่งข้อความกลับไปยังผู้เรียกใช้
    res.status(500).send('Failed to post data to API 1');
  }
});

app.listen(5000, () => {
  console.log('API Gateway is running on port 5000');
});

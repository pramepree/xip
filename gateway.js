const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// สร้าง Proxy middleware สำหรับ API 1
const api1Proxy = createProxyMiddleware({
  target: 'https://servermongodb-angular.onrender.com', // URL ของ API 1
  changeOrigin: true,
  pathRewrite: {
    '/': '',
  },
});

// เส้นทางสำหรับเรียกใช้งาน API 1
app.use('/', api1Proxy);

// เส้นทางสำหรับรับคำขอ GET
app.get('/articles', (req, res) => { //gatway รับ
  // เรียกใช้งาน API 1 โดยใช้ http-proxy-middleware
  api1Proxy(req, res, () => {
    // ในกรณีที่เกิดข้อผิดพลาดในการเรียกใช้งาน API 1
    res.status(500).send('Failed to fetch data from API 1');
  });
});

app.listen(4000, () => {
  console.log('API Gateway is running on port 4000');
});

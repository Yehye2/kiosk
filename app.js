const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// API 파일 임포트
const itemRoutes = require('./routes/items');
const orderRoutes = require('./routes/order_item');
const optionRoutes = require('./routes/option');
const itemOrderCustomerRoutes = require('./routes/item_order_customer');

// 라우터 등록
app.use('/items', itemRoutes);
app.use('/order', orderRoutes);
app.use('/option', optionRoutes);
app.use('/item_order', itemOrderCustomerRoutes);

// 정적 파일 제공
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'item.html'));
});

app.get('/item_order_customer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'item_order_customer.html'));
});


app.get('/itemManagement', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'itemManagement.html'));
});

// 서버 실행
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
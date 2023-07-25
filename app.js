const express = require('express');
const app = express();

// 모델 파일 임포트
const sequelize = require('./db'); // Sequelize 인스턴스
const ItemModel = require('./models/item')(sequelize); // 모델 정의

// API 파일 임포트
const itemRoutes = require('./routes/items');

// 라우터 등록
app.use('/items', itemRoutes);

// 정적 파일 제공
app.use(express.static('public'));

// 서버 실행
const port = 3003;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

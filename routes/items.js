const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// 상품 추가 API
router.post('/add-item', async (req, res) => {
    const { name, price, type } = req.body;

    try {
        // 이름, 가격이 없을 경우 에러 메시지 반환
        if (!name || !price) {
            return res.status(400).json({ message: '이름과 가격을 입력해주세요' });
        }

        // 알맞은 타입이 아닐 경우 에러 메시지 반환
        if (!['coffee', 'juice', 'food'].includes(type)) {
            return res.status(400).json({ message: '알맞은 타입을 지정해주세요' });
        }

        // 데이터베이스에 상품 추가
        const newItem = await Item.create({
            name,
            price,
            type,
            amount: 0, // 기본 수량(amount)은 0으로 고정
        });

        res.json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 추가 중에 오류가 발생했습니다.' });
    }
});

module.exports = router;

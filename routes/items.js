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

// 상품 조회 API
router.get('/get-items', async (req, res) => {
    try {
        const { type } = req.query;

        let items;
        if (type) {
            // 특정 타입의 상품 검색
            items = await Item.findAll({ where: { type } });
        } else {
            // 모든 상품 검색
            items = await Item.findAll();
        }

        if (items.length === 0) {
            return res.status(404).json({ message: '상품이 없습니다.' });
        }

        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 조회 중에 오류가 발생했습니다.' });
    }
});

// 상품 삭제 API
router.delete('/delete-item/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }

        if (item.amount > 0) {
            // 상품 수량이 남아있는 경우, 1차 API로 확인 메시지 전송
            return res.json({ message: '현재 수량이 남아있습니다. 삭제하시겠습니까?' });
        } else {
            // 상품 수량이 없는 경우, 즉시 삭제
            await item.destroy();
            return res.json({ message: '상품이 삭제되었습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 삭제 중에 오류가 발생했습니다.' });
    }
});

router.patch('/update-item/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, price, type } = req.body;

        if (!name.trim()) {
            return res.status(400).json({ message: '이름을 입력해주세요.' });
        }

        if (price < 0) {
            return res.status(400).json({ message: '알맞은 가격을 입력해주세요.' });
        }

        // 타입이 유효한지 확인
        if (!['coffee', 'juice', 'food'].includes(type)) {
            return res.status(400).json({ message: '알맞은 타입을 지정해주세요.' });
        }

        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
        }

        // 상품 업데이트
        item.name = name;
        item.price = price;
        item.type = type;
        await item.save();

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 수정 중에 오류가 발생했습니다.' });
    }
});

module.exports = router;

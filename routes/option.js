const express = require('express');
const router = express.Router();
const Option = require('../models/option');

router.use(express.json()); // JSON 파싱 미들웨어
router.use(express.urlencoded({ extended: true })); // URL 인코딩 미들웨어

// 상품 옵션 추가 API
router.post('/', async (req, res) => {
    const { extra_price, shot_price, hot } = req.body;

    try {

        // 상품에 옵션을 추가합니다.
        const newOption = await Option.create({
            extra_price,
            shot_price,
            hot,
        });

        res.json(newOption);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 옵션 추가 중에 오류가 발생했습니다.' });
    }
});

// 상품의 옵션 조회 API
router.get('/', async (req, res) => {
    const { itemId } = req.params;

    try {

        // 상품에 해당하는 옵션들을 가져옵니다.
        const options = await Option.findAll({ where: { ItemId: itemId } });

        if (options.length === 0) {
            return res.status(404).json({ message: '해당 상품의 옵션이 없습니다.' });
        }

        res.json(options);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 옵션 조회 중에 오류가 발생했습니다.' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Option = require('../models/option');

router.use(express.json()); // JSON 파싱 미들웨어
router.use(express.urlencoded({ extended: true })); // URL 인코딩 미들웨어

let cachedOptions = []; // 서버 메모리에 옵션 데이터를 캐싱할 전역 변수

// 서버 시작 시 모든 옵션 데이터를 메모리에 캐싱합니다.
(async () => {
    try {
        cachedOptions = await Option.findAll();
        console.log('옵션 데이터를 메모리에 캐싱하였습니다.');
    } catch (error) {
        console.error('옵션 데이터를 메모리에 캐싱하는 중에 오류가 발생했습니다.', error);
    }
})();

// 상품 옵션 추가 API
router.post('/', async (req, res) => {
    const { itemId, extra_price, shot_price, hot } = req.body;

    try {
        // 상품에 옵션을 추가합니다.
        const newOption = await Option.create({
            extra_price,
            shot_price,
            hot,
            itemId,
        });

        // 옵션 추가 시, 메모리 캐시를 갱신합니다.
        cachedOptions.push(newOption);

        res.json(newOption);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 옵션 추가 중에 오류가 발생했습니다.' });
    }
});

// 상품 옵션 삭제 API
router.delete('/:optionId', async (req, res) => {
    const { optionId } = req.params;

    try {
        // 옵션을 삭제합니다.
        await Option.destroy({ where: { id: optionId } });

        // 옵션 삭제 시, 메모리 캐시를 갱신합니다.
        cachedOptions = cachedOptions.filter((option) => option.id !== parseInt(optionId));

        res.json({ message: '상품 옵션이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 옵션 삭제 중에 오류가 발생했습니다.' });
    }
});

// 상품의 옵션 조회 API
router.get('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    console.log(itemId)

    try {
        // 서버 메모리에 캐싱된 옵션 데이터를 반환합니다.
        if (cachedOptions.length === 0) {
            cachedOptions = await Option.findAll();
        }

        // 상품에 해당하는 옵션들을 가져옵니다.
        const options = cachedOptions.filter((option) => option.ItemId === parseInt(itemId));

        if (options.length === 0) {
            return res.status(404).json({ message: '해당 상품의 옵션이 없습니다.' });
        }

        res.json(options);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 옵션 조회 중에 오류가 발생했습니다.' });
    }
});

// 상품 옵션 초기화 API
router.post('/reset', async (req, res) => {
    try {
        // DB에서 모든 옵션 데이터를 가져옵니다.
        cachedOptions = await Option.findAll();

        res.json({ message: '상품 옵션 데이터를 초기화하였습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '상품 옵션 초기화 중에 오류가 발생했습니다.' });
    }
});

module.exports = router;
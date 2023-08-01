const express = require('express');
const router = express.Router();
const item_order_customer = require('../models/item_order_customer')
const Item = require('../models/item');
const Option = require('../models/option');

router.post('/', async (req, res) => {
    try {
        const { item_id, order_customer_id, amount, option_id } = req.body;

        // item과 option 모델에서 가격을 가져와서 합산
        const item = await Item.findByPk(item_id);
        const option = await Option.findByPk(option_id);

        if (!item || !option) {
            return res.status(404).json({ success: false, message: '물품 또는 옵션을 찾을 수 없습니다.' });
        }

        const price = (item.price + option.price) * amount;

        // item_order_customer 레코드를 생성합니다.
        const orderItem = await item_order_customer.create({
            item_id,
            order_customer_id,
            amount,
            option_id,
            price,
        });

        res.status(201).json({ success: true, data: orderItem });
    } catch (error) {
        console.error('물품 주문 생성 중 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

router.get('/:item_order_customer_id', async (req, res) => {
    try {
        const item_order_customer_id = req.params.item_order_customer_id;

        // 주문한 물품을 검색합니다.
        const orderItems = await item_order_customer.findAll({
            where: { id: item_order_customer_id },
        });

        res.status(200).json({ success: true, data: orderItems });
    } catch (error) {
        console.error('물품 주문 검색 중 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const order_customer = require('../models/order_customer')

router.post('/', async (req, res) => {
    try {
        const { state } = req.body;

        // 주문을 생성합니다.
        const newOrder = await order_customer.create({
            state: state || false, // 주문 상태(state)를 기본값 false로 설정합니다.
        });

        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        console.error('주문 생성 중 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

router.get('/:order_id', async (req, res) => {
    try {
        const order_id = req.params.order_id;

        // 주문 정보를 가져옵니다.
        const orderInfo = await order_customer.findByPk(order_id, {
            include: { model: item_order_customer, as: 'item_order_customers' },
        });

        if (!orderInfo) {
            return res.status(404).json({ success: false, message: '주문 정보를 찾을 수 없습니다.' });
        }

        res.status(200).json({ success: true, data: orderInfo });
    } catch (error) {
        console.error('주문 정보 검색 중 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

router.put('/:order_id', async (req, res) => {
    try {
        const order_id = req.params.order_id;
        const { state } = req.body;

        // 주문 정보를 업데이트합니다.
        const updatedOrder = await order_customer.update(
            { state },
            { where: { id: order_id } }
        );

        if (updatedOrder[0] === 0) {
            return res.status(404).json({ success: false, message: '주문 정보를 찾을 수 없습니다.' });
        }

        res.status(200).json({ success: true, message: '주문 정보가 업데이트되었습니다.' });
    } catch (error) {
        console.error('주문 정보 업데이트 중 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

module.exports = router;
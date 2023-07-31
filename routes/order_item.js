const express = require('express');
const router = express.Router();
const order_item = require('../models/order_item');

// 모든 발주 상품 조회하는 라우트
router.get('/', async (req, res) => {
    try {
        const orderItems = await order_item.findAll({
            include: [{ model: Item, as: 'item' }],
        });
        res.json(orderItems);
    } catch (error) {
        res.status(500).json({ message: '발주 상품을 조회하는데 에러가 발생했습니다' });
    }
});

// 새로운 발주 상품 추가하는 라우트
router.post('/', async (req, res) => {
    try {
        const { item_id, amount, state } = req.body;
        const newItem = await order_item.create({ item_id, amount, state });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: '발주 상품을 추가하는데 에러가 발생했습니다' });
    }
});

// 기존 발주 상품 업데이트하는 라우트
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { item_id, amount, state } = req.body;

        const orderItem = await order_item.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ message: '발주 상품을 찾을 수 없습니다' });
        }

        orderItem.item_id = item_id;
        orderItem.amount = amount;
        orderItem.state = state;
        await orderItem.save();

        res.json(orderItem);
    } catch (error) {
        res.status(500).json({ message: '발주 상품을 업데이트하는데 에러가 발생했습니다' });
    }
});

// 발주 상품 삭제하는 라우트
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const orderItem = await order_item.findByPk(id);
        if (!orderItem) {
            return res.status(404).json({ message: '발주 상품을 찾을 수 없습니다' });
        }

        await orderItem.destroy();
        res.json({ message: '발주 상품이 성공적으로 삭제되었습니다' });
    } catch (error) {
        res.status(500).json({ message: '발주 상품을 삭제하는데 에러가 발생했습니다' });
    }
});

module.exports = router;
const { Router } = require('express');
const asyncHandler = require('../utils/async-handler');
const { deliveryService } = require('../services/deliveryService');

const router = Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const delivery = {};

        if (!req.user.user.delivery) {
            const { title, receiver, code, address, contact } = req.body;

            if (!receiver || !code || !address || !contact) {
                console.log('필수 배송정보를 입력해주세요');
            }
            delivery.result = await deliveryService.addDelivery(req.body);
        }
        // 배송 정보 확인/저장
        // -> 기존에 배송정보 스키마에 있는 정보라면 id 값이 있음
        // -> 없으면 배송정보 스키마에 신규 등록

        // 주문 내역 저장
        // -> 배송 정보, 상품 정보 입력
        // -> 저장
        // 배송 정보 ID
        // const result = await productService.addProduct({ newProduct, contentFile });

        res.status(201).json({
            code: 201,
            message: '주문.',
            data: delivery.result,
        });
    })
);
module.exports = router;

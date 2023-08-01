// 물품 주문 생성
async function createItemOrder() {
    const item_id = document.getElementById('item_id').value;
    const option_id = document.getElementById('option_id').value;
    const amount = document.getElementById('amount').value;

    const requestBody = {
        item_id: parseInt(item_id),
        option_id: parseInt(option_id),
        amount: parseInt(amount),
    };

    try {
        const response = await fetch('/item_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Item Order Created:', data);
        } else {
            console.error('Error Creating Item Order:', response.statusText);
        }
    } catch (error) {
        console.error('Error Creating Item Order:', error.message);
    }
}

// 주문 정보 조회
async function getOrderInfo() {
    const order_id = document.getElementById('order_id').value;

    try {
        const response = await fetch(`/item_order/${order_id}`);

        if (response.ok) {
            const data = await response.json();
            console.log('Order Info:', data);
        } else {
            console.error('Error Getting Order Info:', response.statusText);
        }
    } catch (error) {
        console.error('Error Getting Order Info:', error.message);
    }
}

// 주문 상태 업데이트
async function updateOrderState() {
    const order_id = document.getElementById('update_order_id').value;
    const state = document.getElementById('state').value;

    const requestBody = {
        state: state === 'true', // 문자열을 불리언으로 변환
    };

    try {
        const response = await fetch(`/api/order_customer/${order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            console.log('Order State Updated');
        } else {
            console.error('Error Updating Order State:', response.statusText);
        }
    } catch (error) {
        console.error('Error Updating Order State:', error.message);
    }
}
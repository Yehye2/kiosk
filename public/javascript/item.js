document.getElementById('addItemForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const typeSelect = document.getElementById('type');
    const type = typeSelect.options[typeSelect.selectedIndex].value;

    const response = await fetch('/items/add-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, type }),
    });

    const data = await response.json();

    const resultDiv = document.getElementById('result');
    if (data.message) {
        resultDiv.textContent = data.message;
    } else {
        resultDiv.textContent = `새로운 상품 추가 완료! ID: ${data.id}, 이름: ${data.name}, 가격: ${data.price}, 타입: ${data.type}, 수량: ${data.amount}`;
    }
});

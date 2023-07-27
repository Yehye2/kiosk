let items = [];

// 페이지 로드 시 상품 조회
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getItemsBtn').addEventListener('click', () => {
        getItems();
    });

    document.getElementById('getCoffeeItemsBtn').addEventListener('click', () => {
        getItemsByType('coffee');
    });

    document.getElementById('getJuiceItemsBtn').addEventListener('click', () => {
        getItemsByType('juice');
    });

    document.getElementById('getFoodItemsBtn').addEventListener('click', () => {
        getItemsByType('food');
    });

    getItems(); // 페이지 로드 시 모든 상품 조회
});


// 상품 조회 함수
async function getItems() {
    try {
        const response = await fetch('/items/get-items');
        const itemsData = await response.json();

        // 서버에서 가져온 상품 데이터를 전역의 items 배열에 업데이트합니다.
        items = itemsData;

        let itemsList = "<ul>";
        items.forEach(item => {
            itemsList += `<li>${item.name} - 가격: ${item.price}원 - 타입: ${item.type} 
                          <button class="editBtn" data-itemId="${item.id}">수정</button> 
                          <button class="deleteBtn" data-itemId="${item.id}">삭제</button></li>`;
        });
        itemsList += "</ul>";
        document.getElementById('itemsList').innerHTML = itemsList;
    } catch (err) {
        alert("상품 조회에 실패했습니다.");
        console.error(err); // 콘솔에 오류 출력
    }
}

// 특정 타입의 상품 조회 API
async function getItemsByType(type) {
    try {
        const response = await fetch(`/items/get-items?type=${type}`);
        const items = await response.json();

        let itemsList = "<ul>";
        items.forEach(item => {
            itemsList += `<li>${item.name} - 가격: ${item.price}원 - 타입: ${item.type} 
                          <button class="editBtn" data-itemId="${item.id}">수정</button> 
                          <button class="deleteBtn" data-itemId="${item.id}">삭제</button></li>`;
        });
        itemsList += "</ul>";
        document.getElementById('itemsList').innerHTML = itemsList;

        // 수정 버튼 클릭 이벤트 처리
        const editButtons = document.getElementsByClassName('editBtn');
        for (const btn of editButtons) {
            btn.addEventListener('click', handleEditButtonClick);
        }

        // 삭제 버튼 클릭 이벤트 처리
        const deleteButtons = document.getElementsByClassName('deleteBtn');
        for (const btn of deleteButtons) {
            btn.addEventListener('click', handleDeleteButtonClick);
        }
    } catch (err) {
        alert("상품 조회에 실패했습니다.");
        console.error(err); // 콘솔에 오류 출력
    }
}


// 페이지 로드 시 상품 조회
document.addEventListener('DOMContentLoaded', getItems());


// 상품 수정 버튼 클릭 이벤트 핸들러
function handleEditButtonClick(event) {
    const itemId = event.target.getAttribute('data-itemId');

    // 선택된 상품의 정보 가져오기
    const selectedItem = items.find(item => item.id === parseInt(itemId));
    if (!selectedItem) {
        alert('상품을 찾을 수 없습니다.');
        return;
    }

    // 모달에 상품 정보 설정
    document.getElementById('editName').value = selectedItem.name;
    document.getElementById('editPrice').value = selectedItem.price;

    // 모달 표시
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';

    // 수정 완료 버튼 클릭 이벤트 리스너 추가
    const updateButton = document.getElementById('updateButton');
    updateButton.addEventListener('click', async () => {
        await handleUpdateButtonClick(itemId);
    });
}

// 수정 완료 버튼 클릭 이벤트 핸들러
async function handleUpdateButtonClick(itemId) {
    const newName = document.getElementById('editName').value;
    const newPrice = document.getElementById('editPrice').value;
    const newType = document.getElementById('editType').value;

    try {
        const response = await fetch(`/items/update-item/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                price: parseInt(newPrice),
                type: newType
            })
        });

        const updatedItem = await response.json();
        alert('상품이 수정되었습니다.');
        closeModal(); // 모달 닫기
        getItems(); // 상품 목록 갱신
    } catch (err) {
        alert('상품 수정에 실패했습니다.');
        console.error(err);
    }
}

// 모달 닫기 함수
function closeModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
}


// 상품 삭제 버튼 클릭 이벤트 핸들러
async function handleDeleteButtonClick(event) {
    const itemId = event.target.getAttribute('data-itemId');
    try {
        const response = await fetch(`/items/delete-item/${itemId}`, { method: 'DELETE' });
        const message = await response.json();
        alert(message);
        // 삭제 후 상품 목록 갱신
        getItems();
    } catch (err) {
        alert("상품 삭제에 실패했습니다.");
        console.error(err); // 콘솔에 오류 출력
    }
}

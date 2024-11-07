// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    // 첫 화면은 홈 섹션 표시
    showSection('home');
});

// 섹션 전환 함수
function showSection(sectionId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // 선택한 섹션만 보이기
    document.getElementById(sectionId).classList.remove('hidden');
    
    // 네비게이션 활성화 상태 변경
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');

    // 마이페이지 진입 시 채팅 목록 표시
    if (sectionId === 'mypage') {
        displayChatList();
    }
}

// 갤러리 초기화
function initializeGallery() {
    const samplePosts = [
        {
            id: 1,
            title: "BTS 지민 Proof 포토카드 교환해요",
            location: "서울 강남구",
            haveItem: "지민 Proof 포카",
            wantItem: "뷔 Proof 포카",
            description: "상태 매우 좋음",
            imageUrl: "https://i.imgur.com/1234567.jpg" // 실제 이미지 URL로 교체 필요
        },
        {
            id: 2,
            title: "뉴진스 해린 팝업 특전 교환",
            location: "서울 홍대입구",
            haveItem: "해린 특전 포카",
            wantItem: "민지 특전 포카",
            imageUrl: "https://i.imgur.com/2345678.jpg" // 실제 이미지 URL로 교체 필요
        },
        {
            id: 3,
            title: "아이브 굿즈 교환하실 분!",
            location: "인천 부평구",
            haveItem: "안유진 슬로건",
            wantItem: "장원영 슬로건",
            imageUrl: "https://via.placeholder.com/280/FCE4EC/E91E63?text=IVE"
        },
        {
            id: 4,
            title: "르세라핌 포카 교환해요",
            location: "경기 수원시",
            haveItem: "김채원 unforgiven 포카",
            wantItem: "카즈하 unforgiven 포카",
            imageUrl: "https://via.placeholder.com/280/FCE4EC/E91E63?text=LE+SSERAFIM"
        },
        {
            id: 5,
            title: "엑소 첸백시 굿즈 교환",
            location: "서울 마포구",
            haveItem: "백현 떴떴 포카",
            wantItem: "첸 떴떴 포카",
            imageUrl: "https://via.placeholder.com/280/FCE4EC/E91E63?text=EXO-CBX"
        },
        {
            id: 6,
            title: "투모로우바이투게더 교환",
            location: "부산 해운대구",
            haveItem: "연준 미니포스터",
            wantItem: "수빈 미니포스터",
            imageUrl: "https://via.placeholder.com/280/FCE4EC/E91E63?text=TXT"
        },
        {
            id: 7,
            title: "블랙핑크 포카 교환해요",
            location: "대구 중구",
            haveItem: "제니 born pink 포카",
            wantItem: "리사 born pink 포카",
            imageUrl: "https://via.placeholder.com/280/FCE4EC/E91E63?text=BLACKPINK"
        },
        {
            id: 8,
            title: "트와이스 굿즈 교환",
            location: "서울 송파구",
            haveItem: "나연 ready to be 포카",
            wantItem: "사나 ready to be 포카",
            imageUrl: "https://via.placeholder.com/280/FCE4EC/E91E63?text=TWICE"
        }
    ];

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // 기존 내용 초기화
    
    samplePosts.forEach(post => {
        const postCard = createPostCard(post);
        gallery.appendChild(postCard);
    });
}

// 포스트 카드 생성
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
        <img src="${post.imageUrl}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/280/FCE4EC/E91E63?text=No+Image'">
        <div class="post-card-content">
            <h3>${post.title}</h3>
            <p>📍 ${post.location}</p>
            <p>💝 가진 굿즈: ${post.haveItem}</p>
            <p>💭 원하는 굿즈: ${post.wantItem}</p>
            <button class="chat-button" onclick="openChat(${post.id})">
                채팅하기
            </button>
        </div>
    `;
    return card;
}

// 검색 기능
function searchPosts() {
    const searchType = document.getElementById('searchType').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredPosts = posts.filter(post => 
        post[searchType].toLowerCase().includes(searchTerm)
    );
    
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    
    filteredPosts.forEach(post => {
        const postCard = createPostCard(post);
        searchResults.appendChild(postCard);
    });
}

// 글쓰기 폼 제출
document.getElementById('goodsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const post = {
        id: Date.now(),
        title: document.getElementById('title').value,
        location: document.getElementById('location').value,
        haveItem: document.getElementById('haveItem').value,
        wantItem: document.getElementById('wantItem').value,
        description: document.getElementById('description').value,
        images: [], // 이미지 처리 로직 필요
        date: new Date().toLocaleDateString()
    };

    posts.push(post);
    this.reset();
    showSection('home'); // 글 작성 후 홈으로 이동
    initializeGallery(); // 갤러리 새로고침
});

// 채팅 관련 함수들
function openChat(postId) {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.remove('hidden');
}

function closeChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.add('hidden');
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    
    if (message.trim()) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        messageInput.value = '';
        
        // 메시지가 많아지면 자동 스크롤
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// 전역 변수로 posts 배열 선언
let posts = [];

// 채팅 목록 데이터 (예시)
const chatList = [
    {
        id: 1,
        title: "BTS 포카 교환",
        lastMessage: "네, 내일 만나서 교환하면 될까요?",
        partnerName: "민지님",
        partnerImage: "https://via.placeholder.com/50",
        timestamp: "방금 전"
    },
    {
        id: 2,
        title: "뉴진스 굿즈 교환",
        lastMessage: "포카 상태가 어떤가요?",
        partnerName: "하니님",
        partnerImage: "https://via.placeholder.com/50",
        timestamp: "1시간 전"
    }
];

// 마이페이지 채팅 목록 표시
function displayChatList() {
    const chatListElement = document.getElementById('chatList');
    chatListElement.innerHTML = '';

    chatList.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.onclick = () => openChatRoom(chat.id);
        chatItem.innerHTML = `
            <img src="${chat.partnerImage}" alt="${chat.partnerName}">
            <div class="chat-item-content">
                <div class="chat-item-title">${chat.title}</div>
                <div class="chat-item-last-message">${chat.lastMessage}</div>
            </div>
            <div class="chat-timestamp">${chat.timestamp}</div>
        `;
        chatListElement.appendChild(chatItem);
    });
}

// 채팅방 열기
function openChatRoom(chatId) {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.remove('hidden');
    // 해당 채팅방의 메시지 내역을 불러오는 로직 추가 필요
}
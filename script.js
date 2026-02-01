/* --- AUDIO SFX SETUP --- */
const clickAudio = new Audio('assets/click.mp3');

function playClickSound() {
    clickAudio.currentTime = 0;
    clickAudio.play().catch(error => console.log("Audio waiting for interaction"));
}

/* --- DATABASE PRODUK & VARIAN --- */
const productData = {
    'pubg': {
        title: 'PUBG MOBILE GLOBAL',
        variants: [
            { name: '60 UC', price: '0.83' },
            { name: '325 UC', price: '4.2' },
            { name: '660 UC', price: '8.2' },
            { name: '1800 UC', price: '20.3' },
            { name: '3850 UC', price: '40' },
            { name: '8100 UC', price: '80' }
        ]
    },
    'razer': {
        title: 'RAZER GOLD PIN',
        variants: [
            { name: '$50 USD PIN', price: '40.5' },
            { name: '$100 USD PIN', price: '81' }
        ]
    },
    'itunes': {
        title: 'ITUNES US CARD',
        variants: [
            { name: '$50 USD CARD', price: '36.5' },
            { name: '$100 USD CARD', price: '73' }
        ]
    }
};

/* --- MODAL LOGIC --- */
function openVariantModal(productKey) {
    playClickSound();
    
    const modal = document.getElementById('variantModal');
    const title = document.getElementById('modalTitle');
    const grid = document.getElementById('variantGrid');
    const data = productData[productKey];

    title.innerText = data.title;
    grid.innerHTML = '';

    data.variants.forEach(variant => {
        const btn = document.createElement('div');
        btn.className = 'variant-btn';
        btn.innerHTML = `
            <span class="variant-name">${variant.name}</span>
            <span class="variant-price">$${variant.price}</span>
        `;
        
        btn.onclick = () => {
            playClickSound(); 
            selectVariant(variant.name, variant.price);
        };
        
        grid.appendChild(btn);
    });

    modal.style.display = 'flex';
}

function closeModal() {
    playClickSound();
    document.getElementById('variantModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('variantModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

/* --- SELECTION LOGIC (INI YANG DIPERBAIKI) --- */
function selectVariant(name, price) {
    // Isi Form
    document.getElementById('itemName').value = name;
    
    // PERBAIKAN: Tambahkan '$' di depan harga
    document.getElementById('itemPrice').value = '$' + price; 
    
    // Tutup Modal
    document.getElementById('variantModal').style.display = 'none';
    
    // Pindah ke section Pembayaran
    showSection('pembayaran');
}

/* --- NAVIGATION LOGIC --- */
function toggleNav() {
    playClickSound();
    const sidebar = document.getElementById("mySidebar");
    const overlay = document.getElementById("overlay");
    sidebar.style.left = sidebar.style.left === "0px" ? "-280px" : "0px";
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0,0);
}

/* --- CRYPTO ADDRESS LOGIC --- */
const wallets = {
    'BEP20': '0x1d72fab15514c6bb34d294d704b7cae4a76ba9c2',
    'TRC20': 'TYAEnA8BwpsdCDfdSxSaW7J5zUYMdWJFHF'
};

function updateAddress() {
    const network = document.getElementById('networkSelect').value;
    const displayBox = document.getElementById('walletDisplay');
    const codeElement = document.getElementById('cryptoAddress');

    if (network && wallets[network]) {
        playClickSound();
        displayBox.style.display = 'block';
        codeElement.innerText = wallets[network];
        displayBox.style.animation = 'none';
        displayBox.offsetHeight; 
        displayBox.style.animation = 'fadeIn 0.5s';
    } else {
        displayBox.style.display = 'none';
    }
}

function copyAddress() {
    playClickSound();
    const address = document.getElementById('cryptoAddress').innerText;
    navigator.clipboard.writeText(address).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => { btn.innerHTML = '<i class="far fa-copy"></i> Copy'; }, 2000);
    });
}

/* --- TELEGRAM LOGIC (INI JUGA DIPERBAIKI) --- */
function sendToTelegram() {
    playClickSound();
    const item = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const network = document.getElementById('networkSelect').value;

    if(item === "" || network === "") {
        alert("⚠️ Please select an item and payment network.");
        return;
    }

    // PERBAIKAN: Hapus tanda '$' manual di template, karena variable 'price' sudah membawanya
    const message = `
🔴 *NEW ORDER REQUEST* 🔴
--------------------------------
📦 *Item:* ${item}
💰 *Total:* ${price} (USDT)
🔗 *Network:* ${network}
--------------------------------
*Status:* Waiting for payment proof.
👉 *USER ACTION:* I am ready to send the TXID/Screenshot now.
`;
    const telegramUsername = "NEXUS_marketgame";
    window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`, '_blank');
}

/* --- TICKER --- */
const tickerData = [
    "USER_9928 just purchased PUBG 660 UC",
    "USER_akira_jp bought iTunes $50 Card",
    "NEW LISTING ALERT: Apex Legends Coins...",
    "USER_russia_01 purchased Razer Gold $100",
    "SYSTEM STATUS: ONLINE. Global latency < 50ms."
];

function startTicker() {
    const tickerContainer = document.getElementById('tickerContent');
    let content = "";
    for(let i = 0; i < 5; i++) {
        tickerData.forEach(item => {
            content += `<div class="ticker-item">/// ${item} ///</div>`;
        });
    }
    tickerContainer.innerHTML = content;
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
    startTicker();

    const clickableElements = document.querySelectorAll('button, .category-card, .nav-item, .menu-icon, .close-btn, .floating-cs');
    clickableElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });
});

/* --- FUNGSI TAMBAHAN (Jaga-jaga buat tombol HTML manual) --- */
function selectProduct(name, price) {
    document.getElementById('itemName').value = name;
    document.getElementById('itemPrice').value = '$' + price; // Tambah $ juga disini
    showSection('pembayaran');
}

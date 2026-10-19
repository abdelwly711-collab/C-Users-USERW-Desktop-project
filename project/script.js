// بيانات مبدئية لمحاكاة قاعدة البيانات الحية
let bookings = [
    { id: "OMR-101", name: "د. أحمد المهدي", suite: "الجناح الملكي ($200)", date: "2026-10-10", nights: 3, status: "مؤكد" },
    { id: "OMR-102", name: "أ. عصام الجلال", suite: "الجناح التنفيذي ($150)", date: "2026-10-12", nights: 2, status: "مؤكد" }
];

// وظيفة التحقق من تسجيل الدخول
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    if(user === "admin" && pass === "1234") {
        document.getElementById('login-page').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('main-app').style.display = 'flex';
        }, 500);
        renderBookings();
    } else {
        errorMsg.style.display = 'block';
    }
}

// تسجيل الخروج العكسي
function handleLogout() {
    document.getElementById('login-page').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('login-page').style.opacity = '1';
        document.getElementById('main-app').style.display = 'none';
    }, 50);
}

// التبديل الديناميكي بين الصفحات والشاشات
function switchTab(tabName) {
    document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
    
    document.getElementById(`${tabName}-section`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// عرض وتحديث جدول الحجوزات
function renderBookings() {
    const tbody = document.getElementById('bookingsTableBody');
    tbody.innerHTML = "";
    bookings.forEach(b => {
        tbody.innerHTML += `
            <tr>
                <td>${b.id}</td>
                <td>${b.name}</td>
                <td>${b.suite}</td>
                <td>${b.date}</td>
                <td>${b.nights}</td>
                <td><span class="status-badge status-confirmed">${b.status}</span></td>
            </tr>
        `;
    });
}

// حفظ حجز جديد في النظام
function saveBooking(e) {
    e.preventDefault();
    const newId = `OMR-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
        id: newId,
        name: document.getElementById('guestName').value,
        suite: document.getElementById('suiteType').value,
        date: document.getElementById('checkInDate').value,
        nights: document.getElementById('nightsCount').value,
        status: "مؤكد"
    };

    bookings.push(newBooking);
    renderBookings();
    alert(`تم تسجيل الحجز بنجاح برقم: ${newId}`);
    document.getElementById('bookingForm').reset();
    switchTab('reports');
}
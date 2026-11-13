const brtStations = [
    { name: "Adly Mansour", lat: 30.1450, lng: 31.4050 },
    { name: "Ahmed Orabi", lat: 30.1210, lng: 31.2850 },
    { name: "Ard El Lewa", lat: 30.0510, lng: 31.1820 },
    { name: "Autostrad", lat: 29.9650, lng: 31.2950 },
    { name: "Bashtil", lat: 30.0820, lng: 31.2050 },
    { name: "Basous", lat: 30.1320, lng: 31.2210 },
    { name: "Basous El Kanater", lat: 30.1350, lng: 31.2650 },
    { name: "Cairo Festival City", lat: 30.0270, lng: 31.4080 },
    { name: "City Centre El Maadi", lat: 29.9880, lng: 31.3020 },
    { name: "El 10 Men Ramadan", lat: 30.1580, lng: 31.4350 },
    { name: "El Assar", lat: 30.1250, lng: 31.2350 },
    { name: "El Bahr El Aazam", lat: 29.9950, lng: 31.2180 },
    { name: "El Barawan", lat: 30.0150, lng: 31.3500 },
    { name: "El Ezba", lat: 30.0850, lng: 31.3100 },
    { name: "El Hadaba El Wosta", lat: 29.9910, lng: 31.2850 },
    { name: "El Haram", lat: 30.0010, lng: 31.1150 },
    { name: "El Jazayer", lat: 29.9780, lng: 31.2450 },
    { name: "El Manyal", lat: 30.0120, lng: 31.2280 },
    { name: "El Marg", lat: 30.1550, lng: 31.3350 },
    { name: "El Moatamadeya", lat: 30.0380, lng: 31.1550 },
    { name: "El-Mokattam", lat: 30.0050, lng: 31.3050 }, /* تم تظبيط محطة المقطم هنا باللوكيشن الجغرافي */
    { name: "El-Moshir Tantawy", lat: 30.0167, lng: 31.3333 },
    { name: "El Nour", lat: 30.1350, lng: 31.3250 },
    { name: "El Sayad", lat: 30.0650, lng: 31.2900 },
    { name: "El Talibiya", lat: 29.9980, lng: 31.1450 },
    { name: "El Trolley", lat: 30.1410, lng: 31.3650 },
    { name: "El Warak", lat: 30.1150, lng: 31.2250 },
    { name: "El Zahraa", lat: 29.9750, lng: 31.2980 },
    { name: "Eskendereya El Zerai", lat: 30.1220, lng: 31.2450 },
    { name: "Ezbet El Gezira", lat: 30.1050, lng: 31.3850 },
    { name: "Faisal", lat: 30.0050, lng: 31.1550 },
    { name: "Gharb El Rashah", lat: 30.1450, lng: 31.3200 },
    { name: "Madkhal El Tagamoa", lat: 30.0470, lng: 31.4550 },
    { name: "Mahwar El Hadara", lat: 30.0020, lng: 31.2550 },
    { name: "Mahwar El Shaheed", lat: 30.0310, lng: 31.3150 },
    { name: "Mansheyet El Bakari", lat: 30.0250, lng: 31.1050 },
    { name: "Manti", lat: 30.1350, lng: 31.2850 },
    { name: "Masged El Madina", lat: 30.0950, lng: 31.3600 },
    { name: "Masr El Tayeran", lat: 30.1010, lng: 31.3400 },
    { name: "Masref Belbeis", lat: 30.1650, lng: 31.4150 },
    { name: "Mehwar 26 Yolyo", lat: 30.0650, lng: 31.1850 },
    { name: "Metro Embaba", lat: 30.0720, lng: 31.2120 },
    { name: "Metwaly El Shaarawy", lat: 30.0210, lng: 31.4250 },
    { name: "Moasaset El Zakah", lat: 30.1420, lng: 31.3450 },
    { name: "Mostorod", lat: 30.1250, lng: 31.3450 },
    { name: "Police Academy", lat: 30.0450, lng: 31.4450 },
    { name: "Rashah w El Khossous", lat: 30.1510, lng: 31.3120 },
    { name: "Saft El Laban", lat: 30.0310, lng: 31.1710 },
    { name: "Tahya Masr", lat: 30.1250, lng: 31.2280 },
    { name: "Tareeq El Suez", lat: 30.1120, lng: 31.3950 },
    { name: "Tersa", lat: 29.9920, lng: 31.1320 },
    { name: "Zanien", lat: 30.0450, lng: 31.1650 }
];

let map;

window.onload = function () {
    map = L.map('map', { zoomControl: true }).setView([30.0444, 31.2357], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    brtStations.forEach(s => {
        L.marker([s.lat, s.lng]).addTo(map).bindPopup(`<b>Station:</b> ${s.name}`);
    });
};

function activateMap() {
    const overlay = document.getElementById('map-overlay');
    const infoBox = document.getElementById('info-box');

    if (overlay) {
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.style.display = 'none';
            map.invalidateSize();
        }, 300);
    }

    if (navigator.geolocation) {
        infoBox.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Detecting your location securely...";

        navigator.geolocation.getCurrentPosition(position => {
            const uLat = position.coords.latitude;
            const uLng = position.coords.longitude;

            let nearest = brtStations[0];
            let minD = Infinity;

            brtStations.forEach(s => {
                const dist = map.distance([uLat, uLng], [s.lat, s.lng]);
                if (dist < minD) { minD = dist; nearest = s; }
            });

            const userMarker = L.circleMarker([uLat, uLng], {
                color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 8
            }).addTo(map).bindPopup("You are here").openPopup();

            L.polyline([[uLat, uLng], [nearest.lat, nearest.lng]], {
                color: '#0072CE', weight: 3, dashArray: '5, 10'
            }).addTo(map);

            const group = new L.featureGroup([userMarker, L.marker([nearest.lat, nearest.lng])]);
            map.fitBounds(group.getBounds().pad(0.2));

            infoBox.innerHTML = `The nearest station is: <span style="color:#2ecc71; font-size:20px; font-weight:bold;">${nearest.name}</span> (Distance: ${(minD / 1000).toFixed(2)} km)`;
        }, () => {
            alert("Please enable GPS/Location services to determine your location.");
            infoBox.innerText = "Location access denied.";
        }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 });
    }
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const msg = input.value.trim().toLowerCase();

    if (msg !== "") {
        const userDiv = document.createElement('p');
        userDiv.className = 'user-msg';
        userDiv.innerText = input.value;
        chatBody.appendChild(userDiv);

        input.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        const botDiv = document.createElement('p');
        botDiv.className = 'bot-msg';

        if (msg.includes("سعر") || msg.includes("اسعار") || msg.includes("أسعار") || msg.includes("حساب") || msg.includes("التذكره") || msg.includes("التذاكر") || msg.includes("بكام") || msg.includes("price") || msg.includes("ticket")) {
            botDiv.innerText = "أسعار تذاكر أتوبيس الـ BRT مقسمة كالتالي:\n- 4 محطات بـ 5 جنيه.\n- 9 محطات بـ 10 جنيه.\n- 14 محطة بـ 15 جنيه.";
        } else if (msg.includes("محط") || msg.includes("مكان") || msg.includes("station") || msg.includes("location") || msg.includes("خريط")) {
            botDiv.innerText = "يغطي مشروع الـ BRT الطريق الدائري بالكامل بأكثر من 40 محطة (مثل عدلي منصور، المقطم، سيتي سنتر المعادي، كايرو فيستيفال). يمكنك استخدام الخريطة التفاعلية بالموقع لتحديد أقرب محطة لموقعك الحالي فوراً!";
        } else if (msg.includes("مواعيد") || msg.includes("معاد") || msg.includes("موعد") || msg.includes("وقت") || msg.includes("ساع") || msg.includes("time")) {
            botDiv.innerText = "يعمل الأتوبيس الترددي على مدار الساعة، بمعدل تقاطر سريع يصل إلى 20 أتوبيس في الساعة الواحدة لتوفير وقتك.";
        } else if (msg.includes("كم") || msg.includes("عدد") || msg.includes("احصائيات")) {
            botDiv.innerText = "المشروع يضم 100 أتوبيس كهربائي مكيف، وتبلغ السعة الاستيعابية للأتوبيس الواحد 38 راكباً، بطاقة نقل إجمالية 3,200 راكب في الساعة بالاتجاهين.";
        } else if (msg.includes("سلام") || msg.includes("مرحبا") || msg.includes("hi") || msg.includes("hello")) {
            botDiv.innerText = "أهلاً بك! أنا مساعدك الذكي لمشروع BRT Egypt.";
        } else if (msg.includes("تطبيق") || msg.includes("برنامج") || msg.includes("تنزيل") || msg.includes("تحم") || msg.includes("لينك") || msg.includes("app")) {
            botDiv.innerHTML = "<a href='#'>اضغط هنا لتنزيل</a> التطبيق الخاص بالBRT.";
        } else if (msg.includes("brt") || msg.includes("ما هو") || msg.includes("اي هو ال") || msg.includes("مشروع") ) {
            botDiv.innerHTML = `
                <div style="line-height: 1.6; text-align: right;">
                    <p>🚌 <strong>الأتوبيس الترددي السريع (BRT)</strong> هو نظام نقل جماعي حديث ومتطور، بيجمع بين <strong>سرعة وسعة مترو الأنفاق</strong> وبين <strong>مرونة الأتوبيسات العادية</strong>.</p>
                    <p style="margin-top: 10px; font-weight: bold; color: #0056b3;">أهم مميزاته:</p>
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 6px;">🏁 بيتحرك في مسارات معزولة تماماً عن زحمة المرور لضمان أعلى سرعة.</li>
                        <li style="margin-bottom: 6px;">⏰ مواعيد وصول وتحرك دقيقة جداً ومحسوبة.</li>
                        <li style="margin-bottom: 6px;">💳 محطات ذكية مجهزة لشحن التذاكر مسبقاً لمنع التكدس.</li>
                        <li style="margin-bottom: 6px;">🌱 أتوبيسات كهربائية صديقة للبيئة، مريحة، ومكيفة بالكامل.</li>
                    </ul>
                </div>`;
        } else {
            botDiv.innerText = "شكراً لرسالتك! يمكنك الاستفسار عن (أسعار التذاكر، أماكن المحطات، المواعيد، أو الإحصائيات) وسأجيبك فوراً.";
        }

        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // كود لتشغيل الهامبرغر منيو في الموبايل بسلاسة
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // إغلاق المنيو تلقائياً عند الضغط على أي لينك عشان يتحرك للمكان المطلوب
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    document.getElementById('user-input')?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') { sendMessage(); }
    });

    document.getElementById('complaint-form')?.addEventListener('submit', function (e) {
        e.preventDefault();
        alert("تم إرسال شكوتك/رسالتك بنجاح! شكراً لتواصلك معنا.");
        this.reset();
    });

    document.getElementById('phone-input')?.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    document.getElementById('email-input')?.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^a-zA-Z0-9@._%+-]/g, '');
    });

    document.querySelectorAll('.download-btn-alert').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert("The mobile app is currently in beta testing. Google Play & App Store download links will be available very soon!");
        });
    });

    // ==========================================
    // كود محاكاة شاشة الموبايل والتفاعل مع الـ Fallback
    // ==========================================
    const featureCards = document.querySelectorAll('#download-app .feature-card');
    const phoneScreen = document.getElementById('phone-screen');
    const fallbackView = document.getElementById('phone-fallback');
    const fallbackTitle = document.getElementById('fallback-title');
    const fallbackIcon = fallbackView?.querySelector('i');

    function updatePhoneDisplay(card) {
        const imageSrc = card.getAttribute('data-image');
        const title = card.getAttribute('data-title');
        const iconClass = card.getAttribute('data-icon');

        featureCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        if (phoneScreen) {
            phoneScreen.style.opacity = '0';

            const testImg = new Image();
            testImg.src = imageSrc;

            testImg.onload = function() {
                phoneScreen.src = imageSrc;
                phoneScreen.style.display = 'block';
                if (fallbackView) fallbackView.style.display = 'none';
                setTimeout(() => { phoneScreen.style.opacity = '1'; }, 50);
            };

            testImg.onerror = function() {
                phoneScreen.style.display = 'none';
                if (fallbackView) {
                    if (fallbackTitle) fallbackTitle.innerText = title;
                    if (fallbackIcon) {
                        fallbackIcon.className = `fa-solid ${iconClass}`;
                    }
                    fallbackView.style.display = 'flex';
                }
            };
        }
    }

    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            updatePhoneDisplay(this);
        });
    });

    const initialActiveCard = document.querySelector('#download-app .feature-card.active');
    if (initialActiveCard) {
        updatePhoneDisplay(initialActiveCard);
    }
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const app = initializeApp({ databaseURL: "https://isfb-blood-donation-app-default-rtdb.firebaseio.com" });
const db = getDatabase(app);

// লোগো ক্লিক করে পরিবর্তন ও লোকাল স্টোরেজে সেভ করার ফিচার
const logoImg = document.getElementById('siteLogo');
const logoContainer = document.getElementById('logoContainer');

// আগের সেভ হওয়া লোগো থাকলে তা লোড করবে
const savedLogo = localStorage.getItem('isfb_custom_logo');
if (savedLogo) {
    logoImg.src = savedLogo;
}

// লোগোতে ক্লিক করলে নতুন ইমেজের URL চাওয়া হবে
logoContainer.addEventListener('click', () => {
    const newLogoUrl = prompt('নতুন লোগোর ছবির ইমেজ লিংক (Image URL) দিন:', logoImg.src);
    if (newLogoUrl && newLogoUrl.trim() !== '') {
        logoImg.src = newLogoUrl.trim();
        localStorage.setItem('isfb_custom_logo', newLogoUrl.trim());
        alert('লোগো সফলভাবে পরিবর্তন করা হয়েছে!');
    }
});

// ১. রক্তদাতা নিবন্ধন
document.getElementById('donorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    push(ref(db, 'donors'), {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        blood: document.getElementById('bloodGroup').value,
        location: document.getElementById('location').value,
        createdAt: new Date().toISOString()
    }).then(() => {
        alert('ধন্যবাদ! আপনার তথ্য সুরক্ষিত ডাটাবেজে সংরক্ষিত হয়েছে। রক্তের প্রয়োজন হলে অ্যাডমিন টিম যোগাযোগ করবে।');
        document.getElementById('donorForm').reset();
    }).catch(() => {
        alert('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    });
});

// ২. জরুরি রক্তের অনুরোধ
document.getElementById('requestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    push(ref(db, 'requests'), {
        patient: document.getElementById('reqPatient').value,
        phone: document.getElementById('reqPhone').value,
        blood: document.getElementById('reqBlood').value,
        hospital: document.getElementById('reqHospital').value,
        createdAt: new Date().toISOString()
    }).then(() => {
        alert('আপনার অনুরোধটি পোস্ট করা হয়েছে। আমাদের ভলান্টিয়ার টিম দ্রুত যোগাযোগ করার চেষ্টা করবে।');
        document.getElementById('requestForm').reset();
    }).catch(() => {
        alert('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    });
});

// ৩. সার্চ ফিল্টার অ্যালার্ট
document.getElementById('searchBtn').addEventListener('click', () => {
    const blood = document.getElementById('searchBlood').value;
    const location = document.getElementById('searchLocation').value;
    
    if(!blood && !location) {
        alert('অনুগ্রহ করে রক্তের গ্রুপ বা এলাকা লিখুন।');
        return;
    }
    alert(`অনুসন্ধান করা হচ্ছে: ${blood || 'সকল গ্রুপ'} - ${location || 'সকল এলাকা'}। নিরাপত্তা জনিত কারণে সরাসরি নম্বর দেখাবে না, অ্যাডমিন টিম এই তথ্যের ভিত্তিতে রক্তদাতা খুঁজে দেবে।`);
});

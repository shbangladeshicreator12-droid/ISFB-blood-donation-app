import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const app = initializeApp({ databaseURL: "https://isfb-blood-donation-app-default-rtdb.firebaseio.com" });
const db = getDatabase(app);

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
        alert('ধন্যবাদ! আপনার নাম আমাদের সুরক্ষিত ডাটাবেজে যুক্ত হয়েছে। রক্তের প্রয়োজনে আমাদের অ্যাডমিন টিম আপনার সাথে যোগাযোগ করবে।');
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
        alert('আপনার রক্তের অনুরোধটি সফলভাবে পোস্ট হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করে রক্তদাতার ব্যবস্থা করার চেষ্টা করবেন।');
        document.getElementById('requestForm').reset();
    }).catch(() => {
        alert('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    });
});

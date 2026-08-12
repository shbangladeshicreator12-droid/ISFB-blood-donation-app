// Firebase Config & Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://isfb-blood-donation-app-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const donorsRef = ref(database, 'donors');

// ১. রক্তদাতা নতুন রেজিস্ট্রেশন করলে ডাটাবেজে সেভ করা
const donorForm = document.getElementById('donorForm');
if (donorForm) {
  donorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const location = document.getElementById('location').value;

    push(donorsRef, {
      name: name,
      phone: phone,
      bloodGroup: bloodGroup,
      location: location,
      createdAt: new Date().toISOString()
    }).then(() => {
      alert('ধন্যবাদ! আপনার নাম সফলভাবে রক্তদাতা হিসেবে নিবন্ধিত হয়েছে।');
      donorForm.reset();
    }).catch((error) => {
      alert('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    });
  });
}

// ২. ডাটাবেজ থেকে রক্তদাতাদের রিয়েল-টাইম লিস্ট দেখানো
onValue(donorsRef, (snapshot) => {
  const donorList = document.getElementById('donorList');
  if (snapshot.exists()) {
    donorList.innerHTML = '';
    const data = snapshot.val();
    Object.keys(data).forEach(key => {
      const donor = data[key];
      donorList.innerHTML += `
        <div class="p-3 border rounded-lg bg-gray-50 flex justify-between items-center shadow-sm">
          <div>
            <p class="font-bold text-gray-800">${donor.name}</p>
            <p class="text-sm text-gray-600">📱 ${donor.phone}</p>
            <p class="text-xs text-gray-500">📍 ${donor.location}</p>
          </div>
          <span class="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-sm">${donor.bloodGroup}</span>
        </div>
      `;
    });
  } else {
    donorList.innerHTML = '<p class="text-center text-gray-500 text-sm">বর্তমানে কোনো রক্তদাতা পাওয়া যায়নি</p>';
  }
});


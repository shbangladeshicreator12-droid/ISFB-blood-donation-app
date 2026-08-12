import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const app = initializeApp({ databaseURL: "https://isfb-blood-donation-app-default-rtdb.firebaseio.com" });
const db = getDatabase(app);

// রক্তদাতা রেজিস্ট্রেশন
document.getElementById('donorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    push(ref(db, 'donors'), {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        blood: document.getElementById('bloodGroup').value
    });
    alert('সফলভাবে নিবন্ধিত হয়েছে!');
    document.getElementById('donorForm').reset();
});

// জরুরি রক্তের অনুরোধ (ফোন নম্বরসহ)
document.getElementById('requestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    push(ref(db, 'requests'), {
        patient: document.getElementById('reqPatient').value,
        hospital: document.getElementById('reqHospital').value,
        phone: document.getElementById('reqPhone').value, // ফোন নম্বর সেভ হবে
        blood: document.getElementById('reqBlood').value
    });
    alert('অনুরোধ পোস্ট করা হয়েছে!');
    document.getElementById('requestForm').reset();
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


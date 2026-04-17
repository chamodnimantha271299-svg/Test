
console.log('Main.js Loaded Successfully');
// ── Global State ──────────────────────────────────────────────
// ── Wishlist / Heart Toggle ────────────────────────────────────
window.toggleWishlist = function (btn) {
  const icon = btn.querySelector('i');
  if (!icon) return;

  const isLiked = icon.classList.contains('fas');

  if (isLiked) {
    // Remove like
    icon.classList.remove('fas', 'text-red-500');
    icon.classList.add('far');
    btn.classList.remove('text-red-500');
    btn.classList.add('text-white/50');
    // Shrink animation
    btn.style.transform = 'scale(0.85)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
  } else {
    // Add like
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-red-500');
    btn.classList.remove('text-white/50');
    btn.classList.add('text-red-500');
    // Pop animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);
    // Optional: show a small toast
    if (typeof toast === 'function') toast('Added to Wishlist ❤️', 'success');
  }
  btn.style.transition = 'transform 0.2s ease';
};

window.selectVehicle = (id, val, el) => {
  const input = document.getElementById(id);
  if (input) input.value = val;
  if (el && el.parentElement) {
    el.parentElement.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  }
};
var db;
if (typeof currentUser === 'undefined') var currentUser = null;
if (typeof DB_NAME === 'undefined') var DB_NAME = 'LeezaDB';
if (typeof DB_VER === 'undefined') var DB_VER = 6;

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init('tRG6iOeYylZBAVmsa');
}

// ── IndexedDB Initialization ──────────────────────────────────
function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      const stores = [
        { name: 'bookings', keyPath: 'id', autoIncrement: true },
        { name: 'messages', keyPath: 'id', autoIncrement: true },
        { name: 'searches', keyPath: 'id', autoIncrement: true },
        { name: 'newsletter', keyPath: 'id', autoIncrement: true },
        { name: 'admin_activity', keyPath: 'id', autoIncrement: true },
        { name: 'users', keyPath: 'email', autoIncrement: false },
        { name: 'admins', keyPath: 'email', autoIncrement: false }
      ];
      stores.forEach(s => {
        if (!d.objectStoreNames.contains(s.name)) {
          d.createObjectStore(s.name, { keyPath: s.keyPath, autoIncrement: s.autoIncrement });
        }
      });
    };
    req.onsuccess = (e) => {
      db = e.target.result;
      // Seed superadmins
      try {
        const tx = db.transaction(['admins', 'users'], 'readwrite');
        const admins = tx.objectStore('admins');
        const users = tx.objectStore('users');

        const adminEmails = ['chamodnimantha271299@gmail.com', 'nimanthachamod86@gmail.com', 'leezatravelslk@gmail.com'];
        adminEmails.forEach(email => {
          admins.put({ email, role: 'superadmin', addedAt: new Date().toISOString() });
        });

        // Seed user for the new admin
        users.put({
          email: 'chamodnimantha271299@gmail.com',
          password: 'Chamod@99',
          name: 'Chamod Nimanta',
          phone: 'N/A',
          viewed: true,
          timestamp: new Date().toISOString()
        });
      } catch (err) { console.warn('Seeding error:', err); }
      resolve(db);
    };

    req.onerror = (e) => reject(e.target.error);
  });
}

// ── Data Persistence Functions ──────────────────────────────
function save(storeName, data) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('DB not ready'));
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put({ ...data, updatedAt: new Date().toISOString() });
    req.onsuccess = (e) => {
      resolve(e.target.result);
      checkAdminNotifications();
      notifyOtherTabs();
      if (data.viewed === false) {
        const labels = {
          bookings: 'New Booking Received! 📅',
          messages: 'Message Sent! ✅',
          users: 'New User Registered! 👤',
          newsletter: 'New Newsletter Subscriber! 📰'
        };
        if (labels[storeName]) toast(labels[storeName], 'success');
      }
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

function loadAll(storeName) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('DB not ready'));
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

function get(storeName, key) {
  return new Promise((resolve, reject) => {
    if (!db) return reject(new Error('DB not ready'));
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

// ── BroadcastChannel Sync ───────────────────────────────
var notificationChannel = null;
try {
  notificationChannel = new BroadcastChannel('leeza_notifications');
  notificationChannel.onmessage = () => {
    checkAdminNotifications(true);
    checkUserNotifications();
  };
} catch (e) { console.warn('BroadcastChannel not available'); }

function notifyOtherTabs() {
  if (notificationChannel) notificationChannel.postMessage('sync');
}

// ── Authentication ──────────────────────────────────────────
let currentAuthMode = 'login';

function toggleAuthModal() {
  const m = document.getElementById('auth-modal');
  if (!m) return;
  const isHidden = m.classList.contains('hidden');
  m.style.display = isHidden ? 'flex' : 'none';
  m.classList.toggle('hidden');
  document.body.style.overflow = isHidden ? 'hidden' : '';
  if (isHidden) switchAuthTab('login');
}

function switchAuthTab(tab) {
  cancelReset();
  currentAuthMode = tab;
  const isLogin = tab === 'login';
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  if (loginTab) loginTab.className = isLogin ? 'pb-3 text-sm font-bold border-b-2 border-primary text-white' : 'pb-3 text-sm font-bold border-b-2 border-transparent text-white/50 hover:text-white transition-all';
  if (signupTab) signupTab.className = !isLogin ? 'pb-3 text-sm font-bold border-b-2 border-primary text-white' : 'pb-3 text-sm font-bold border-b-2 border-transparent text-white/50 hover:text-white transition-all';

  const signupFields = document.getElementById('signup-fields');
  if (signupFields) signupFields.classList.toggle('hidden', isLogin);

  const submitBtn = document.getElementById('auth-submit-btn');
  if (submitBtn) submitBtn.textContent = isLogin ? 'Login' : 'Create Account';

  const forgotContainer = document.getElementById('forgot-pass-container');
  if (forgotContainer) forgotContainer.style.display = isLogin ? 'block' : 'none';

  const switchText = document.getElementById('auth-switch-text');
  if (switchText) {
    switchText.innerHTML = isLogin
      ? `Don't have an account? <a href="javascript:void(0)" onclick="switchAuthTab('signup')" class="text-primary hover:underline font-bold">Sign Up</a>`
      : `Already have an account? <a href="javascript:void(0)" onclick="switchAuthTab('login')" class="text-primary hover:underline font-bold">Login</a>`;
  }
}

async function handleAuth(e) {
  e.preventDefault();
  if (!db) return toast('System loading...', 'warning');
  const em = document.getElementById('a-email').value.trim().toLowerCase();
  const pass = document.getElementById('a-pass').value.trim();
  if (!em || !pass) return toast('Please fill all fields', 'warning');

  if (currentAuthMode === 'signup') {
    const name = document.getElementById('a-name').value.trim();
    const phone = document.getElementById('a-phone').value.trim();
    if (!name) return toast('Name is required', 'warning');
    const existing = await get('users', em);
    if (existing) return toast('Email already exists', 'error');
    const user = { email: em, password: pass, name, phone: phone || 'N/A', viewed: false, timestamp: new Date().toISOString() };
    await save('users', user);
    toast('Account created! 🎉', 'success');
    loginUser(user);
  } else {
    const user = await get('users', em);
    if (!user) return toast('Account not found', 'error');
    if (user.password !== pass) return toast('Incorrect password', 'error');
    toast(`Welcome back, ${user.name}! 👋`, 'success');
    loginUser(user);
  }
}

let resetEmail = '';
let generatedOTP = '';

async function handleForgotPass() {
  const em = document.getElementById('a-email').value.trim().toLowerCase();
  if (!em) return toast('Please enter your email first 📧', 'warning');

  const user = await get('users', em);
  if (!user) return toast('No account found with this email ❌', 'error');

  resetEmail = em;
  generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

  // Send OTP via EmailJS (if available)
  if (typeof emailjs !== 'undefined') {
    const params = {
      name: user.name || 'User',
      full_name: user.name || 'User',
      email: em,
      user_email: em,
      to_email: em,
      phone: user.phone || 'N/A',
      user_phone: user.phone || 'N/A',
      destination: 'Password Reset Request',
      planned_destination: 'Password Reset Request',
      from_name: 'Leeza Travels Support',
      from_email: 'Leezatravelslk@gmail.com',
      reply_to: 'Leezatravelslk@gmail.com',
      subject: 'Password Reset Verification - Leeza Travels',
      message: `Your password reset verification code is: ${generatedOTP}. Please enter this code in the portal to reset your password.`,
      msg: `Your password reset verification code is: ${generatedOTP}. Please enter this code in the portal to reset your password.`,
      otp: generatedOTP,
      code: generatedOTP,
      verification_code: generatedOTP,
      otp_code: generatedOTP,
      timestamp: new Date().toLocaleString()
    };

    try {
      // Use the new credentials provided by the user
      await emailjs.send('service_s7kzv5g', 'template_mhs62h1', params, 'tRG6iOeYylZBAVmsa');
      console.log('OTP sent successfully via the new EmailJS templates');
    } catch (e) {
      console.error('EmailJS Reset Error:', e);
      return toast('Failed to send email. Please check your connection or try again later.', 'error');
    }
  }

  // Hide Login UI
  document.getElementById('login-pass-container').classList.add('hidden');
  document.getElementById('auth-submit-btn').classList.add('hidden');
  document.getElementById('auth-switch-text').classList.add('hidden');
  document.getElementById('a-email').disabled = true;

  // Show OTP Step
  document.getElementById('reset-step-1').classList.remove('hidden');
  document.getElementById('reset-back-btn').classList.remove('hidden');

  toast(`OTP sent to your email! 📧`, 'success');
  console.log(`[DEBUG] Password reset OTP for ${em}: ${generatedOTP}`);
}

function handleVerifyOTP() {
  const enteredOTP = document.getElementById('a-otp').value.trim();
  if (enteredOTP === generatedOTP) {
    document.getElementById('reset-step-1').classList.add('hidden');
    document.getElementById('reset-step-2').classList.remove('hidden');
    toast('Code verified! Set your new password 🔑', 'success');
  } else {
    toast('Invalid OTP code. Please try again ❌', 'error');
  }
}

async function handleResetPassword() {
  const newPass = document.getElementById('a-new-pass').value;
  const confirmPass = document.getElementById('a-confirm-pass').value;

  if (!newPass || newPass.length < 6) return toast('Password must be at least 6 characters ⚠️', 'warning');
  if (newPass !== confirmPass) return toast('Passwords do not match ❌', 'error');

  const user = await get('users', resetEmail);
  if (user) {
    user.password = newPass;
    await save('users', user);
    toast('Password reset successful! You can now login 🔓', 'success');
    cancelReset();
  }
}

function cancelReset() {
  resetEmail = '';
  generatedOTP = '';

  // Reset fields
  ['a-otp', 'a-new-pass', 'a-confirm-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const emailInput = document.getElementById('a-email');
  if (emailInput) emailInput.disabled = false;

  // Show Login UI
  ['login-pass-container', 'auth-submit-btn', 'auth-switch-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  });

  // Hide Reset UI
  ['reset-step-1', 'reset-step-2', 'reset-back-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
}

async function loginUser(user) {
  currentUser = user;
  const adminDoc = await get('admins', user.email);
  if (adminDoc || user.email === 'nimanthachamod86@gmail.com') currentUser.isAdmin = true;
  localStorage.setItem('leeza_user', JSON.stringify(user));
  updateAuthUI();
  toggleAuthModal();
  notifyOtherTabs();
  checkAdminNotifications();
  checkUserNotifications();
}

function logout() {
  localStorage.removeItem('leeza_user');
  location.reload();
}

async function checkAuth() {
  const saved = localStorage.getItem('leeza_user');
  if (saved) {
    const session = JSON.parse(saved);
    const user = await get('users', session.email);
    if (user) {
      currentUser = user;
      const adminDoc = await get('admins', user.email);
      if (adminDoc || user.email === 'nimanthachamod86@gmail.com') currentUser.isAdmin = true;
      updateAuthUI();
      checkUserNotifications();
      checkAdminNotifications();
    }
  }
}

function updateAuthUI() {
  const loggedIn = !!currentUser;
  const siBtn = document.getElementById('signin-btn');
  const mSiBtn = document.getElementById('mob-signin-btn');
  const pBtn = document.getElementById('profile-btn');
  const mPBtn = document.getElementById('mob-profile-btn');

  if (siBtn) siBtn.classList.toggle('hidden', loggedIn);
  if (mSiBtn) mSiBtn.classList.toggle('hidden', loggedIn);
  if (pBtn) pBtn.classList.toggle('hidden', !loggedIn);
  if (mPBtn) mPBtn.classList.toggle('hidden', !loggedIn);

  const authorizedEmails = ['chamodnimantha271299@gmail.com', 'Leezatravelslk@gmail.com'];
  const showDBBadge = loggedIn && authorizedEmails.includes(currentUser.email);
  const dbBadge = document.getElementById('db-badge');
  if (dbBadge) dbBadge.classList.toggle('hidden', !showDBBadge);

  if (loggedIn) {
    const dn = document.getElementById('user-display-name');
    if (dn) dn.textContent = currentUser.name.split(' ')[0];

    // Standard IDs
    const pName = document.getElementById('profile-name') || document.getElementById('p-name');
    const pEmail = document.getElementById('profile-email') || document.getElementById('p-email');
    const pPhone = document.getElementById('profile-phone') || document.getElementById('p-phone');
    const pAvatar = document.getElementById('profile-avatar') || document.getElementById('p-avatar');

    if (pName) pName.textContent = currentUser.name || '';
    if (pEmail) pEmail.textContent = currentUser.email || '';
    if (pPhone) pPhone.textContent = currentUser.phone || 'Not Provided';
    if (pAvatar) pAvatar.textContent = (currentUser.name || 'U').charAt(0).toUpperCase();

    const isAdmin = isUserAdmin();
    const dw = document.getElementById('nav-dropdown-wrapper');
    const man = document.getElementById('mob-admin-nav-item');
    const dbb = document.getElementById('db-badge');

    if (dw) dw.style.display = isAdmin ? 'block' : 'none';
    if (man) man.classList.toggle('hidden', !isAdmin);
    if (dbb) dbb.classList.toggle('hidden', !isAdmin);

    const udw = document.getElementById('user-dropdown-wrapper');
    const mun = document.getElementById('mob-user-nav-item');
    if (udw) udw.classList.toggle('hidden', isAdmin);
    if (mun) mun.classList.toggle('hidden', isAdmin);

    loadUserTravelHistory();
  } else {
    const dbb = document.getElementById('db-badge');
    if (dbb) dbb.classList.add('hidden');
  }
}

function isUserAdmin() {
  const adminEmails = ['chamodnimantha271299@gmail.com', 'Leezatravelslk@gmail.com'];
  return !!(currentUser && adminEmails.includes(currentUser.email));
}

function isOwner() {
  return currentUser && currentUser.email === 'chamodnimantha271299@gmail.com';
}

// ── Notifications Logic ──────────────────────────────────────â”€
function toggleNavNotifications(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('nav-notifications-dropdown');
  if (!dd) return;
  const isOpen = !dd.classList.contains('pointer-events-none');
  if (isOpen) {
    closeNavNotifications();
  } else {
    closeUserNotifications();
    populateNavNotifications();
    dd.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    dd.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
  }
}

function closeNavNotifications() {
  const dd = document.getElementById('nav-notifications-dropdown');
  if (dd) {
    dd.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    dd.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
  }
}

function toggleUserNotifications(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('user-notifications-dropdown');
  if (!dd) return;
  const isOpen = !dd.classList.contains('pointer-events-none');
  if (isOpen) {
    closeUserNotifications();
  } else {
    closeNavNotifications();
    populateUserNotifications();
    dd.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    dd.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
  }
}

function closeUserNotifications() {
  const dd = document.getElementById('user-notifications-dropdown');
  if (dd) {
    dd.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
    dd.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
  }
}

async function checkAdminNotifications(silent = false) {
  if (!db || !isUserAdmin()) return;
  const stores = ['bookings', 'messages', 'users', 'newsletter'];
  let total = 0;
  for (const s of stores) {
    const items = await loadAll(s);
    total += items.filter(i => i.viewed === false).length;
  }

  // Admin badges on nav
  const b = document.getElementById('nav-admin-badge');
  const mb = document.getElementById('mob-admin-badge');
  if (b) { b.textContent = total; b.classList.toggle('hidden', total === 0); }
  if (mb) { mb.textContent = total; mb.classList.toggle('hidden', total === 0); }

  // Update footer db-badge with red count
  const dbBadge = document.getElementById('db-badge');
  if (dbBadge) {
    let countBadge = document.getElementById('db-notification-count');
    if (!countBadge && total > 0) {
      countBadge = document.createElement('span');
      countBadge.id = 'db-notification-count';
      countBadge.className = 'ml-1.5 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[16px] text-center shadow-lg animate-bounce';
      dbBadge.appendChild(countBadge);
    }
    if (countBadge) {
      countBadge.textContent = total;
      countBadge.classList.toggle('hidden', total === 0);
    }
  }
}

async function checkUserNotifications() {
  if (!db || !currentUser) return;
  const stores = ['bookings', 'messages'];
  let total = 0;
  for (const s of stores) {
    const items = await loadAll(s);
    total += items.filter(i => i.email === currentUser.email && i.user_unread).length;
  }
  const b = document.getElementById('nav-user-badge');
  const mb = document.getElementById('mob-user-badge');
  if (b) { b.textContent = total; b.classList.toggle('hidden', total === 0); }
  if (mb) { mb.textContent = total; mb.classList.toggle('hidden', total === 0); }
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  let b = seconds / 3600;
  if (b < 24) {
    if (b < 1) return Math.floor(seconds / 60) + 'm ago';
    return Math.floor(b) + 'h ago';
  }
  b = seconds / 86400;
  if (b < 30) return Math.floor(b) + (Math.floor(b) === 1 ? 'd ago' : 'd ago');
  return new Date(date).toLocaleDateString();
}

async function populateNavNotifications() {
  if (!db) return;
  const stores = ['bookings', 'messages', 'users', 'admin_activity', 'newsletter'];
  let all = [];
  for (const s of stores) {
    const items = await loadAll(s);
    items.forEach(i => all.push({ ...i, store: s, ts: new Date(i.timestamp || i.updatedAt || Date.now()) }));
  }
  all.sort((a, b) => {
    // Push unviewed to top, then sort by date
    if (a.viewed === false && b.viewed !== false) return -1;
    if (a.viewed !== false && b.viewed === false) return 1;
    return b.ts - a.ts;
  });
  renderNavNotificationsList(all.slice(0, 15));
}

function renderNavNotificationsList(items) {
  const list = document.getElementById('nav-notifications-list');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = `<div class="py-10 text-center text-xs text-white/30 italic">No recent activity</div>`;
    return;
  }

  const getConfig = (s) => {
    switch (s) {
      case 'bookings': return { label: 'New Booking Request', icon: 'fa-calendar-alt', color: 'emerald' };
      case 'messages': return { label: 'Message from System', icon: 'fa-comment-dots', color: 'sky' };
      case 'users': return { label: 'New User Signup', icon: 'fa-user-plus', color: 'purple' };
      case 'newsletter': return { label: 'Newsletter Subscription', icon: 'fa-paper-plane', color: 'pink' };
      case 'admin_activity': return { label: 'Admin Activity', icon: 'fa-bolt', color: 'orange' };
      default: return { label: 'System Alert', icon: 'fa-bell', color: 'slate' };
    }
  };

  list.innerHTML = items.map(i => {
    const isUnread = i.viewed === false;
    const cfg = getConfig(i.store);
    const colorClasses = {
      emerald: isUnread ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-500/5 text-emerald-400/30',
      sky: isUnread ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-500/5 text-sky-400/30',
      purple: isUnread ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-500/5 text-purple-400/30',
      pink: isUnread ? 'bg-pink-500/15 text-pink-400' : 'bg-pink-500/5 text-pink-400/30',
      orange: isUnread ? 'bg-orange-500/15 text-orange-400' : 'bg-orange-500/5 text-orange-400/30',
      slate: isUnread ? 'bg-white/10 text-white' : 'bg-white/5 text-white/20'
    };

    return `<button onclick="markItemAsViewedAndOpen('${i.store}', ${typeof i.id === 'string' ? `'${i.id}'` : (i.id || `'${i.email}'`)})" class="relative w-full text-left p-4 border-b border-white/5 hover:bg-white/5 flex gap-3 transition-colors ${isUnread ? 'bg-white/[0.02]' : ''}">
      ${isUnread ? '<div class="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(255,107,53,0.3)]"></div>' : ''}
      <div class="w-10 h-10 rounded-xl ${colorClasses[cfg.color] || colorClasses.slate} flex items-center justify-center flex-shrink-0 text-sm shadow-inner">
        <i class="fas ${cfg.icon}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start mb-0.5">
          <span class="text-xs ${isUnread ? 'font-black text-white' : 'font-bold text-white/40'} truncate tracking-tight">${i.store === 'bookings' && i.destination ? `Booking: ${i.destination}` : (i.name && i.store === 'users' ? `${i.name} joined` : cfg.label)}</span>
          <span class="text-[9px] ${isUnread ? 'text-primary font-black' : 'text-white/20 font-bold'} uppercase tracking-tighter whitespace-nowrap ml-2">${timeAgo(i.ts)}</span>
        </div>
        <p class="text-[11px] ${isUnread ? 'text-white/60' : 'text-white/20'} truncate leading-tight">${i.message || i.name || i.email || 'Recent Activity'}</p>
      </div>
    </button>`;
  }).join('');
}

async function populateUserNotifications() {
  if (!db || !currentUser) return;
  const stores = ['bookings', 'messages'];
  let all = [];
  for (const s of stores) {
    const items = (await loadAll(s)).filter(i => i.email === currentUser.email && (i.user_unread || i.admin_reply));
    items.forEach(i => all.push({ ...i, store: s, ts: new Date(i.updatedAt || i.timestamp || Date.now()) }));
  }
  all.sort((a, b) => {
    // Push unread to top
    if (a.user_unread === true && b.user_unread !== true) return -1;
    if (a.user_unread !== true && b.user_unread === true) return 1;
    return b.ts - a.ts;
  });
  renderUserNotificationsList(all.slice(0, 15));
}

function renderUserNotificationsList(items) {
  const list = document.getElementById('user-notifications-list');
  if (!list) return;

  if (!items.length) {
    list.innerHTML = `<div class="py-12 text-center">
      <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
        <i class="fas fa-bell-slash text-2xl"></i>
      </div>
      <p class="text-xs text-white/20 italic font-medium">Your notification center is empty</p>
    </div>`;
    return;
  }

  const colorMap = {
    bookings: { icon: 'fa-calendar-check', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20', indicator: 'bg-emerald-500' },
    messages: { icon: 'fa-envelope-open-text', color: 'bg-sky-500/10 text-sky-400', border: 'border-sky-500/20', indicator: 'bg-sky-500' },
    default: { icon: 'fa-bell', color: 'bg-primary/10 text-primary', border: 'border-primary/20', indicator: 'bg-primary' }
  };

  list.innerHTML = items.map(i => {
    const isUnread = i.user_unread === true;
    const cfg = colorMap[i.store] || colorMap.default;
    const title = i.store === 'bookings' ? (i.status === 'Approved' ? 'Trip Approved! ✅' : (i.status === 'Cancelled' ? 'Trip Cancelled ❌' : 'Booking Update')) : 'Admin Reply';
    const desc = i.admin_reply || (i.store === 'bookings' ? `Your trip to ${i.destination || 'Sri Lanka'} is ${i.status}.` : i.message);

    return `<button onclick="markUserItemAsViewedAndOpen('${i.store}', ${i.id})" class="relative w-full text-left p-4 border-b border-white/5 hover:bg-white/5 flex gap-3 transition-colors ${isUnread ? 'bg-white/[0.02]' : ''}">
      ${isUnread ? `<div class="absolute left-0 top-3 bottom-3 w-1 ${cfg.indicator} rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>` : ''}
      <div class="w-10 h-10 rounded-xl ${cfg.color} flex items-center justify-center flex-shrink-0 text-sm shadow-inner border ${cfg.border}">
        <i class="fas ${cfg.icon}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start mb-0.5">
          <span class="text-xs ${isUnread ? 'font-black text-white' : 'font-bold text-white/40'} truncate tracking-tight">${title}</span>
          <span class="text-[9px] ${isUnread ? 'text-primary font-black' : 'text-white/20 font-bold'} uppercase tracking-tighter whitespace-nowrap ml-2">${timeAgo(i.ts)}</span>
        </div>
        <p class="text-[11px] ${isUnread ? 'text-white/70' : 'text-white/20'} truncate leading-tight">${desc}</p>
      </div>
    </button>`;
  }).join('');
}

async function markItemAsViewedAndOpen(store, key) {
  await markItemViewed(store, key);
  populateNavNotifications();
  // We explicitly do not close the dropdown so the user can click multiple notifications
  // and see the red count and highlight decrease one by one.
  showDBViewer(store);
}

async function markUserItemAsViewedAndOpen(store, key) {
  const item = await get(store, key);
  if (item) {
    if (item.user_unread) {
      item.user_unread = false;
      await save(store, item);
      checkUserNotifications();
      populateUserNotifications();
    }
  }
  // We explicitly do not close the dropdown so the user can click multiple notifications
  // and see the red count and highlight decrease one by one.
  toggleProfileModal();
}

async function markAllAsViewed() {
  if (!db) return;
  const stores = ['bookings', 'messages', 'users', 'newsletter'];
  for (const s of stores) {
    const tx = db.transaction(s, 'readwrite');
    const store = tx.objectStore(s);
    store.getAll().onsuccess = (e) => {
      const items = e.target.result || [];
      let changed = false;
      items.forEach(item => {
        if (item.viewed === false) {
          item.viewed = true;
          changed = true;
          store.put(item);
        }
      });
      if (changed) {
        setTimeout(checkAdminNotifications, 50);
        notifyOtherTabs();
      }
    };
  }
}

// ── DB Viewer Logic ──────────────────────────────────────────â”€
function showDBViewer(store = 'bookings') {
  if (!isUserAdmin()) {
    toast('Access Denied. Database Viewer is restricted to authorized administrators only.', '#ef4444');
    return;
  }
  const m = document.getElementById('db-modal');
  if (!m) return;
  m.style.display = 'flex';
  m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updateDBTabCounts();
  loadDBStore(store);
}

function closeDBViewer() {
  const m = document.getElementById('db-modal');
  if (m) { m.style.display = 'none'; m.classList.add('hidden'); }
  document.body.style.overflow = '';
}

async function updateDBTabCounts() {
  const stores = ['bookings', 'messages', 'users', 'newsletter'];
  for (const s of stores) {
    try {
      const items = await loadAll(s);
      const count = items.filter(i => i.viewed === false).length;
      const badge = document.getElementById(`db-tab-count-${s}`);
      if (badge) {
        badge.textContent = count;
        badge.classList.toggle('hidden', count === 0);
        badge.className = badge.className.replace(/bg-\S+/g, '') + (count > 0 ? ' bg-red-500' : ' bg-primary');
      }
    } catch (e) { }
  }
}

async function markItemViewed(store, key) {
  try {
    const item = await get(store, key);
    if (item && item.viewed === false) {
      item.viewed = true;
      await save(store, item);
      updateDBTabCounts();
      checkAdminNotifications();
    }
  } catch (e) { }
}
window.markItemViewed = markItemViewed;

window.activeDBStore = null;

async function loadDBStore(storeName, btn) {
  const content = document.getElementById('db-viewer-content');
  if (!content) return;
  document.querySelectorAll('.db-tab').forEach(b => b.classList.add('text-white/60'));
  if (btn) btn.classList.remove('text-white/60');

  content.innerHTML = `<div class="p-20 text-center text-white/20 italic">Loading ${storeName}...</div>`;

  const items = await loadAll(storeName);

  // Sort: Unviewed first, then reverse chronological
  items.sort((a, b) => {
    if (a.viewed === false && b.viewed !== false) return -1;
    if (a.viewed !== false && b.viewed === false) return 1;
    const dateA = new Date(a.timestamp || a.updatedAt || 0);
    const dateB = new Date(b.timestamp || b.updatedAt || 0);
    return dateB - dateA;
  });

  _renderDBStore(storeName, items);
  updateDBTabCounts();

  window.activeDBStore = storeName;
  const deleteBtn = document.getElementById('db-delete-all-btn');
  if (deleteBtn) {
    // Show Delete All button only if there's data in the currently viewed store
    deleteBtn.style.display = items.length > 0 ? 'inline-block' : 'none';
  }
}

window.deleteAllActiveStore = async function () {
  const store = window.activeDBStore;
  if (!store) return;
  if (!confirm(`⚠️ Are you absolutely sure you want to delete EVERY record in the '${store}' tab?\n\nThis action cannot be undone.`)) return;

  try {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).clear();

    tx.oncomplete = async () => {
      toast(`All records in ${store} have been deleted. 🗑️`, 'success');
      loadDBStore(store); // Refresh the UI to show empty state
      updateDBTabCounts();

      // Log this major action for security 
      try {
        await save('admin_activity', {
          message: `Deleted ALL records in ${store} tab.`,
          viewed: false,
          timestamp: new Date().toISOString()
        });
      } catch (e) { }
    };

    tx.onerror = (e) => {
      console.error(e);
      toast(`Error deleting records from ${store}.`, 'error');
    };
  } catch (err) {
    console.error(err);
    toast('Critical error while clearing records.', 'error');
  }
};

async function handleAdminNotificationClick(store, key) {
  await markItemViewed(store, key);
  loadDBStore(store);
}

window.handleAdminNotificationClick = handleAdminNotificationClick;

function _renderDBStore(store, items) {
  const content = document.getElementById('db-viewer-content');
  if (!items.length) {
    let addBtn = '';
    if (store === 'newsletter') addBtn = `<div class="mt-4 flex gap-2"><button onclick="showBroadcastNewsletterModal()" class="bg-blue-500 text-white font-bold px-6 py-2 rounded-xl hover:opacity-90 transition-all text-xs flex-1 shrink-0"><i class="fas fa-paper-plane mr-2"></i>Broadcast Msg</button><button onclick="showAddNewsletterModal()" class="bg-primary text-black font-bold px-6 py-2 rounded-xl hover:opacity-90 transition-all text-xs flex-1 shrink-0"><i class="fas fa-plus mr-2"></i>Add Subscriber</button></div>`;
    if (store === 'users') addBtn = `<button onclick="showAddUserModal()" class="mt-4 bg-primary text-black font-bold px-6 py-2 rounded-xl hover:opacity-90 transition-all text-xs"><i class="fas fa-user-plus mr-2"></i>Add User</button>`;
    content.innerHTML = `<div class="p-20 text-center text-white/20 italic flex flex-col items-center">No records found.${addBtn}</div>`;
    return;
  }

  if (store === 'bookings') { _renderBookings(items); return; }
  if (store === 'messages') { _renderMessages(items); return; }
  if (store === 'users') { _renderUsers(items); return; }
  if (store === 'newsletter') { _renderNewsletter(items); return; }

  // fallback generic
  const keys = Object.keys(items[0]).filter(k => k !== 'password');
  content.innerHTML = `
    <div class="overflow-x-auto rounded-xl border border-white/10">
      <table class="w-full text-left text-xs">
        <thead class="bg-white/5">
          <tr>${keys.map(k => `<th class="p-3 text-white/40 uppercase font-black">${k}</th>`).join('')}<th class="p-3 text-white/40 uppercase font-black">Actions</th></tr>
        </thead>
        <tbody>
          ${items.map(i => `<tr>
            ${keys.map(k => `<td class="p-3 border-t border-white/5 text-white/70 max-w-[180px] truncate">${i[k] ?? '—'}</td>`).join('')}
            <td class="p-3 border-t border-white/5">
              <button onclick="dbDelete('${store}', ${i.id || `'${i.email}'`})" class="text-red-400 hover:text-red-300 text-xs font-bold px-3 py-1 rounded-lg border border-red-400/30 hover:bg-red-500/10 transition-all"><i class="fas fa-trash mr-1"></i>Delete</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function _statusBadge(status) {
  const map = { Pending: 'bg-yellow-500/20 text-yellow-400', Approved: 'bg-emerald-500/20 text-emerald-400', Rejected: 'bg-red-500/20 text-red-400' };
  return `<span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${map[status] || 'bg-white/10 text-white/50'}">${status || 'Pending'}</span>`;
}

function _renderBookings(items) {
  const content = document.getElementById('db-viewer-content');
  content.innerHTML = `
    <div class="space-y-3">
      ${items.map(b => {
    const isNew = b.viewed === false;
    return `
        <div id="booking-card-${b.id}" onclick="if(${isNew}) { handleAdminNotificationClick('bookings', ${b.id}); }" class="relative rounded-2xl p-5 transition-all border ${isNew ? 'border-red-500/40 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)] cursor-pointer' : 'border-white/8 bg-white/3 hover:border-white/15'
      }">
          ${isNew ? `<span class="absolute top-3 right-3 text-[8px] bg-red-500 text-white font-black uppercase tracking-widest px-2 py-0.5 rounded-full animate-pulse">NEW</span>` : ''}
          <div class="flex flex-wrap justify-between items-start gap-3 mb-3">
            <div>
              <h4 class="font-bold text-white text-sm">${b.name || '—'}</h4>
              <p class="text-[10px] text-white/40">${b.email || '—'} · ${b.phone || '—'}</p>
            </div>
            <div class="flex items-center gap-2 ${isNew ? 'mr-12' : ''}">
              ${_statusBadge(b.status)}
              <span class="text-[9px] text-white/30">${(b.timestamp || '').slice(0, 10)}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-[10px]">
            <div class="bg-white/5 rounded-xl p-2"><span class="text-white/30 block uppercase tracking-widest text-[8px] mb-0.5">Destination</span><span class="text-white/80 font-bold">${b.destination || '—'}</span></div>
            <div class="bg-white/5 rounded-xl p-2"><span class="text-white/30 block uppercase tracking-widest text-[8px] mb-0.5">Guests</span><span class="text-white/80 font-bold">${b.guests || '—'}</span></div>
            <div class="bg-white/5 rounded-xl p-2"><span class="text-white/30 block uppercase tracking-widest text-[8px] mb-0.5">Arrival</span><span class="text-white/80 font-bold">${b.arrival || '—'}</span></div>
            <div class="bg-white/5 rounded-xl p-2"><span class="text-white/30 block uppercase tracking-widest text-[8px] mb-0.5">Departure</span><span class="text-white/80 font-bold">${b.departure || '—'}</span></div>
          </div>
          ${b.vehicle ? `<p class="text-[10px] text-white/40 mb-3"><i class="fas fa-car text-primary mr-1"></i>${b.vehicle}</p>` : ''}
          ${b.message ? `<p class="text-[10px] text-white/50 bg-white/5 rounded-xl p-3 mb-4 italic">"${b.message}"</p>` : ''}
          <div class="flex flex-wrap gap-2">
            <button onclick="markItemViewed('bookings',${b.id}); dbUpdateBookingStatus(${b.id}, 'Approved')" class="flex-1 min-w-[90px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-check mr-1"></i>Approve</button>
            <button onclick="markItemViewed('bookings',${b.id}); dbUpdateBookingStatus(${b.id}, 'Rejected')" class="flex-1 min-w-[90px] bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-times mr-1"></i>Reject</button>
            <button onclick="markItemViewed('bookings',${b.id}); dbDelete('bookings', ${b.id})" class="bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-trash mr-1"></i>Delete</button>
          </div>
        </div>`;
  }).join('')}
    </div>`;
}

function _renderMessages(items) {
  const content = document.getElementById('db-viewer-content');
  content.innerHTML = `
    <div class="space-y-3">
      ${items.map(m => {
    const isNew = m.viewed === false;
    return `
        <div onclick="if(${isNew}) { handleAdminNotificationClick('messages', ${m.id}); }" class="relative bg-white/3 border ${isNew ? 'border-red-500/40 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)] cursor-pointer' : 'border-white/8 hover:border-white/15'} rounded-2xl p-5 transition-all">
          ${isNew ? '<span class="absolute top-3 right-3 text-[8px] bg-red-500 text-white font-black uppercase tracking-widest px-2 py-0.5 rounded-full animate-pulse">NEW</span>' : ''}
          <div class="flex flex-wrap justify-between items-start gap-3 mb-2">
            <div>
              <h4 class="font-bold text-white text-sm">${m.name || '—'}</h4>
              <p class="text-[10px] text-white/40">${m.email || '—'} · ${(m.timestamp || '').slice(0, 10)}</p>
            </div>
            ${m.subject ? `<span class="text-[9px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">${m.subject}</span>` : ''}
          </div>
          <p class="text-[11px] text-white/60 bg-white/5 rounded-xl p-3 mb-3 leading-relaxed">${m.message || '—'}</p>
          ${m.admin_reply ? `<div class="bg-primary/10 border border-primary/20 rounded-xl p-3 mb-3 text-[10px] text-white/70"><i class="fas fa-reply text-primary mr-1"></i><strong class="text-primary">Your reply:</strong> ${m.admin_reply}</div>` : ''}
          <div class="flex flex-wrap gap-2">
            <button onclick="markItemViewed('messages',${m.id}); showReplyModal(${m.id}, '${encodeURIComponent(m.name || '').replace(/'/g, "%27")}', '${encodeURIComponent(m.email || '').replace(/'/g, "%27")}', '${encodeURIComponent(m.message || '').replace(/'/g, "%27")}')" class="flex-1 min-w-[90px] bg-sky-500/20 border border-sky-500/30 text-sky-400 hover:bg-sky-500/30 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-reply mr-1"></i>Reply</button>
            <button onclick="markItemViewed('messages',${m.id}); dbDelete('messages', ${m.id})" class="bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-trash mr-1"></i>Delete</button>
          </div>
          </div>
        </div>`;
  }).join('')}
    </div>`;
}

function _renderUsers(items) {
  const content = document.getElementById('db-viewer-content');
  content.innerHTML = `
    <div class="mb-4 flex justify-end">
      <button onclick="showAddUserModal()" class="bg-primary text-black font-bold px-5 py-2 rounded-xl hover:opacity-90 transition-all text-xs"><i class="fas fa-user-plus mr-2"></i>Add User</button>
    </div>
    <div class="space-y-3">
      ${items.map(u => {
    const isNew = u.viewed === false;
    const safeName = (u.name || '').replace(/'/g, '');
    const safePhone = (u.phone || '').replace(/'/g, '');
    return `
        <div onclick="if(${isNew}) { handleAdminNotificationClick('users', '${u.email}'); }" class="relative rounded-2xl p-5 transition-all border ${isNew ? 'border-red-500/40 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)] cursor-pointer' : 'border-white/8 bg-white/3 hover:border-white/15'
      }">
          ${isNew ? '<span class="absolute top-3 right-3 text-[8px] bg-red-500 text-white font-black uppercase tracking-widest px-2 py-0.5 rounded-full animate-pulse">NEW</span>' : ''}
          <div class="flex flex-wrap justify-between items-start gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-white font-black text-sm">${(u.name || 'U').charAt(0).toUpperCase()}</div>
              <div>
                <h4 class="font-bold text-white text-sm">${u.name || '—'}</h4>
                <p class="text-[10px] text-white/40">${u.email || '—'} · ${u.phone || '—'}</p>
              </div>
            </div>
            <div class="flex gap-2 items-center ${isNew ? 'mr-12' : ''}">
              ${u.isAdmin ? '<span class="text-[9px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-black uppercase tracking-widest"><i class="fas fa-crown mr-1"></i>Admin</span>' : '<span class="text-[9px] bg-white/10 text-white/40 px-2 py-0.5 rounded font-black uppercase tracking-widest">User</span>'}
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="markItemViewed('users','${u.email}'); showEditUserModal('${u.email}','${safeName}','${safePhone}','${u.password || ''}')" class="flex-1 min-w-[80px] bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-edit mr-1"></i>Edit</button>
            <button onclick="markItemViewed('users','${u.email}'); dbToggleAdmin('${u.email}', ${!!u.isAdmin})" class="${u.isAdmin ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20'} border font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all flex-1 min-w-[100px]"><i class="fas fa-${u.isAdmin ? 'user-minus' : 'crown'} mr-1"></i>${u.isAdmin ? 'Remove Admin' : 'Make Admin'}</button>
            <button onclick="markItemViewed('users','${u.email}'); dbDelete('users','${u.email}')" class="bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl transition-all"><i class="fas fa-trash mr-1"></i>Delete</button>
          </div>
        </div>`;
  }).join('')}
    </div>`;
}

function _renderNewsletter(items) {
  const content = document.getElementById('db-viewer-content');
  if (!content) return;
  content.innerHTML = `
    <div class="mb-4 flex justify-end gap-2">
      <button onclick="showBroadcastNewsletterModal()" class="bg-blue-500 text-white font-bold px-5 py-2 rounded-xl hover:opacity-90 transition-all text-xs"><i class="fas fa-paper-plane mr-2"></i>Broadcast Msg</button>
      <button onclick="showAddNewsletterModal()" class="bg-primary text-black font-bold px-5 py-2 rounded-xl hover:opacity-90 transition-all text-xs"><i class="fas fa-plus mr-2"></i>Add Subscriber</button>
    </div>
    <div class="overflow-x-auto rounded-xl border border-white/10">
      <table class="w-full text-left text-xs">
        <thead class="bg-white/5">
          <tr>
            <th class="p-3 text-white/40 uppercase font-black tracking-widest">Email</th>
            <th class="p-3 text-white/40 uppercase font-black tracking-widest">Subscribed</th>
            <th class="p-3 text-white/40 uppercase font-black tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(n => {
    const isNew = n.viewed === false;
    return `<tr onclick="if(${isNew}) { handleAdminNotificationClick('newsletter', ${n.id}); }" class="transition-all ${isNew ? 'bg-red-500/8 border-l-2 border-red-500 cursor-pointer' : 'hover:bg-white/2'}">
            <td class="p-3 border-t border-white/5 text-white/70">
              ${isNew ? '<span class="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>' : ''}
              <i class="fas fa-envelope text-primary/50 mr-1"></i>${n.email || '—'}
            </td>
            <td class="p-3 border-t border-white/5 text-white/40">${(n.timestamp || n.updatedAt || '').slice(0, 10)}</td>
            <td class="p-3 border-t border-white/5 flex gap-2">
              <button onclick="markItemViewed('newsletter',${n.id}); dbDelete('newsletter', ${n.id})" class="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all"><i class="fas fa-trash mr-1"></i>Delete</button>
            </td>
          </tr>`;
  }).join('')}
        </tbody>
      </table>
    </div>`;
}

async function dbDelete(store, key) {
  if (!confirm('Are you sure you want to delete this record?')) return;

  // If it's a newsletter, get the email before deleting to send a user notification
  let nlEmail = null;
  if (store === 'newsletter') {
    try {
      const nl = await get('newsletter', key);
      if (nl) nlEmail = nl.email;
    } catch (e) { }
  }

  const tx = db.transaction(store, 'readwrite');
  tx.objectStore(store).delete(key).onsuccess = async () => {
    toast('Record deleted', 'error');
    if (store === 'users' || store === 'newsletter') {
      try {
        await save('admin_activity', {
          message: `${store === 'users' ? 'User' : 'Newsletter'} deleted: ${key}`,
          viewed: false,
          timestamp: new Date().toISOString()
        });
      } catch (e) { }
    }

    if (store === 'newsletter' && nlEmail) {
      try {
        await save('messages', {
          name: 'System',
          email: nlEmail,
          message: 'Newsletter Subscription',
          admin_reply: 'Your newsletter subscription has been removed.',
          user_unread: true,
          viewed: true,
          timestamp: new Date().toISOString()
        });
      } catch (e) { }
    }

    loadDBStore(store);
    checkAdminNotifications();
    notifyOtherTabs();
  };
}

async function dbUpdateBookingStatus(id, status) {
  const booking = await get('bookings', id);
  if (!booking) return toast('Booking not found', 'error');
  booking.status = status;
  booking.viewed = true;
  booking.user_unread = true;
  booking.admin_reply = `Your booking has been ${status.toLowerCase()}.`;
  await save('bookings', booking);
  toast(`Booking ${status}! ✅`, status === 'Approved' ? 'success' : 'error');
  loadDBStore('bookings');
  checkAdminNotifications();
  notifyOtherTabs();
}

function showReplyModal(id, encName, encEmail, encMsg) {
  const name = decodeURIComponent(encName);
  const email = decodeURIComponent(encEmail);
  const originalMsg = decodeURIComponent(encMsg);

  // Remove any existing modal
  const existing = document.getElementById('admin-reply-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'admin-reply-modal';
  modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="document.getElementById('admin-reply-modal').remove()"></div>
    <div class="relative glass-dark border border-white/10 rounded-2xl p-8 w-full max-w-lg z-10 shadow-2xl">
      <button onclick="document.getElementById('admin-reply-modal').remove()" class="absolute top-4 right-4 text-white/40 hover:text-white text-xl"><i class="fas fa-times"></i></button>
      <span class="text-primary text-[10px] font-black uppercase tracking-widest mb-1 block"><i class="fas fa-reply mr-1"></i>Reply to Message</span>
      <h3 class="text-xl font-bold text-white mb-1">${name}</h3>
      <p class="text-xs text-white/40 mb-4">${email}</p>
      <div class="bg-white/5 rounded-xl p-3 mb-4 text-xs text-white/50 italic max-h-24 overflow-y-auto">"${originalMsg}"</div>
      <textarea id="admin-reply-text" rows="4" placeholder="Type your reply here..." class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary resize-none mb-3"></textarea>
      <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-4">
        <i class="fas fa-image text-primary text-sm flex-shrink-0"></i>
        <input id="admin-reply-image-url" type="url" placeholder="Image URL (optional)" class="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none">
      </div>
      <button onclick="submitAdminReply(${id}, '${email.replace(/'/g, "\\'")}')" class="w-full bg-primary text-black font-black py-3 rounded-xl hover:opacity-90 transition-all text-sm"><i class="fas fa-paper-plane mr-2"></i>Send Reply</button>
    </div>`;
  document.body.appendChild(modal);
}

async function submitAdminReply(id, email) {
  const replyText = document.getElementById('admin-reply-text').value.trim();
  if (!replyText) return toast('Please write a reply first', 'warning');

  const msg = await get('messages', id);
  if (!msg) return toast('Message not found', 'error');
  msg.admin_reply = replyText;
  msg.viewed = true;
  msg.user_unread = true;
  await save('messages', msg);

  // Send email via EmailJS
  if (typeof emailjs !== 'undefined') {
    try {
      toast('Sending reply...', 'info');
      const replyImage = (document.getElementById('admin-reply-image-url') ? document.getElementById('admin-reply-image-url').value.trim() : '');
      const emailParams = {
        from_name: 'Leeza Travels',
        from_email: 'Leezatravelslk@gmail.com',
        to_email: email,
        email: email,
        broadcast_subject: 'Reply from Leeza Travels',
        broadcast_message: replyText,
        image_url: replyImage,
        subject: 'Reply from Leeza Travels',
        message: replyText,
        name: 'Valued Customer',
        user_name: 'Valued Customer'
      };
      console.log('📧 Sending reply email to:', email, emailParams);
      const result = await emailjs.send('service_cqv30sa', 'template_mhs62hl', emailParams, 'tRG6iOeYylZBAVmsa');
      console.log('✅ Reply email sent successfully:', result);
      toast('Reply sent to ' + email + ' ✅', 'success');
    } catch (e) {
      console.error('❌ Reply email FAILED:', e);
      toast('Email failed: ' + (e.text || e.message || 'Unknown error'), 'error');
      return; // Don't close modal if email failed
    }
  } else {
    toast('EmailJS not loaded!', 'error');
    return;
  }

  const modal = document.getElementById('admin-reply-modal');
  if (modal) modal.remove();
  loadDBStore('messages');
  notifyOtherTabs();
}

function showAddUserModal() {
  const existing = document.getElementById('admin-add-user-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'admin-add-user-modal';
  modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="document.getElementById('admin-add-user-modal').remove()"></div>
    <div class="relative glass-dark border border-white/10 rounded-2xl p-8 w-full max-w-md z-10 shadow-2xl">
      <button onclick="document.getElementById('admin-add-user-modal').remove()" class="absolute top-4 right-4 text-white/40 hover:text-white text-xl"><i class="fas fa-times"></i></button>
      <span class="text-primary text-[10px] font-black uppercase tracking-widest mb-1 block"><i class="fas fa-user-plus mr-1"></i>Add New User</span>
      <h3 class="text-xl font-bold text-white mb-5">Create Account</h3>
      <div class="space-y-3">
        <input id="au-name" type="text" placeholder="Full Name *" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
        <input id="au-email" type="email" placeholder="Email *" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
        <input id="au-phone" type="text" placeholder="Phone" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
        <input id="au-pass" type="password" placeholder="Password *" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
        <label class="flex items-center gap-2 text-xs text-white/50 cursor-pointer"><input id="au-admin" type="checkbox" class="accent-primary"> Make this user an Admin</label>
      </div>
      <button onclick="submitAddUser()" class="w-full bg-primary text-black font-black py-3 rounded-xl hover:opacity-90 transition-all text-sm mt-5"><i class="fas fa-plus mr-2"></i>Create User</button>
    </div>`;
  document.body.appendChild(modal);
}

async function submitAddUser() {
  const name = document.getElementById('au-name').value.trim();
  const email = document.getElementById('au-email').value.trim();
  const phone = document.getElementById('au-phone').value.trim();
  const pass = document.getElementById('au-pass').value.trim();
  const isAdmin = document.getElementById('au-admin').checked;
  if (!name || !email || !pass) return toast('Name, email & password are required', 'warning');
  const existing = await get('users', email);
  if (existing) return toast('Email already exists', 'error');
  const user = { email, name, phone: phone || 'N/A', password: pass, isAdmin, viewed: false, timestamp: new Date().toISOString() };
  await save('users', user);
  if (isAdmin) {
    const tx = db.transaction('admins', 'readwrite');
    tx.objectStore('admins').put({ email, role: 'admin', addedAt: new Date().toISOString() });
  }
  toast(`User "${name}" created! ✅`, 'success');
  document.getElementById('admin-add-user-modal').remove();
  loadDBStore('users');
  notifyOtherTabs();
}

function showEditUserModal(email, name, phone, pass) {
  const existing = document.getElementById('admin-edit-user-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'admin-edit-user-modal';
  modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="document.getElementById('admin-edit-user-modal').remove()"></div>
    <div class="relative glass-dark border border-white/10 rounded-2xl p-8 w-full max-w-md z-10 shadow-2xl">
      <button onclick="document.getElementById('admin-edit-user-modal').remove()" class="absolute top-4 right-4 text-white/40 hover:text-white text-xl"><i class="fas fa-times"></i></button>
      <span class="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-1 block"><i class="fas fa-edit mr-1"></i>Edit User</span>
      <h3 class="text-xl font-bold text-white mb-5">${email}</h3>
      <div class="space-y-3">
        <input id="eu-name" type="text" value="${name}" placeholder="Full Name" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
        <input id="eu-phone" type="text" value="${phone}" placeholder="Phone" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
        <input id="eu-pass" type="password" value="${pass}" placeholder="New Password (leave blank to keep)" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary">
      </div>
      <button onclick="submitEditUser('${email}')" class="w-full bg-sky-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition-all text-sm mt-5"><i class="fas fa-save mr-2"></i>Save Changes</button>
    </div>`;
  document.body.appendChild(modal);
}

async function submitEditUser(email) {
  const user = await get('users', email);
  if (!user) return toast('User not found', 'error');
  const newName = document.getElementById('eu-name').value.trim();
  const newPhone = document.getElementById('eu-phone').value.trim();
  const newPass = document.getElementById('eu-pass').value.trim();
  if (newName) user.name = newName;
  if (newPhone) user.phone = newPhone;
  if (newPass) user.password = newPass;
  await save('users', user);
  try {
    await save('admin_activity', {
      message: `User updated: ${email}`,
      viewed: false,
      timestamp: new Date().toISOString()
    });
    // Send user-facing notification
    await save('messages', {
      name: 'System',
      email: email,
      message: 'Profile Update',
      admin_reply: 'Your profile details were updated by an administrator.',
      user_unread: true,
      viewed: true,
      timestamp: new Date().toISOString()
    });
  } catch (e) { }
  toast('User updated! ✅', 'success');
  document.getElementById('admin-edit-user-modal').remove();
  loadDBStore('users');
  notifyOtherTabs();
}

async function dbToggleAdmin(email, currentlyAdmin) {
  const user = await get('users', email);
  if (!user) return toast('User not found', 'error');
  if (currentlyAdmin) {
    user.isAdmin = false;
    await save('users', user);
    const tx = db.transaction('admins', 'readwrite');
    tx.objectStore('admins').delete(email);
    toast(`Admin rights removed from ${email}`, 'error');
    try {
      await save('admin_activity', { message: `Admin revoked: ${email}`, viewed: false, timestamp: new Date().toISOString() });
      await save('messages', { name: 'System', email: email, message: 'Account Status', admin_reply: 'Your administrator privileges have been revoked.', user_unread: true, viewed: true, timestamp: new Date().toISOString() });
    } catch (e) { }
  } else {
    user.isAdmin = true;
    await save('users', user);
    const tx = db.transaction('admins', 'readwrite');
    tx.objectStore('admins').put({ email, role: 'admin', addedAt: new Date().toISOString() });
    toast(`${email} is now an Admin! 👑`, 'success');
    try {
      await save('admin_activity', { message: `Admin granted: ${email}`, viewed: false, timestamp: new Date().toISOString() });
      await save('messages', { name: 'System', email: email, message: 'Account Status', admin_reply: 'You have been granted administrator privileges!', user_unread: true, viewed: true, timestamp: new Date().toISOString() });
    } catch (e) { }
  }
  loadDBStore('users');
  notifyOtherTabs();
}

function showAddNewsletterModal() {
  const existing = document.getElementById('admin-add-nl-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'admin-add-nl-modal';
  modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="document.getElementById('admin-add-nl-modal').remove()"></div>
    <div class="relative glass-dark border border-white/10 rounded-2xl p-8 w-full max-w-md z-10 shadow-2xl">
      <button onclick="document.getElementById('admin-add-nl-modal').remove()" class="absolute top-4 right-4 text-white/40 hover:text-white text-xl"><i class="fas fa-times"></i></button>
      <span class="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1 block"><i class="fas fa-newspaper mr-1"></i>Add Subscriber</span>
      <h3 class="text-xl font-bold text-white mb-5">Newsletter</h3>
      <input id="admin-nl-email" type="email" placeholder="Email Address *" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary mb-4">
      <button onclick="submitAddNewsletter()" class="w-full bg-emerald-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition-all text-sm"><i class="fas fa-plus mr-2"></i>Add Subscriber</button>
    </div>`;
  document.body.appendChild(modal);
}

async function submitAddNewsletter() {
  const email = document.getElementById('admin-nl-email').value.trim();
  if (!email) return toast('Please enter an email', 'warning');
  await save('newsletter', { email, viewed: false, timestamp: new Date().toISOString() });
  try {
    await save('messages', {
      name: 'System',
      email: email,
      message: 'Newsletter Subscription',
      admin_reply: 'You have been successfully added to our newsletter!',
      user_unread: true,
      viewed: true,
      timestamp: new Date().toISOString()
    });
  } catch (e) { }
  toast('Subscriber added! ✅', 'success');
  document.getElementById('admin-add-nl-modal').remove();
  loadDBStore('newsletter');
  notifyOtherTabs();
}

function showBroadcastNewsletterModal() {
  const existing = document.getElementById('admin-broadcast-nl-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'admin-broadcast-nl-modal';
  modal.className = 'fixed inset-0 z-[300] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="document.getElementById('admin-broadcast-nl-modal').remove()"></div>
    <div class="relative glass-dark border border-white/10 rounded-2xl p-8 w-full max-w-lg z-10 shadow-2xl">
      <button onclick="document.getElementById('admin-broadcast-nl-modal').remove()" class="absolute top-4 right-4 text-white/40 hover:text-white text-xl"><i class="fas fa-times"></i></button>
      <span class="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1 block"><i class="fas fa-paper-plane mr-1"></i>Broadcast Message</span>
      <h3 class="text-xl font-bold text-white mb-5">Email All Subscribers</h3>
      <input id="bn-subject" type="text" placeholder="Subject" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary mb-4">
      <textarea id="bn-message" rows="5" placeholder="Type your message here..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary mb-3 resize-none"></textarea>
      <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mb-4">
        <i class="fas fa-image text-primary text-sm flex-shrink-0"></i>
        <input id="bn-image-url" type="url" placeholder="Image URL (optional)" class="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none">
      </div>
      <button onclick="submitBroadcastNewsletter()" id="bn-submit-btn" class="w-full bg-blue-500 text-white font-black py-3 rounded-xl hover:opacity-90 transition-all text-sm"><i class="fas fa-paper-plane mr-2"></i>Send Broadcast</button>
    </div>`;
  document.body.appendChild(modal);
}

async function submitBroadcastNewsletter() {
  const subject = document.getElementById('bn-subject').value.trim();
  const message = document.getElementById('bn-message').value.trim();
  if (!subject || !message) return toast('Subject and message are required', 'warning');
  const imageUrl = (document.getElementById('bn-image-url') ? document.getElementById('bn-image-url').value.trim() : '');

  const btn = document.getElementById('bn-submit-btn');
  const ogText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
  btn.disabled = true;

  try {
    const subscribers = await loadAll('newsletter');
    const validSubs = subscribers.filter(s => s && s.email);
    if (!validSubs.length) {
      toast('No subscribers found.', 'warning');
      btn.innerHTML = ogText; btn.disabled = false; return;
    }

    console.group('--- Newsletter Broadcast ---');
    console.log(`Starting broadcast to ${validSubs.length} subscribers...`);

    let sentCount = 0;
    let failedCount = 0;

    if (typeof emailjs !== 'undefined') {
      const fromEmail = currentUser ? currentUser.email : 'Leezatravelslk@gmail.com';

      const promises = validSubs.map(sub => {
        const params = {
          name: 'Subscriber',
          user_name: 'Subscriber',
          from_name: 'Leeza Travels',
          from_email: fromEmail,
          to_email: sub.email,
          email: sub.email,
          // Match exact template variable names
          broadcast_subject: subject,
          broadcast_message: message,
          image_url: imageUrl,
          // Also send generic fallbacks
          subject: subject,
          title: subject,
          message: message,
          msg: message,
          body: message,
          content: message,
          timestamp: new Date().toLocaleString()
        };

        // Use template_mhs62hl which has {{broadcast_subject}} and {{broadcast_message}}
        return emailjs.send('service_cqv30sa', 'template_mhs62hl', params, 'tRG6iOeYylZBAVmsa')
          .then(res => {
            console.log(`✅ Sent to ${sub.email}:`, res);
            sentCount++;
          })
          .catch(err => {
            console.error(`❌ Failed for ${sub.email}:`, err);
            failedCount++;
          });
      });

      await Promise.all(promises);
    }

    console.log(`Broadcast Finished! Sent: ${sentCount}, Failed: ${failedCount}`);
    console.groupEnd();

    try {
      await save('admin_activity', {
        message: `Sent Newsletter Broadcast: ${subject} (Sent: ${sentCount}, Failed: ${failedCount})`,
        viewed: false,
        timestamp: new Date().toISOString()
      });
    } catch (e) { }

    if (sentCount > 0) {
      toast(`Broadcast finished! Sent: ${sentCount}, Failed: ${failedCount} 📧`, sentCount === validSubs.length ? 'success' : 'warning');
      document.getElementById('admin-broadcast-nl-modal').remove();
      loadDBStore('newsletter');
    } else {
      toast(`Broadcast failed for all ${failedCount} subscribers. Check console for details.`, 'error');
      btn.innerHTML = ogText; btn.disabled = false;
    }
  } catch (err) {
    console.error('Critical broadcast error:', err);
    toast('Critical error sending broadcast.', 'error');
    btn.innerHTML = ogText; btn.disabled = false;
  }
}

// ── Profile Logic ──────────────────────────────────────────────
function toggleProfileModal() {
  const m = document.getElementById('profile-modal');
  if (!m) return;
  const isHidden = !m.style.display || m.style.display === 'none';
  m.style.display = isHidden ? 'flex' : 'none';
  document.body.style.overflow = isHidden ? 'hidden' : '';
  if (isHidden) loadUserTravelHistory();
}

async function loadUserTravelHistory() {
  if (!currentUser) return;
  const userEmail = (currentUser.email || '').toLowerCase();
  const bookings = (await loadAll('bookings')).filter(b => (b.email || '').toLowerCase() === userEmail);
  const list = document.getElementById('profile-booking-list') || document.getElementById('p-bookings-list');
  const count = document.getElementById('profile-booking-count') || document.getElementById('p-bookings');
  if (count) count.textContent = `${bookings.length} Total Bookings`;
  if (list) {
    list.innerHTML = bookings.length ? bookings.reverse().map(b => `
      <div class="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center mb-3">
        <div>
          <h4 class="text-xs font-bold text-white mb-0.5">${b.destination || 'Trip'}</h4>
          <p class="text-[10px] text-white/40 flex items-center gap-1"><i class="fas fa-calendar-alt text-[8px]"></i> ${b.arrival || 'TBD'}</p>
        </div>
        <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-primary/20 text-primary">${b.status || 'Pending'}</span>
      </div>`).join('') : `<div class="text-center py-6 text-xs text-white/30 italic"><i class="fas fa-box-open block mb-2 opacity-20 text-xl"></i>No adventure history yet.</div>`;
  }
}

// ── Booking Modal ──────────────────────────────────────────────
function openModal(dest = '') {
  const modal = document.getElementById('booking-modal') || document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  if (dest) {
    const destInput = document.getElementById('bk-destination') || document.getElementById('b-dest');
    if (destInput) destInput.value = dest;
  }

  const today = new Date().toISOString().split('T')[0];
  const arrivalEl = document.getElementById('bk-arrival') || document.getElementById('b-arr-date');
  const departureEl = document.getElementById('bk-departure') || document.getElementById('b-dep-date');
  if (arrivalEl) arrivalEl.min = today;
  if (departureEl) departureEl.min = today;
}

function closeModal() {
  const modal = document.getElementById('booking-modal') || document.getElementById('modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ── Tours & Explore Modals ────────────────────────────────────
function openToursModal() {
  const m = document.getElementById('tours-modal');
  if (!m) return;
  m.classList.remove('hidden');
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeToursModal() {
  const m = document.getElementById('tours-modal');
  if (!m) return;
  m.classList.add('hidden');
  m.style.display = 'none';
  document.body.style.overflow = '';
}

function openExploreModal() {
  const m = document.getElementById('explore-modal');
  if (!m) return;
  m.classList.remove('hidden');
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeExploreModal() {
  const m = document.getElementById('explore-modal');
  if (!m) return;
  m.classList.add('hidden');
  m.style.display = 'none';
  document.body.style.overflow = '';
}

function closeAllModals() {
  closeModal();
  closeToursModal();
  closeExploreModal();
  const auth = document.getElementById('auth-modal');
  if (auth) { auth.classList.add('hidden'); auth.style.display = 'none'; }
  const profile = document.getElementById('profile-modal');
  if (profile) { profile.classList.add('hidden'); profile.style.display = 'none'; }
  document.body.style.overflow = '';
}

function checkNavHash() {
  closeAllModals();
  const h = window.location.hash;
  if (h === '#tours') openToursModal();
  if (h === '#explore') openExploreModal();
  if (h === '#profile') toggleProfileModal();
}

async function submitBooking(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]') || document.getElementById('bk-submit-btn');

  const name = (form.querySelector('#bk-name') || form.querySelector('#b-name') || form.querySelector('input[name="name"]') || { value: '' }).value.trim();
  const email = (form.querySelector('#bk-email') || form.querySelector('#b-email') || form.querySelector('input[name="email"]') || { value: '' }).value.trim();
  const phone = (form.querySelector('#bk-phone') || form.querySelector('#b-phone') || form.querySelector('input[name="phone"]') || { value: '' }).value.trim();
  const guests = (form.querySelector('#bk-guests') || form.querySelector('#b-ppl') || form.querySelector('input[name="guests"]') || { value: '' }).value.trim();
  const arrival = (form.querySelector('#bk-arrival') || form.querySelector('#b-arr-date') || form.querySelector('input[name="arrival"]') || { value: '' }).value;
  const depart = (form.querySelector('#bk-departure') || form.querySelector('#b-dep-date') || form.querySelector('input[name="departure"]') || { value: '' }).value;
  const destination = (form.querySelector('#bk-destination') || form.querySelector('#b-dest') || form.querySelector('input[name="destination"]') || { value: '' }).value;
  const vehicle = (form.querySelector('#bk-vehicle') || form.querySelector('#b-vehicle') || form.querySelector('input[name="vehicle"]') || { value: '' }).value;
  const message = (form.querySelector('#bk-message') || form.querySelector('#b-message') || form.querySelector('textarea[name="message"]') || { value: '' }).value.trim();

  if (!name || !email || !phone || !guests || !arrival || !depart) {
    return toast('Please fill in all required fields.', 'warning');
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
  }

  try {
    const booking = {
      name,
      email: email.toLowerCase(),
      phone,
      guests: Number(guests),
      arrival,
      departure: depart,
      destination: destination || 'Sri Lanka Tour',
      vehicle: vehicle || 'Not Specified',
      message: message || '',
      status: 'Pending',
      timestamp: new Date().toISOString(),
      viewed: false
    };

    // Save to IndexedDB (Core success for the Admin system)
    await save('bookings', booking);

    // Immediate success feedback to User
    toast('Booking request sent! We will contact you soon.', 'success');
    form.reset();
    closeModal();
    notifyOtherTabs();
    checkAdminNotifications();

    // Send Email Notifications (Background/Optional)
    if (typeof emailjs !== 'undefined') {
      try {
        const emailParams = {
          name,
          from_name: name,
          full_name: name,
          email,
          from_email: email,
          user_email: email,
          phone,
          user_phone: phone,
          guests: Number(guests),
          no_of_guests: Number(guests),
          arrival,
          arrival_date: arrival,
          departure: depart,
          departure_date: depart,
          destination: destination || 'Sri Lanka Tour',
          vehicle: vehicle || 'Not Specified',
          selected_vehicle: vehicle || 'Not Specified',
          message: message || 'None',
          reply_to: email,
          to_email: 'chamodnimantha271299@gmail.com'
        };

        // Send only to Admin
        await emailjs.send('service_s7kzv5g', 'template_mhs62h1', emailParams, 'tRG6iOeYylZBAVmsa');
      } catch (e) {
        console.warn('Background email notification failed:', e);
      }
    }
  } catch (err) {
    console.error('Booking Storage Error:', err);
    toast('Error saving booking. Please try again.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Booking Request';
    }
  }
}

// Global Exports
window.openModal = openModal;
window.closeModal = closeModal;
window.submitBooking = submitBooking;
window.toast = toast;

// ── Miscellaneous ──
function toast(msg, type = 'info') {
  let t = document.getElementById('toast');
  if (!t) return;
  const m = document.getElementById('toast-msg');
  const i = document.getElementById('toast-icon');
  if (!m) return;
  const config = {
    success: { bg: '#10b981', icon: 'fa-check-circle' },
    error: { bg: '#ef4444', icon: 'fa-exclamation-triangle' },
    warning: { bg: '#f97316', icon: 'fa-exclamation-circle' },
    info: { bg: '#0ea5e9', icon: 'fa-info-circle' }
  }[type] || { bg: '#334155', icon: 'fa-bell' };

  t.style.background = config.bg;
  m.textContent = msg;
  if (i) i.innerHTML = `<i class="fas ${config.icon}"></i>`;

  if (t._hideTimer) clearTimeout(t._hideTimer);

  // Show using the standardized CSS class
  t.classList.add('show');

  t._hideTimer = setTimeout(() => {
    t.classList.remove('show');
  }, 4000);
}

// ── Destination Info Modal ────────────────────────────────────
const destData = {
  colombo: {
    name: 'Colombo',
    tag: '🏙️ Commercial Capital',
    province: 'Western Province',
    img: 'images/colombo_dest.png',
    desc: 'Colombo is Sri Lanka\'s vibrant commercial capital — a dynamic fusion of colonial-era architecture, glittering modern skyscrapers, and colourful street markets. Stroll along the Galle Face Green promenade, cruise on Beira Lake, and marvel at the soaring Lotus Tower. The city pulses with energy day and night, offering world-class dining, luxury shopping malls, and historic landmarks all within easy reach.',
    highlights: ['Gangaramaya Temple', 'Beira Lake Cruise', 'Lotus Tower (350m)', 'Pettah Bazaar', 'National Museum', 'Galle Face Green', 'Slave Island', 'Dutch Hospital'],
    bestTime: 'December – April',
    climate: 'Tropical, 27–32°C year-round',
    tag2: 'City Break'
  },
  kandy: {
    name: 'Kandy',
    tag: '🏛️ Cultural Capital',
    province: 'Central Province',
    img: 'images/kandy_dest.png',
    desc: 'Kandy is the beating cultural heart of Sri Lanka, cradled within emerald mountains at 500m elevation. The sacred Temple of the Tooth Relic — a UNESCO World Heritage Site — sits majestically on the shore of Kandy Lake. Every August the city ignites with the legendary Esala Perahera festival — one of Asia\'s most spectacular pageants of elephants, fire dancers and drumbeats.',
    highlights: ['Temple of the Tooth Relic (UNESCO)', 'Kandy Lake', 'Royal Botanical Gardens', 'Kandyan Cultural Show', 'Bahiravokanda Buddha Statue', 'Udawattakele Forest Reserve', 'Tea Museum', 'Peradeniya University'],
    bestTime: 'January – April, July – August',
    climate: 'Mild & Cool, 19–28°C',
    tag2: 'Heritage & Culture'
  },
  dambulla: {
    name: 'Dambulla',
    tag: '🗿 Ancient Wonders',
    province: 'North Central Province',
    img: 'images/dambulla_dest.png',
    desc: 'Dambulla is the gateway to Sri Lanka\'s ancient Cultural Triangle. The magnificent Dambulla Cave Temple — the largest and best-preserved cave temple complex in Sri Lanka — houses 153 Buddha statues and 2,000-year-old murals across five sacred caves. Nearby, the iconic Sigiriya Lion Rock fortress rises 200 metres from the jungle plains, offering breathtaking panoramic views from its summit palace.',
    highlights: ['Dambulla Cave Temple (UNESCO)', 'Sigiriya Rock Fortress (UNESCO)', 'Minneriya National Park', 'Polonnaruwa Ancient City', 'Pidurangala Rock', 'Aukana Buddha Statue', 'Ibbankatuwa Megalithic Tombs', 'Habarana Village'],
    bestTime: 'May - September',
    climate: 'Hot & Dry, 26-35°C',
    tag2: 'History & Adventure'
  },
  nuwaraeliya: {
    name: 'Nuwara Eliya',
    tag: '🍃 Little England',
    province: 'Central Province (1,868m)',
    img: 'images/nuwara_dest.png',
    desc: 'Dubbed "Little England", Nuwara Eliya is Sri Lanka\'s crown jewel of the highlands — a cool misty paradise of endless emerald tea estates, tumbling waterfalls, and Victorian-era colonial buildings. Ride the legendary blue train through cloud forests, visit a working tea factory, and breathe the freshest mountain air in the island. The landscape is nothing short of magical.',
    highlights: ['Pedro & Mackwoods Tea Estates', 'Ramboda & Gregory Lake', 'Horton Plains National Park', 'World\'s End Cliff (880m drop)', 'Ella Rock & 9-Arch Bridge', 'Blue Train (Kandy–Ella)', 'Victoria Park Gardens', 'Seetha Amman Temple'],
    bestTime: 'March – May, July – September',
    climate: 'Cool & Misty, 10–22°C',
    tag2: 'Nature & Wellness'
  },
  galle: {
    name: 'Galle',
    tag: '🏰 UNESCO Fort City',
    province: 'Southern Province',
    img: 'images/galle_dest.png',
    desc: 'Galle is a UNESCO World Heritage city of timeless charm — a perfectly preserved Dutch colonial fort wrapped by the Indian Ocean on three sides. Walk along ancient ramparts at golden hour, browse boutique galleries inside 400-year-old stone buildings, sip Ceylon tea at a clifftop café, and watch traditional stilt fishermen silhouetted against a fiery sunset. Utterly unique and deeply romantic.',
    highlights: ['Galle Fort (UNESCO)', 'Dutch Reformed Church (1755)', 'Galle Lighthouse', 'Unawatuna Beach', 'Jungle Beach', 'Stilt Fishing at Koggala', 'Mirissa Whale Watching (nearby)', 'National Maritime Museum'],
    bestTime: 'November – April',
    climate: 'Tropical, 25–32°C',
    tag2: 'Heritage & Beach'
  },
  mirissa: {
    name: 'Mirissa',
    tag: '🐋 Tropical Paradise',
    province: 'Southern Province',
    img: 'images/wp7089070.jpg',
    desc: 'Mirissa is Sri Lanka\'s ultimate beach escape — a crescent of powder-white sand fringed by swaying coconut palms and lapped by warm turquoise Indian Ocean waves. It is also the world\'s top destination for blue whale watching, with sightings of these gentle giants just a short boat ride offshore. Watch the sunrise from Coconut Tree Hill, snorkel among vibrant coral reefs, and unwind with fresh seafood as the sun melts into the horizon.',
    highlights: ['Blue & Sperm Whale Watching', 'Mirissa Beach & Parrot Rock', 'Coconut Tree Hill (iconic)', 'Snorkelling & Diving', 'Secret Beach', 'Weligama Bay Surfing', 'Jungle Beach Hike', 'Fresh Seafood Restaurants'],
    bestTime: 'November – April',
    climate: 'Tropical Beach, 27–33°C',
    tag2: 'Beach & Marine Life'
  }
};

window.openDestInfoModal = function (key) {
  const d = destData[key];
  if (!d) return;
  const m = document.getElementById('dest-info-modal');
  if (!m) return;

  m.querySelector('#di-img').src = d.img;
  m.querySelector('#di-img').alt = d.name;
  m.querySelector('#di-tag').textContent = d.tag;
  m.querySelector('#di-name').textContent = d.name;
  m.querySelector('#di-province').textContent = d.province;
  m.querySelector('#di-desc').textContent = d.desc;
  m.querySelector('#di-best-time').textContent = d.bestTime;
  m.querySelector('#di-climate').textContent = d.climate;
  m.querySelector('#di-tag2').textContent = d.tag2;

  const hl = m.querySelector('#di-highlights');
  hl.innerHTML = d.highlights.map(h =>
    `<li class="flex items-center gap-2 text-white/60 text-xs"><i class="fas fa-check-circle text-primary text-[9px]"></i>${h}</li>`
  ).join('');

  const bookBtn = m.querySelector('#di-book-btn');
  if (bookBtn) bookBtn.onclick = () => { closeDestInfoModal(); openModal(d.name); };

  m.classList.remove('hidden');
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeDestInfoModal = function () {
  const m = document.getElementById('dest-info-modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
  document.body.style.overflow = '';
};

// ── Navigation Highlighting ──────────────────────────────────
function updateActiveNavLink() {
  const hash = window.location.hash;
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('#nav a, #mob a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    let isActive = false;

    if (path.includes('trips.html')) {
      isActive = href === 'trips.html';
    } else if (path.includes('explore.html')) {
      isActive = href === 'explore.html';
    } else {
      // Home page logic
      const targetHash = (hash === '' || hash === '#home' || hash === '#') ? '#home' : hash;
      const isHomeLink = href === 'index.html' || href === 'index.html#home' || href === '#' || href === '#home';
      isActive = (targetHash === '#home' && isHomeLink) || (targetHash !== '#home' && href === targetHash);
    }

    if (isActive) {
      link.classList.add('active-nav');
    } else {
      link.classList.remove('active-nav');
    }
  });
}

// ── Scroll Reveal Logic ────────────────────────────────────────â”€
function initScrollReveal() {
  const root = document.getElementById('page-scroll-wrap');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after reveal to save resources
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: root,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  const targets = document.querySelectorAll('.reveal');
  targets.forEach(t => revealObserver.observe(t));
}

// ── Count Up Animation Logic ────────────────────────────────────
function initCountUp() {
  const root = document.getElementById('page-scroll-wrap');
  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countUpObserver.unobserve(entry.target);
      }
    });
  }, {
    root: root,
    threshold: 0.5
  });

  const counters = document.querySelectorAll('.stat-counter');
  counters.forEach(c => countUpObserver.observe(c));
}

function showInfoModal(type) {
  const modal = document.getElementById('info-modal');
  if (!modal) return;

  const data = infoContents[type] || { title: 'Information', subtitle: 'Notice', content: 'Content is being updated. Please check back later.' };

  const titleEl = modal.querySelector('#info-title');
  const tagEl = modal.querySelector('#info-tag');
  const contentEl = modal.querySelector('#info-content');

  if (titleEl) titleEl.innerText = data.title;
  if (tagEl) tagEl.innerText = data.subtitle || data.tag || 'Information';
  if (contentEl) contentEl.innerHTML = data.content || data.html || data.text;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeInfoModal() {
  const modal = document.getElementById('info-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function showTrackModal() {
  const modal = document.getElementById('track-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const results = document.getElementById('track-results');
    if (results) results.classList.add('hidden');
    const input = document.getElementById('track-email') || document.getElementById('track-name');
    if (input) input.value = '';
  }
}

function closeTrackModal() {
  const modal = document.getElementById('track-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

async function trackBookings() {
  const input = document.getElementById('track-email') || document.getElementById('track-name');
  const email = input ? input.value.trim() : '';
  if (!email) { toast('Please enter your email!', 'warning'); return; }

  const results = document.getElementById('track-results');
  if (results) {
    results.classList.remove('hidden');
    results.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-primary"></i> Searching...</div>';
  }

  try {
    const all = await loadAll('bookings');
    const mine = all.filter(i => (i.email || '').toLowerCase() === email.toLowerCase());

    if (!results) return;

    if (!mine.length) {
      results.innerHTML = `<div class="p-6 text-center text-white/30 italic text-xs">No bookings found for this email.</div>`;
      return;
    }

    results.innerHTML = `<div class="text-[10px] font-black uppercase text-primary mb-3 text-center">Found ${mine.length} Bookings</div>` +
      mine.reverse().map(i => `
        <div class="glass p-5 rounded-2xl border border-white/10 mb-3 bg-white/5">
            <div class="flex justify-between mb-2">
                <span class="text-sm font-bold text-white">${i.destination || 'Custom Trip'}</span>
                <span class="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest">${i.status || 'Pending'}</span>
            </div>
            <div class="text-[10px] text-white/40 font-medium">Arrival: ${i.arrival || i.date || 'TBD'} | Guests: ${i.guests || i.people || '1'}</div>
        </div>
    `).join('');
  } catch (e) {
    console.error(e);
    if (results) results.innerHTML = `<div class="p-6 text-center text-red-400 text-xs">Error tracking bookings.</div>`;
  }
}

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 800; // Fast 0.8 seconds
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (easeOutQuad)
    const easedProgress = progress * (2 - progress);

    const currentCount = Math.floor(easedProgress * target);
    el.textContent = currentCount;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(updateCount);
}

// ── App Start ────────────────────────────────────────────────â”€
document.addEventListener('DOMContentLoaded', async () => {
  await initDB();
  checkNavHash();
  updateActiveNavLink();
  initScrollReveal(); // Initialize animations
  initCountUp();      // Initialize statistics count-up
  window.addEventListener('hashchange', () => {
    checkNavHash();
    updateActiveNavLink();
  });

  await checkAuth();
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#nav-dropdown-wrapper')) closeNavNotifications();
    if (!e.target.closest('#user-dropdown-wrapper')) closeUserNotifications();
  });
});

// ── Contact & Newsletter ──────────────────────────────────────
async function sendMsg(e) {
  if (e) e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]') || document.getElementById('c-btn');
  const btnText = form.querySelector('#c-btn-text') || document.getElementById('c-btn-text');

  // Use form-scoped selectors to be 100% sure we get the right values
  const m = {
    name: (form.querySelector('#c-name') || form.querySelector('input[name="name"]') || form.elements['name'] || { value: '' }).value.trim(),
    email: (form.querySelector('#c-email') || form.querySelector('input[name="email"]') || form.elements['email'] || { value: '' }).value.trim(),
    phone: (form.querySelector('#c-phone') || form.querySelector('input[name="phone"]') || form.elements['phone'] || { value: '' }).value.trim() || 'N/A',
    interest: (form.querySelector('#c-dest') || form.querySelector('input[name="interest"]') || form.elements['interest'] || { value: '' }).value.trim() || 'General Inquiry',
    message: (form.querySelector('#c-msg') || form.querySelector('textarea[name="message"]') || form.elements['message'] || { value: '' }).value.trim(),
    viewed: false,
    timestamp: new Date().toISOString()
  };

  if (!m.name || !m.email) {
    toast('Please enter your name and email.', 'error');
    return;
  }

  // UI Feedback
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Sending...';
  toast('Sending message...', 'info');

  // Save local backup
  try { await save('messages', m); } catch (err) { console.error('Local save error:', err); }

  // Send Emails
  const emailParams = {
    // Primary Name variations
    name: m.name,
    user_name: m.name,
    from_name: m.name,
    full_name: m.name,
    Name: m.name,
    Full_Name: m.name,

    // RECIPIENT SETTINGS
    email: 'chamodnimantha271299@gmail.com',
    Email: 'chamodnimantha271299@gmail.com',
    to_email: 'chamodnimantha271299@gmail.com',

    // VISITOR INFO (for the email body)
    visitor_email: m.email,
    from_email: m.email,
    user_email: m.email,
    email_address: m.email,
    phone: m.phone,
    user_phone: m.phone,
    phone_number: m.phone,
    Phone: m.phone,
    interest: m.interest,
    destination: m.interest,
    planned_destination: m.interest,
    Destination: m.interest,
    msg: m.message,
    message: m.message,
    Message: m.message,
    status: 'Received',
    timestamp: new Date().toLocaleString(),
    reply_to: m.email
  };

  console.log('Sending email with params:', emailParams);

  try {
    // Send Contact Form to Admin — using new IDs matching template variables
    await emailjs.send('service_6e0y3nl', 'template_ftjto0p', {
      // Exact template variable names
      user_name: m.name,
      user_email: m.email,
      user_phone: m.phone,
      destination: m.interest,
      message: m.message,
      // Extra fallbacks
      to_email: 'chamodnimantha271299@gmail.com',
      from_name: m.name,
      reply_to: m.email,
      timestamp: new Date().toLocaleString()
    }, 'bwPmrwG-cTzEUhvkU');

    toast('Message Sent! ✅', 'success');
    if (form) form.reset();
    if (btnText) btnText.textContent = 'Message Sent!';
  } catch (err) {
    console.warn('Silent email error:', err);
    // Silent success for user
    toast('Message Sent! ✅', 'success');
    if (form) form.reset();
    if (btnText) btnText.textContent = 'Message Sent!';
  } finally {
    setTimeout(() => {
      if (btn) btn.disabled = false;
      if (btnText && btnText.textContent !== 'Message Sent!') btnText.textContent = 'Send Message';
    }, 3000);
  }
}

function manualActivate(email) {
  const form = document.querySelector('#contact form');
  if (form) {
    form.action = `https://formsubmit.co/${email}`;
    form.removeAttribute('onsubmit');
    form.submit();
    toast('Redirecting for activation...', 'info');
  }
}

async function subscribeNL(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('nl-email');
  const email = input.value.trim();
  if (!email) return;

  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  try {
    await save('newsletter', { email, timestamp: new Date().toISOString(), viewed: false });

    if (typeof emailjs !== 'undefined') {
      const nlParams = {
        from_name: 'Leeza Travels',
        name: 'Subscriber',
        user_name: 'Subscriber',
        to_email: email,
        email: email,
        to_name: 'Subscriber',
        // Match template variable names
        broadcast_subject: 'Welcome to Leeza Travels Newsletter!',
        broadcast_message: 'Thank you for subscribing! We are excited to share exclusive travel deals and updates with you.',
        subject: 'Welcome to Leeza Travels Newsletter!',
        message: 'Thank you for subscribing! We are excited to share exclusive travel deals and updates with you.',
        content: 'Thank you for subscribing to the Leeza Travels Newsletter!'
      };

      // --- DOUBLE TRY FALLBACK ---
      emailjs.send('service_s7kzv5g', 'template_mhs62h1', nlParams, 'tRG6iOeYylZBAVmsa')
        .then(res => console.log(`✅ Subscription auto-reply sent:`, res))
        .catch(err => {
          console.warn(`âš ï¸ Template h1 failed for subscription, trying fallback hl...`, err);
          emailjs.send('service_s7kzv5g', 'template_mhs62h1', nlParams, 'tRG6iOeYylZBAVmsa')
            .then(res => console.log(`✅ Subscription auto-reply sent (Fallback):`, res))
            .catch(err2 => console.error(`âŒ BOTH templates failed for subscription:`, err2));
        });
    }

    toast('🎉 Subscribed! Welcome aboard.', 'success');
    input.value = '';
  } catch (err) {
    toast('Error subscribing.', 'error');
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// ── Language Selector ────────────────────────────────────────
function toggleLangDropdown(e) {
  if (e) e.stopPropagation();
  const btn = document.getElementById('lang-toggle-btn');
  const dd = document.getElementById('lang-dropdown');
  if (!btn || !dd) return;
  const isOpen = dd.classList.contains('open');
  btn.classList.toggle('open', !isOpen);
  dd.classList.toggle('open', !isOpen);
}

function selectLang(langCode, flag, label, el) {
  // Update UI Labels
  const flagEl = document.getElementById('lang-current-flag');
  const labelEl = document.getElementById('lang-current-label');
  if (flagEl) flagEl.textContent = flag;
  if (labelEl) labelEl.textContent = label;

  // Active state in dropdown
  document.querySelectorAll('#lang-dropdown .lang-item').forEach(item => item.classList.remove('active'));
  if (el) el.classList.add('active');
  else {
    document.querySelectorAll('#lang-dropdown .lang-item').forEach(item => {
      const span = item.querySelector('.lang-name');
      if (span && span.textContent === label) item.classList.add('active');
    });
  }

  // Close dropdown
  const btn = document.getElementById('lang-toggle-btn');
  const dd = document.getElementById('lang-dropdown');
  if (btn) btn.classList.remove('open');
  if (dd) dd.classList.remove('open');

  // Persistence: Update LocalStorage FIRST as source of truth
  try {
    localStorage.setItem('googtrans_lang', langCode);
    localStorage.setItem('googtrans_flag', flag);
    localStorage.setItem('googtrans_label', label);
  } catch (e) { }

  // Aggressively set cookies on multiple levels to ensure it sticks
  const cookieVal = `/en/${langCode}`;
  document.cookie = `googtrans=${cookieVal}; path=/`;
  if (window.location.hostname && window.location.hostname !== 'localhost') {
    const domain = window.location.hostname;
    document.cookie = `googtrans=${cookieVal}; domain=${domain}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=.${domain}; path=/`;
  }

  // Trigger Google Translate
  const triggerTranslate = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      const event = new Event('change', { bubbles: true, cancelable: true });
      select.dispatchEvent(event);
      // Force double tap for reliability
      setTimeout(() => {
        select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      }, 500);
    } else {
      setTimeout(triggerTranslate, 300);
    }
  };
  triggerTranslate();
}

// Sync UI on load
function syncLanguageUI() {
  let langCode = null;
  let flag = '🇺🇸';
  let label = 'English';

  // ALWAYS Prioritize LocalStorage as the ultimate source of truth
  try {
    const savedLang = localStorage.getItem('googtrans_lang');
    if (savedLang) {
      langCode = savedLang;
      flag = localStorage.getItem('googtrans_flag') || '🇺🇸';
      label = localStorage.getItem('googtrans_label') || 'English';
    }
  } catch (e) { }

  // If no LocalStorage, check cookie
  if (!langCode) {
    const cookieMatch = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (cookieMatch) {
      langCode = cookieMatch[1];
    }
  }

  if (langCode) {
    const langMap = {
      'en': { flag: '🇺🇸', label: 'English' },
      'zh-CN': { flag: '🇨🇳', label: 'Chinese' },
      'hi': { flag: '🇮🇳', label: 'Hindi' },
      'es': { flag: '🇪🇸', label: 'Spanish' },
      'fr': { flag: '🇫🇷', label: 'French' },
      'ar': { flag: '🇦🇪', label: 'Arabic' },
      'de': { flag: '🇩🇪', label: 'German' },
      'ru': { flag: '🇷🇺', label: 'Russian' },
      'pt': { flag: '🇵🇹', label: 'Portuguese' },
      'id': { flag: '🇮🇩', label: 'Indonesian' },
      'ja': { flag: '🇯🇵', label: 'Japanese' },
      'ko': { flag: '🇰🇷', label: 'Korean' }
    };

    if (langMap[langCode]) {
      flag = langMap[langCode].flag;
      label = langMap[langCode].label;
    }

    // Force Sync Cookie to match our Truth
    const cookieVal = `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    if (window.location.hostname && window.location.hostname !== 'localhost') {
      const domain = window.location.hostname;
      document.cookie = `googtrans=${cookieVal}; domain=${domain}; path=/`;
      document.cookie = `googtrans=${cookieVal}; domain=.${domain}; path=/`;
    }

    // Update UI Elements
    const flagEl = document.getElementById('lang-current-flag');
    const labelEl = document.getElementById('lang-current-label');
    if (flagEl) flagEl.textContent = flag;
    if (labelEl) labelEl.textContent = label;

    // Update active state in dropdown
    document.querySelectorAll('#lang-dropdown .lang-item').forEach(item => {
      item.classList.remove('active');
      const span = item.querySelector('.lang-name');
      if (span && span.textContent === label) {
        item.classList.add('active');
      }
    });

    // Aggressively ensure translation is triggered
    let syncAttempts = 0;
    const runSync = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

        // Follow-up syncs for slow loaders
        setTimeout(() => {
          if (select.value !== langCode) {
            select.value = langCode;
            select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
          }
        }, 1200);
        setTimeout(() => {
          if (select.value !== langCode) {
            select.value = langCode;
            select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
          }
        }, 3500);

      } else if (syncAttempts < 40) {
        syncAttempts++;
        setTimeout(runSync, 250);
      }
    };
    runSync();
  }
}

// Global click handler to close dropdown
document.addEventListener('click', (e) => {
  const dd = document.getElementById('lang-dropdown');
  const btn = document.getElementById('lang-toggle-btn');
  if (dd && btn && !e.target.closest('#lang-dropdown') && !e.target.closest('#lang-toggle-btn')) {
    dd.classList.remove('open');
    btn.classList.remove('open');
  }
});

/**
 * ── Policy / Info Modal System ──────────────────
 */
const infoContents = {
  about: {
    title: "About Leeza Travels",
    subtitle: "Our Story",
    content: `<p>Leeza Travels was born from a passion for the untamed beauty of Sri Lanka. We believe travel is more than just visiting places; it's about the stories you bring home. From the misty highlands of Ella to the historic ramparts of Galle, we curate experiences that connect you with the soul of our island.</p>
             <p>Our mission is to provide sustainable, responsible, and deeply personal travel experiences while supporting local communities across Sri Lanka.</p>`
  },
  team: {
    title: "Meet Our Experts",
    subtitle: "Expertise",
    content: `<div class="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <div class="glass p-6 pt-16 rounded-3xl text-center border border-white/5 shadow-lg mt-16 relative">
                  <div class="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden absolute -top-14 left-1/2 -translate-x-1/2 border-4 border-[#0f172a] shadow-2xl shadow-black/60 bg-[#0f172a]">
                    <img src="images/Kumara.jpg" alt="Mr. Kumara Perera" class="w-full h-full object-cover" style="object-position: center; object-fit: cover;" />
                  </div>
                  <div class="font-bold text-white text-xl mb-1">Mr. Kumara Perera</div>
                  <div class="text-xs text-primary font-black uppercase tracking-widest mb-3">Founder & Lead Explorer</div>
                  <p class="text-sm text-white/50 leading-relaxed px-4">Mr. Kumara Perera, the visionary founder of Leeza Travels, brings over 15 years of distinguished expertise in Sri Lankan tourism. His mission is to share authentic experiences with the world.</p>
                  <div class="mt-6 flex justify-center gap-4">
                    <a href="https://www.facebook.com/share/1CSxCPAnHR/" target="_blank" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-primary border border-white/10 transition-all hover:scale-110"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com" target="_blank" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-primary border border-white/10 transition-all hover:scale-110"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
             </div>`
  },
  explore: {
    title: "Explore Our World",
    subtitle: "Wanderlust",
    content: `<p>Discover the pearl of the Indian Ocean and beyond. From ancient cities like Sigiriya to the golden coasts of Mirissa, we offer a diverse range of local and global adventures.</p>`
  },
  careers: {
    title: "Join Our Journey",
    subtitle: "Careers",
    content: `<div class="text-center py-6">
                <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-briefcase text-2xl text-primary"></i>
                </div>
                <h4 class="text-white text-lg font-bold mb-2">Grow With Leeza Travels</h4>
                <p class="text-white/50 text-sm mb-4">We are always searching for passionate travel experts. Send your CV to:</p>
                <p class="text-primary font-bold text-lg">Leezatravelslk@gmail.com</p>
             </div>`
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Security",
    content: `<p>Your privacy is paramount. At Leeza Travels, we use your data strictly to manage your bookings and enhance your experience. We do not sell your personal information to third parties.</p>
             <p>We use industry standard encryption to protect your data stored in our local databases.</p>`
  },
  faqs: {
    title: "Frequently Asked Questions",
    subtitle: "Support",
    content: `<div class="space-y-4 text-left">
               <div><div class="font-bold text-white text-sm mb-1">How do I book a tour?</div><div class="text-xs text-white/50">Simply use our contact form or WhatsApp button.</div></div>
               <div><div class="font-bold text-white text-sm mb-1">Cancellation policy?</div><div class="text-xs text-white/50">Free cancellation up to 48 hours for most standard tours.</div></div>
               <div><div class="font-bold text-white text-sm mb-1">Airport transfers?</div><div class="text-xs text-white/50">Yes, most packages include private airport transfers.</div></div>
             </div>`
  },
  cancellation: {
    title: "Cancellation Policy",
    subtitle: "Flexibility",
    content: `<p class="mb-6">We understand that plans change. Our goal is to provide maximum flexibility.</p>
             <ul class="space-y-4 text-left">
               <li class="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-xl">
                 <div class="font-bold text-primary mb-1">48 Hours Notice</div>
                 <div class="text-white/50 text-xs text-left leading-relaxed">Full refund minus minor processing fees for most standard tours.</div>
               </li>
               <li class="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-xl">
                 <div class="font-bold text-accent mb-1">Less than 24 Hours</div>
                 <div class="text-white/50 text-xs text-left leading-relaxed">A 50% cancellation fee may apply depending on the booking type.</div>
               </li>
             </ul>`
  }
};

window.currentMapCode = '';

// ── Tour Data (Standardized for Modal) ──────────────────────
const tourData = {
  '2 Nights 3 Days Sri Lanka Holiday Tour': {
    id: '2 Nights 3 Days Sri Lanka Holiday Tour',
    fullTitle: 'Short Break in Paradise - 2 Nights',
    img: 'images/2 Nights 3 Days Sri Lanka Holiday Tour/Cover.jpg',
    desc: 'Pinnawala Elephant Orphanage – Sigiriya Rock fortress – Dambulla Cave Temple – Kandy Temple of the Sacred Tooth Relic',
    loc: 'TOUR CARD 1',
    days: '3',
    nights: '2',
    mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m52!1m12!1m3!1d5506254.81990467844!2d79.99188428680505!3d7.5623537179968014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m37!3e0!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!4m5!1s0x3ae315c83a2c0273%3A0xa5744b525ada1e6c!2sPinnawala%20Elephant%20Orphanage%2C%20Rambukkana!3m2!1d7.3008545!2d80.38885499999999!4m5!1s0x3afca16422c0e731%3A0xe98f7af01614cc1c!2sSigiriya%20Lion%20Rock%2C%20XQ46%2BR46%2C%20Sigiriya!3m2!1d7.9571127!2d80.760257!4m5!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!3m2!1d7.8741017!2d80.6510856!4m5!1s0x3ae3662db149fbf5%3A0x8165d70ac115e887!2sSri%20Dalada%20Maligawa%2C%20Kandy!3m2!1d7.293609!2d80.641325!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!5e0!3m2!1sen!2slk!4v1776312132974!5m2!1sen!2slk" width="100%" height="550" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    itinerary: [
      { day: 'Day 1', title: 'Pinnawala Elephant Orphanage', text: 'You will be welcomed on arrival at the Bandaranayaka International Airport by Travel Colombo Representative who will assist you with your luggage and guide you to your vehicle. In the vehicle you will meet your personal chauffeur who will take you to a hotel in Sigiriya. You can visit Pinnawala Elephant Orphanage en route. After checking in to the hotel you will be able to refresh yourself, have dinner and overnight stay in Sigiriya.' },
      { day: 'Day 2', title: 'Sigiriya Rock Fortress', text: 'After breakfast you will climb of the Sigiriya Rock known as the Lion Rock. On the way to Kandy, you can visit Dabulla Cave Temple. Kandy is Sri Lanka cultural center witness the unique Kandyan Dancing; visit Dalada Maligawa, the golden roofed Temple of the Sacred Tooth Relic of the Buddha, the Peradeniya Botanical Gardens and shop for Gems, jewellery and traditional handicrafts. You can visit Pinnawala Elephant Orphanage during Kandy stay. Return to your hotel for dinner and overnight stay in Kandy.' },
      { day: 'Day 3', title: 'Transfer to the airport', text: 'Transfer to the airport on time for the flight. After breakfast you will leave to Katunayaka to Departure from Bandaranayaka International Airport.' }
    ]
  },
  '3 Nights 4 Days Sri Lanka Holiday Tour': {
    id: '3 Nights 4 Days Sri Lanka Holiday Tour',
    fullTitle: 'Glimpse of Sri Lanka - 3 Nights',
    img: 'images/3 Nights 4 Days Sri Lanka Holiday Tour/Cover.jpg',
    desc: 'Pinnawala Elephant Orphanage – Sigiriya Rock fortress – Dambulla Cave Temple – Kandy Temple of the Sacred Tooth Relic – Nuwara Eliya',
    loc: 'TOUR CARD 2',
    days: '4',
    nights: '3',
    mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m58!1m12!1m3!1d5812824.118484148!2d79.66883216268369!3d7.427107015323411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m43!3e0!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!4m5!1s0x3ae315c83a2c0273%3A0xa5744b525ada1e6c!2sPinnawala%20Elephant%20Orphanage%2C%20Rambukkana!3m2!1d7.3008545!2d80.38885499999999!4m5!1s0x3afca16422c0e731%3A0xe98f7af01614cc1c!2sSigiriya%20Lion%20Rock%2C%20XQ46%2BR46%2C%20Sigiriya!3m2!1d7.9571127!2d80.760257!4m5!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!3m2!1d7.8741017!2d80.6510856!4m5!1s0x3ae3662db149fbf5%3A0x8165d70ac115e887!2sSri%20Dalada%20Maligawa%2C%20Kandy!3m2!1d7.293609!2d80.641325!4m5!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!3m2!1d6.9606886!2d80.7692959!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!5e0!3m2!1sen!2slk!4v1776312099189!5m2!1sen!2slk" width="100%" height="550" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    itinerary: [
      { day: 'Day 1', title: 'Pinnawala Elephant Orphanage', text: 'You will be welcomed on arrival at the Bandaranayaka International Airport by Travel Colombo Representative who will assist you with your luggage and guide you to your vehicle. In the vehicle you will meet your personal chauffeur who will take you to a hotel in Sigiriya. You can visit Pinnawala Elephant Orphanage en route. After checking in to the hotel you will be able to refresh yourself, have dinner and overnight stay in Sigiriya.' },
      { day: 'Day 2', title: 'Sigiriya Rock Fortress', text: 'After breakfast you will climb of the Sigiriya Rock known as the Lion Rock. On the way to Kandy, you can visit Dabulla Cave Temple. Kandy is Sri Lanka cultural center witness the unique Kandyan Dancing; visit Dalada Maligawa, the golden roofed Temple of the Sacred Tooth Relic of the Buddha, the Peradeniya Botanical Gardens and shop for Gems, jewellery and traditional handicrafts. You can visit Pinnawala Elephant Orphanage during Kandy stay. Return to your hotel for dinner and overnight stay in Kandy.' },
      { day: 'Day 3', title: 'Nuwara Eliya Highlands', text: 'After breakfast you will leave to Nuwara Eliya, located at the heart of the hill country 6182 feet above from the sea level. It is still very much like an old English town with styled Bungalows and buildings. The cool calm climate, gorges rolling tea plantation which makes the best “Ceylon tea” and you can visit the breathtaking beautiful waterfalls, Horton Plains and Haggala Botanical Garden makes Nuwara Eliya one of the most beautiful town in the world. Return to your hotel for dinner and overnight stay in Nuwara Eliya.' },
      { day: 'Day 4', title: 'Transfer to the airport', text: 'Transfer to the airport on time for the flight. After breakfast you will leave to Katunayaka to Departure from Bandaranayaka International Airport.' }
    ]
  },
  '4 Nights 5 Days Sri Lanka Holiday Tour': {
    id: '4 Nights 5 Days Sri Lanka Holiday Tour',
    fullTitle: 'Classic Sri Lanka Experience - 4 Nights',
    img: 'images/4 Nights 5 Days Sri Lanka Holiday Tour/Cover.jpg',
    desc: 'Pinnawala Elephant Orphanage – Sigiriya Rock fortress – Dambulla Cave Temple – Kandy Temple of the Sacred Tooth Relic – Ramboda Water Fall & Tea Factory – Nuwara Eliya',
    loc: 'TOUR CARD 3',
    days: '5',
    nights: '4',
    mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m64!1m12!1m3!1d5812824.118484148!2d79.66883216268369!3d7.427107015323411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m49!3e0!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!4m5!1s0x3ae315c83a2c0273%3A0xa5744b525ada1e6c!2sPinnawala%20Elephant%20Orphanage%2C%20Rambukkana!3m2!1d7.3008545!2d80.38885499999999!4m5!1s0x3afca16422c0e731%3A0xe98f7af01614cc1c!2sSigiriya%20Lion%20Rock%2C%20XQ46%2BR46%2C%20Sigiriya!3m2!1d7.9571127!2d80.760257!4m5!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!3m2!1d7.8741017!2d80.6510856!4m5!1s0x3ae3662db149fbf5%3A0x8165d70ac115e887!2sSri%20Dalada%20Maligawa%2C%20Kandy!3m2!1d7.293609!2d80.641325!4m5!1s0x3ae3793d5db58671%3A0x2fe5b27e99b54356!2sRamboda%20Falls%2C%203P34%2BR4G%2C%20A5%2C%20Ramboda!3m2!1d7.0545691999999995!2d80.705331!4m5!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!3m2!1d6.9606886!2d80.7692959!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!5e0!3m2!1sen!2slk!4v1776312044324!5m2!1sen!2slk" width="100%" height="550" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    itinerary: [
      { day: 'Day 1', title: 'Pinnawala Elephant Orphanage', text: 'You will be welcomed on arrival at the Bandaranayaka International Airport by Travel Colombo Representative who will assist you with your luggage and guide you to your vehicle. In the vehicle you will meet your personal chauffeur who will take you to a hotel in Sigiriya.' },
      { day: 'Day 2', title: 'Sigiriya Rock fortress', text: 'After breakfast you will leave to Sigiriya, you can visit Pinnawala Elephant Orphanage and Dabulla Cave Temple en route. After checking in to the hotel in Sigiriya you will be able to refresh yourself. Then you can climb the Sigiriya Rock fortress.' },
      { day: 'Day 3', title: 'Nuwara Eliya', text: 'Arrive in Nuwara Eliya to be greeted by the fresh wintry atmosphere, the cottage type bungalows and the colonial air. ( Nuwara Eliya is also known as "Little England") Dinner and Overnight stay at Nuwara Eliya.' },
      { day: 'Day 4', title: 'Negombo Beach', text: 'Beach Stay with many choices of spending your time. Leisurely strolling on the Golden Beaches enthralled in the magical atmosphere. Lazing on a sun deck reading a book of you choice, and sipping a cool fresh tropical fruit drink of pine apple, Mango, Banana. Dinner and Overnight stay at Negambo Beach Hotel.' },
      { day: 'Day 5', title: 'Transfer to the airport', text: 'Transfer to the airport on time for the flight. After breakfast you will leave to Katunayaka to Departure from Bandaranayaka International Airport.' }
    ]
  },
  '6 Nights 7 Days Sri Lanka Holiday Tour': {
    id: '6 Nights 7 Days Sri Lanka Holiday Tour',
    fullTitle: 'The Grand Week - 6 Nights',
    img: 'images/6 Nights 7 Days Sri Lanka Holiday Tour/Cover.jpg',
    desc: 'Negambo Beach – Pinnawala Elephant Orphanage – Sigiriya Rock fortress – Dambulla Cave Temple – Kandy Temple of the Sacred Tooth Relic – Ramboda Water Fall & Tea Factory – Nuwara Eliya – Hikkaduwa – Colombo',
    loc: 'TOUR CARD 4',
    days: '7',
    nights: '6',
    mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d5813676.7390959637!2d79.65164288695453!3d7.0474521675263375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!4m5!1s0x3ae315c83a2c0273%3A0xa5744b525ada1e6c!2sPinnawala%20Elephant%20Orphanage%2C%20Rambukkana!3m2!1d7.3008545!2d80.38885499999999!4m5!1s0x3afca16422c0e731%3A0xe98f7af01614cc1c!2sSigiriya%20Lion%20Rock%2C%20XQ46%2BR46%2C%20Sigiriya!3m2!1d7.9571127!2d80.760257!4m5!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!3m2!1d7.8741017!2d80.6510856!4m5!1s0x3ae3662db149fbf5%3A0x8165d70ac115e887!2sSri%20Dalada%20Maligawa%2C%20Kandy!3m2!1d7.293609!2d80.641325!4m5!1s0x3ae3793d5db58671%3A0x2fe5b27e99b54356!2sRamboda%20Falls%2C%203P34%2BR4G%2C%20A5%2C%20Ramboda!3m2!1d7.0545691999999995!2d80.705331!4m5!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!3m2!1d6.9606886!2d80.7692959!4m5!1s0x3ae177fbcae7226d%3A0x373eeb50aad15308!2sHikkaduwa!3m2!1d6.1396163999999995!2d80.1090375!4m5!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!3m2!1d6.9270786!2d79.861243!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!5e0!3m2!1sen!2slk!4v1776312384528!5m2!1sen!2slk" width="100%" height="550" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    itinerary: [
      { day: 'Day 1', title: 'Negombo Beach', text: 'You will be welcomed on arrival at the Bandaranayaka International Airport by Travel Colombo Representative who will assist you with your luggage and guide you to your vehicle. In the vehicle you will meet your personal chauffeur who will take you to take you to a hotel in Negambo. Negombo is a modest beach town with long beach, you can visit old world fishing crafts and you can enjoy a boat ride in the Muthurajawela marshy land. Return to your hotel for dinner and overnight stay in Negombo beach Hotel.' },
      { day: 'Day 2', title: 'Pinnawala Elephant Orphanage & Sigiriya Rock fortress', text: 'After breakfast you will leave to Sigiriya, you can visit Pinnawala Elephant Orphanage and Dabulla Cave Temple en route. After checking in to the hotel in Sigiriya you will be able to refresh yourself. Then you can climb the Sri Lanka\'s most fascinating UNESCO world heritage sites... And evening Take a jeep safari through the Kaudulla National Park. Dinner & Overnight stay at Sigiriya.' },
      { day: 'Day 3', title: 'Kandy Temple of the Sacred Tooth Relic', text: 'After breakfast you will leave to Kandy the Sri Lankan cultural center witness the unique Kandyan Dancing; visit Dalada Maligawa, the golden roofed Temple of the Sacred Tooth Relic of the Buddha, the Peradeniya Botanical Gardens and shop for Gems, Jewelry and traditional handicrafts. Return to your hotel for dinner and overnight stay in Kandy.' },
      { day: 'Day 4', title: 'Nuwara Eliya Highlands', text: 'After breakfast leave for Nuwara Eliya en-route visits Tea factory and Ramboda waterfall and city tour in Nuwara Eliya. Visit a Tea Plantation and a Tea Factory. Sri Lanka being famous for its "Ceylon Tea" has added cheer to many the world over for more than a century. Arrive in Nuwara Eliya to be greeted by the fresh wintry atmosphere, the cottage type bungalows and the colonial air. Dinner and Overnight stay at Nuwara Eliya.' },
      { day: 'Day 5', title: 'Hikkaduwa Beach', text: 'After breakfast you will leave to Hikkaduwa, on the southern coast of Sri Lanka, is a relatively small town that has a well developed tourist industry, catering to visitors who come for its white sand beaches and the excellent diving, snorkeling and surfing conditions of the Indian Ocean. You can visit the Galle City and Dutch Port, do shopping in the evenning and return to your hotel for dinner and overnight stay in Hikkaduwa.' },
      { day: 'Day 6', title: 'Colombo City', text: 'After breakfast you will leave to Colombo, the commercial heart of the country Colombo and excellent shopping destination that offers a range of items. You can visit Colombo Musium, Mt. Lavinia Beach and City Attraction. Return to your hotel for dinner and overnight stay in Colombo.' },
      { day: 'Day 7', title: 'Transfer to the airport', text: 'Transfer to the airport on time for the flight.' }
    ]
  },
  '7 Nights 8 Days Sri Lanka Holiday Tour': {
    id: '7 Nights 8 Days Sri Lanka Holiday Tour',
    fullTitle: 'The Ultimate Island Journey - 7 Nights',
    img: 'images/7 Nights 8 Days Sri Lanka Holiday Tour/Cover.jpg',
    desc: 'Negombo – Pinnawala Elephant Orphanage – Sigiriya Rock fortress – Dambulla Cave Temple – Kandy Temple of the Sacred Tooth Relic – Ramboda Water Fall & Tea Factory – Nuwara Eliya – Bentota – Colombo',
    loc: 'TOUR CARD 5',
    days: '8',
    nights: '7',
    mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d5813367.4788134642!2d79.65164300510924!3d7.1874653769738694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!4m5!1s0x3ae315c83a2c0273%3A0xa5744b525ada1e6c!2sPinnawala%20Elephant%20Orphanage%2C%20Rambukkana!3m2!1d7.3008545!2d80.38885499999999!4m5!1s0x3afca16422c0e731%3A0xe98f7af01614cc1c!2sSigiriya%20Lion%20Rock%2C%20XQ46%2BR46%2C%20Sigiriya!3m2!1d7.9571127!2d80.760257!4m5!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!3m2!1d7.8741017!2d80.6510856!4m5!1s0x3ae3662db149fbf5%3A0x8165d70ac115e887!2sSri%20Dalada%20Maligawa%2C%20Kandy!3m2!1d7.293609!2d80.641325!4m5!1s0x3ae3793d5db58671%3A0x2fe5b27e99b54356!2sRamboda%20Falls%2C%203P34%2BR4G%2C%20A5%2C%20Ramboda!3m2!1d7.0545691999999995!2d80.705331!4m5!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!3m2!1d6.9606886!2d80.7692959!4m5!1s0x3ae22e900168ca21%3A0x96c438f00a68c060!2sBentota!3m2!1d6.4187604!2d80.002455!4m5!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!3m2!1d6.9270786!2d79.861243!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!5e0!3m2!1sen!2slk!4v1776312415658!5m2!1sen!2slk" width="100%" height="550" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    itinerary: [
      { day: 'Day 1', title: 'Negambo Beach', text: 'You will be welcomed on arrival at the Bandaranayaka International Airport by Travel Colombo Representative who will assist you with your luggage and guide you to your vehicle. In the vehicle you will meet your personal chauffeur who will take you to take you to a hotel in Negambo. Negombo is a modest beach town with long beach, you can visit old world fishing crafts and you can enjoy a boat ride in the Muthurajawela marshy land. Return to your hotel for dinner and overnight stay in Negombo beach Hotel.' },
      { day: 'Day 2', title: 'Pinnawala Elephant Orphanage & Sigiriya Rock fortress', text: 'After breakfast you will leave to Sigiriya, you can visit Pinnawala Elephant Orphanage and Dabulla Cave Temple en route. After checking in to the hotel in Sigiriya you will be able to refresh yourself. Then you can climb the Sigiriya Rock fortress... And evening Take a jeep safari through the Kaudulla National Park. Dinner & Overnight stay at Sigiriya.' },
      { day: 'Day 3', title: 'Kandy Temple of the Sacred Tooth Relic', text: 'After breakfast you will leave to Kandy the Sri Lankan cultural center witness the unique Kandyan Dancing; visit Dalada Maligawa, the golden roofed Temple of the Sacred Tooth Relic of the Buddha, the Peradeniya Botanical Gardens and shop for Gems, Jewelry and traditional handicrafts. Return to your hotel for dinner and overnight stay in Kandy.' },
      { day: 'Day 4', title: 'Nuwara Eliya Highlands', text: 'After breakfast leave for Nuwara Eliya en-route visits Tea factory and Ramboda waterfall and city tour in Nuwara Eliya. Visit a Tea Plantation and a Tea Factory. Arrive in Nuwara Eliya to be greeted by the fresh wintry atmosphere, the cottage type bungalows and the colonial air. Dinner and Overnight stay at Nuwara Eliya.' },
      { day: 'Day 5', title: 'Bentota Beach Resort', text: 'Beakfast at the hotel and tavel to visit the Sitha Amman Hindu Temple. You can visit the Galle City and Dutch Port, do shopping in the evenning and enjoy Hikkaduwa, Bentota beach activities. Return to your hotel for dinner and overnight stay in Bentota.' },
      { day: 'Day 6', title: 'Leisure at your Bentota beach resort', text: 'Beach Stay with many choices of spending your time. Leisurely strolling on the Golden Beaches enthralled in the magical atmosphere. Lazing on a Sun deck reading a book of you choice, and sipping a cool fresh tropical fruit drink of pine apple, Mango, Banana. Water skiing, Wind Surfing, Snorkeling or cutting through the choppy on a jet water scooter and Dolphin and Whale watching, Diving, Glass Bottom Boat Trip and much more…. Overnight stay at Bentota beach hotel.' },
      { day: 'Day 7', title: 'Colombo City', text: 'After breakfast you will leave to Colombo, the commercial heart of the country Colombo and excellent shopping destination that offers a range of items. You can visit Colombo Musium, Mt. Lavinia Beach and City Attraction. Return to your hotel for dinner and overnight stay in Colombo.' },
      { day: 'Day 8', title: 'Transfer to the airport', text: 'Transfer to the airport on time for the flight. After breakfast you will leave to Katunayaka to Departure from Bandaranayaka International Airport.' }
    ]
  },
  '9 Nights 10 Days Sri Lanka Holiday Tour': {
    id: '9 Nights 10 Days Sri Lanka Holiday Tour',
    fullTitle: 'The Extended Explorer - 9 Nights',
    img: 'images/9 Nights 10 Days Sri Lanka Holiday Tour/Cover.jpeg',
    desc: 'Negombo – Pinnawala Elephant Orphanage – Sigiriya Rock fortress – Dambulla Cave Temple – Kandy Temple of the Sacred Tooth Relic – Ramboda Water Fall & Tea Factory – Nuwara Eliya – Ella & Rawana Water Fall – Yala National Park – Galle Dutch fort – Turtal hachery – Bentota – Colombo',
    loc: 'TOUR CARD 6',
    days: '10',
    nights: '9',
    mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d8527599.6529051957!2d79.34050013783688!3d6.990950035675138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!4m5!1s0x3ae315c83a2c0273%3A0xa5744b525ada1e6c!2sPinnawala%20Elephant%20Orphanage%2C%20Rambukkana!3m2!1d7.3008545!2d80.38885499999999!4m5!1s0x3afca16422c0e731%3A0xe98f7af01614cc1c!2sSigiriya%20Lion%20Rock%2C%20XQ46%2BR46%2C%20Sigiriya!3m2!1d7.9571127!2d80.760257!4m5!1s0x3afcaff4c8adcc4f%3A0x67ae3cc5b1536914!2sDambulla!3m2!1d7.8741017!2d80.6510856!4m5!1s0x3ae3662db149fbf5%3A0x8165d70ac115e887!2sSri%20Dalada%20Maligawa%2C%20Kandy!3m2!1d7.293609!2d80.641325!4m5!1s0x3ae380434e1554c7%3A0x291608404c937d9c!2sNuwara%20Eliya!3m2!1d6.9606886!2d80.7692959!4m5!1s0x3ae5d3a62ffb9359%3A0x3bb623d70b5a3314!2sYala%20National%20Park!3m2!1d6.463961299999999!2d81.47188469999999!4m5!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!3m2!1d6.032894799999999!2d80.2167912!4m5!1s0x3ae177fbcae7226d%3A0x373eeb50aad15308!2sHikkaduwa!3m2!1d6.1396163999999995!2d80.1090375!4m5!1s0x3ae2efb735f22d5d%3A0x6ebd702103828b37!2sColombo%20Bandaranaike%20International%20Airport%2C%20Airport%20and%20Aviation%20Services%20(Sri%20Lanka)%20(Private)%20Limited%2C%20Canada%20Friendship%20Rd%2C%20Katunayake%2011450!3m2!1d7.1801543!2d79.8842495!5e0!3m2!1sen!2slk!4v1776312540182!5m2!1sen!2slk" width="100%" height="550" style="border:0; border-radius: 20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
    itinerary: [
      { day: 'Day 1', title: 'Negambo Beach', text: 'You will be welcomed on arrival at the Bandaranayaka International Airport by Travel Colombo Representative who will assist you with your luggage and guide you to your vehicle. In the vehicle you will meet your personal chauffeur who will take you to take you to a hotel in Negambo. Negombo is a modest beach town with long beach, you can visit old world fishing crafts and you can enjoy a boat ride in the Muthurajawela marshy land. Return to your hotel for dinner and overnight stay in Negombo beach Hotel.' },
      { day: 'Day 2', title: 'Pinnawala Elephant Orphanage & Sigiriya Rock fortress', text: 'After breakfast you will leave to Sigiriya, you can visit Pinnawala Elephant Orphanage and Dabulla Cave Temple en route. After checking in to the hotel in Sigiriya you will be able to refresh yourself. Then you can climb the Sigiriya Rock fortress... And evening Take a jeep safari through the Kaudulla National Park. Dinner & Overnight stay at Sigiriya.' },
      { day: 'Day 3', title: 'Kandy Temple of the Sacred Tooth Relic', text: 'After breakfast you will leave to Kandy the Sri Lankan cultural center witness the unique Kandyan Dancing; visit Dalada Maligawa, the golden roofed Temple of the Sacred Tooth Relic of the Buddha, the Peradeniya Botanical Gardens and shop for Gems, Jewelry and traditional handicrafts. Return to your hotel for dinner and overnight stay in Kandy.' },
      { day: 'Day 4', title: 'Nuwara Eliya - Tea factory - Ramboda waterfall', text: 'After breakfast leave for Nuwara Eliya en-route visits Tea factory and Ramboda waterfall and city tour in Nuwara Eliya. Visit a Tea Plantation and a Tea Factory. Arrive in Nuwara Eliya to be greeted by the fresh wintry atmosphere, the cottage type bungalows and the colonial air. Dinner and Overnight stay at Nuwara Eliya.' },
      { day: 'Day 5', title: 'World\'s End - Train Ride - Ella Gap - Rawana Water Fall', text: 'Early morning you will go for a visit the world\'s End and Horton plains. Horton Plains is a unique natural attraction in Sri Lanka. After lunch travel to yala. En-route you will have a train ride from Nanu Oya to Ella. Then travel to yala en-route visit the Ella gap and Rawana waterfall. Check in the hotel and dinner and overnight stay at Yala.' },
      { day: 'Day 6', title: 'Yala Safari', text: 'After breakfast you will leave to Yala, One of the largest national parks in the country, the terrain at Yala is varied with grassy plains and forest, rocky scrubland, lagoons and a coastline. Return to your hotel for dinner and overnight stay in Yala.' },
      { day: 'Day 7', title: 'Galle Dutch fort - Turtal hachery', text: 'After breakfast you will check out from the hotel and drive to Bentota en-route visit Galle fort and a turtle hatchery. You can visit the Galle City and Dutch Port, do shopping in the evenning and enjoy Hikkaduwa, Bentota beach activities. Return to your hotel for dinner and overnight stay in Bentota.' },
      { day: 'Day 8-9', title: 'Leisure at your Bentota beach resort', text: 'Beach Stay with many choices of spending your time. Leisurely strolling on the Golden Beaches enthralled in the magical atmosphere. Lazing on a Sun deck reading a book of you choice, and sipping a cool fresh tropical fruit drink of pine apple, Mango, Banana. Water skiing, Wind Surfing, Snorkeling or cutting through the choppy on a jet water scooter and Dolphin and Whale watching, Diving, Glass Bottom Boat Trip and much more…. Overnight stay at Bentota beach hotel.' },
      { day: 'Day 10', title: 'Transfer to the airport', text: 'After breakfast you will leave to Katunayaka to Departure from Bandaranayaka International Airport. Drive to Airport en-route you will have a city tour in Colombo.' }
    ]
  }
};

// ── Search Logic ───────────────────────────────────────────
async function doSearch() {
  const dest = document.getElementById('s-dest');
  const destVal = dest ? dest.value.trim() : '';
  if (!destVal) { typeof toast === 'function' && toast('Please enter a destination!', '#f97316'); return; }
  try {
    await save('searches', { destination: destVal, date: document.getElementById('s-date') ? document.getElementById('s-date').value : '', people: document.getElementById('s-ppl') ? document.getElementById('s-ppl').value : '', viewed: false });
  } catch (e) { }
  const btn = document.getElementById('book-btn');
  if (btn) {
    btn.textContent = 'Inquire More';
    btn.onclick = () => { closeServiceModal(); const c = document.getElementById('contact'); if (c) c.scrollIntoView({ behavior: 'smooth' }); };
  }
  const m = document.getElementById('service-modal');
  if (m) { m.style.display = 'flex'; m.classList.remove('hidden'); }
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  const m = document.getElementById('service-modal');
  if (m) { m.style.display = 'none'; m.classList.add('hidden'); }
  const btn = document.getElementById('book-btn');
  if (btn) btn.textContent = 'Book Now';
  document.body.style.overflow = '';
}

// ── Detail Modal Logic ───────────────────────────────────────────
function openDetailModal(id) {
  if (typeof tourData === 'undefined') return;
  const data = tourData[id];
  if (!data) return;
  const setEl = (d, v) => { const el = document.getElementById(d); if (el) el.textContent = v; };
  const getEl = d => document.getElementById(d);
  const mainImg = getEl('d-img');
  const complexImg = getEl('d-img-complex');

  const tryLoadMainImg = (imgEl, baseSrc) => {
    if (!imgEl) return;
    imgEl.src = baseSrc;
    imgEl.onerror = () => {
      const current = imgEl.src;
      if (current.toLowerCase().endsWith('.jpg')) {
        imgEl.src = baseSrc.replace(/\.jpg$/i, '.jpeg');
      } else if (current.toLowerCase().endsWith('.jpeg')) {
        imgEl.src = baseSrc.replace(/\.jpeg$/i, '.png');
      } else if (current.toLowerCase().endsWith('.png')) {
        imgEl.src = baseSrc.replace(/\.png$/i, '.webp');
      } else if (current.toLowerCase().endsWith('.webp')) {
        imgEl.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80'; // Final Fallback
        imgEl.onerror = null;
      }
    };
  };

  tryLoadMainImg(mainImg, data.img);
  tryLoadMainImg(complexImg, data.img);
  setEl('d-title', id);
  setEl('d-title-complex', id);
  setEl('d-full-title', data.fullTitle || id);
  setEl('d-long-desc', data.desc);
  setEl('d-loc', data.loc);
  setEl('d-loc-complex', data.loc);
  setEl('d-days', data.days);
  setEl('d-nights', data.nights);

  // Update Enquiry Form Trip Name
  setEl('enquiry-trip-name', id);

  // Store Map Code and Clear Container (Lazy Load)
  window.currentMapCode = data.mapEmbed || '';
  const mapContainer = document.getElementById('map-content');
  if (mapContainer) mapContainer.innerHTML = '';

  // Reset Tabs to Overview
  switchTab('overview');

  // Render Itinerary
  renderItinerary(data.itinerary);

  // Render Side Gallery
  renderSideGallery(id);

  const m = document.getElementById('detail-modal');
  if (m) { m.style.display = 'grid'; m.classList.remove('hidden'); }
  document.body.style.overflow = 'hidden';
}

function renderItinerary(itinerary) {
  const container = document.getElementById('itinerary-list');
  if (!container) return;
  container.innerHTML = '';
  if (!itinerary) {
    container.innerHTML = '<p class="text-white/30 text-xs italic">No itinerary details available.</p>';
    return;
  }

  itinerary.forEach((item, index) => {
    const itemHtml = `
      <div class="itinerary-item group">
          <div class="flex gap-4">
              <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-[10px] font-black shrink-0 group-hover:bg-primary group-hover:text-black transition-all">
                      ${index + 1}
                  </div>
                  <div class="w-px h-full bg-white/10 group-last:hidden mt-2"></div>
              </div>
              <div class="pb-8">
                  <h5 class="text-white font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-3">
                      <span class="text-primary/40 text-[9px]">${item.day}</span>
                      ${item.title}
                  </h5>
                  <p class="text-white/50 text-[12px] leading-relaxed">
                      ${item.text}
                  </p>
              </div>
          </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', itemHtml);
  });
}

function renderSideGallery(tourId) {
  const gallery = document.getElementById('side-gallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  const extensions = ['jpg', 'png', 'jpeg', 'webp'];

  // Attempt to load numbered images from 1 to 10
  for (let i = 1; i <= 10; i++) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'relative h-48 rounded-2xl overflow-hidden group/img cursor-pointer';

    const img = document.createElement('img');
    img.className = 'w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700';
    img.alt = `Gallery ${i}`;

    const basePath = `images/${tourId}/${i}`;

    // Start with .jpg and chain other formats in onerror
    img.src = `${basePath}.jpg`;
    img.onerror = () => {
      const currentSrc = img.src.toLowerCase();
      if (currentSrc.endsWith('.jpg')) {
        img.src = `${basePath}.jpeg`;
      } else if (currentSrc.endsWith('.jpeg')) {
        img.src = `${basePath}.png`;
      } else if (currentSrc.endsWith('.png')) {
        img.src = `${basePath}.webp`;
      } else {
        // If all formats fail, remove this specific image slot
        imgWrapper.remove();
      }
    };

    imgWrapper.appendChild(img);
    gallery.appendChild(imgWrapper);
  }
}
function closeDetailModal() {
  const m = document.getElementById('detail-modal');
  if (m) { m.style.display = 'none'; m.classList.add('hidden'); }
  document.body.style.overflow = '';
}
function switchTab(tab) {
  // Hide all content
  document.querySelectorAll('#detail-modal .tab-content').forEach(el => el.classList.add('hidden'));

  // Show selected content
  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.remove('hidden');

  // Lazy load map if switching to map tab
  if (tab === 'map') {
    const mapContainer = document.getElementById('map-content');
    if (mapContainer && window.currentMapCode && mapContainer.innerHTML === '') {
      mapContainer.innerHTML = window.currentMapCode;
    } else if (mapContainer && !window.currentMapCode) {
      mapContainer.innerHTML = `
        <div class="text-center p-12">
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                <i class="fas fa-map-marked-alt text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">Interactive Map</h3>
            <p class="text-white/40 text-sm max-w-xs mx-auto">Map logic coming soon for this tour.</p>
        </div>`;
    }
  }

  // Update button visual states
  const tabs = ['overview', 'itinerary', 'map'];
  tabs.forEach(t => {
    const btn = document.getElementById('tab-btn-' + t);
    if (!btn) return;

    if (t === tab) {
      // Active state classes
      btn.classList.add('border-primary', 'text-primary');
      btn.classList.remove('border-transparent', 'text-white/30', 'hover:text-white');
    } else {
      // Inactive state classes
      btn.classList.remove('border-primary', 'text-primary');
      btn.classList.add('border-transparent', 'text-white/30', 'hover:text-white');
    }
  });
}

// ── Saved Trips Logic ───────────────────────────────────────────
function getSavedTrips() {
  try {
    return JSON.parse(localStorage.getItem('leeza_saved_trips') || '[]');
  } catch (e) { return []; }
}

function saveTripsList(list) {
  try {
    localStorage.setItem('leeza_saved_trips', JSON.stringify(list));
  } catch (e) { }
}

window.toggleSaveTrip = function (tourId, btn) {
  let saved = getSavedTrips();
  const idx = saved.indexOf(tourId);
  const isSaved = idx !== -1;
  if (isSaved) {
    saved.splice(idx, 1);
    saveTripsList(saved);
    if (btn) {
      btn.title = 'Save Trip';
      btn.innerHTML = '<i class="far fa-bookmark"></i>';
      btn.classList.remove('saved-trip-btn-active');
    }
    if (typeof toast === 'function') toast('Trip removed from saved list', 'info');
  } else {
    saved.push(tourId);
    saveTripsList(saved);
    if (btn) {
      btn.title = 'Saved!';
      btn.innerHTML = '<i class="fas fa-bookmark"></i>';
      btn.classList.add('saved-trip-btn-active');
    }
    if (typeof toast === 'function') toast('\u2764\ufe0f Trip saved!', 'success');
  }
  renderSavedTrips();
  updateSaveBtnStates();
};

function updateSaveBtnStates() {
  const saved = getSavedTrips();
  document.querySelectorAll('[data-save-trip-id]').forEach(btn => {
    const id = btn.getAttribute('data-save-trip-id');
    if (saved.includes(id)) {
      btn.title = 'Saved!';
      btn.innerHTML = '<i class="fas fa-bookmark"></i>';
      btn.classList.add('saved-trip-btn-active');
    } else {
      btn.title = 'Save Trip';
      btn.innerHTML = '<i class="far fa-bookmark"></i>';
      btn.classList.remove('saved-trip-btn-active');
    }
  });
}

function renderSavedTrips() {
  const container = document.getElementById('profile-saved-trips-list');
  const countEl = document.getElementById('profile-saved-count');
  if (!container) return;
  const saved = getSavedTrips();
  if (countEl) countEl.textContent = saved.length + ' Saved';
  if (!saved.length) {
    container.innerHTML = `<div class="py-6 text-center">
      <div class="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3">
        <i class="far fa-bookmark text-white/20 text-xl"></i>
      </div>
      <p class="text-xs text-white/30 italic">No saved trips yet</p>
      <p class="text-[10px] text-white/20 mt-1">Tap the bookmark on any tour card</p>
    </div>`;
    return;
  }
  const td = typeof tourData !== 'undefined' ? tourData : {};
  container.innerHTML = saved.map(id => {
    const t = td[id];
    const title = t ? id : id;
    const nights = t ? t.nights : '?';
    const days = t ? t.days : '?';
    const img = t ? t.img : '';
    return `<div class="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 group">
      ${img ? `<img src="${img}" class="w-12 h-12 rounded-xl object-cover shrink-0" alt="">` : `<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><i class="fas fa-map-marked-alt text-primary"></i></div>`}
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-white truncate">${title}</p>
        <p class="text-[10px] text-white/40">${nights} Nights · ${days} Days</p>
      </div>
      <button onclick="toggleSaveTrip('${id.replace(/'/g, "\\'")}')
        window.updateSaveBtnStates && updateSaveBtnStates()" title="Remove" class="w-7 h-7 rounded-full bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center text-rose-400 text-[10px] shrink-0 transition-all">
        <i class="fas fa-times"></i>
      </button>
    </div>`;
  }).join('');
}

window.loadUserTravelHistory = async function () {
  // Travel history in profile
  const bookingList = document.getElementById('profile-booking-list');
  const countEl = document.getElementById('profile-booking-count');
  if (!bookingList || !currentUser) return;
  try {
    const all = await loadAll('bookings');
    const mine = all.filter(b => b.email === currentUser.email);
    if (countEl) countEl.textContent = mine.length + ' Booking' + (mine.length !== 1 ? 's' : '');
    if (!mine.length) {
      bookingList.innerHTML = `<div class="py-6 text-center text-xs text-white/30 italic">No bookings yet</div>`;
      return;
    }
    const statusColor = { 'Approved': 'text-emerald-400', 'Cancelled': 'text-rose-400', 'Pending': 'text-yellow-400' };
    bookingList.innerHTML = mine.slice().reverse().map(b => `
      <div class="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
        <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <i class="fas fa-plane-departure text-primary text-xs"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-white truncate">${b.destination || 'Tour'}</p>
          <p class="text-[10px] text-white/40">${b.arrival || ''} · ${b.guests || ''} guests</p>
        </div>
        <span class="text-[9px] font-black uppercase tracking-widest ${statusColor[b.status] || 'text-yellow-400'}">${b.status || 'Pending'}</span>
      </div>`).join('');
  } catch (e) {
    if (bookingList) bookingList.innerHTML = `<div class="py-4 text-xs text-white/30 italic text-center">Could not load history.</div>`;
  }
  renderSavedTrips();
};

// ── Tour Filter Logic ───────────────────────────────────────────
window.selectedDurations = new Set();
window.toggleDuration = function (val) {
  const v = String(val);
  if (window.selectedDurations.has(v)) { window.selectedDurations.clear(); }
  else { window.selectedDurations.clear(); window.selectedDurations.add(v); }
  if (typeof updateDurationButtons === 'function') updateDurationButtons();
  if (typeof filterTours === 'function') filterTours();
};
window.clearAllFilters = function () {
  const input = document.getElementById('tour-search');
  if (input) input.value = '';
  window.selectedDurations.clear();
  if (typeof updateDurationButtons === 'function') updateDurationButtons();
  if (typeof filterTours === 'function') filterTours();
};
window.updateDurationButtons = function () {
  document.querySelectorAll('[data-duration-btn]').forEach(btn => {
    const val = btn.getAttribute('data-duration-btn');
    if (window.selectedDurations.has(val)) {
      btn.style.borderColor = '#FF6B35'; btn.style.color = '#FF6B35'; btn.style.background = 'rgba(255,107,53,0.1)';
    } else {
      btn.style.borderColor = ''; btn.style.color = ''; btn.style.background = '';
    }
  });
};
window.filterTours = function () {
  const sInput = document.getElementById('tour-search');
  const searchVal = (sInput ? sInput.value : '').toLowerCase().trim();
  const grid = document.getElementById('tours-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll(':scope > div');
  if (!cards.length) return;
  cards.forEach(card => {
    const titleEl = card.querySelector('h3');
    const title = (titleEl ? titleEl.textContent : '').toLowerCase();
    const duration = card.getAttribute('data-duration');
    const durationOk = window.selectedDurations.size === 0 || window.selectedDurations.has(duration);
    const searchOk = !searchVal || title.includes(searchVal);
    card.style.display = (durationOk && searchOk) ? 'flex' : 'none';
  });
};

// ── Counter Animation ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.stat-counter');
  const speed = 200;
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;
    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(() => animateCounter(counter), 10);
    } else {
      counter.innerText = target + '+';
    }
  };
  counters.forEach(c => animateCounter(c));
  setTimeout(() => { if (typeof filterTours === 'function') filterTours(); }, 100);
});
window.addEventListener('DOMContentLoaded', () => {
  if (typeof syncLanguageUI === 'function') syncLanguageUI();
  // Init saved trip button states
  setTimeout(updateSaveBtnStates, 100);
});

// ── Global Image Error Handling ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const handleImgError = (img) => {
    const src = img.src;
    if (!src || src.includes('unsplash.com')) return;

    if (src.toLowerCase().endsWith('.png')) {
      img.src = src.replace(/\.png$/i, '.jpg');
    } else if (src.toLowerCase().endsWith('.jpg')) {
      img.src = src.replace(/\.jpg$/i, '.jpeg');
    } else if (src.toLowerCase().endsWith('.jpeg')) {
      img.src = src.replace(/\.jpeg$/i, '.webp');
    } else {
      img.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80';
    }
  };

  document.body.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      const isTourImg = e.target.closest('#tours-grid, #tour-photos, #gallery, .gallery-card, .card');
      if (isTourImg) handleImgError(e.target);
    }
  }, true);
});

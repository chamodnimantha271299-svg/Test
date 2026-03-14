
// ── Footer & Info Modals ─────────────────────────────────────
const infoContent = {
  about: {
    title: 'About Leeza Travels',
    tag: 'Our Story',
    html: `<p>Leeza Travels was born from a passion for the untamed beauty of Sri Lanka. We believe travel is more than just visiting places; it's about the stories you bring home. From the misty highlands of Ella to the historic ramparts of Galle, we curate experiences that connect you with the soul of our island.</p>
               <p>Our mission is to provide sustainable, responsible, and deeply personal travel experiences while supporting local communities across Sri Lanka.</p>`
  },
  team: {
    title: 'Meet Our Experts',
    tag: 'Expertise',
    html: `<div class="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                  <div class="glass p-6 pt-16 rounded-3xl text-center border border-white/5 shadow-lg mt-16 relative">
                    <div class="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden absolute -top-14 left-1/2 -translate-x-1/2 border-4 border-[#0f172a] shadow-2xl shadow-black/60 bg-[#0f172a]">
                      <img src="images/Kumara.jpg" alt="Mr. Kumara Perera" class="w-full h-full object-cover" style="object-position: center; object-fit: cover;" />
                    </div>
                    <div class="font-bold text-white text-xl mb-1">Mr. Kumara Perera</div>
                    <div class="text-xs text-primary font-black uppercase tracking-widest mb-3">Founder & Lead Explorer</div>
                    <p class="text-sm text-white/50 leading-relaxed px-4">Mr. Kumara Perera, the visionary founder of Leeza Travels, brings over 15 years of distinguished expertise in Sri Lankan tourism. His journey began with a simple love for the island's hidden trails and has evolved into a mission to share these authentic experiences with the world. Under his leadership, Leeza Travels emphasizes personalized service and a commitment to sustainable travel excellence.</p>
                    <div class="mt-6 flex justify-center gap-4">
                      <a href="https://www.facebook.com/share/1CSxCPAnHR/" target="_blank" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-primary border border-white/10 transition-all hover:scale-110"><i class="fab fa-facebook-f"></i></a>
                      <a href="https://www.instagram.com" target="_blank" class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-primary border border-white/10 transition-all hover:scale-110"><i class="fab fa-instagram"></i></a>
                    </div>
                  </div>
               </div>`
  },
  explore: {
    title: 'Explore Our World',
    tag: 'Wanderlust',
    html: `<div class="mb-6">
                 <h4 class="text-xs font-black uppercase tracking-widest text-primary mb-3">Sri Lanka</h4>
                 <p class="text-[11px] text-white/50 mb-4">Discover the pear of the Indian Ocean, where ancient history meets tropical paradise.</p>
                 <ul class="space-y-2">
                   <li class="flex items-start gap-2 text-[10px] text-white/70"><i class="fas fa-certificate text-primary mt-0.5"></i> <span><strong>Ancient Cities:</strong> Explore the ruins of Sigiriya and Anuradhapura.</span></li>
                   <li class="flex items-start gap-2 text-[10px] text-white/70"><i class="fas fa-certificate text-primary mt-0.5"></i> <span><strong>Misty Highlands:</strong> Experience the tea estates and waterfalls of Ella.</span></li>
                   <li class="flex items-start gap-2 text-[10px] text-white/70"><i class="fas fa-certificate text-primary mt-0.5"></i> <span><strong>Golden Coast:</strong> Relax on the pristine beaches of Mirissa and Galle.</span></li>
                 </ul>
               </div>
               <div>
                 <h4 class="text-xs font-black uppercase tracking-widest text-primary mb-3">Global Adventures</h4>
                 <p class="text-[11px] text-white/50 mb-4">Embark on a journey beyond shores to our handpicked international gems.</p>
                 <ul class="space-y-2">
                   <li class="flex items-start gap-2 text-[10px] text-white/70"><i class="fas fa-globe-americas text-primary mt-0.5"></i> <span><strong>Europe:</strong> Experience the romance of France and the majesty of the Swiss Alps.</span></li>
                   <li class="flex items-start gap-2 text-[10px] text-white/70"><i class="fas fa-globe-asia text-primary mt-0.5"></i> <span><strong>Asia:</strong> Dive into the vibrant culture of Japan and the tropical beauty of Indonesia.</span></li>
                   <li class="flex items-start gap-2 text-[10px] text-white/70"><i class="fas fa-globe-europe text-primary mt-0.5"></i> <span><strong>Middle East:</strong> Witness the historic cross-roads and stunning landscapes of Turkey.</span></li>
                 </ul>
               </div>`
  },
  careers: {
    title: 'Join Our Journey',
    tag: 'Careers',
    html: `<div class="text-center py-10">
                  <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-briefcase text-2xl text-primary"></i>
                  </div>
                  <h4 class="text-white text-xl font-bold mb-4">Grow With Leeza Travels</h4>
                  <p class="text-white/50 text-sm mb-6 leading-relaxed max-w-md mx-auto">
                    We're not just a team; we're a family of explorers. While we may not have an immediate opening listed today, we are always searching for passionate Sri Lankan travel experts and guides who want to make a difference.
                  </p>
                  <p class="text-white/40 text-xs mb-8 italic">
                    If you have a heart for hospitality and a deep knowledge of our beautiful island, we'd love to hear from you.
                  </p>
                  <div class="pt-6 border-t border-white/5">
                    <p class="text-[10px] text-white/30 uppercase tracking-widest font-black mb-1">Send your portfolio to</p>
                    <p class="text-primary font-bold text-lg">Leezatravelslk@gmail.com</p>
                  </div>
               </div>`
  },
  privacy: {
    title: 'Privacy Policy',
    tag: 'Security',
    html: `<p>Your privacy is paramount. At Leeza Travels, we use your data strictly to manage your bookings and enhance your experience. We do not sell your personal information to third parties.</p>
               <p>We use industry standard encryption to protect your data stored in our local databases and secure transmission for booking and contact forms.</p>`
  },
  faqs: {
    title: 'Frequently Asked Questions',
    tag: 'Support',
    html: `<div class="space-y-6">
                 <div>
                   <div class="font-bold text-white text-sm mb-1">How do I book a customized tour?</div>
                   <div class="text-xs text-white/50">Simply use our contact form or the "Other" option in the booking menu, and our experts will call you.</div>
                 </div>
                 <div>
                   <div class="font-bold text-white text-sm mb-1">What is the cancellation policy?</div>
                   <div class="text-xs text-white/50">Free cancellation up to 48 hours before the tour starts for most packages.</div>
                 </div>
                 <div>
                   <div class="font-bold text-white text-sm mb-1">Are airport transfers included?</div>
                   <div class="text-xs text-white/50">Yes, most of our comprehensive packages include luxury airport pick-up and drop-off.</div>
                 </div>
               </div>`
  },
  cancellation: {
    title: 'Cancellation Policy',
    tag: 'Flexibility',
    html: `<p>We understand that plans change. Our goal is to provide maximum flexibility.</p>
               <ul class="space-y-4">
                 <li class="glass p-4 rounded-xl">
                   <div class="font-bold text-primary mb-1">48 Hours Notice</div>
                   <div class="text-white/50 text-xs">Full refund minus minor processing fees for most standard tours.</div>
                 </li>
                 <li class="glass p-4 rounded-xl">
                   <div class="font-bold text-accent mb-1">Less than 24 Hours</div>
                   <div class="text-white/50 text-xs">A 50% cancellation fee may apply depending on the booking type.</div>
                 </li>
               </ul>`
  }
};

function showInfoModal(key) {
  const data = infoContent[key];
  if (!data) return;
  document.getElementById('info-title').textContent = data.title;
  document.getElementById('info-tag').textContent = data.tag;
  document.getElementById('info-content').innerHTML = data.html;
  const m = document.getElementById('info-modal');
  m.style.display = 'flex'; m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeInfoModal() {
  const m = document.getElementById('info-modal');
  m.style.display = 'none'; m.classList.add('hidden');
  document.body.style.overflow = '';
}

function showTrackModal() {
  const m = document.getElementById('track-modal');
  m.style.display = 'flex'; m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.getElementById('track-results').classList.add('hidden');
  document.getElementById('track-email').value = '';
}
function closeTrackModal() {
  const m = document.getElementById('track-modal');
  m.style.display = 'none'; m.classList.add('hidden');
  document.body.style.overflow = '';
}

// ── IndexedDB Admin Viewer ────────────────────────────────────
// ── IndexedDB Admin Viewer ────────────────────────────────────
function showDBViewer(defaultStore = 'bookings') {
  toast('Admin Panel Opened! 📊', 'info');
  const viewer = document.getElementById('db-modal'); // Changed from 'db-viewer' to 'db-modal' to match existing HTML
  viewer.style.display = 'flex';
  viewer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  loadDBStore(defaultStore, document.querySelector(`[onclick^="loadDBStore('${defaultStore}'"]`));
}

function closeDBViewer() {
  const m = document.getElementById('db-modal');
  m.style.display = 'none'; m.classList.add('hidden');
  document.body.style.overflow = '';
}

let _lastAdminTotal = 0;
function checkAdminNotifications(isSilent = false) {
  if (!db) return;
  let total = 0;
  const stores = ['bookings', 'messages', 'users', 'newsletter', 'admin_activity'];
  let completed = 0;

  stores.forEach(s => {
    try {
      const tx = db.transaction(s, 'readonly');
      tx.objectStore(s).getAll().onsuccess = (e) => {
        const items = e.target.result || [];
        const unreadCount = items.filter(i => i.viewed === false).length;
        total += unreadCount;

        const tabBadge = document.getElementById(`db-tab-count-${s}`);
        if (tabBadge) {
          tabBadge.textContent = unreadCount;
          unreadCount > 0 ? tabBadge.classList.remove('hidden') : tabBadge.classList.add('hidden');
        }

        completed++;
        if (completed === stores.length) {
          const badges = ['nav-admin-badge', 'mob-admin-badge'];
          badges.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
              el.textContent = total;
              total > 0 ? el.classList.remove('hidden') : el.classList.add('hidden');
            }
          });

          if (total > _lastAdminTotal && !isSilent) {
            // Play notification sound silently without blocking screen with toast alert
            try {
              const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
              audio.volume = 0.4;
              audio.play().catch(() => { });
            } catch (e) { }
          }
          _lastAdminTotal = total;

          const dd = document.getElementById('nav-notifications-dropdown');
          const isOpen = dd && !dd.classList.contains('pointer-events-none');
          if (isOpen && isUserAdmin()) {
            populateNavNotifications();
          }
        }
      };
    } catch (err) { completed++; }
  });
}

// ── Real-Time Sync Logic ────────────────────────────────────────────
function isUserAdmin() {
  if (!currentUser) return false;
  return currentUser.email === 'nimanthachamod86@gmail.com' || currentUser.isAdmin === true;
}

function isOwner() {
  return currentUser && currentUser.email === 'nimanthachamod86@gmail.com';
}

const notificationChannel = new BroadcastChannel('ekekete_notifications');
notificationChannel.onmessage = (event) => {
  if (isUserAdmin()) {
    checkAdminNotifications();
  } else if (currentUser) {
    checkUserNotifications();
  }
};

function notifyOtherTabs() {
  notificationChannel.postMessage('update_notifications');
}

// ── Dropdown Notifications Logic ────────────────────────────────────
let isNavDropdownOpen = false;

function toggleNavNotifications(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('nav-notifications-dropdown');
  if (!dd) return;

  const isOpen = !dd.classList.contains('pointer-events-none');

  if (isOpen) {
    closeNavNotifications();
  } else {
    closeUserNotifications(); // Ensure the other one is closed
    populateNavNotifications();
    dd.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
    dd.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');

    // Optional: clear badges when opened
    const badge = document.getElementById('nav-admin-badge');
    if (badge) { badge.classList.add('hidden'); badge.textContent = '0'; }
    const mobBadge = document.getElementById('mob-admin-badge');
    if (mobBadge) { mobBadge.classList.add('hidden'); mobBadge.textContent = '0'; }
  }
}

function closeNavNotifications() {
  const dd = document.getElementById('nav-notifications-dropdown');
  if (!dd) return;
  dd.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
  dd.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
}

// ── User Notifications Logic ─────────────────────────────────
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

    const badge = document.getElementById('nav-user-badge');
    if (badge) { badge.classList.add('hidden'); badge.textContent = '0'; }
    const mobBadge = document.getElementById('mob-user-badge');
    if (mobBadge) { mobBadge.classList.add('hidden'); mobBadge.textContent = '0'; }
  }
}

function closeUserNotifications() {
  const dd = document.getElementById('user-notifications-dropdown');
  if (!dd) return;
  dd.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
  dd.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
}

async function markUserItemAsViewedAndOpen(storeName, keyVal) {
  if (!db || !currentUser) return;

  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.get(keyVal).onsuccess = (e) => {
    const item = e.target.result;
    if (item && item.user_unread) {
      item.user_unread = false;
      store.put(item).onsuccess = () => {
        checkUserNotifications();
      };
    }
  };

  closeUserNotifications();
  const m = document.getElementById('profile-modal');
  // Always ensure the profile modal is opened when an item is clicked
  if (m && m.classList.contains('hidden')) {
    toggleProfileModal();
  }
}

function checkUserNotifications() {
  if (!db || !currentUser) return;

  let totalUnread = 0;
  let completed = 0;
  const stores = ['bookings', 'messages'];

  stores.forEach(s => {
    const tx = db.transaction(s, 'readonly');
    tx.objectStore(s).getAll().onsuccess = (e) => {
      totalUnread += (e.target.result || []).filter(i => i.email === currentUser.email && i.user_unread).length;
      completed++;
      if (completed === stores.length) {
        const badge = document.getElementById('nav-user-badge');
        const mobBadge = document.getElementById('mob-user-badge');
        if (totalUnread > 0) {
          const text = totalUnread > 99 ? '99+' : totalUnread;
          if (badge) { badge.textContent = text; badge.classList.remove('hidden'); }
          if (mobBadge) { mobBadge.textContent = text; mobBadge.classList.remove('hidden'); }
        } else {
          if (badge) badge.classList.add('hidden');
          if (mobBadge) mobBadge.classList.add('hidden');
        }

        // Re-populate dropdown if open
        const dd = document.getElementById('user-notifications-dropdown');
        const isOpen = dd && !dd.classList.contains('pointer-events-none');
        if (isOpen) populateUserNotifications();
      }
    };
  });
}

function populateUserNotifications() {
  if (!db || !currentUser) return;

  const listContainer = document.getElementById('user-notifications-list');
  if (!listContainer) return;

  let allItems = [];
  let completed = 0;
  const stores = ['bookings', 'messages'];

  stores.forEach(storeName => {
    const tx = db.transaction(storeName, 'readonly');
    tx.objectStore(storeName).getAll().onsuccess = (e) => {
      const items = (e.target.result || []).filter(i => {
        const isMine = i.email === currentUser.email;
        const hasReply = i.admin_reply && i.admin_reply.trim() !== '';
        const isSystem = i.name === 'System';
        return isMine && (i.user_unread || i.admin_touched || ['Approved', 'Cancelled'].includes(i.status) || hasReply || isSystem);
      });

      items.forEach(item => {
        allItems.push({
          type: storeName,
          timestamp: new Date(item.updatedAt || item.timestamp || Date.now()),
          raw: item
        });
      });

      completed++;
      if (completed === stores.length) {
        // Group by item ID/email to show only the latest per item
        const grouped = new Map();
        allItems.forEach(item => {
          const key = item.raw.id || item.raw.email;
          if (!grouped.has(key) || item.timestamp > grouped.get(key).timestamp) {
            grouped.set(key, item);
          }
        });
        const finalItems = Array.from(grouped.values()).sort((a, b) => b.timestamp - a.timestamp);
        renderUserNotificationsList(finalItems.slice(0, 15));
      }
    };
  });
}

function renderUserNotificationsList(items) {
  const listContainer = document.getElementById('user-notifications-list');
  if (!listContainer) return;

  if (items.length === 0) {
    listContainer.innerHTML = `<div class="py-10 text-center text-xs text-white/30"><i class="fas fa-inbox text-2xl mb-2 block opacity-50"></i>No notifications yet</div>`;
    return;
  }

  listContainer.innerHTML = items.map(item => {
    let icon, title, desc, color;
    const timeAgo = Math.round((new Date() - item.timestamp) / 60000);
    const timeStr = timeAgo < 1 ? 'Just now' : timeAgo < 60 ? `${timeAgo}m ago` : timeAgo < 1440 ? `${Math.floor(timeAgo / 60)}h ago` : `${Math.floor(timeAgo / 1440)}d ago`;
    const isUnread = item.raw.user_unread === true;

    if (item.type === 'bookings') {
      icon = 'fa-calendar-check';
      if (item.raw.status === 'Approved') {
        color = 'emerald';
        title = 'Booking Approved!';
        desc = `Your trip to ${item.raw.destination || 'Custom Destination'} is confirmed.`;
      } else if (item.raw.status === 'Cancelled') {
        color = 'red';
        title = 'Booking Cancelled';
        desc = `Your trip to ${item.raw.destination || 'Custom Destination'} was cancelled.`;
      } else {
        color = 'primary';
        title = 'Booking Updated';
        desc = `Your booking for ${item.raw.destination || 'Custom Destination'} was updated by Admin.`;
      }
    } else if (item.type === 'messages') {
      if (item.raw.name === 'System') {
        icon = 'fa-exclamation-circle'; color = 'red';
        title = 'System Notice';
        desc = item.raw.message || 'An item was deleted.';
      } else {
        icon = 'fa-comment-dots'; color = 'accent';
        title = `Admin Replied`;
        desc = `Reply: ${item.raw.admin_reply || ''}`;
      }
    }

    const itemKey = item.type === 'users' ? item.raw.email : item.raw.id;
    const action = `markUserItemAsViewedAndOpen('${item.type}', ${typeof itemKey === 'string' ? `'${itemKey}'` : itemKey})`;

    return `
          <button onclick="${action}" class="relative w-full text-left p-3 border-b border-white/5 hover:bg-white/5 transition-colors group flex items-start gap-3 ${isUnread ? `bg-${color}-500/5` : ''}">
            ${isUnread ? `<div class="absolute left-0 top-0 bottom-0 w-1 bg-${color}-500 rounded-r-full"></div>` : ''}
            <div class="mt-1 w-8 h-8 rounded-full bg-${color}-500/10 flex items-center justify-center flex-shrink-0 relative">
              <i class="fas ${icon} text-${color}-400 text-xs"></i>
              ${isUnread ? `<span class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border border-[#0f172a] rounded-full"></span>` : ''}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start mb-0.5">
                <span class="text-xs ${isUnread ? 'font-black text-white' : 'font-bold text-white/80'} truncate group-hover:text-${color}-400 transition-colors">${title}</span>
                <span class="text-[9px] font-black ${isUnread ? `text-${color}-400` : 'text-white/30'} whitespace-nowrap ml-2">${timeStr}</span>
              </div>
              <p class="text-[11px] ${isUnread ? 'text-white/70 font-medium' : 'text-white/50'} truncate">${desc}</p>
            </div>
          </button>
        `;
  }).join('');
}

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  const navDD = document.getElementById('nav-notifications-dropdown');
  const userDD = document.getElementById('user-notifications-dropdown');
  if (navDD && !e.target.closest('#nav-dropdown-wrapper')) {
    closeNavNotifications();
  }
  if (userDD && !e.target.closest('#user-dropdown-wrapper')) {
    closeUserNotifications();
  }
});

function populateNavNotifications() {
  if (!db) return;

  const stores = ['bookings', 'messages', 'users', 'admin_activity'];
  let allItems = [];
  let completed = 0;

  const listContainer = document.getElementById('nav-notifications-list');

  stores.forEach(storeName => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      tx.objectStore(storeName).getAll().onsuccess = (e) => {
        const items = e.target.result || [];

        // Format items uniformly for sorting and display
        items.forEach(item => {
          const formatted = {
            type: storeName,
            timestamp: new Date(item.timestamp || item.addedAt || item.updatedAt || Date.now()),
            raw: item
          };
          allItems.push(formatted);
        });

        completed++;
        if (completed === stores.length) {
          // Group by entity to avoid duplicates (e.g. multiple messages from same user)
          const grouped = new Map();
          allItems.forEach(item => {
            // Key: type + unique identifier
            const id = item.raw.id || item.raw.email || item.raw.timestamp;
            const key = `${item.type}_${id}`;
            if (!grouped.has(key) || item.timestamp > grouped.get(key).timestamp) {
              grouped.set(key, item);
            }
          });

          const finalItems = Array.from(grouped.values()).sort((a, b) => b.timestamp - a.timestamp);
          renderNavNotificationsList(finalItems.slice(0, 15));
        }
      };
    } catch (err) { completed++; }
  });
}

function renderNavNotificationsList(items) {
  const listContainer = document.getElementById('nav-notifications-list');
  if (!listContainer) return;

  if (items.length === 0) {
    listContainer.innerHTML = `<div class="py-10 text-center text-xs text-white/30"><i class="fas fa-inbox text-2xl mb-2 block opacity-50"></i>No recent activity</div>`;
    return;
  }

  listContainer.innerHTML = items.map(item => {
    let icon, title, desc, color, action;
    const timeAgo = Math.round((new Date() - item.timestamp) / 60000);
    const timeStr = timeAgo < 1 ? 'Just now' : timeAgo < 60 ? `${timeAgo}m ago` : timeAgo < 1440 ? `${Math.floor(timeAgo / 60)}h ago` : `${Math.floor(timeAgo / 1440)}d ago`;
    const isUnread = item.raw.viewed === false;

    const itemKey = item.type === 'users' ? item.raw.email : item.raw.id;

    if (item.type === 'bookings') {
      icon = 'fa-calendar-check'; color = 'emerald';
      title = `Booking: ${item.raw.destination || 'Custom Trip'}`;
      desc = `${item.raw.name} • ${item.raw.status || 'Pending'}`;
    } else if (item.type === 'messages') {
      icon = 'fa-comment-dots'; color = 'sky';
      title = `Message from ${item.raw.name.split(' ')[0]}`;
      desc = item.raw.message || item.raw.msg || 'No content';
    } else if (item.type === 'users') {
      icon = 'fa-user-plus'; color = 'purple';
      title = `New User Signup`;
      desc = `${item.raw.name} joined.`;
    } else if (item.type === 'admin_activity') {
      icon = 'fa-clipboard-list'; color = 'red';
      title = `Admin Action`;
      desc = item.raw.action || 'Data updated or deleted';
    }

    action = `markItemAsViewedAndOpen('${item.type}', ${typeof itemKey === 'string' ? `'${itemKey}'` : itemKey})`;

    return `
          <button onclick="${action}" class="relative w-full text-left p-3 border-b border-white/5 hover:bg-white/5 transition-colors group flex items-start gap-3 ${isUnread ? 'bg-primary/5' : ''}">
            ${isUnread ? `<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>` : ''}
            <div class="mt-1 w-8 h-8 rounded-full bg-${color}-500/10 flex items-center justify-center flex-shrink-0 relative">
              <i class="fas ${icon} text-${color}-400 text-xs"></i>
              ${isUnread ? '<span class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border border-[#0f172a] rounded-full"></span>' : ''}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start mb-0.5">
                <span class="text-xs ${isUnread ? 'font-black text-white' : 'font-bold text-white/80'} truncate group-hover:text-primary transition-colors">${title}</span>
                <span class="text-[9px] font-black ${isUnread ? 'text-primary' : 'text-white/30'} whitespace-nowrap ml-2">${timeStr}</span>
              </div>
              <p class="text-[11px] ${isUnread ? 'text-white/70 font-medium' : 'text-white/50'} truncate">${desc}</p>
            </div>
          </button>
        `;
  }).join('');
}

async function markItemAsViewedAndOpen(storeName, itemKeyUrlParam) {
  // The user requested that clicking a notification from the top dropdown should NOT clear the "unread" (red) status.
  // It should only clear when the admin explicitly views or interacts with the item inside the database table.
  closeNavNotifications();
  showDBViewer(storeName);
}

// Fallback for clearing all via the bottom button
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
          item.viewed = true; changed = true;
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

async function markRowAsViewed(storeName, keyVal) {
  if (!db) return;
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.get(keyVal).onsuccess = (e) => {
    const item = e.target.result;
    if (item && item.viewed === false) {
      item.viewed = true;
      store.put(item).onsuccess = () => {
        checkAdminNotifications();
        notifyOtherTabs();
        loadDBStore(storeName);
      };
    }
  };
}
// Track which store is currently open
let _currentStore = 'bookings';

function loadDBStore(storeName, callerBtn) {
  _currentStore = storeName;
  const content = document.getElementById('db-viewer-content');
  // Highlight active tab
  document.querySelectorAll('.db-tab').forEach(b => b.classList.remove('border-primary/50', 'text-primary', 'bg-primary/10', 'bg-white/5'));
  if (callerBtn) callerBtn.classList.add('border-primary/50', 'text-primary', 'bg-primary/10');

  if (!db) { content.innerHTML = '<div class="text-center py-10 text-red-400"><i class="fas fa-exclamation-triangle mr-2"></i>Database not ready.</div>'; return; }
  content.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-primary"></i> Loading...</div>';

  try {
    const tx = db.transaction(storeName, 'readonly');
    tx.objectStore(storeName).getAll().onsuccess = (e) => {
      try {
        _renderDBStore(storeName, e.target.result || []);
      } catch (renderErr) {
        console.error('Render error:', renderErr);
        content.innerHTML = `<div class="text-center py-10 text-red-100">Render error: ${renderErr.message}</div>`;
      }
    };
    tx.onerror = () => { content.innerHTML = '<div class="text-center py-10 text-red-500">Failed to read store.</div>'; };
  } catch (err) {
    content.innerHTML = '<div class="text-center py-10 text-red-400">Failed to read store.</div>';
  }
}

// Row data cache — avoids passing complex objects through HTML attributes
const _dbRowCache = {};

function _renderDBStore(storeName, rows) {
  const content = document.getElementById('db-viewer-content');
  if (!rows || rows.length === 0) {
    content.innerHTML = `<div class="text-center py-16 text-white/20"><i class="fas fa-inbox text-4xl mb-3 block"></i>No records in <strong class="text-white/30">${storeName}</strong> yet.</div>`;
    return;
  }

  // Store rows in JS cache so we can retrieve them safely by index
  _dbRowCache[storeName] = rows.slice().reverse();
  const HIDDEN = new Set(['password', '_honey', '_template', '_captcha', '_subject']);
  const isBookings = storeName === 'bookings';
  const isUsers = storeName === 'users';
  const isMessages = storeName === 'messages';
  // Internal record keys to skip in the UI table (keeps it clean)
  const SKIP_COLS = new Set(['viewed', 'password', 'user_unread']);
  const canUpdate = true; // Admin panel can always update
  const keys = rows.length ? Object.keys(rows[0]).filter(k => !SKIP_COLS.has(k)) : [];
  const header = `<tr>${keys.map(k => `<th class="px-3 py-3 text-[10px] uppercase font-black text-white/40 tracking-widest border-b border-white/10">${k}</th>`).join('')}<th class="px-3 py-3 text-[10px] uppercase font-black text-white/40 tracking-widest text-center border-b border-white/10">Actions</th></tr>`;

  const body = _dbRowCache[storeName].map((row, idx) => {
    const isUnread = row.viewed === false;
    const keyField = isUsers ? 'email' : 'id';
    const keyVal = row[keyField];

    const cells = keys.map(k => {
      let val = row[k] ?? '—';
      if (typeof val === 'object') val = JSON.stringify(val);
      const display = k === 'status'
        ? `<span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-${{ 'Approved': 'emerald', 'Cancelled': 'red', 'Pending': 'amber' }[val] || 'blue'}-500/15 text-${{ 'Approved': 'emerald', 'Cancelled': 'red', 'Pending': 'amber' }[val] || 'blue'}-400 border border-${{ 'Approved': 'emerald', 'Cancelled': 'red', 'Pending': 'amber' }[val] || 'blue'}-500/20">${val}</span>`
        : `<span title="${String(val).replace(/"/g, '&quot;')}">${String(val).length > 30 ? String(val).slice(0, 28) + '…' : val}</span>`;

      return `<td class="px-3 py-3 text-xs ${isUnread ? 'text-white font-bold' : 'text-white/60'} border-t border-white/5">
            ${k === keys[0] && isUnread ? `<span class="inline-block w-2 h-2 bg-primary rounded-full mr-2 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></span>` : ''}
            ${display}
          </td>`;
    }).join('');

    const fKey = typeof keyVal === 'string' ? `'${keyVal.replace(/'/g, "\\'")}'` : keyVal;

    const approveBtn = isBookings
      ? `<button onclick="dbApprove(${fKey})" class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all whitespace-nowrap"><i class="fas fa-check-circle mr-1"></i>Approve</button>`
      : '';

    const replyBtn = isMessages
      ? `<button onclick="dbReply(${idx})" class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-all whitespace-nowrap"><i class="fas fa-reply mr-1"></i>Reply</button>`
      : '';

    const viewBtn = `<button onclick="dbViewRecord('${storeName}', ${idx})" class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-white/10 text-white/70 hover:bg-white/20 border border-white/10 transition-all whitespace-nowrap"><i class="fas fa-eye mr-1"></i>View</button>`;
    const updateBtn = (storeName === 'bookings' || storeName === 'users')
      ? `<button onclick="dbUpdate('${storeName}', ${idx})" class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all whitespace-nowrap"><i class="fas fa-pen mr-1"></i>Update</button>`
      : '';
    const deleteBtn = `<button onclick="dbDelete('${storeName}', ${fKey})" class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all whitespace-nowrap"><i class="fas fa-trash mr-1"></i>Delete</button>`;

    let roleBtn = '';
    if (isUsers && isOwner() && keyVal !== 'nimanthachamod86@gmail.com') {
      // We need to check if this specific user is an admin
      roleBtn = `<button id="role-btn-${idx}" onclick="dbToggleAdmin(${fKey}, ${idx})" class="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-all whitespace-nowrap">Check Role...</button>`;
      // Auto-update button label
      get('admins', keyVal).then(admin => {
        const btn = document.getElementById(`role-btn-${idx}`);
        if (btn) {
          if (admin) {
            btn.innerHTML = '<i class="fas fa-user-minus mr-1"></i>Revoke Admin';
            btn.className = 'px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all whitespace-nowrap';
          } else {
            btn.innerHTML = '<i class="fas fa-user-plus mr-1"></i>Make Admin';
            btn.className = 'px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all whitespace-nowrap';
          }
        }
      });
    }

    return `<tr class="transition-colors ${isUnread ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white/5'}">${cells}<td class="px-3 py-3 border-t border-white/5"><div class="flex gap-1.5 justify-center flex-wrap">${viewBtn}${approveBtn}${replyBtn}${updateBtn}${roleBtn}${deleteBtn}</div></td></tr>`;
  }).join('');

  content.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] text-white/30"><i class="fas fa-circle-info mr-1"></i>${rows.length} record(s) in <strong class="text-white/50">${storeName}</strong></span>
          <button onclick="if(confirm('Delete ALL records in ${storeName}?')) dbDeleteAll('${storeName}')"
            class="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all">
            <i class="fas fa-trash-can mr-1"></i>Delete All
          </button>
        </div>
        <div class="overflow-x-auto rounded-2xl border border-white/10">
          <table class="w-full text-left border-collapse min-w-max">
            <thead class="bg-white/5">${header}</thead>
            <tbody>${body}</tbody>
          </table>
        </div>`;
}


function dbDelete(storeName, keyVal) {
  if (!isUserAdmin()) return toast('Unauthorized', 'error');
  if (!confirm(`Delete ${storeName} record: ${keyVal}?`)) return;

  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  const req = store.get(keyVal);
  req.onsuccess = () => {
    const deletedItem = req.result;
    store.delete(keyVal).onsuccess = () => {
      toast('Record Deleted Successfully! 🗑️', 'error'); // Red color as requested
      logAdminActivity(`Deleted ${storeName} record: ${keyVal}`);
      loadDBStore(storeName);

      // Notify User of deletion if applicable
      if (deletedItem && deletedItem.email && (storeName === 'bookings' || storeName === 'messages' || storeName === 'users')) {
        const label = storeName === 'users' ? 'Account' : storeName === 'messages' ? 'Message' : 'Booking';
        const msgTx = db.transaction('messages', 'readwrite');
        msgTx.objectStore('messages').put({
          name: 'System',
          email: deletedItem.email,
          interest: 'Admin Notice',
          message: `Your ${label} record was deleted by an Admin.`,
          admin_reply: `Record Deleted`,
          user_unread: true,
          viewed: true,
          timestamp: new Date().toISOString()
        }).onsuccess = () => {
          checkAdminNotifications();
          notifyOtherTabs();
        };
      } else {
        checkAdminNotifications();
        notifyOtherTabs();
      }
    };
  };
  req.onerror = (e) => {
    console.error('Delete error:', e.target.error);
    toast('Deletion failed: ' + e.target.error.name, 'error');
  };
}

function dbDeleteAll(storeName) {
  const tx = db.transaction(storeName, 'readwrite');
  tx.objectStore(storeName).clear().onsuccess = () => {
    toast('All Records Cleared! ⚠️', 'error');
    logAdminActivity(`Cleared ALL records from ${storeName}`);
    loadDBStore(storeName);
    checkAdminNotifications();
    notifyOtherTabs();
  };
}

async function dbToggleAdmin(email, idx) {
  if (!db || !isOwner()) return;
  const isAdmin = await get('admins', email);
  const tx = db.transaction('admins', 'readwrite');
  const store = tx.objectStore('admins');

  if (isAdmin) {
    store.delete(email).onsuccess = () => {
      toast(`${email} is no longer an Admin`, 'warning');
      logAdminActivity(`Revoked admin for ${email}`);
      loadDBStore('users');
      // Notify user of role change
      db.transaction('messages', 'readwrite').objectStore('messages').put({
        name: 'System', email: email, interest: 'Role Update', message: 'Your Admin privileges have been revoked by the Owner.', admin_reply: 'Role Revoked', user_unread: true, viewed: true, timestamp: new Date().toISOString()
      }).onsuccess = () => { notifyOtherTabs(); };
    };
  } else {
    store.put({ email, assignedAt: new Date().toISOString() }).onsuccess = () => {
      toast(`${email} is now an Admin! 🛡️`, 'success');
      logAdminActivity(`Promoted ${email} to admin`);
      loadDBStore('users');
      // Notify user of role change
      db.transaction('messages', 'readwrite').objectStore('messages').put({
        name: 'System', email: email, interest: 'Role Update', message: 'You have been promoted to Admin by the Owner.', admin_reply: 'Role Granted', user_unread: true, viewed: true, timestamp: new Date().toISOString()
      }).onsuccess = () => { notifyOtherTabs(); };
    };
  }
}

function dbViewRecord(storeName, rowIdx) {
  toast('Viewing Record Details...', 'info');
  if (storeName === 'users') return dbViewUser(rowIdx);
  const row = _dbRowCache[storeName] && _dbRowCache[storeName][rowIdx];
  if (!row) { toast('Record not found', '#ef4444'); return; }

  const HIDDEN = new Set(['viewed', 'password', 'user_unread', '_honey', '_template', '_captcha', '_subject']);
  const infoRows = Object.keys(row)
    .filter(k => !HIDDEN.has(k))
    .map(k => `
          <div class="flex justify-between items-start py-2.5 border-b border-white/5 last:border-0">
            <span class="text-[10px] uppercase tracking-widest text-white/30 font-bold w-32 flex-shrink-0">${k.replace(/_/g, ' ')}</span>
            <span class="text-xs text-white/70 text-right break-all ml-4">${row[k] ?? '—'}</span>
          </div>`).join('');

  document.getElementById('db-edit-overlay')?.remove();
  document.body.insertAdjacentHTML('beforeend', `
        <div id="db-edit-overlay" class="fixed inset-0 z-[110] flex items-center justify-center p-4" style="background:rgba(0,0,0,.85)">
          <div class="glass-dark rounded-[2rem] w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button onclick="document.getElementById('db-edit-overlay').remove()" class="absolute top-5 right-5 text-white/40 hover:text-white"><i class="fas fa-times"></i></button>
            <div class="text-primary text-[10px] font-black uppercase tracking-widest mb-1"><i class="fas fa-info-circle mr-1"></i>Record Details</div>
            <h3 class="text-xl font-bold text-white mb-6 uppercase tracking-tight">${storeName} Entry</h3>
            
            <div class="glass rounded-2xl p-5 mb-8 shadow-xl shadow-black/20">${infoRows}</div>
            
            <button onclick="document.getElementById('db-edit-overlay').remove()" 
              class="w-full glass py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm">Close</button>
          </div>
        </div>`);

  const keyField = 'id';
  markRowAsViewed(storeName, row[keyField]);
}

function dbViewUser(rowIdx) {
  toast('Viewing User Profile...', 'info');
  const user = _dbRowCache['users'] && _dbRowCache['users'][rowIdx];
  if (!user) { toast('User not found', '#ef4444'); return; }

  const SKIP = new Set(['viewed', 'password']);
  const infoRows = Object.keys(user)
    .filter(k => !SKIP.has(k))
    .map(k => `
          <div class="flex justify-between items-start py-2.5 border-b border-white/5 last:border-0">
            <span class="text-[10px] uppercase tracking-widest text-white/30 font-bold w-28 flex-shrink-0">${k}</span>
            <span class="text-xs text-white/70 text-right break-all">${user[k] ?? '—'}</span>
          </div>`).join('');

  // Fetch this user's bookings by email
  const bookingsTx = db.transaction('bookings', 'readonly');
  bookingsTx.objectStore('bookings').getAll().onsuccess = (e) => {
    const userBookings = (e.target.result || []).filter(b => b.email === user.email);
    const bookingCards = userBookings.length
      ? userBookings.map(b => {
        const sc = { 'Approved': 'emerald', 'Cancelled': 'red', 'Pending': 'amber' }[b.status] || 'blue';
        return `<div class="glass p-4 rounded-2xl border border-white/5">
                <div class="flex justify-between items-start mb-1">
                  <div class="font-bold text-sm text-white">${b.destination || 'Custom Trip'}</div>
                  <span class="text-[9px] px-2.5 py-0.5 rounded-full bg-${sc}-500/15 text-${sc}-400 border border-${sc}-500/20 font-bold uppercase">${b.status || 'Pending'}</span>
                </div>
                <div class="text-[11px] text-white/40 space-y-0.5">
                  <div><i class="fas fa-calendar mr-1"></i>${b.date || 'TBD'}</div>
                  <div><i class="fas fa-users mr-1"></i>${b.people || '—'} traveler(s)</div>
                </div>
              </div>`;
      }).join('')
      : `<div class="text-center py-6 text-white/20 text-xs"><i class="fas fa-calendar-xmark text-2xl block mb-2"></i>No bookings yet</div>`;

    document.getElementById('db-edit-overlay')?.remove();
    document.body.insertAdjacentHTML('beforeend', `
          <div id="db-edit-overlay" class="fixed inset-0 z-[110] flex items-center justify-center p-4" style="background:rgba(0,0,0,.85)">
            <div class="glass-dark rounded-[2rem] w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
              <button onclick="document.getElementById('db-edit-overlay').remove()" class="absolute top-5 right-5 text-white/40 hover:text-white"><i class="fas fa-times"></i></button>
              <div class="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1"><i class="fas fa-user mr-1"></i>User Profile</div>
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-2xl font-bold text-primary mb-3">
                ${(user.name || user.email || '?')[0].toUpperCase()}
              </div>
              <h3 class="text-xl font-bold text-white mb-0.5">${user.name || 'Unknown'}</h3>
              <p class="text-white/40 text-xs mb-6">${user.email || '—'}</p>

              <div class="glass rounded-2xl p-4 mb-6">${infoRows}</div>

              <div class="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">
                <i class="fas fa-calendar-check mr-1"></i>Bookings (${userBookings.length})
              </div>
              <div class="space-y-3">${bookingCards}</div>
            </div>
          </div>`);

    markRowAsViewed('users', user.email);
  };
}

function dbToggleAccess(email, currentlyAuthorized) {
  if (email === 'nimanthachamod86@gmail.com') return toast('Owner access cannot be revoked', '#f97316');
  if (confirm(`${currentlyAuthorized ? 'Revoke' : 'Grant'} DB access for ${email}?`)) {
    const tx = db.transaction('admins', 'readwrite');
    const store = tx.objectStore('admins');
    if (currentlyAuthorized) {
      store.delete(email).onsuccess = () => {
        toast(`Access Revoked for ${email}`, 'error'); // Forced RED as requested
        logAdminActivity(`Revoked admin access for ${email}`);
        loadDBStore('users');
        checkAdminNotifications();
        notifyOtherTabs();
      };
    } else {
      store.put({ email, role: 'viewer', addedAt: new Date().toISOString() }).onsuccess = () => {
        toast(`Access Granted to ${email} ✅`, 'error'); // Forced RED as requested
        logAdminActivity(`Granted admin access to ${email}`);
        loadDBStore('users');
        checkAdminNotifications();
        notifyOtherTabs();
      };
    }
  }
}

async function dbApprove(id) {
  if (!confirm('Approve this booking?')) return;
  const tx = db.transaction('bookings', 'readwrite');
  const store = tx.objectStore('bookings');
  const req = store.get(id);
  req.onsuccess = () => {
    const b = req.result;
    b.status = 'Approved';
    b.viewed = true; // Mark as read on interaction
    b.user_unread = true; // Mark for the user notification bell
    b.admin_touched = true; // Mark permanently for user history
    b.updatedAt = new Date().toISOString();
    store.put(b).onsuccess = () => {
      toast('Booking Approved Successfully! ✅', 'error'); // Forced RED as requested
      logAdminActivity(`Approved Booking ${id}`);
      checkAdminNotifications();
      notifyOtherTabs();
      showDBViewer('bookings');
    };
  };
}

function dbReply(idx) {
  const msg = _dbRowCache['messages'][idx];
  if (!msg) { toast('Message not found', 'error'); return; }

  document.getElementById('db-edit-overlay')?.remove();
  document.body.insertAdjacentHTML('beforeend', `
        <div id="db-edit-overlay" class="fixed inset-0 z-[110] flex items-center justify-center p-4" style="background:rgba(0,0,0,.85)">
          <div class="glass-dark rounded-[2rem] w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button onclick="document.getElementById('db-edit-overlay').remove()" class="absolute top-5 right-5 text-white/40 hover:text-white"><i class="fas fa-times"></i></button>
            <div class="text-accent text-[10px] font-black uppercase tracking-widest mb-1"><i class="fas fa-reply mr-1"></i>Reply to Message</div>
            <h3 class="text-xl font-bold mb-2 text-white">To: ${msg.name || 'User'}</h3>
            <p class="text-white/30 text-xs mb-6">${msg.email}</p>
            
            <div class="glass p-4 rounded-xl mb-6">
               <p class="text-[10px] uppercase text-white/40 mb-1">User Message:</p>
               <p class="text-sm text-white/80 border-l-2 border-accent/50 pl-2">"${msg.message || msg.msg || '...'}"</p>
            </div>
            
            <textarea id="admin-reply-text" rows="4" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent mb-6" placeholder="Type your reply here...">${msg.admin_reply || ''}</textarea>
            
            <div class="flex gap-3">
              <button onclick="submitAdminReply(${idx})"
                class="flex-1 bg-gradient-to-r from-accent to-primary py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all text-white">
                <i class="fas fa-paper-plane mr-2"></i>Send Reply
              </button>
              <button onclick="document.getElementById('db-edit-overlay').remove()"
                class="px-6 py-3 rounded-2xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-all text-white">Cancel</button>
            </div>
          </div>
        </div>`);
}

function submitAdminReply(idx) {
  const msg = _dbRowCache['messages'][idx];
  const replyText = document.getElementById('admin-reply-text').value.trim();
  if (!replyText) return toast('Please enter a reply', 'warning');

  const tx = db.transaction('messages', 'readwrite');
  const store = tx.objectStore('messages');
  const req = store.get(msg.id);
  req.onsuccess = () => {
    const m = req.result;
    m.admin_reply = replyText;
    m.viewed = true; // Mark as read on interaction
    m.user_unread = true; // Mark for user notification bell
    m.admin_touched = true; // Mark permanently for user history
    m.updatedAt = new Date().toISOString();
    store.put(m).onsuccess = () => {
      document.getElementById('db-edit-overlay')?.remove();
      toast('Reply Saved Successfully! ✅', 'success');
      logAdminActivity(`Replied to message from ${m.name}`);
      checkAdminNotifications();
      notifyOtherTabs();
      loadDBStore('messages');
    };
  };
}

function dbUpdate(storeName, rowIdx) {
  const row = _dbRowCache[storeName] && _dbRowCache[storeName][rowIdx];
  if (!row) { toast('Row not found', '#ef4444'); return; }

  const keyField = storeName === 'users' ? 'email' : 'id';
  const keyVal = row[keyField];

  // Build editable fields (skip password, id, updatedAt from display)
  const HIDDEN = new Set(['password', 'id', 'updatedAt', '_honey', '_template', '_captcha', '_subject']);
  const editKeys = Object.keys(row).filter(k => !HIDDEN.has(k));
  const fields = editKeys.map(k => {
    const val = row[k] ?? '';
    if (k === 'status') {
      return `<div>
            <label class="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-1">${k}</label>
            <select data-key="${k}" class="db-edit-field w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary">
              <option ${val === 'Pending' ? 'selected' : ''}>Pending</option>
              <option ${val === 'Approved' ? 'selected' : ''}>Approved</option>
              <option ${val === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>`;
    }
    return `<div>
          <label class="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-1">${k}</label>
          <input data-key="${k}" value="${String(val).replace(/"/g, '&quot;').replace(/</g, '&lt;')}"
            class="db-edit-field w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary" />
        </div>`;
  }).join('');

  // Remove any existing overlay first
  document.getElementById('db-edit-overlay')?.remove();

  // Store the save target in a global so dbSaveUpdate can pick it up
  window._dbPendingSave = { storeName, keyField, keyVal };

  document.body.insertAdjacentHTML('beforeend', `
        <div id="db-edit-overlay" class="fixed inset-0 z-[110] flex items-center justify-center p-4" style="background:rgba(0,0,0,.85)">
          <div class="glass-dark rounded-[2rem] w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button onclick="document.getElementById('db-edit-overlay').remove()" class="absolute top-5 right-5 text-white/40 hover:text-white"><i class="fas fa-times"></i></button>
            <div class="text-primary text-[10px] font-black uppercase tracking-widest mb-1"><i class="fas fa-pen mr-1"></i>Edit Record</div>
            <h3 class="text-xl font-bold mb-2 text-white">${storeName}</h3>
            <p class="text-white/30 text-xs mb-6">ID: ${keyVal}</p>
            <div class="space-y-4">${fields}</div>
            <div class="flex gap-3 mt-8">
              <button onclick="dbSaveUpdate()"
                class="flex-1 bg-gradient-to-r from-primary to-accent py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all">
                <i class="fas fa-save mr-2"></i>Save Changes
              </button>
              <button onclick="document.getElementById('db-edit-overlay').remove()"
                class="px-6 py-3 rounded-2xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </div>
        </div>`);
}

function dbSaveUpdate() {
  const { storeName, keyField, keyVal } = window._dbPendingSave || {};
  if (!storeName) { toast('Nothing to save', '#f97316'); return; }

  const fields = document.querySelectorAll('.db-edit-field');
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const req = store.get(keyVal);
  req.onsuccess = () => {
    const rec = req.result || {};
    const oldStatus = rec.status;
    fields.forEach(f => { rec[f.dataset.key] = f.value; });
    rec.updatedAt = new Date().toISOString();
    rec.viewed = true;

    // Notify user of any admin update to their booking/message/user profile
    if (storeName === 'bookings' || storeName === 'messages' || storeName === 'users') {
      rec.user_unread = true;
      rec.admin_touched = true; // Mark permanently for user history

      // If it's a user profile update, we need to push a system message because 
      // user profiles don't inherently show up in the user's notification list
      if (storeName === 'users' && rec.email) {
        const msgTx = db.transaction('messages', 'readwrite');
        msgTx.objectStore('messages').put({
          name: 'System',
          email: rec.email,
          interest: 'Profile Update',
          message: 'An Admin updated your profile details.',
          admin_reply: 'Profile Updated',
          user_unread: true,
          viewed: true,
          timestamp: new Date().toISOString()
        });
      }
    }

    const putReq = store.put(rec);
    putReq.onsuccess = () => {
      document.getElementById('db-edit-overlay')?.remove();
      toast('Record Updated Successfully! ✅', 'error');
      logAdminActivity(`Updated record in ${storeName}`);
      loadDBStore(storeName);
      _lastAdminTotal++; // Prevent immediate self-toast loop if logic changes
      checkAdminNotifications(true); // Silent update locally
      notifyOtherTabs();
    };
    putReq.onerror = () => toast('Save failed', '#ef4444');
  };
  req.onerror = () => toast('Failed to fetch record', '#ef4444');
}

async function trackBookings() {
  const email = document.getElementById('track-email').value.trim();
  if (!email) return toast('Please enter your booking email', '#f97316');

  const resContainer = document.getElementById('track-results');
  resContainer.innerHTML = '<div class="text-center py-8"><i class="fas fa-spinner fa-spin text-primary"></i> Searching...</div>';
  resContainer.classList.remove('hidden');

  const tx = db.transaction('bookings', 'readonly');
  const store = tx.objectStore('bookings');
  const req = store.getAll();

  req.onsuccess = () => {
    const bookings = req.result.filter(b => b.email === email);
    if (bookings.length > 0) {
      resContainer.innerHTML = `<div class="text-[10px] font-black uppercase text-primary mb-3">Found ${bookings.length} Bookings</div>` +
        bookings.reverse().map(b => `
              <div class="glass p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
                <div class="flex justify-between items-start mb-1">
                  <div class="font-bold text-sm text-white group-hover:text-primary transition-colors">${b.destination || 'Custom Trip'}</div>
                  <span class="text-[9px] px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase font-bold tracking-wider border border-primary/20">${b.status || 'Pending'}</span>
                </div>
                <div class="text-[11px] text-white/40 space-y-0.5">
                  <div><i class="fas fa-calendar mr-1"></i>${b.date || 'TBD'}</div>
                  <div><i class="fas fa-users mr-1"></i>${b.people || '—'} traveler(s)</div>
                </div>
              </div>
            `).join('');
    } else {
      resContainer.innerHTML = `
            <div class="text-center py-10 bg-white/5 rounded-[2rem]">
              <i class="fas fa-search text-white/10 text-4xl mb-4 block"></i>
              <p class="text-sm text-white/40 px-6">No bookings found for this email address.</p>
              <button onclick="closeTrackModal(); openModal()" class="mt-4 text-xs text-primary font-bold hover:underline">Start an Adventure instead?</button>
            </div>`;
    }
  };
}

// ── IndexedDB Setup ───────────────────────────────────────────
const DB_NAME = 'EkeketeDB', DB_VER = 3; // v3: admins store added
let db = null;

function initDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, DB_VER);
    r.onupgradeneeded = e => {
      const d = e.target.result;
      const storesToCreate = [
        { name: 'bookings', keyPath: 'id', autoIncrement: true },
        { name: 'newsletter', keyPath: 'id', autoIncrement: true },
        { name: 'searches', keyPath: 'id', autoIncrement: true },
        { name: 'messages', keyPath: 'id', autoIncrement: true },
        { name: 'users', keyPath: 'email', autoIncrement: false },
        { name: 'admin_activity', keyPath: 'id', autoIncrement: true }
      ];

      storesToCreate.forEach(storeConfig => {
        if (!d.objectStoreNames.contains(storeConfig.name)) {
          d.createObjectStore(storeConfig.name, {
            keyPath: storeConfig.keyPath,
            autoIncrement: storeConfig.autoIncrement
          });
        }
      });
      // admins store: keyPath = email
      if (!d.objectStoreNames.contains('admins')) {
        d.createObjectStore('admins', { keyPath: 'email' });
      }
    };
    r.onsuccess = e => {
      db = e.target.result;
      // Seed superadmin on first run
      const tx = db.transaction('admins', 'readwrite');
      tx.objectStore('admins').put({ email: 'nimanthachamod86@gmail.com', role: 'superadmin', addedAt: new Date().toISOString() });
      res(db);
    };
    r.onerror = e => rej(e.target.error);
  });
}

function save(store, data) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readwrite');
    const r = tx.objectStore(store).put({ ...data, updatedAt: new Date().toISOString() });
    r.onsuccess = () => {
      res(r.result);
      checkAdminNotifications(); // Real-time UI refresh
      notifyOtherTabs();

      // Prominent Alert for new items
      if (data.viewed === false) {
        const labels = {
          'bookings': 'New Booking Received! 📅',
          'messages': 'New Message Received! ✉️',
          'users': 'New User Registered! 👤',
          'newsletter': 'New Newsletter Subscriber! 📰'
        };
        if (labels[store]) toast(labels[store], 'success');
      }
    };
    r.onerror = () => rej(r.error);
  });
}

function get(store, key) {
  return new Promise((res, rej) => {
    const tx = db.transaction(store, 'readonly');
    const r = tx.objectStore(store).get(key);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

// ── Authentication Logic ──────────────────────────────────────
let currentUser = null;
let authMode = 'login'; // 'login' or 'signup'

function toggleAuthModal() {
  const m = document.getElementById('auth-modal');
  const isHidden = m.classList.contains('hidden');
  m.style.display = isHidden ? 'flex' : 'none';
  m.classList.toggle('hidden');
  document.body.style.overflow = isHidden ? 'hidden' : '';
  if (isHidden) switchAuthTab('login');
}

function switchAuthTab(tab) {
  authMode = tab;
  const isLogin = tab === 'login';
  document.getElementById('tab-login').className = `pb-3 text-sm font-bold border-b-2 ${isLogin ? 'border-primary text-white' : 'border-transparent text-white/50'}`;
  document.getElementById('tab-signup').className = `pb-3 text-sm font-bold border-b-2 ${!isLogin ? 'border-primary text-white' : 'border-transparent text-white/50'}`;
  document.getElementById('signup-fields').classList.toggle('hidden', isLogin);
  document.getElementById('auth-submit-btn').textContent = isLogin ? 'Login' : 'Create Account';
  document.getElementById('auth-switch-text').innerHTML = isLogin
    ? `Don't have an account? <a href="javascript:void(0)" onclick="switchAuthTab('signup')" class="text-primary hover:underline">Sign Up</a>`
    : `Already have an account? <a href="javascript:void(0)" onclick="switchAuthTab('login')" class="text-primary hover:underline">Login</a>`;

  // Toggle required for signup only fields
  document.getElementById('a-name').required = !isLogin;
}

async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('a-email').value;
  const pass = document.getElementById('a-pass').value;

  if (authMode === 'signup') {
    const existing = await get('users', email);
    if (existing) return toast('Email already registered!', '#f97316');

    const user = {
      email, pass,
      name: document.getElementById('a-name').value,
      phone: document.getElementById('a-phone').value || 'Not Provided',
      viewed: false
    };
    await save('users', user);
    toast(`New User signup: ${user.name}`, 'info'); // Admin facing notification
    logAdminActivity(`New user signed up: ${user.email}`);
    toast('Registration successful! Welcome.', '#10b981');
    loginUser(user);
  } else {
    const user = await get('users', email);
    if (!user || user.pass !== pass) return toast('Invalid email or password.', '#ef4444');
    toast(`Welcome back, ${user.name || 'User'}!`, '#10b981');
    loginUser(user);
  }
}

async function loginUser(user) {
  currentUser = user;
  // Check if admin
  const adminRec = await get('admins', user.email);
  if (adminRec || user.email === 'nimanthachamod86@gmail.com') {
    currentUser.isAdmin = true;
  }
  localStorage.setItem('ekekete_session', JSON.stringify({ email: user.email }));
  updateAuthUI();
  toggleAuthModal();
  // Only broadcast login if it changes state significantly, but generally notifyOtherTabs() helps sync UI
  notifyOtherTabs();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('ekekete_session');
  updateAuthUI();
  if (!document.getElementById('profile-modal').classList.contains('hidden')) toggleProfileModal();
  toast('Logged out successfully.', '#0ea5e9');
}

async function checkAuth() {
  const session = localStorage.getItem('ekekete_session');
  if (session) {
    const { email } = JSON.parse(session);
    const user = await get('users', email);
    if (user) {
      currentUser = user;
      const adminRec = await get('admins', user.email);
      if (adminRec || user.email === 'nimanthachamod86@gmail.com') {
        currentUser.isAdmin = true;
      }
      updateAuthUI();
    }
  }
}

function updateAuthUI() {
  const loggedIn = !!currentUser;
  document.getElementById('signin-btn').classList.toggle('hidden', loggedIn);
  document.getElementById('mob-signin-btn').parentElement.classList.toggle('hidden', loggedIn);

  document.getElementById('profile-btn').classList.toggle('hidden', !loggedIn);
  document.getElementById('mob-profile-btn').parentElement.classList.toggle('hidden', !loggedIn);

  const isAdmin = isUserAdmin();

  const adminNavDropdown = document.getElementById('nav-dropdown-wrapper');
  const mobAdminNav = document.getElementById('mob-admin-nav-item');
  if (adminNavDropdown) {
    adminNavDropdown.style.display = isAdmin ? 'block' : 'none';
    if (mobAdminNav) mobAdminNav.classList.toggle('hidden', !isAdmin);
    if (isAdmin) checkAdminNotifications();
  }

  // owner restricted badge
  const dbBadge = document.getElementById('db-badge');
  if (dbBadge) {
    const owner = isOwner();
    dbBadge.classList.toggle('hidden', !owner);
    if (owner) {
      dbBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block group-hover:animate-pulse"></span>IndexedDB connected <i class="fas fa-table ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[9px]"></i>';
    }
  }

  const userNavDropdown = document.getElementById('user-dropdown-wrapper');
  const mobUserNav = document.getElementById('mob-user-nav-item');
  if (userNavDropdown) {
    if (loggedIn && !isAdmin) {
      userNavDropdown.classList.remove('hidden');
      if (mobUserNav) mobUserNav.classList.remove('hidden');
      checkUserNotifications();
    } else {
      userNavDropdown.classList.add('hidden');
      if (mobUserNav) mobUserNav.classList.add('hidden');
    }
  }

  if (loggedIn) {
    const name = currentUser.name || 'Profile';
    document.getElementById('user-display-name').textContent = name.split(' ')[0];
    document.getElementById('p-name').textContent = currentUser.name;
    document.getElementById('p-email').textContent = currentUser.email;
    document.getElementById('p-phone').textContent = currentUser.phone;
    document.getElementById('p-avatar').textContent = name.charAt(0).toUpperCase();

    // Count and list user bookings
    const tx = db.transaction('bookings', 'readonly');
    const store = tx.objectStore('bookings');
    const req = store.getAll();
    req.onsuccess = () => {
      const userBookings = req.result.filter(b => b.email === currentUser.email);
      const uBk = userBookings.length;
      document.getElementById('p-bookings').textContent = `${uBk} Total Booking${uBk !== 1 ? 's' : ''}`;

      const list = document.getElementById('p-bookings-list');
      if (uBk > 0) {
        const bookingCards = userBookings.reverse().map(b => `
              <div class="glass p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
                <div class="flex justify-between items-start mb-2">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-white group-hover:text-primary transition-colors">${b.destination || 'Custom Trip'}</span>
                    <span class="text-[10px] text-white/40"><i class="fas fa-id-badge mr-1"></i>Booking ID: #${Math.floor(Math.random() * 9000) + 1000}</span>
                  </div>
                  <span class="text-[9px] px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase font-bold tracking-wider border border-primary/20">${b.status || 'Pending'}</span>
                </div>
                <div class="flex items-center gap-4 mt-1 border-t border-white/5 pt-3">
                  <span class="flex items-center gap-1.5 text-[10px] text-white/50"><i class="fas fa-calendar-day text-primary/70"></i>${b.date || 'TBD'}</span>
                  <span class="flex items-center gap-1.5 text-[10px] text-white/50"><i class="fas fa-user-friends text-primary/70"></i>${b.people || '1'} People</span>
                </div>
                ${b.admin_reply ? `
                  <div class="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <p class="text-[10px] font-black uppercase tracking-widest text-primary mb-1"><i class="fas fa-comment-dots mr-1"></i>Admin Reply</p>
                    <p class="text-[11px] text-white/80 leading-relaxed italic">"${b.admin_reply}"</p>
                  </div>
                ` : ''}
              </div>
            `).join('');

        // FETCH USER MESSAGES TOO
        const msgTx = db.transaction('messages', 'readwrite');
        const msgStore = msgTx.objectStore('messages');
        msgStore.getAll().onsuccess = (e2) => {
          const allMsgs = e2.target.result || [];
          const userMsgs = allMsgs.filter(m => m.email === currentUser.email);

          let msgHtml = '';
          if (userMsgs.length > 0) {
            msgHtml = `
                    <div class="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 mt-8">
                       <i class="fas fa-comment-alt mr-1"></i>My Messages (${userMsgs.length})
                    </div>
                    <div class="space-y-3">
                       ${userMsgs.reverse().map(m => `
                          <div class="glass p-4 rounded-2xl border border-white/5">
                             <p class="text-[11px] text-white/80 mb-2">"${m.message || m.msg}"</p>
                             ${m.admin_reply ? `
                                <div class="p-3 rounded-xl bg-accent/10 border border-accent/20">
                                   <p class="text-[9px] font-black uppercase tracking-widest text-accent mb-1">Reply from Admin</p>
                                   <p class="text-[11px] text-white/70 italic">"${m.admin_reply}"</p>
                                </div>
                             ` : `<div class="text-[9px] text-white/20 italic">Waiting for reply...</div>`}
                          </div>
                       `).join('')}
                    </div>
                 `;

            // Mark messages as read
            // (Reverted unread logic)
            checkAdminNotifications();
          }

          list.innerHTML = `
                <div class="space-y-4">
                  <div class="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">
                    <i class="fas fa-calendar-check mr-1"></i>My Bookings (${userBookings.length})
                  </div>
                  <div class="space-y-3">${bookingCards}</div>
                  ${msgHtml}
                </div>
              `;
        };
      } else {
        list.innerHTML = `
              <div class="text-center py-6">
                <i class="fas fa-box-open text-white/10 text-3xl mb-3 block"></i>
                <p class="text-xs text-white/30 italic">No bookings found yet.</p>
              </div>`;
      }
    };
  }
}

function toggleProfileModal() {
  const m = document.getElementById('profile-modal');
  const isHidden = m.classList.contains('hidden');
  m.style.display = isHidden ? 'flex' : 'none';
  m.classList.toggle('hidden');
  document.body.style.overflow = isHidden ? 'hidden' : '';
}

// ── Toast ─────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  const i = document.getElementById('toast-icon');

  const config = {
    success: { bg: 'rgba(16, 185, 129, 0.95)', icon: 'fa-check-circle', color: '#10b981' },
    error: { bg: 'rgba(239, 68, 68, 0.95)', icon: 'fa-exclamation-triangle', color: '#ef4444' },
    warning: { bg: 'rgba(249, 115, 22, 0.95)', icon: 'fa-exclamation-circle', color: '#f97316' },
    info: { bg: 'rgba(14, 165, 233, 0.95)', icon: 'fa-info-circle', color: '#0ea5e9' }
  }[type] || { bg: 'rgba(14, 165, 233, 0.95)', icon: 'fa-info-circle', color: '#0ea5e9' };

  t.style.background = config.bg;
  m.textContent = msg;
  i.innerHTML = `<i class="fas ${config.icon}"></i>`;

  t.classList.add('show');

  // Notification Sound
  try {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => { });
  } catch (e) { }

  if (window._toastTimeout) clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => t.classList.remove('show'), 4000);
}

// ── Navbar scroll ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const n = document.getElementById('nav');
  window.scrollY > 60 ? n.classList.add('glass-dark') : n.classList.remove('glass-dark');
});

// ── Search ────────────────────────────────────────────────────
async function doSearch() {
  const dest = document.getElementById('s-dest').value.trim();
  if (!dest) { toast('Please enter a destination!', '#f97316'); return; }
  await save('searches', { destination: dest, date: document.getElementById('s-date').value, people: document.getElementById('s-ppl').value, viewed: false }).catch(() => { });
  toast(`Searching "${dest}"... ✈️`, '#0ea5e9');
  setTimeout(() => document.getElementById('dests').scrollIntoView({ behavior: 'smooth' }), 700);
}

function logAdminActivity(actionText) {
  if (!db || !db.objectStoreNames.contains('admin_activity')) return;
  try {
    const tx = db.transaction('admin_activity', 'readwrite');
    const store = tx.objectStore('admin_activity');
    store.add({
      action: actionText,
      timestamp: new Date().toISOString(),
      viewed: false // This makes it trigger the red badge
    });
  } catch (e) {
    console.error('Failed to log admin activity', e);
  }
}

// ── Detail Modal ─────────────────────────────────────────────
const tourData = {
  'America': {
    loc: 'United States',
    img: 'images/America.jpg',
    days: 10, nights: 9,
    fullTitle: 'Coast to Coast Adventure',
    rating: '4.8',
    desc: 'The United States is a vast country offering an incredible diversity of landscapes and experiences. From the bustling streets of New York City and the historical landmarks of Washington D.C. to the natural majesty of the Grand Canyon and the entertainment hubs of Los Angeles, there is something for every traveler. Explore the vibrant culture, world-class museums, and stunning national parks that make the USA a premier global destination. Journey through the rugged beauty of the Rocky Mountains, relax on the sun-drenched beaches of Florida, or experience the unique charm of the southern states. Each region offers its own distinct flavor, ensuring an unforgettable adventure across the continent.',
    itinerary: [{ day: 1, title: 'Arrival', content: 'Arrive in New York City and check into your hotel near Times Square.' }, { day: 2, title: 'Sightseeing', content: 'Explore the Statue of Liberty and Central Park.' }],
    gallery: ['images/America.jpg'],
    highlightTitle: 'Iconic Landmarks',
    highlightDesc: 'Visit the Statue of Liberty and the Grand Canyon.'
  },
  'France': {
    loc: 'Western Europe',
    img: 'images/France.jpg',
    days: 7, nights: 6,
    fullTitle: 'Lumiere & Elegance',
    rating: '4.9',
    desc: 'France is the epitome of romance, elegance, and cultural refinement. Paris, the City of Light, beckons with icons like the Eiffel Tower, the Louvre, and charming bistros along the Seine. Beyond the capital, the French countryside offers breathtaking beauty, from the sun-soaked vineyards of Bordeaux and Burgundy to the glamorous beaches of the French Riviera. Discover the historic châteaux of the Loire Valley, the rugged charm of Normandy, and the majestic peaks of the French Alps. Immerse yourself in a world of fine art, world-renowned cuisine, and centuries-old traditions that continue to inspire travelers from around the globe. France promises a journey of sophisticated discovery and timeless beauty.',
    itinerary: [{ day: 1, title: 'Arrival', content: 'Arrive in Paris and enjoy a romantic evening by the Seine.' }, { day: 2, title: 'The Louvre', content: 'Full day exploring the Louvre and surrounding areas.' }],
    gallery: ['images/France.jpg'],
    highlightTitle: 'City of Light',
    highlightDesc: 'Explore the Louvre and the Eiffel Tower.'
  },
  'Japan': {
    loc: 'East Asia',
    img: 'images/Japan.jpg',
    days: 8, nights: 7,
    fullTitle: 'Nippon Explorer',
    rating: '4.9',
    desc: 'Japan is a land of fascinating contrasts, where ancient traditions coexist harmoniously with cutting-edge technology. Experience the serene beauty of Kyoto’s historic temples and Zen gardens, then dive into the vibrant energy and futuristic neon lights of Tokyo. Marvel at the iconic silhouette of Mount Fuji, explore the cultural riches of Nara, and savor the world-class culinary delights of Osaka. From the snow-capped peaks of Hokkaido to the tropical islands of Okinawa, Japan offers a sensory journey like no other. Discover the art of the tea ceremony, the excitement of a sumo match, and the impeccable hospitality of a traditional ryokan. It is a destination that captures the heart and mind with its unique blend of heritage and modernity.',
    itinerary: [{ day: 1, title: 'Arrival', content: 'Arrive in Tokyo and experience the bustling Shibuya crossroads.' }, { day: 2, title: 'Mount Fuji', content: 'Take a bullet train journey to witness the majestic Mount Fuji.' }],
    gallery: ['images/Japan.jpg'],
    highlightTitle: 'Cultural Fusion',
    highlightDesc: 'Experience ancient temples and futuristic technology.'
  },
  'Switzerland': {
    loc: 'Central Europe',
    img: 'images/Switzeland_new.jpg',
    days: 8, nights: 7,
    fullTitle: 'Alpine Wonders Tour',
    rating: '5.0',
    desc: 'Switzerland is a masterpiece of natural beauty, renowned for its breathtaking alpine scenery and pristine landscapes. Experience the awe-inspiring majesty of the Matterhorn in Zermatt, explore the crystal-clear waters of Lake Geneva, and wander through the charming streets of Lucerne. The Swiss Alps offer world-class skiing and hiking opportunities, while the country’s picturesque mountain villages provide a tranquil escape with their timeless charm. Discover the sophistication of Zurich and Geneva, and experience the legendary efficiency and hospitality that Switzerland is famous for. Whether you are seeking outdoor adventure or quiet relaxation amidst stunning vistas, Switzerland offers an unparalleled travel experience in the heart of Europe.',
    itinerary: [{ day: 1, title: 'Arrival', content: 'Arrive in Zurich and transfer to your mountain resort.' }, { day: 2, title: 'Alpine Tour', content: 'Ride the Glacier Express for astonishing views.' }],
    gallery: ['images/Switzeland_new.jpg'],
    highlightTitle: 'Snowy Peaks',
    highlightDesc: 'Experience the magic of the Swiss Alps with premium views.'
  },
  'Indonesia': {
    loc: 'Southeast Asia',
    img: 'images/Indonisiya.jpg',
    days: 7, nights: 6,
    fullTitle: 'Bali & Java Expedition',
    rating: '4.7',
    desc: 'Indonesia is a vast and diverse archipelago of over 17,000 islands, each offering its own unique charm and natural wonders. Bali, the Island of the Gods, is world-famous for its stunning beaches, lush terraced rice fields, and vibrant Hindu culture. Discover the ancient Buddhist temple of Borobudur in Java, encounter the legendary Komodo dragons on their native islands, and explore the underwater paradise of Raja Ampat. From the smoking volcanoes of Sumatra to the traditional villages of Sulawesi, Indonesia is a land of endless exploration. Immerse yourself in the warm hospitality of the local people, savor the spicy flavors of Indonesian cuisine, and lose yourself in the breathtaking beauty of this tropical paradise.',
    itinerary: [{ day: 1, title: 'Arrival', content: 'Welcome to Indonesia. Transfer to your resort and enjoy a sunset dinner.' }, { day: 2, title: 'Bali Temples', content: 'Visit Uluwatu and Tanah Lot temples.' }],
    gallery: ['images/Indonisiya.jpg'],
    highlightTitle: 'Cultural Heartland',
    highlightDesc: 'Witness the spiritual essence of Bali and its stunning natural beauty.'
  },
  'Turkey': {
    loc: 'Transcontinental',
    img: 'images/Turkey.webp',
    days: 6, nights: 5,
    fullTitle: 'Sultan Discovery',
    rating: '4.8',
    desc: 'Turkey is a land where East meets West, offering a rich tapestry of history, culture, and natural beauty. Istanbul, the vibrant metropolis spanning two continents, is home to architectural marvels like the Hagia Sophia and the Blue Mosque. Journey to Cappadocia to witness its unique "fairy chimney" rock formations and experience a magical hot air balloon ride at sunrise. Explore the ancient ruins of Ephesus, relax on the turquoise waters of the Aegean and Mediterranean coasts, and indulge in the world-renowned flavors of Turkish cuisine. From the bustling bazaars of Istanbul to the thermal pools of Pamukkale, Turkey provides a captivating journey through centuries of civilization and breathtaking landscapes.',
    itinerary: [{ day: 1, title: 'Arrival', content: 'Arrive in Istanbul and visit the historic Sultanahmet district.' }, { day: 2, title: 'Cappadocia', content: 'Take a hot air balloon ride over the fairy chimneys at sunrise.' }],
    gallery: ['images/Turkey.webp'],
    highlightTitle: 'Crossroads of History',
    highlightDesc: 'Witness the architectural marvels of Istanbul and Cappadocia.'
  }
};


const serviceData = {
  'Custom Itineraries': {
    img: 'images/service_itinerary.jpg',
    desc: 'We believe no two travelers are the same. Our experts work one-on-one with you to craft a unique journey that matches your pace, interests, and dietary needs. Whether you want a culinary tour or a photography-focused expedition, we build it from scratch.',
    list: ['One-on-one consultation', 'Pace-specific planning', 'Expert local advice', 'Accommodation matching']
  },
  'Chauffeur Guides': {
    img: 'images/service_chauffeur.jpg',
    desc: 'Our chauffeurs are more than just drivers; they are licensed guides with years of experience and deep roots in the island. They provide safety, comfort, and local insights that you won\'t find in any guidebook. All vehicles are modern, air-conditioned, and premium.',
    list: ['Licensed professional guides', 'Premium SUV/Sedan vehicles', '24/7 on-call availability', 'Local secret spots access']
  },
  'Boutique Stays': {
    img: 'images/service_stay.jpg',
    desc: 'We have pre-vetted the finest accommodations in the country. From restored 200-year-old Dutch villas to modern architectural marvels nested in the jungle, we ensure your stay is as memorable as the destination itself.',
    list: ['Heritage bungalow stays', 'Private jungle villas', 'Eco-luxury resorts', 'VIP room upgrades']
  },
  'Nature Safaris': {
    img: 'images/service_safari.jpg',
    desc: 'Sri Lanka is a biodiversity hotspot. We organize private safaris with specialized trackers who know the movement of leopards, elephants, and bears. We also offer guided trekking in the Knuckles Range and Sinharaja Forest.',
    list: ['Private 4x4 Jeep Safaris', 'Specialized wildlife trackers', 'Night trekking options', 'Bird watching expeditions']
  },
  'Event Planning': {
    img: 'images/service_event.jpg',
    desc: 'Let the stunning backdrop of Sri Lanka be the host for your special moments. We specialize in intimate beach weddings, traditional Kandyan-style ceremonies, and high-end corporate retreats in the hill country.',
    list: ['Destination weddings', 'Corporate retreats', 'Special anniversary setups', 'Traditional decor & catering']
  },
  '24/7 Support': {
    img: 'images/service_support.jpg',
    desc: 'Travel with total confidence. Our dedicated concierge team is available round-the-clock via WhatsApp or phone to handle any on-trip requests, changes, or emergencies instantly.',
    list: ['Live WhatsApp concierge', 'Emergency coordination', 'Real-time booking changes', 'Local assistance on-ground']
  }
};




function switchTab(tab) {
  document.querySelectorAll('#detail-modal .tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`tab-${tab}`).classList.remove('hidden');

  document.querySelectorAll('#detail-modal [id^="tab-btn-"]').forEach(el => {
    el.classList.remove('border-primary', 'text-primary');
    el.classList.add('border-transparent', 'text-white/30');
  });
  const btn = document.getElementById(`tab-btn-${tab}`);
  if (btn) {
    btn.classList.add('border-primary', 'text-primary');
    btn.classList.remove('border-transparent', 'text-white/30');
  }
}

function openDetailModal(id) {
  const data = tourData[id];
  if (!data) return;
  document.getElementById('d-img-complex').src = data.img;
  document.getElementById('d-title-complex').textContent = id;
  document.getElementById('d-about-heading-complex').textContent = `About ${id}`;

  // Map - dynamically load interactive Google Map (tour-specific)
  const mapContent = document.getElementById('map-content');
  if (mapContent) {
    const mapSrc = data.mapUrl || 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d507228.0907092791!2d79.64255772172133!3d6.681634447806325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!3m2!1d6.9270786!2d79.861243!4m5!1s0x3ae22e900168ca21%3A0x96c438f00a68c060!2sBentota!3m2!1d6.4187604!2d80.002455!5e0!3m2!1sen!2slk!4v1773383287318!5m2!1sen!2slk';
    mapContent.innerHTML = `
                    <div class="w-full max-w-5xl h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group/map mx-auto">
                        <iframe 
                            src="${mapSrc}" 
                            class="w-full h-full border-0 grayscale-[0.2] contrast-[1.1]" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div class="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl"></div>
                    </div>
                `;
  }
  document.getElementById('d-loc-complex').textContent = data.loc;
  document.getElementById('d-days').textContent = data.days || 1;
  document.getElementById('d-nights').textContent = data.nights || 0;

  document.getElementById('d-full-title').textContent = data.fullTitle;
  document.getElementById('d-long-desc').textContent = data.desc;

  const sideGal = document.getElementById('side-gallery');
  if (sideGal) {
    sideGal.innerHTML = '';
    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach(img => {
        sideGal.innerHTML += `
                        <div class="aspect-square rounded-xl overflow-hidden border border-white/5 group/gal relative">
                            <img src="${img}" class="w-full h-full object-cover transition-transform duration-500 group-hover/gal:scale-110" />
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/gal:opacity-100 transition-opacity flex items-center justify-center">
                                <i class="fas fa-search-plus text-white text-xs"></i>
                            </div>
                        </div>
                    `;
      });
    }
  }

  const hWrap = document.getElementById('highlights-wrapper');
  if (hWrap) {
    let html = '';
    if (data.highlightTitle) {
      html += `
                    <div class="mt-2">
                        <h4 class="text-sm font-black uppercase tracking-widest text-primary mb-4">${data.highlightTitle}</h4>
                        <div class="glass-dark p-5 rounded-2xl border border-white/10 flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <i class="fas fa-star text-primary"></i>
                            </div>
                            <p class="text-white/70 text-sm leading-relaxed">${data.highlightDesc}</p>
                        </div>
                    </div>
                `;
    }
    hWrap.innerHTML = html;
  }

  document.getElementById('enquiry-trip-name').textContent = id;

  const iList = document.getElementById('itinerary-list');
  iList.innerHTML = '';
  // Remove nested scrollbar: Use main modal scrollbar
  iList.className = "flex flex-col gap-1.5 pb-32";

  if (data.itinerary) {
    data.itinerary.forEach(day => {
      iList.innerHTML += `
                    <div class="glass-dark border border-white/5 overflow-hidden group/item mb-1.5">
                        <button onclick="window.toggleItineraryDay(this)" 
                            class="w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-white/5 transition-all">
                            <div class="flex items-center gap-3">
                                <span class="text-[13px] font-medium text-white/90">${day.title}</span>
                            </div>
                            <i class="fas fa-chevron-down text-[8px] text-white/20 transition-transform"></i>
                        </button>
                        <div class="itinerary-content px-4 py-2 border-t border-white/5 bg-white/[0.01] text-[12px] text-white/50 leading-relaxed hidden">
                            ${day.content}
                        </div>
                    </div>
                `;
    });
  }

  switchTab('overview');
  document.getElementById('detail-modal').style.display = 'flex';
  document.getElementById('detail-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Reset Expand All Logic
  const expandToggle = document.getElementById('expand-itinerary');
  if (expandToggle) {
    expandToggle.checked = false;
    expandToggle.onchange = (e) => window.updateExpandAll(e.target);
  }
}

// Robust Global Itinerary Functions
window.toggleItineraryDay = function(btn) {
    const content = btn.nextElementSibling;
    const isHidden = content.classList.contains('hidden');
    const expandAllToggle = document.getElementById('expand-itinerary');

    if (isHidden) {
        // If not in "Expand All" mode, close other open items (Accordion)
        if (!expandAllToggle || !expandAllToggle.checked) {
            document.querySelectorAll('#itinerary-list .itinerary-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('#itinerary-list .fa-chevron-down').forEach(el => el.classList.remove('rotate-180'));
        }
        content.classList.remove('hidden');
        btn.querySelector('.fa-chevron-down').classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        btn.querySelector('.fa-chevron-down').classList.remove('rotate-180');
        if (expandAllToggle && expandAllToggle.checked) {
            expandAllToggle.checked = false;
        }
    }
};

window.updateExpandAll = function(checkbox) {
    const sections = document.querySelectorAll('#itinerary-list .itinerary-content');
    const arrows = document.querySelectorAll('#itinerary-list .fa-chevron-down');
    sections.forEach(s => {
        if (checkbox.checked) s.classList.remove('hidden');
        else s.classList.add('hidden');
    });
    arrows.forEach(a => {
        if (checkbox.checked) a.classList.add('rotate-180');
        else a.classList.remove('rotate-180');
    });
};

function openServiceModal(id) {
  const data = serviceData[id];
  if (!data) return;
  document.getElementById('d-img').src = data.img || 'images/sigiriya.jpg';
  document.getElementById('d-title').textContent = id;
  document.getElementById('d-loc').textContent = 'Our Service';
  document.getElementById('d-about-heading').textContent = 'ABOUT OUR SERVICE';
  document.getElementById('d-desc').textContent = data.desc;

  document.getElementById('book-btn').textContent = 'Inquire More';
  document.getElementById('book-btn').onclick = () => { closeServiceModal(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); };
  document.getElementById('service-modal').style.display = 'flex';
  document.getElementById('service-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  document.getElementById('detail-modal').style.display = 'none';
  document.getElementById('detail-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function closeServiceModal() {
  document.getElementById('service-modal').style.display = 'none';
  document.getElementById('service-modal').classList.add('hidden');
  document.getElementById('book-btn').textContent = 'Book Now';
  document.body.style.overflow = '';
}

// ── Modal ─────────────────────────────────────────────────────
function openModal(dest = '') {
  document.getElementById('b-dest').value = dest;
  if (currentUser) {
    document.getElementById('b-name').value = currentUser.name || '';
    document.getElementById('b-email').value = currentUser.email || '';
    document.getElementById('b-phone').value = currentUser.phone !== 'Not Provided' ? currentUser.phone : '';
  }
  const m = document.getElementById('modal');
  m.style.display = 'flex'; m.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const m = document.getElementById('modal');
  m.style.display = 'none'; m.classList.add('hidden');
  document.body.style.overflow = '';
}

// ── Booking ───────────────────────────────────────────────────
async function submitBooking(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('b-btn');
  const btnText = document.getElementById('b-btn-text');

  // Read form values directly
  const b = {
    name: document.getElementById('b-name').value.trim(),
    email: document.getElementById('b-email').value.trim(),
    phone: document.getElementById('b-phone').value.trim(),
    destination: document.getElementById('b-dest').value.trim(),
    date: document.getElementById('b-date').value,
    people: document.getElementById('b-ppl').value,
    status: 'Pending',
    viewed: false,
    timestamp: new Date().toISOString()
  };

  if (!b.name || !b.email) {
    toast('Please enter your name and email.', 'error');
    return;
  }

  btn.disabled = true;
  btnText.textContent = 'Sending...';
  toast('Confirming booking...', 'info');

  // 1. Save to IndexedDB (always happens first)
  let id;
  try {
    id = await save('bookings', b);
    checkAdminNotifications();
  } catch (dbErr) {
    console.error('DB save error:', dbErr);
    toast('Error saving booking. Please try again.', 'error');
    btn.disabled = false;
    btnText.textContent = 'Confirm Booking';
    return;
  }

  // 2. Send Emails (Parallel)
  const ownerParams = {
    from_name: b.name,
    from_email: b.email,
    to_name: 'Ekeketetours Team',
    to_email: 'nimanthachamod86@gmail.com',
    destination: b.destination || 'Not specified',
    message: `New Booking Request!\nName: ${b.name}\nEmail: ${b.email}\nPhone: ${b.phone || 'N/A'}\nDest: ${b.destination || 'N/A'}\nDate: ${b.date || 'N/A'}\nPeople: ${b.people || 'N/A'}\nID: #${id}`,
    reply_to: b.email
  };

  const customerParams = {
    name: b.name,
    email: b.email,
    title: b.destination || 'your trip',
    date: b.date || 'TBD',
    people: b.people || '—',
    phone: b.phone || '—',
    booking_id: String(id)
  };

  Promise.allSettled([
    emailjs.send('service_s7kzv5g', 'template_asf8jxv', ownerParams),
    emailjs.send('service_s7kzv5g', 'template_mhs62hl', customerParams)
  ]).then((results) => {
    const [ownerRes, customerRes] = results;
    if (customerRes.status === 'rejected') {
      const errMsg = customerRes.reason?.text || customerRes.reason || 'Email failed';
      toast('Auto-reply error: ' + errMsg, 'error');
    } else {
      toast(`Booking #${ id } Confirmed! ✅`, 'success');
    }
  });

  // 3. Always show UI success and close
  closeModal();
  form.reset();
  btn.disabled = false;
  btnText.textContent = 'Confirm Booking';
}

// ── Newsletter ────────────────────────────────────────────────
async function subscribeNL(e) {
  e.preventDefault();
  const email = document.getElementById('nl-email').value;
  try {
    await save('newsletter', { email, viewed: false });
    toast('🎉 Subscribed! Watch for exclusive deals.', '#10b981');
    document.getElementById('nl-email').value = '';
  } catch { toast('Error subscribing.', '#f97316'); }
}

// ── Contact form ─────────────────────────────────────────────
async function sendMsg(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('c-btn');
  const btnText = document.getElementById('c-btn-text');
  const trouble = document.getElementById('c-trouble');

  // Read inputs directly (avoid FormData hidden field junk)
  const m = {
    name: document.getElementById('c-name').value.trim(),
    email: document.getElementById('c-email').value.trim(),
    interest: document.getElementById('c-dest').value.trim(),
    message: document.getElementById('c-msg').value.trim(),
    viewed: false,
    timestamp: new Date().toISOString()
  };

  if (!m.name || !m.email) {
    toast('Please enter your name and email.', 'error');
    return;
  }

  // Save local backup
  try { await save('messages', m); } catch (err) { console.error('Local save error:', err); }

  // UI Feedback
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  toast('Sending message...', 'info');

  // 2. Send Emails (Parallel)
  const ownerParams = {
    from_name: m.name,
    from_email: m.email,
    to_name: 'Ekeketetours Team',
    to_email: 'nimanthachamod86@gmail.com',
    destination: m.interest || 'Not specified',
    message: m.message || 'No message provided',
    reply_to: m.email
  };

  const customerParams = {
    name: m.name,
    email: m.email,
    title: m.interest || 'your message',
    msg: m.message || '—',
    date: 'N/A',
    people: 'N/A',
    status: 'Received',
    phone: '—',
    timestamp: new Date().toLocaleString()
  };

  Promise.allSettled([
    emailjs.send('service_s7kzv5g', 'template_asf8jxv', ownerParams),
    emailjs.send('service_s7kzv5g', 'template_mhs62hl', customerParams)
  ]).then((results) => {
    const ownerResult = results[0];
    const customerResult = results[1];

    if (ownerResult.status === 'fulfilled') {
      toast('Message Sent! ✅', 'success');
      form.reset();
      checkAdminNotifications();
      btnText.textContent = 'Message Sent!';
    } else {
      const errMsg = ownerResult.reason?.text || ownerResult.reason?.message || 'Check connection';
      toast('Error sending message: ' + errMsg, 'error');
      trouble.classList.remove('hidden');
      btnText.textContent = 'Try Again';
    }

    if (customerResult.status === 'rejected') {
      console.error('Auto-reply failed:', customerResult.reason);
      showTopNotification('Auto-reply could not be sent, but your message reached us.', 'info');
    }

    setTimeout(() => { btn.disabled = false; if (btnText.textContent !== 'Message Sent!') btnText.textContent = 'Send Message'; }, 3000);
  });
}

function manualActivate(email) {
  const form = document.querySelector('#contact form');
  form.action = `https://formsubmit.co/${email}`;
      form.removeAttribute('onsubmit'); // Switch to regular submission
      form.submit();
      showTopNotification('Redirecting for activation...', 'info');
    }

    // ── Blog Modal Logic ──────────────────────────────────────────
    // ── Blog Data (Rich Content) ──────────────────────────────────
    const blogData = [
      { tag: 'Asia', title: 'Japan: Ancient Traditions & Future Neon', img: 'images/Japan.jpg', desc: 'Experience the unique harmony of serene temples and cutting-edge technology in the Land of the Rising Sun.', intro: 'Japan is a land of fascinating contrasts, where ancient traditions coexist harmoniously with cutting-edge technology. From the peaceful Zen gardens of Kyoto to the vibrant, neon-lit streets of Tokyo, it offers a sensory journey like no other.', points: ['Explore the historic temples and tea houses of Kyoto.', 'Experience the futuristic energy of Tokyo\'s Shibuya and Shinjuku.', 'Witness the iconic majesty of Mount Fuji from Hakone.', 'Savor world-class culinary delights from sushi to ramen.', 'Navigate with ease using the legendary Shinkansen bullet trains.', 'Relax in traditional onsens (hot springs) in beautiful landscapes.'], outro: 'Japan captures the heart with its unique blend of heritage and modernity, leaving every traveler inspired.' },
      { tag: 'Europe', title: 'Switzerland: Alpine Peaks & Pristine Lakes', img: 'images/Switzeland_new.jpg', desc: 'Discover the breathtaking majesty of the Swiss Alps and the tranquil beauty of crystal-clear mountain lakes.', intro: 'Switzerland is a masterpiece of natural beauty, renowned for its breathtaking alpine scenery and pristine landscapes. It is a haven for outdoor enthusiasts and those seeking peace amidst stunning mountain vistas.', points: ['Marvel at the awe-inspiring Matterhorn in Zermatt.', 'Explore the mountain-framed shores of Lake Lucerne and Lake Geneva.', 'Journey on the world-famous Glacier Express for scenic views.', 'Visit charming alpine villages with timeless architecture.', 'Indulge in world-renowned Swiss chocolates and cheeses.', 'Experience luxury and efficiency in cities like Zurich and Geneva.'], outro: 'Switzerland offers an unparalleled travel experience defined by its majestic nature and impeccable hospitality.' },
      { tag: 'Asia', title: 'Indonesia: Island Paradises & Vibrant Culture', img: 'images/Indonisiya.jpg', desc: 'Journey through a diverse archipelago of emerald islands, lush rainforests, and ancient spiritual traditions.', intro: 'Indonesia is a vast archipelago of over 17,000 islands, offering endless cultural diversity and natural wonders. From the spiritual heart of Bali to the volcanic landscapes of Java, it is a land of profound beauty.', points: ['Relax on the world-famous beaches of Bali and Lombok.', 'Discover the ancient Buddhist wonder of Borobudur in Java.', 'Encounter legendary Komodo dragons on their native islands.', 'Explore the lush, green terraced rice fields of Ubud.', 'Dive into the underwater paradise of Raja Ampat.', 'Immerse yourself in the warm hospitality of the Indonesian people.'], outro: 'Indonesia is a land of endless exploration and a true tropical paradise for the adventurous soul.' },
      { tag: 'North America', title: 'USA: Iconic Cities & Natural Wonders', img: 'images/America.jpg', desc: 'From the bright lights of New York to the grandeur of the Grand Canyon, explore the vast diversity of America.', intro: 'The United States is a vast country offering an incredible diversity of landscapes and experiences. From historic landmarks to modern entertainment hubs, every region tells a different story of the American spirit.', points: ['Witness the electrifying energy of New York City\'s Times Square.', 'Marvel at the ancient, carved landscapes of the Grand Canyon.', 'Explore the historic monuments of Washington D.C.', 'Drive along the spectacularly scenic Pacific Coast Highway.', 'Experience the magic and entertainment of Los Angeles and Orlando.', 'Hike through the rugged beauty of the Rocky Mountains.'], outro: 'A journey across the USA is a testament to the vastness and diversity of the North American continent.' },
      { tag: 'Europe', title: 'France: Romance, Art & Culinary Elegance', img: 'images/France.jpg', desc: 'Indulge in the sophisticated charm of Paris, the vineyards of Bordeaux, and the glamour of the French Riviera.', intro: 'France is the global icon of romance, elegance, and cultural refinement. From the world-class museums of Paris to the sun-soaked vineyards of the countryside, it continues to inspire travelers from around the world.', points: ['Climb the Eiffel Tower for panoramic views of the City of Light.', 'Explore the art treasures of the Louvre and Musée d\'Orsay.', 'Wander through the glamorous beaches of the French Riviera.', 'Discover the historic châteaux and gardens of the Loire Valley.', 'Taste world-renowned wines in the vineyards of Bordeaux.', 'Experience the rugged charm and history of the Normandy coast.'], outro: 'France promises a journey of sophisticated discovery, timeless beauty, and exquisite flavors.' },
      { tag: 'Eurasia', title: 'Turkey: Crossroads of History & Culture', img: 'images/Turkey.webp', desc: 'Witness the meeting point of East and West in vibrant Istanbul and the surreal landscapes of Cappadocia.', intro: 'Turkey is a land where East meets West, offering a rich tapestry of history, culture, and natural beauty. It is home to ancient civilizations and stunning landscapes that have captivated travelers for centuries.', points: ['Explore the architectural marvels of Istanbul\'s Blue Mosque and Hagia Sophia.', 'Experience a magical sunrise hot air balloon ride over Cappadocia.', 'Wander through the ancient, preserved ruins of Ephesus.', 'Relax beside the turquoise waters of the Mediterranean coast.', 'Discover the unique thermal pools and white terraces of Pamukkale.', 'Navigate the bustling, historic markets like the Grand Bazaar.'], outro: 'Turkey provides a captivating journey through time, blending diverse cultures and breathtaking natural wonder.' }
    ];


    let currentBlogIndex = 0;

    function openBlog(index) {
      currentBlogIndex = index;
      updateBlogModal();
      const modal = document.getElementById('blogModal');
      modal.classList.remove('hidden');
      setTimeout(() => modal.classList.remove('opacity-0'), 10);
      document.body.style.overflow = 'hidden';
    }

    function closeBlog() {
      const modal = document.getElementById('blogModal');
      modal.classList.add('opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }

    function renderBlogs() {
      const container = document.getElementById('blog-container');
      if (!container) return;
      blogData.forEach((blog, index) => {
        container.innerHTML += `
          <div class="rounded-2xl overflow-hidden group flex flex-col bg-[#1a1a24] border border-white/5 hover:border-primary/20 transition-all duration-300">
            <div class="relative h-44 overflow-hidden">
              <img src="${blog.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${blog.title}" />
              <div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="bg-primary/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">${blog.tag}</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
              <h3 class="text-[24px] font-bold text-white mb-2 leading-tight">${blog.title}</h3>
              <p class="text-white/70 text-[18px] mb-5 leading-relaxed font-light flex-1">${blog.desc}</p>
              <button onclick="openBlog(${index})" class="w-full py-4 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02]">
                View More <i class="fas fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        `;
      });
    }

    function updateBlogModal() {
      const data = blogData[currentBlogIndex];
      document.getElementById('modalBlogImg').src = data.img;
      document.getElementById('modalBlogTag').textContent = data.tag;
      document.getElementById('modalBlogTitle').textContent = data.title;
      document.getElementById('modalBlogIntro').textContent = data.intro;
      const pointsList = document.getElementById('modalPointsList');
      if (pointsList) {
        pointsList.innerHTML = '';
        data.points.forEach(p => {
          pointsList.innerHTML += `<li class="flex items-start gap-4 text-white/70 text-[18px] font-medium">
              <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1"><i class="fas fa-star text-[10px] text-primary"></i></div>
              <span class="flex-1">${p}</span>
            </li>`;
        });
      }
      document.getElementById('modalBlogOutro').textContent = data.outro;
      const galleryContainer = document.getElementById('modalBlogGallery');
      if (galleryContainer) galleryContainer.style.display = 'none';
    }

    function prevBlog() {
      currentBlogIndex = (currentBlogIndex - 1 + blogData.length) % blogData.length;
      updateBlogModal();
    }

    function nextBlog() {
      currentBlogIndex = (currentBlogIndex + 1) % blogData.length;
      updateBlogModal();
    }

    // ── Intersection Observer (scroll animations) ─────────────────
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card,.dest-card,.glass').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      io.observe(el);
    });

    // ── Init ──────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', async () => {
      // Initialize EmailJS
      emailjs.init('tRG6iOeYylZBAVmsa');

      try {
        await initDB();
        await checkAuth(); // Check for existing session
        checkAdminNotifications(); // Check for pending items on load
        renderBlogs(); // Render international destination blogs
        console.log('EkeketeDB ✅ ready');
      } catch (err) {
        console.error('DB error:', err);
      }
    });

    // ── Language Selector ────────────────────────────────────────
    function toggleLangDropdown(e) {
      if (e) e.stopPropagation();
      const btn = document.getElementById('lang-toggle-btn');
      const dd = document.getElementById('lang-dropdown');
      const isOpen = dd.classList.contains('open');
      closeNavNotifications && closeNavNotifications();
      btn.classList.toggle('open', !isOpen);
      dd.classList.toggle('open', !isOpen);
    }

    function selectLang(langCode, flag, label) {
      // Update button UI
      document.getElementById('lang-current-flag').textContent = flag;
      document.getElementById('lang-current-label').textContent = label;
      // Update active state
      document.querySelectorAll('#lang-dropdown .lang-item').forEach(el => el.classList.remove('active'));
      event.currentTarget.classList.add('active');
      // Close dropdown
      document.getElementById('lang-toggle-btn').classList.remove('open');
      document.getElementById('lang-dropdown').classList.remove('open');
      // Trigger Google Translate directly via the hidden select element
      const triggerTranslate = () => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = langCode;
          select.dispatchEvent(new Event('change'));
        } else {
          setTimeout(triggerTranslate, 300);
        }
      };
      triggerTranslate();
    }

    // Close lang dropdown on outside click
    document.addEventListener('click', function (e) {
      const wrap = document.getElementById('lang-selector-wrap');
      if (wrap && !wrap.contains(e.target)) {
        const btn = document.getElementById('lang-toggle-btn');
        const dd = document.getElementById('lang-dropdown');
        if (btn) btn.classList.remove('open');
        if (dd) dd.classList.remove('open');
      }
    });

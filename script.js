'use strict';

/* ============================================================
   CONFIG — replace these with your real endpoints before launch
   ============================================================ */
const CONFIG = {
  // Create a free form at https://formspree.io (or Google Forms / your own
  // backend) and paste the endpoint IDs here. Until these are real, form
  // submissions below will fail gracefully with an error toast rather than
  // silently pretending to work.
  REGISTRATION_ENDPOINT: 'https://formspree.io/f/REPLACE_WITH_REGISTRATION_FORM_ID',
  CONTACT_ENDPOINT: 'https://formspree.io/f/REPLACE_WITH_CONTACT_FORM_ID',
  NEWSLETTER_ENDPOINT: 'https://formspree.io/f/REPLACE_WITH_NEWSLETTER_FORM_ID',
  WHATSAPP_NUMBER: '233332097330', // international format, no leading 0, no +
  CONFERENCE_DATE_ISO: '2026-12-15T09:00:00+00:00'
};

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type) {
  type = type || 'success';
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  toast.className = 'toast ' + type;
  const icon = document.createElement('i');
  icon.className = 'fas ' + (icons[type] || icons.info);
  toast.appendChild(icon);
  toast.appendChild(document.createTextNode(' ' + message));
  container.appendChild(toast);
  setTimeout(function () {
    toast.classList.add('hide');
    setTimeout(function () { toast.remove(); }, 300);
  }, 4000);
}

/* ============================================================
   LOADING
   ============================================================ */
window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loader').classList.add('hidden');
    showToast('Welcome to YAD MUN', 'success');
  }, 1200);
});

/* ============================================================
   TOP BAR
   ============================================================ */
function closeTopBar() {
  document.getElementById('topBar').style.display = 'none';
  try { localStorage.setItem('topBarClosed', 'true'); } catch (e) {}
}
(function initTopBar() {
  try {
    if (localStorage.getItem('topBarClosed') === 'true') {
      document.getElementById('topBar').style.display = 'none';
    }
  } catch (e) {}
})();

/* ============================================================
   DARK MODE
   ============================================================ */
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  const icon = this.querySelector('i');
  const isDark = document.body.classList.contains('dark-mode');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  try { localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled'); } catch (e) {}
  showToast(isDark ? 'Dark mode activated' : 'Light mode activated', 'info');
});
(function initDarkMode() {
  try {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkToggle.querySelector('i').className = 'fas fa-sun';
    }
  } catch (e) {}
})();

/* ============================================================
   COOKIE CONSENT
   ============================================================ */
function showCookieConsent() {
  try {
    if (!localStorage.getItem('cookieConsent')) {
      document.getElementById('cookieConsent').classList.add('show');
    }
  } catch (e) {}
}
function acceptCookies() {
  try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
  document.getElementById('cookieConsent').classList.remove('show');
  showToast('Cookies accepted', 'success');
}
function dismissCookies() {
  try { localStorage.setItem('cookieConsent', 'declined'); } catch (e) {}
  document.getElementById('cookieConsent').classList.remove('show');
}
document.getElementById('cookieAccept').addEventListener('click', acceptCookies);
document.getElementById('cookieDecline').addEventListener('click', dismissCookies);
setTimeout(showCookieConsent, 3000);

/* ============================================================
   POLICY MODAL (uses native <dialog>-free alert fallback)
   ============================================================ */
const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    content: 'YAD MUN respects your privacy. We collect personal information only when voluntarily submitted by you. Your data is used solely for programme registration, communication, and improving our services. We do not share your data with third parties without your consent. You may request access, correction, or deletion of your data at any time by contacting us at info@yadmun.org.'
  },
  safeguarding: {
    title: 'Safeguarding Policy',
    content: 'YAD MUN is committed to creating a safe environment for all participants. We have zero tolerance for abuse, harassment, or discrimination. All staff and volunteers undergo background checks and safeguarding training. Any concerns can be reported confidentially to our Safeguarding Officer at safeguarding@yadmun.org.'
  },
  conduct: {
    title: 'Code of Conduct',
    content: 'All YAD MUN participants are expected to behave with integrity, respect, and professionalism. This includes: respecting diverse perspectives, maintaining academic honesty, treating others with dignity, and representing YAD MUN positively. Violations may result in removal from programmes.'
  },
  terms: {
    title: 'Terms of Use',
    content: 'By using this website and participating in YAD MUN programmes, you agree to our terms. All content is for informational purposes. We reserve the right to update these terms. Participants are responsible for their own travel, health, and safety arrangements. YAD MUN is not liable for any loss or damage arising from participation.'
  }
};
function openPolicy(type, evt) {
  if (evt) evt.preventDefault();
  const policy = POLICIES[type];
  if (!policy) return;
  alert(policy.title + '\n\n' + policy.content + '\n\nFor more information, contact info@yadmun.org.');
}
document.querySelectorAll('[data-policy]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    openPolicy(this.dataset.policy, e);
  });
});

/* ============================================================
   HAMBURGER
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', function () {
  this.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ============================================================
   SCROLL
   ============================================================ */
const scrollBtn = document.getElementById('scrollTop');
let lastScroll = 0;
window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset;
  scrollBtn.classList.toggle('visible', currentScroll > 250);

  const header = document.getElementById('mainHeader');
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.classList.add('hidden-nav');
  } else {
    header.classList.remove('hidden-nav');
  }
  lastScroll = currentScroll;
  header.classList.toggle('scrolled', currentScroll > 50);
});
scrollBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   FADE-UP
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
fadeEls.forEach(function (el) { fadeObserver.observe(el); });

/* ============================================================
   MISSION / VISION / VALUES TOGGLE
   ============================================================ */
document.querySelectorAll('.mv-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.mv-btn').forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');
    document.querySelectorAll('.mv-content').forEach(function (c) { c.classList.remove('active'); });
    document.getElementById(this.dataset.target).classList.add('active');
  });
});

/* ============================================================
   LEADERSHIP TABS
   ============================================================ */
document.querySelectorAll('.leadership-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.leadership-tab').forEach(function (t) { t.classList.remove('active'); });
    this.classList.add('active');
    document.querySelectorAll('.leadership-content').forEach(function (c) { c.classList.remove('active'); });
    document.getElementById('tab-' + this.dataset.tab).classList.add('active');
  });
});

/* ============================================================
   FAQ
   ============================================================ */
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const answer = this.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq-answer').forEach(function (a) { a.classList.remove('open'); });
    document.querySelectorAll('.faq-question').forEach(function (b) { b.classList.remove('active'); });
    if (!isOpen) {
      answer.classList.add('open');
      this.classList.add('active');
    }
  });
});

/* ============================================================
   SHARE
   ============================================================ */
function sharePage(platform) {
  const url = window.location.href;
  const text = 'Join me in supporting the next generation of global leaders.';
  const shareUrls = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
    twitter: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url),
    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url),
    whatsapp: 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' ' + url)
  };
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer,width=600,height=500');
    showToast('Shared on ' + platform, 'success');
  }
}
function copyLink() {
  const finish = function () {
    const btn = document.querySelector('.share-btn.copy-link');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    showToast('Link copied', 'success');
    setTimeout(function () { btn.innerHTML = original; }, 2000);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).then(finish);
  } else {
    const input = document.createElement('input');
    input.value = window.location.href;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    finish();
  }
}
document.querySelectorAll('[data-share]').forEach(function (btn) {
  btn.addEventListener('click', function () { sharePage(this.dataset.share); });
});
document.getElementById('copyLinkBtn').addEventListener('click', copyLink);

/* ============================================================
   COUNTDOWN
   ============================================================ */
(function initCountdown() {
  const conferenceDate = new Date(CONFIG.CONFERENCE_DATE_ISO).getTime();
  setInterval(function () {
    const now = new Date().getTime();
    const distance = conferenceDate - now;
    const ids = ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'];
    if (distance < 0) {
      ids.forEach(function (id) { document.getElementById(id).textContent = '00'; });
      return;
    }
    document.getElementById('cd-days').textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
  }, 1000);
})();

/* ============================================================
   STATUS BANNER (registration form)
   ============================================================ */
function showStatus(message, type) {
  const statusDiv = document.getElementById('statusMsg');
  statusDiv.className = 'status-msg ' + type;
  statusDiv.textContent = message;
  statusDiv.style.display = 'block';
  setTimeout(function () {
    statusDiv.style.display = 'none';
    statusDiv.className = 'status-msg';
  }, 5000);
}

/* ============================================================
   SHARED: submit a form's data to a Formspree-style endpoint
   ============================================================ */
function submitToEndpoint(endpoint, data) {
  if (!endpoint || endpoint.indexOf('REPLACE_WITH') !== -1) {
    return Promise.reject(new Error('endpoint-not-configured'));
  }
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (res) {
    if (!res.ok) throw new Error('submit-failed');
    return res.json().catch(function () { return {}; });
  });
}

/* ============================================================
   REGISTRATION FORM
   ============================================================ */
function validateRegistration() {
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const school = document.getElementById('regSchool').value.trim();
  const committee = document.getElementById('regCommittee').value;
  if (!name || !phone || !email || !school || !committee) {
    showStatus('Please fill all required fields.', 'error');
    return false;
  }
  if (!phone.match(/^0[0-9]{9}$/)) {
    showStatus('Enter a valid Ghana number (e.g., 0244123456)', 'error');
    return false;
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showStatus('Enter a valid email address.', 'error');
    return false;
  }
  return true;
}

function handleRegistration() {
  const btn = document.getElementById('registerBtn');
  if (!validateRegistration()) return;

  const data = {
    name: document.getElementById('regName').value.trim(),
    phone: document.getElementById('regPhone').value.trim(),
    email: document.getElementById('regEmail').value.trim(),
    school: document.getElementById('regSchool').value.trim(),
    committee: document.getElementById('regCommittee').value,
    registeredAt: new Date().toISOString(),
    _subject: 'New YAD MUN registration'
  };

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  submitToEndpoint(CONFIG.REGISTRATION_ENDPOINT, data)
    .then(function () {
      showStatus('Registration successful. We will contact you shortly.', 'success');
      showToast('Welcome to YAD MUN, ' + data.name + '!', 'success');
      document.getElementById('registrationForm').reset();
    })
    .catch(function (err) {
      if (err.message === 'endpoint-not-configured') {
        showStatus('Registration form is not connected to a backend yet — contact the site admin.', 'error');
        showToast('Form backend not configured. See CONFIG in script.js.', 'error');
      } else {
        showStatus('Something went wrong. Please try again, or reach us on WhatsApp.', 'error');
        showToast('Registration failed. Please try again.', 'error');
      }
    })
    .finally(function () {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-user-plus"></i> Join YAD MUN Today';
    });
}
document.getElementById('registerBtn').addEventListener('click', handleRegistration);

/* ============================================================
   CONTACT FORM
   ============================================================ */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const submitBtn = this.querySelector('button[type="submit"]');
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill all fields.', 'error');
    return;
  }

  const data = { name: name, email: email, message: message, _subject: 'New YAD MUN contact form message' };
  const originalLabel = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  submitToEndpoint(CONFIG.CONTACT_ENDPOINT, data)
    .then(function () {
      showToast('Message sent — we will get back to you soon.', 'success');
      document.getElementById('contactForm').reset();
    })
    .catch(function (err) {
      if (err.message === 'endpoint-not-configured') {
        showToast('Contact form is not connected yet — message us on WhatsApp instead.', 'error');
      } else {
        showToast('Message failed to send. Please try WhatsApp instead.', 'error');
      }
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    });
});

/* ============================================================
   NEWSLETTER
   ============================================================ */
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const email = input.value.trim();
  const btn = this.querySelector('button[type="submit"]');
  const originalLabel = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  submitToEndpoint(CONFIG.NEWSLETTER_ENDPOINT, { email: email, _subject: 'New newsletter subscriber' })
    .then(function () {
      showToast('Thank you for subscribing!', 'success');
      input.value = '';
    })
    .catch(function (err) {
      if (err.message === 'endpoint-not-configured') {
        showToast('Newsletter is not connected to a backend yet.', 'error');
      } else {
        showToast('Subscription failed. Please try again.', 'error');
      }
    })
    .finally(function () {
      btn.disabled = false;
      btn.innerHTML = originalLabel;
    });
});

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (document.getElementById('cookieConsent').classList.contains('show')) {
      dismissCookies();
    }
  }
  if (e.altKey && e.key === 'd') darkToggle.click();
  if (e.altKey && e.key === 'h') window.scrollTo({ top: 0, behavior: 'smooth' });
  if (e.altKey && e.key === 'r') document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
});

'use strict';

/* ============================================================
   CONFIG — replace these with your real endpoints before launch
   ============================================================ */
const CONFIG = {
  REGISTRATION_ENDPOINT: 'https://formspree.io/f/info@yadmun.org',
  CONTACT_ENDPOINT: 'https://formspree.io/f/info@yadmun.org',
  NEWSLETTER_ENDPOINT: 'https://formspree.io/f/info@yadmun.org',
  WHATSAPP_NUMBER: '233332097330', // international format, no leading 0, no +
  CONFERENCE_DATE_ISO: '2026-12-15T09:00:00+00:00'
};

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type) {
  type = type || 'success';
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
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
document.getElementById('registrationForm').addEventListener('submit', function (e) {
  e.preventDefault();
  handleRegistration();
});

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
   POLICY MODAL POPUPS
   ============================================================ */
const POLICIES_DATA = {
  privacy: {
    title: 'Privacy Policy',
    icon: 'fas fa-shield-alt',
    content: `
      <h4>1. Overview</h4>
      <p>Youth Ambassadors in Diplomacy & Model United Nations (YAD MUN) is committed to protecting the privacy and personal data of our delegates, members, partners, and website visitors.</p>
      
      <h4>2. Information We Collect</h4>
      <p>We collect personal information necessary for program registration and communication, including:</p>
      <ul>
        <li>Full Name and Contact Information (Email, Phone/WhatsApp number)</li>
        <li>Academic Institution or Organization</li>
        <li>Committee and Conference Preferences</li>
        <li>Message details submitted through our contact forms</li>
      </ul>
      
      <h4>3. How We Use Your Data</h4>
      <p>Your personal data is used solely to process conference registrations, provide updates on programs, issue official participation certificates, and communicate organizational announcements. We never sell or share your data with unauthorized third parties.</p>
      
      <h4>4. Cookies & Analytics</h4>
      <p>Our website uses essential session cookies to remember your preferences (such as dark mode and cookie acceptance) and improve user experience.</p>
      
      <h4>5. Contact Us</h4>
      <p>For questions regarding your privacy or to request data removal, please contact our team at <strong>info@yadmun.org</strong>.</p>
    `
  },
  safeguarding: {
    title: 'Safeguarding Policy',
    icon: 'fas fa-user-shield',
    content: `
      <h4>1. Our Commitment</h4>
      <p>YAD MUN holds a paramount duty of care to ensure all young people, students, and participants feel safe, valued, and respected at every YAD MUN event, simulation, and training session.</p>
      
      <h4>2. Zero Tolerance Policy</h4>
      <p>We maintain a strict zero-tolerance policy towards any form of harassment, bullying, discrimination, abuse, or exploitation. All delegates, staff, and advisors are bound by our safe environment standard.</p>
      
      <h4>3. Code of Care for Minors</h4>
      <ul>
        <li>All chaperones and officers undergo background checks and safeguarding orientation.</li>
        <li>Events maintain proper adult-to-student supervision ratios.</li>
        <li>Emergency contact protocols and medical care arrangements are active at all physical conferences.</li>
      </ul>
      
      <h4>4. Reporting Concerns</h4>
      <p>If you experience or witness any behavior that compromises safety, report it immediately to our team at <strong>info@yadmun.org</strong> or call <strong>0332 097 330</strong>.</p>
    `
  },
  'code-of-conduct': {
    title: 'Code of Conduct',
    icon: 'fas fa-gavel',
    content: `
      <h4>1. Diplomatic Decorum & Respect</h4>
      <p>All delegates and participants are expected to maintain professional diplomacy, courtesy, and mutual respect during UN committee simulations, debates, and social events.</p>
      
      <h4>2. Professional Standards</h4>
      <ul>
        <li><strong>Diplomatic Conduct:</strong> Adhere to parliamentary procedures and engage constructively with fellow delegates.</li>
        <li><strong>Dress Code:</strong> Formal Western Business Attire or recognized national traditional wear is required during committee sessions.</li>
        <li><strong>Inclusivity:</strong> Discrimination based on ethnicity, gender, religion, background, or nationality is strictly prohibited.</li>
      </ul>
      
      <h4>3. Academic Integrity</h4>
      <p>Pre-written resolutions, plagiarism, or dishonest research undermine the educational value of Model UN. All position papers must reflect original research and delegates' own work.</p>
      
      <h4>4. Disciplinary Action</h4>
      <p>Violation of the Code of Conduct may result in official warnings, forfeiture of award eligibility, or immediate expulsion from the conference without refund.</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    icon: 'fas fa-file-contract',
    content: `
      <h4>1. Acceptance of Terms</h4>
      <p>By registering for YAD MUN programs, using our website, or attending our events, you agree to comply with and be bound by these Terms of Service.</p>
      
      <h4>2. Conference Registration & Participation</h4>
      <ul>
        <li>Registration is non-transferable without prior written permission from the Executive Directorate.</li>
        <li>Delegates are responsible for their own travel, accommodation, and personal logistics unless officially provided under a scholarship grant.</li>
      </ul>
      
      <h4>3. Media Consent</h4>
      <p>By attending YAD MUN conferences, participants consent to photography, audio recording, and video recording for educational, archival, and promotional purposes by YAD MUN.</p>
      
      <h4>4. Intellectual Property</h4>
      <p>All educational guidebooks, conference handbooks, logos, and materials published by YAD MUN remain the intellectual property of Youth Ambassadors in Diplomacy & Model United Nations LBG.</p>
    `
  }
};

POLICIES_DATA['codeofconduct'] = POLICIES_DATA['code-of-conduct'];
POLICIES_DATA['conduct'] = POLICIES_DATA['code-of-conduct'];

function openPolicyModal(policyKey) {
  const modal = document.getElementById('policyModal');
  if (!modal) return;

  const rawKey = (policyKey || 'privacy').toLowerCase().trim();
  let policy = POLICIES_DATA[rawKey];
  
  if (!policy) {
    if (rawKey.indexOf('conduct') !== -1 || rawKey.indexOf('code') !== -1) {
      policy = POLICIES_DATA['code-of-conduct'];
    } else if (rawKey.indexOf('guard') !== -1 || rawKey.indexOf('safe') !== -1) {
      policy = POLICIES_DATA.safeguarding;
    } else if (rawKey.indexOf('term') !== -1) {
      policy = POLICIES_DATA.terms;
    } else {
      policy = POLICIES_DATA.privacy;
    }
  }

  document.getElementById('policyModalTitle').textContent = policy.title;
  document.getElementById('policyModalIcon').className = 'modal-title-icon ' + policy.icon;
  document.getElementById('policyModalBody').innerHTML = policy.content;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePolicyModal() {
  const modal = document.getElementById('policyModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

window.openPolicyModal = openPolicyModal;
window.closePolicyModal = closePolicyModal;

document.addEventListener('click', function (e) {
  const link = e.target.closest('.policy-link') || e.target.closest('[data-policy]');
  if (link) {
    e.preventDefault();
    const policyKey = link.getAttribute('data-policy') || link.getAttribute('href');
    openPolicyModal(policyKey);
    return;
  }
  
  if (e.target.closest('#closePolicyModal') || e.target.closest('#policyModalOkBtn')) {
    e.preventDefault();
    closePolicyModal();
    return;
  }
  
  const modal = document.getElementById('policyModal');
  if (modal && e.target === modal) {
    closePolicyModal();
  }
});

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('policyModal');
    if (modal && modal.classList.contains('open')) {
      closePolicyModal();
      return;
    }
    if (document.getElementById('cookieConsent').classList.contains('show')) {
      dismissCookies();
    }
  }
  if (e.altKey && e.key === 'd') { const btn = document.getElementById('darkToggle'); if (btn) btn.click(); }
  if (e.altKey && e.key === 'h') window.scrollTo({ top: 0, behavior: 'smooth' });
  if (e.altKey && e.key === 'r') { const reg = document.getElementById('register'); if (reg) reg.scrollIntoView({ behavior: 'smooth' }); }
});

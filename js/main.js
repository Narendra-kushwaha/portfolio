// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// ---- Fade-in on Scroll ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) link.style.color = 'var(--text)';
  });
});

// ---- Profile Photo Fallback ----
const photo = document.getElementById('profilePhoto');
if (photo) {
  photo.onerror = function () {
    this.style.display = 'none';
    const wrapper = this.parentElement;
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 260px; height: 260px; border-radius: 50%;
      background: var(--card); border: 3px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-size: 5rem; position: relative; z-index: 2;
    `;
    placeholder.textContent = '👤';
    wrapper.insertBefore(placeholder, this);
  };
}

//Contant form logic
const FORMSPREE_ID = 'YOUR_FORM_ID';

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = document.getElementById('btnText');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  btnText.textContent = '⏳ Sending message...';

  const data = {
    name:    contactForm.name.value,
    email:   contactForm.email.value,
    subject: contactForm.subject.value,
    message: contactForm.message.value,
  };

  try {
      const res = await fetch(`https://formspree.io/f/xvzjzobo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
    } catch {
      btnText.textContent = '❌ Something went wrong. Please try again.';
      submitBtn.disabled = false;
      return;
    }
  contactForm.classList.add('hide');
  formSuccess.classList.add('show');
});

function resetForm() {
  contactForm.reset();
  contactForm.classList.remove('hide');
  formSuccess.classList.remove('show');
  submitBtn.disabled = false;
  btnText.textContent = '🚀 Message Bhejo';
}


import { es } from './translations/es.js';
import { en } from './translations/en.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. MENÚ RESPONSIVO ---
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 1. SISTEMA DE IDIOMAS ---
    let currentLang = 'en';
    const langBtnMobile = document.querySelector('#lang-switch');
    const langBtnDesktop = document.querySelector('#lang-switch-desktop');
    const translations = { en, es };

    function updateTexts() {
        const dictionary = translations[currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dictionary[key];
                } else {
                    el.textContent = dictionary[key];
                }
            }
        });

        // Placeholders via data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dictionary[key]) el.placeholder = dictionary[key];
        });

        // Select options
        document.querySelectorAll('option[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) el.textContent = dictionary[key];
        });

        document.documentElement.lang = currentLang;
        const newText = currentLang === 'es' ? 'EN / ES' : 'ES / EN';
        if (langBtnMobile) langBtnMobile.textContent = newText;
        if (langBtnDesktop) langBtnDesktop.textContent = newText;
    }

    function setupLanguageButton(btn) {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                currentLang = currentLang === 'en' ? 'es' : 'en';
                updateTexts();
            });
        }
    }

    setupLanguageButton(langBtnMobile);
    setupLanguageButton(langBtnDesktop);
    updateTexts();

    // --- 2. PRICING TOGGLE ---
    const pricingToggle = document.getElementById('pricing-toggle');
    const businessPlans = {
        free: {
            price: 'S/ 0',
            desc_en: 'Post up to 2 shifts per month for free.',
            desc_es: 'Publica hasta 2 turnos al mes gratis.',
            features_en: ['✓ 2 shift posts/month', '✓ Basic candidate list', '✓ Email support', '✓ Manual payments', '✗ Verified workers only', '✗ Analytics'],
            features_es: ['✓ 2 turnos/mes', '✓ Lista básica de candidatos', '✓ Soporte por email', '✓ Pagos manuales', '✗ Solo trabajadores verificados', '✗ Analíticas'],
        },
        pro: {
            price: 'S/ 149',
            desc_en: 'For growing businesses that need reliable staff fast.',
            desc_es: 'Para negocios en crecimiento que necesitan personal confiable.',
            features_en: ['✓ Unlimited shift posts', '✓ Verified workers only', '✓ Real-time tracking', '✓ Automated payroll', '✓ Analytics dashboard', '✓ Priority support'],
            features_es: ['✓ Turnos ilimitados', '✓ Solo trabajadores verificados', '✓ Seguimiento en tiempo real', '✓ Pago automático', '✓ Panel de analíticas', '✓ Soporte prioritario'],
        },
        enterprise: {
            price: 'Custom',
            desc_en: 'Tailored solutions for large operations and franchises.',
            desc_es: 'Soluciones personalizadas para grandes operaciones.',
            features_en: ['✓ Everything in Pro', '✓ Dedicated manager', '✓ Custom integrations', '✓ SLA guarantee', '✓ Multi-location', '✓ API access'],
            features_es: ['✓ Todo en Pro', '✓ Gerente dedicado', '✓ Integraciones a medida', '✓ Garantía SLA', '✓ Multi-sede', '✓ Acceso API'],
        }
    };

    const workerPlans = {
        free: {
            price: 'S/ 0',
            features_en: ['✓ Browse all shifts', '✓ Apply to 5 shifts/month', '✓ Basic profile', '✓ Standard payment (3 days)', '✗ Priority applications', '✗ Advanced filters'],
            features_es: ['✓ Ver todos los turnos', '✓ Aplicar a 5 turnos/mes', '✓ Perfil básico', '✓ Pago estándar (3 días)', '✗ Aplicaciones prioritarias', '✗ Filtros avanzados'],
        },
        pro: {
            price: 'S/ 29',
            features_en: ['✓ Unlimited applications', '✓ Priority matching', '✓ Verified badge', '✓ Same-day payment', '✓ Advanced filters', '✓ 24/7 support'],
            features_es: ['✓ Aplicaciones ilimitadas', '✓ Matching prioritario', '✓ Insignia verificado', '✓ Pago el mismo día', '✓ Filtros avanzados', '✓ Soporte 24/7'],
        },
        enterprise: {
            price: 'Custom',
            features_en: ['✓ Everything in Pro', '✓ Dedicated account manager', '✓ Custom integrations', '✓ SLA guarantee', '✓ Analytics dashboard', '✓ API access'],
            features_es: ['✓ Todo en Pro', '✓ Gerente de cuenta dedicado', '✓ Integraciones personalizadas', '✓ Garantía SLA', '✓ Panel de analíticas', '✓ Acceso API'],
        }
    };

    let isBusiness = false;

    function updatePricingCards() {
        const plans = isBusiness ? businessPlans : workerPlans;
        const langKey = currentLang === 'es' ? 'es' : 'en';

        ['free', 'pro', 'enterprise'].forEach(planKey => {
            const plan = plans[planKey];
            const card = document.getElementById(`plan-${planKey}`);
            if (!card) return;

            const priceEl = card.querySelector('.price-amount');
            if (priceEl) priceEl.textContent = plan.price === 'Custom'
                ? (currentLang === 'es' ? 'A consultar' : 'Custom')
                : plan.price;

            const featList = card.querySelector('.plan-features');
            if (featList && plan[`features_${langKey}`]) {
                featList.innerHTML = plan[`features_${langKey}`]
                    .map(f => `<li style="${f.startsWith('✗') ? 'opacity:0.4' : ''}">${f}</li>`)
                    .join('');
            }
        });
    }

    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            isBusiness = !isBusiness;
            pricingToggle.classList.toggle('active', isBusiness);
            updatePricingCards();
        });
    }

    // --- 3. CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) return;

            // Simulate submission
            const submitBtn = contactForm.querySelector('.btn-primary');
            submitBtn.textContent = '...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = currentLang === 'es' ? 'Enviar mensaje' : 'Send message';
                submitBtn.disabled = false;
                formSuccess.classList.add('visible');
                setTimeout(() => formSuccess.classList.remove('visible'), 5000);
            }, 1000);
        });
    }

    // --- 4. SMOOTH SCROLL para nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
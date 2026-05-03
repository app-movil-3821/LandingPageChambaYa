// Importamos los diccionarios desde las rutas de tu estructura
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

    // Cerrar menú cuando se hace clic en un enlace
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
    // Seleccionamos el objeto correcto del diccionario
    const dictionary = translations[currentLang]; 
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key]) {
        // Tu lógica para manejar inputs/textareas es excelente
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dictionary[key];
        } else {
          el.textContent = dictionary[key];
        }
      }
    });

    // Actualizamos el atributo lang y el texto del botón para feedback visual
    document.documentElement.lang = currentLang;
    const newText = currentLang === 'es' ? 'EN / ES' : 'ES / EN';
    
    if (langBtnMobile) {
      langBtnMobile.textContent = newText;
    }
    if (langBtnDesktop) {
      langBtnDesktop.textContent = newText;
    }
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

  // Ejecutamos una vez al cargar para asegurar que todo esté sincronizado
  updateTexts();
});
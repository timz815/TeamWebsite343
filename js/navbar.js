"use strict";

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const menuItems = mobileMenu ? Array.from(mobileMenu.querySelectorAll('a')) : [];
let isMenuOpen = false;

/**
 * Toggles the mobile menu open or closed.
 * Updates ARIA attributes for accessibility.
 */
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  hamburger.setAttribute('aria-expanded', isMenuOpen);
  mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
  
  if (isMenuOpen) {
    mobileMenu.classList.add('active');
    // Focus first menu item when opening
    menuItems[0]?.focus();
    document.addEventListener('keydown', handleKeys);
  } else {
    mobileMenu.classList.remove('active');
    // Return focus to hamburger button when closing
    hamburger.focus();
    document.removeEventListener('keydown', handleKeys);
  }
}

/**
 * Handles keyboard navigation inside the mobile menu.
 * Allows closing with esc key without trapping focus.
 */
function handleKeys(e) {
  // Close menu on Escape key
  if (e.key === 'Escape' && isMenuOpen) {
    toggleMenu();
  }
}

// Toggle menu when clicking the hamburger button
hamburger.addEventListener('click', toggleMenu);

// Handle 'Enter' and 'Space' keypresses on the hamburger button
hamburger.addEventListener('keydown', (e) => {
  if (['Enter', ' '].includes(e.key)) {
    e.preventDefault();
    toggleMenu();
  }
});

// Close menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target) && isMenuOpen) {
    toggleMenu();
  }
});

// Close menu when resizing the window to desktop size
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && isMenuOpen) {
    toggleMenu();
  }
});

// Initialize menu state on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!mobileMenu) return;
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
});
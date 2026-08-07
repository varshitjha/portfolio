// EmailJS Configuration
// Credentials are loaded strictly from environment variables (.env / VITE_EMAILJS_*)
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  TO_EMAIL: 'varshitjha17@gmail.com',
};

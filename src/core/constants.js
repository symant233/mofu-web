const apiBase = process.env.API_BASE || 'http://127.0.0.1:3000/api/v1';
const webSocket = process.env.WS || 'http://127.0.0.1:3001';

module.exports = {
  API_BASE: apiBase,
  WS: webSocket,
  SENTRY_DSN:
    'https://99678f2fe21349c3bfe9e283b6555efd@o424857.ingest.sentry.io/5357211',
  MSG_LIMIT: 30,
  TOAST: {
    transition: 'Vue-Toastification__bounce',
    position: 'top-right',
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.5,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  },
};

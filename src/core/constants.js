let apiBase = process.env.API_BASE || 'http://127.0.0.1:3000/api';
let webSocket = process.env.WS || 'http://127.0.0.1:3001';

if (process.env.NODE_ENV === 'production') {
  apiBase = 'https://mofu.ltd/api';
  webSocket = 'https://mofu.ltd';
}

module.exports = {
  API_BASE: apiBase,
  WS: webSocket,
  SENTRY_DSN:
    'https://99678f2fe21349c3bfe9e283b6555efd@o424857.ingest.sentry.io/5357211',
  MSG_LIMIT: 30,
  TOAST: {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 9,
    newestOnTop: true,
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
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

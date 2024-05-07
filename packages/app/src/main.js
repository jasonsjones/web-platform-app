import App from './components/app/app.js';

const APP_NAME = 'x-app';
const appEl = document.getElementById('webapp');

customElements.define(APP_NAME, App);
appEl.appendChild(document.createElement(APP_NAME));

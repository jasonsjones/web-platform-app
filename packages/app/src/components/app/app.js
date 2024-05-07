async function fetchTemplate(location) {
    const res = await fetch(location);
    const rawText = await res.text();
    const dom = new DOMParser().parseFromString(rawText, 'text/html');
    const template = dom.querySelector('template');
    return template;
}

class App extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const template = await fetchTemplate('./components/app/app.html');
        this.appendChild(template.content.cloneNode(true));
    }
}

export default App;

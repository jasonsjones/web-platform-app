class App extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<h1>Hello Web Platform!</h1>
            <h2>Rendered from the webapp component with light DOM</h2>
            <img class="image-medium" src="assets/api.svg" alt="api graphic"/>
            `;
    }
}

export default App;

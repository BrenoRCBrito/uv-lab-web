export class SimpleGreeting extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Create and append a style element
    const style = document.createElement("style");
    style.textContent = `
          div {
              font-size: 1.5rem;
              color: #333;
          }
      `;

    // Create and append a container element
    const container = document.createElement("div");
    container.textContent = `Hello, ${this.getAttribute("name")}!`;

    // Append styles and container to the shadow root
    this.shadowRoot.append(style, container);
  }
}

customElements.define("simple-greeting", SimpleGreeting);

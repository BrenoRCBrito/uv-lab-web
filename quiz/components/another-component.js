export class AnotherComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Create and append a style element
    const style = document.createElement("style");
    style.textContent = `
          p {
              font-size: 1.2rem;
              color: #007BFF;
          }
      `;

    // Create and append a message element
    const message = document.createElement("p");
    message.textContent = "This is another custom component!";

    // Append styles and message to the shadow root
    this.shadowRoot.append(style, message);
  }
}

customElements.define("another-component", AnotherComponent);

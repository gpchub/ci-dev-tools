class MyCard extends HTMLElement
{
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        let style = `
            :host {
                --title-color: inherit;
                --title-font-size: 1.5em;
                display:block;
            }
            .card {
                box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
                padding: 1rem;
                border-radius: 0.25rem;
            }
            .card-title {
                color: var(--title-color);
                font-size: var(--title-font-size);
                margin-top: 0;
                margin-bottom: 1rem;
            }
        `;

        let html = '<div class="card">';

        if (this.hasAttribute('data-title')) {
            html += '<h2 class="card-title">';
            html += this.getAttribute('data-title');
            html += '</h2>';
        }

        html += '<slot></slot>';
        html += '</div>';

        this.shadowRoot.innerHTML = `<style>${style}</style>${html}`;
    }

    connectedCallback() {

    }
}

customElements.define('my-card', MyCard);
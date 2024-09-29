class CodeBlock extends HTMLElement
{
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const style = document.createElement("style");
        style.textContent = `
            :host {
                position: relative;
                padding: 1rem;
                white-space: pre;
                background: var(--b-bg-2);
                border-radius: .25rem;
                font-family: var(--b-font-mono);
                font-size: .875em;
                display: block;
                font-family: monospace;
                unicode-bidi: isolate;
                min-height: 52px;
            }
            .button-wrapper {
                position: sticky;
                top: 0;
                right: 0;
                width: 100%;
                overflow: visible;
                z-index: 2;
            }
            button {
                position: absolute;
                right: -10px;
                top: 0px;
                color: #59636e;
                background: transparent;
                border: none;
                cursor: pointer;
                background: var(--b-bg-2);
            }
            button svg {
                fill: #59636e;
                width: 20px;
                height: 20px;
            }
            button:before {
                content: "Copy";
                font-size: 12px;
                font-weight: 600;
                padding: 4px 8px;
                border-radius: 4px;
                background: #fff;
                color: #59636e;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
                transition: opacity 0.3s ease;
                border: 1px solid #ddd;
                transform: translateX(-100%);
            }
            button.copied:before {
                opacity: 1;
                content: "Copied!";
                border: 1px solid #a7f3d0;
                color: #059669;
            }
            button:hover:before {
                opacity: 1;
            }
            pre { position: relative; z-index: 1; margin: 0; white-space: pre-wrap; }
        `;
        this.shadowRoot.append(style);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const button = document.createElement("button");
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path></svg>';
        button.addEventListener('click', this.handleClick.bind(this));
        buttonWrapper.appendChild(button);
        this.shadowRoot.appendChild(buttonWrapper);

        const pre = document.createElement("pre");
        const slot = document.createElement("slot");
        pre.appendChild(slot);
        this.shadowRoot.appendChild(pre);
    }

    connectedCallback() {
        if (window.Alpine != undefined) {
            Alpine.initTree(this.shadowRoot);
        }
    }

    async handleClick() {
        const contentNode = this.shadowRoot.querySelector('slot').assignedNodes()[0];
        if (!contentNode) {
            return;
        }

        const text = this.shadowRoot.querySelector('slot').assignedNodes()[0].textContent;
        await this.copyToClipboard(text);

        const button = this.shadowRoot.querySelector('button');
        button.classList.add('copied');

        setTimeout(() => {
            button.classList.remove('copied');
        }, 1000);
    }

    async copyToClipboard(textToCopy) {
        // Navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
        } else {
            // Use the 'out of viewport hidden text area' trick
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;

            // Move textarea out of the viewport so it's not visible
            textArea.style.position = "absolute";
            textArea.style.left = "-999999px";

            document.body.prepend(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (error) {
                console.error(error);
            } finally {
                textArea.remove();
            }
        }
    }
}

customElements.define('my-code-block', CodeBlock);
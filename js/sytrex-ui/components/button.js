// <ui-button>
// Lädt das HTML-Template und ersetzt den Inhalt durch einen echten Button

class UIButton extends HTMLElement {
    async connectedCallback() {
        // Template laden
        const res = await fetch("/html/components/ui/button.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html;

        // Shadow DOM aktivieren
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        // Button-Element im Shadow DOM finden
        const btn = shadow.querySelector("button");

        // Slot-Inhalt übernehmen (Text des Buttons)
        btn.innerHTML = this.innerHTML;

        // Optional: Varianten unterstützen
        const variant = this.getAttribute("variant");
        if (variant) {
            btn.classList.add(`btn-${variant}`);
        }
    }
}

customElements.define("ui-button", UIButton);

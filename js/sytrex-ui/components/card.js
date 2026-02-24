// <ui-card>
// Lädt das HTML-Template und rendert Bild, Titel und Inhalt

class UICard extends HTMLElement {
    async connectedCallback() {
        // Template laden
        const res = await fetch("/html/components/ui/card.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html;

        // Shadow DOM aktivieren
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        // Elemente im Shadow DOM referenzieren
        const img = shadow.querySelector(".card-img");
        const title = shadow.querySelector(".card-title");
        const text = shadow.querySelector(".card-text");

        // Attribute übernehmen
        img.src = this.getAttribute("image") || "";
        img.alt = this.getAttribute("title") || "Card Image";

        title.textContent = this.getAttribute("title") || "";

        // Slot-Inhalt übernehmen
        text.innerHTML = this.innerHTML;
    }
}

customElements.define("ui-card", UICard);

// <ui-grid>
// Lädt das Grid-Template und setzt dynamisch die Spaltenanzahl

class UIGrid extends HTMLElement {
    async connectedCallback() {
        // Template laden
        const res = await fetch("/html/components/ui/grid.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html;

        // Shadow DOM aktivieren
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        // Grid-Element im Shadow DOM finden
        const grid = shadow.querySelector(".grid");

        // Spaltenanzahl aus Attribut lesen
        const columns = this.getAttribute("columns") || "3";

        // Klasse hinzufügen (grid-2, grid-3, grid-4)
        grid.classList.add(`grid-${columns}`);

        // Slot-Inhalt übernehmen
        grid.innerHTML = `<slot></slot>`;
    }
}

customElements.define("ui-grid", UIGrid);

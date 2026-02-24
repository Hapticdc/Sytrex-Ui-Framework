// <ui-accordion>
// Lädt das Accordion-Template und steuert das Öffnen/Schließen

class UIAccordion extends HTMLElement {
    async connectedCallback() {
        // Template laden
        const res = await fetch("/html/components/ui/accordion.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html;

        // Shadow DOM aktivieren
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        // Elemente im Shadow DOM referenzieren
        const header = shadow.querySelector(".accordion-header");
        const body = shadow.querySelector(".accordion-body");

        // Titel aus Attribut übernehmen
        header.textContent = this.getAttribute("title") || "Abschnitt";

        // Slot-Inhalt übernehmen
        body.innerHTML = this.innerHTML;

        // Toggle-Logik
        header.addEventListener("click", () => {
            const isOpen = body.style.display === "block";
            body.style.display = isOpen ? "none" : "block";
        });
    }
}

customElements.define("ui-accordion", UIAccordion);

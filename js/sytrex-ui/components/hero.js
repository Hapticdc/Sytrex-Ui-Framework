// <ui-hero>
// Lädt das Hero-Template und setzt das Hintergrundbild + Inhalt

class UIHero extends HTMLElement {
    async connectedCallback() {
        // Template laden
        const res = await fetch("/html/components/ui/hero.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html;

        // Shadow DOM aktivieren
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        // Elemente im Shadow DOM referenzieren
        const hero = shadow.querySelector(".hero-image");
        const content = shadow.querySelector(".hero-content");

        // Hintergrundbild aus Attribut übernehmen
        const image = this.getAttribute("image");
        if (image) {
            hero.style.backgroundImage = `url(${image})`;
        }

        // Slot-Inhalt übernehmen
        content.innerHTML = this.innerHTML;
    }
}

customElements.define("ui-hero", UIHero);

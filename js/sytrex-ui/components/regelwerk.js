// <ui-regelwerk>
// Lädt ein Regelwerk aus einer JSON-Datei und rendert es dynamisch

class UIRegelwerk extends HTMLElement {
    async connectedCallback() {
        // Template laden
        const res = await fetch("/html/components/ui/regelwerk.html");
        const html = await res.text();

        const template = document.createElement("template");
        template.innerHTML = html;

        // Shadow DOM aktivieren
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        // JSON-Datei laden
        const src = this.getAttribute("src");
        if (!src) {
            console.error("ui-regelwerk: Kein 'src'-Attribut angegeben.");
            return;
        }

        const json = await fetch(src).then(r => r.json());

        // Container referenzieren
        const sectionContainer = shadow.querySelector(".regelwerk-sections");
        const consContainer = shadow.querySelector(".regelwerk-consequences");
        const noteContainer = shadow.querySelector(".regelwerk-note");

        /* ---------------------------------------------------------
           SECTIONS + REGELN
        --------------------------------------------------------- */
        json.sections.forEach(section => {
            const accordion = document.createElement("ui-accordion");
            accordion.setAttribute("title", section.title);

            let rulesHTML = "";

            section.rules.forEach(rule => {
                rulesHTML += `
                    <h3>
                        <ui-severity-dot level="${rule.severity}"></ui-severity-dot>
                        §${rule.id} ${rule.title}
                    </h3>
                    <p>${rule.text}</p>
                `;
            });

            accordion.innerHTML = rulesHTML;
            sectionContainer.appendChild(accordion);
        });

        /* ---------------------------------------------------------
           KONSEQUENZEN
        --------------------------------------------------------- */
        json.consequences.forEach(c => {
            const item = document.createElement("p");
            item.innerHTML = `
                <ui-severity-dot level="${c.severity}"></ui-severity-dot>
                ${c.label}
            `;
            consContainer.appendChild(item);
        });

        /* ---------------------------------------------------------
           HINWEIS
        --------------------------------------------------------- */
        noteContainer.textContent = json.note || "";
    }
}

customElements.define("ui-regelwerk", UIRegelwerk);

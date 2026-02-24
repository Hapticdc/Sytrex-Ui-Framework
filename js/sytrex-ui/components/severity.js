// <ui-severity-dot>
// Rendert einen farbigen Punkt mit Tooltip basierend auf dem "level"-Attribut

class UISeverityDot extends HTMLElement {
    connectedCallback() {
        const level = this.getAttribute("level") || "green";

        const colors = {
            green: "#22c55e",
            yellow: "#eab308",
            red: "#ef4444",
            black: "#000000"
        };

        const labels = {
            green: "Verwarnung",
            yellow: "Timeout",
            red: "Temporärer Bann",
            black: "Permanenter Bann"
        };

        this.innerHTML = `
            <span class="severity-dot"
                  style="background:${colors[level]};"
                  data-tooltip="${labels[level]}"></span>
        `;
    }
}

customElements.define("ui-severity-dot", UISeverityDot);

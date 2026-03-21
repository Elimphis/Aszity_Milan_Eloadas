import { FeladatLista } from "./FeladatLista.js";

export class Alkalmazas {

    constructor() {

        this.lista = new FeladatLista();

        this.kontener = document.createElement("div");
        this.kontener.classList.add("alkalmazas");
        this.kontener.classList += "flex col align-center gap-1 border-soft box-shadow padding-1 suti-card relative w-fc";

        let cim         = document.createElement("h2");
        cim.textContent = "Teendők";

        this.inputKontener = document.createElement("div");
        this.inputKontener.classList = "flex row gap-1 mb-1";

        this.bemenet                = document.createElement("input");
        this.bemenet.placeholder    = "Új feladat...";
        this.bemenet.type           = "text";

        this.gomb               = document.createElement("button");
        this.gomb.textContent   = "Hozzáadás";

        this.gomb.onclick = () => {
            if (this.bemenet.value.trim() !== "") {
                this.lista.ujFeladat(this.bemenet.value);
                this.bemenet.value = "";
            }
        };

        this.kontener.appendChild(cim);
        this.inputKontener.appendChild(this.bemenet);
        this.inputKontener.appendChild(this.gomb);
        this.kontener.appendChild(this.inputKontener);
        this.kontener.appendChild(this.lista.megjelenit());

    }


    indit() {

        document.getElementById('main').appendChild(this.kontener);

    }

}

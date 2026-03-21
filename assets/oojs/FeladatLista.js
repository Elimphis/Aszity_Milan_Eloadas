import { Feladat } from "./Feladat.js";

export class FeladatLista {

    constructor() {

        this.feladatok = [];
        this.kontener = document.createElement("div");

        this.betolt();

    }


    ujFeladat(szoveg) {

        this.feladatok.push(new Feladat(szoveg));
        this.ment();
        this.frissit();

    }


    torol(feladat) {

        this.feladatok = this.feladatok.filter(f => f !== feladat);
        this.ment();
        this.frissit();

    }


    frissit() {

        this.kontener.innerHTML = "";

        this.feladatok.forEach(feladat => {
            let elem = feladat.megjelenit(
                (f) => this.torol(f),
                () => {
                    this.ment();
                    this.frissit();
                }
            );
            this.kontener.appendChild(elem);
        });

    }


    ment() {

        localStorage.setItem("feladatok", JSON.stringify(this.feladatok));

    }


    betolt() {

        let adat = localStorage.getItem("feladatok");

        if (adat) {
            let tomb = JSON.parse(adat);
            this.feladatok = tomb.map(f => new Feladat(f.szoveg, f.kesz));
            this.frissit();
        }

    }


    megjelenit() {

        return this.kontener;

    }


}

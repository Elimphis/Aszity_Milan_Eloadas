export class Sutik {


    constructor(db) {
        this.db = db;
    }


    osszesSuti () {

        return this.db.suti;

    }


    sutiById(id) {

        return this.db.sutiById.get(id);

    }


    sutiArai(id) {

        return this.db.arBySuti.get(Number(id)) || [];

    }


    sutiTartalom(id) {

        return this.db.tartalomBySuti.get(Number(id)) || [];

    }


    dijazottSutik() {

        return this.db.suti.filter(s => s.dijazott === "-1");

    }


    glutenmentesSutik() {

        return this.db.tartalom
                .filter(t => t.mentes === "G")
                .map(t => this.sutiById(Number(t.sutiid)));

    }


    ujSuti(suti, ar) {

        this.db.suti.unshift(suti);
        this.db.sutiById.set(suti.id, suti);

        if (!this.db.arBySuti.has(suti.id)) {
            this.db.arBySuti.set(suti.id, []);
        }

        this.db.arBySuti.get(suti.id).push(ar);

    }


    sutiTorles (id) {

        id = Number(id);

        this.db.suti = this.db.suti.filter(suti => Number(suti.id) !== id);

        this.db.sutiById.delete(id);
        this.db.arBySuti.delete(id);
        this.db.tartalomBySuti.delete(id);

    }


    sutiModositas (id, ujAdatok) {

        id = Number(id);

        const suti = this.db.sutiById.get(id);

        if (!suti) return;

        suti.nev      = ujAdatok.nev;
        suti.tipus    = ujAdatok.tipus;
        suti.dijazott = ujAdatok.dijazott;

        this.db.arBySuti.set(id, [{
            sutiid  : id,
            ertek   : ujAdatok.ar,
            egyseg  : "db"
        }]);

    }


}
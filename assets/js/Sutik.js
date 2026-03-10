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


}
export class Segedlet {
    

    /**
     * CSV konvertáló segéd metódus
     * @param {string} csv 
     * @returns {array} eredmeny
     */
    CSVKonverter (csv) {
    
        const sorok  = csv.trim().split('\n');
        const fejlec = sorok.shift().split('\t');
    
        return sorok.map(sor => {
    
            const ertekek   = sor.split('\t');
            const obj       = {};
    
            fejlec.forEach((kulcs, i) => {
                obj[kulcs.trim()] = ertekek[i].trim();
            });
    
            return obj;
    
        });
    
    }
    

    /**
     * Tabla beolvaso metodus
     * @param {string} tablaUtvonal 
     */
    async tablaBeolvasasa(utvonal) {
    
        const valasz = await fetch(utvonal);
    
        if (!valasz.ok) {
            throw new Error(`${utvonal}: ${valasz.status}`);
        }
    
        const text = await valasz.text();
    
        return this.CSVKonverter(text);
    
    }
    

    // Adatok mentése tömbbe
    async adatokBetoltese() {
    
        const [ar, suti, tartalom] = await Promise.all([
            this.tablaBeolvasasa('tablak/ar.txt'),
            this.tablaBeolvasasa('tablak/suti.txt'),
            this.tablaBeolvasasa('tablak/tartalom.txt')
        ]);
    
        return { ar, suti, tartalom };
    }
    
    /**
     * Betöltött adatok indexelése, az adatok kezelhetőségéhez
     * @param {array} adatok 
     * @returns 
     */
    indexeles(adatok) {
    
        const sutiById          = new Map();
        const arBySuti          = new Map();
        const tartalomBySuti    = new Map();
    
        adatok.suti.forEach(s => {
    
            sutiById.set(Number(s.id), s);
    
        });
    
        adatok.ar.forEach(a => {
    
            const id = Number(a.sutiid);
    
            if (!arBySuti.has(id)) {
                arBySuti.set(id, []);
            }
    
            arBySuti.get(id).push(a);
    
        });
    
        adatok.tartalom.forEach(t => {
    
            const id = Number(t.sutiid);
    
            if (!tartalomBySuti.has(id)) {
                tartalomBySuti.set(id, []);
            }
    
            tartalomBySuti.get(id).push(t);
    
        });
    
        return {
            ...adatok,
            sutiById,
            arBySuti,
            tartalomBySuti
        };
    }

    
}

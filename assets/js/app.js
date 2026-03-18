import { Segedlet }     from "./Segedlet.js";
import { Sutik }        from "./Sutik.js";
import { SutiRenderer } from "./SutiRender.js";

const SUTEMENY_KONTENER = document.getElementById('sutemeny-kontener');

let sutik       = [];
let sutiService = null;

async function init() {

    try {

        const seged  = new Segedlet();

        const adatok = await seged.adatokBetoltese();
        const db     = seged.indexeles(adatok);

        sutiService = new Sutik(db);
        sutik       = sutiService.osszesSuti();

        const renderer    = new SutiRenderer(
            SUTEMENY_KONTENER,
            sutiService
        );

        renderer.render(sutik);

        return sutik;

    }
    catch (err) {
        console.error(err);
    }

}

async function reInit (lista = sutik) {

    const renderer    = new SutiRenderer(
        SUTEMENY_KONTENER,
        sutiService
    );

    renderer.render(lista);

}


init();


document.getElementById('suti-felvetele').addEventListener('click', () => {

    if (
        document.getElementById('suti-neve').value == '' ||
        document.getElementById('suti-tipusa').value == '' ||
        document.getElementById('suti-ara').value == ''
    ) {

        alert('Minden mező kitöltése kötelező!');
        return;

    }

    const ujId     = Math.max(...sutik.map(s => Number(s.id))) + 1;
    const sutiAdat = {
        id       : ujId,
        dijazott : document.getElementById('suti-dijazott').checked ? "-1" : "0",
        nev      : document.getElementById('suti-neve').value,
        tipus    : document.getElementById('suti-tipusa').value
    };

    const ar = {
        sutiid : ujId,
        ertek  : document.getElementById('suti-ara').value,
        egyseg : "db"
    };

    sutiService.ujSuti(sutiAdat, ar);

    document.getElementById('suti-neve').value = '';
    document.getElementById('suti-tipusa').value = '';
    document.getElementById('suti-ara').value = '';

    reInit();
});


document.getElementById('suti-modositas-mentes').addEventListener('click', () => {

    if (
        document.getElementById('suti-modositas-neve').value == '' ||
        document.getElementById('suti-modositas-tipusa').value == '' ||
        document.getElementById('suti-modositas-ara').value == ''
    ) {

        alert('Minden mező kitöltése kötelező!');
        return;

    }

    const kivalasztottSutiId = document.getElementById('suti-modositas-id').value;

    const sutiAdat = {
        id       : kivalasztottSutiId,
        dijazott : document.getElementById('suti-modositas-dijazott').checked ? "-1" : "0",
        nev      : document.getElementById('suti-modositas-neve').value,
        tipus    : document.getElementById('suti-modositas-tipusa').value,
        ar       : document.getElementById('suti-modositas-ara').value
    };

    sutiService.sutiModositas(kivalasztottSutiId, sutiAdat);

    reInit();
});


document.getElementById('suti-felvetele-trigger').addEventListener('click', () => {

    document.getElementById('suti-letrehozas-kontener').classList.replace('hidden', 'flex');

});


document.getElementById('suti-letrehozas-kontener-bezaras').addEventListener('click', () => {

    document.getElementById('suti-letrehozas-kontener').classList.replace('flex', 'hidden');

});


document.getElementById('suti-modositas-kontener-bezaras').addEventListener('click', () => {

    document.getElementById('suti-modositas-kontener').classList.replace('flex', 'hidden');

});


document.addEventListener('click', (e) => {

    const kivalasztottSuti = e.target.closest('[suti-akcio]')

    if (!kivalasztottSuti) return;

    const sutiAkcio         = kivalasztottSuti.getAttribute("suti-akcio");
    let kivalasztottSutiId  = Number(kivalasztottSuti.getAttribute('data-id'));

    switch (sutiAkcio) {

        case 'suti-torles':
    
            sutiService.sutiTorles(kivalasztottSutiId)
            sutik = sutiService.osszesSuti();
            reInit();

        break;

        case 'suti-modositas':

            document.getElementById('suti-modositas-kontener').classList.replace('hidden', 'flex');

            const kivalasztottSutiAdat = sutiService.sutiById(kivalasztottSutiId);
            const kivalasztottSutiArai = sutiService.sutiArai(kivalasztottSutiId).map(a => `${a.ertek} Ft / ${a.egyseg}`).join(", ");

            document.getElementById('suti-modositas-neve').value        = kivalasztottSutiAdat.nev
            document.getElementById('suti-modositas-tipusa').value      = kivalasztottSutiAdat.tipus
            document.getElementById('suti-modositas-ara').value         = kivalasztottSutiArai
            document.getElementById('suti-modositas-dijazott').checked  = kivalasztottSutiAdat.dijazott === "-1";
            document.getElementById('suti-modositas-id').value          = kivalasztottSutiId;

        break;
    
        default: return;
    }

})

document.getElementById('suti-kereso').addEventListener('keyup', (e) => {
    
    const keresettSzo = e.target.value.toLowerCase();

    const szurt = sutik.filter(suti => 
        suti.nev.toLowerCase().includes(keresettSzo) ||
        suti.tipus.toLowerCase().includes(keresettSzo)
    );

    reInit(szurt);


})
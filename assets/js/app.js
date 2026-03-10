import { Segedlet }     from "./Segedlet.js";
import { Sutik }        from "./Sutik.js";
import { SutiRenderer } from "./SutiRender.js";

const SUTEMENY_KONTENER = document.getElementById('sutemeny-kontener');

async function init() {

    try {

        const seged  = new Segedlet();

        const adatok = await seged.adatokBetoltese();
        const db     = seged.indexeles(adatok);

        const sutiService = new Sutik(db);
        const sutik       = sutiService.osszesSuti();

        const renderer    = new SutiRenderer(
            SUTEMENY_KONTENER,
            sutiService
        );

        renderer.render(sutik);

    }
    catch (err) {
        console.error(err);
    }

}

init();

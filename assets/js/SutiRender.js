export class SutiRenderer {


    constructor(container, sutiService) {
        this.container   = container;
        this.sutiService = sutiService;
    }


    /**
     * Suti kartya rendereles
     * @param {array} sutik 
     */
    render(sutik) {

        this.container.innerHTML = "";

        const fragment = document.createDocumentFragment();

        sutik.forEach(suti => {
            fragment.appendChild(this.renderSutiKartya(suti));
        });

        this.container.appendChild(fragment);
    }


    /**
     * Kartya kontener feltoltese kartyakkal
     * @param {array} suti 
     * @returns {HTMLDivElement} sutiKartya
     */
    renderSutiKartya(suti) {

        const sutiKartya     = document.createElement("div");
        sutiKartya.className = "flex col align-center gap-1 border-soft box-shadow padding-1 suti-card relative";

        const arak = this.sutiService
            .sutiArai(suti.id)
            .map(a => `${a.ertek} Ft / ${a.egyseg}`)
            .join(", ");

        const mentes = this.sutiService
            .sutiTartalom(suti.id)
            .map(a => `${a.mentes}`)
            .join(", ");

        sutiKartya.innerHTML = `

            <div class="flex row space-between gap-1 w-fa">
                <span class="card-danger">${mentes}</span>
                ${
                    suti.dijazott === "-1" ? 
                        `
                            <div class="card-badge" title="Díjazott sütemény">
                                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#ffaa00"></path> </g></svg>
                            </div>
                        `
                    :
                        ``
                }
            </div>

            <svg height="4rem" width="4rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 296.998 296.998" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_1106_"> <circle id="XMLID_1107_" style="fill:#FF5959;" cx="106.499" cy="55" r="24"></circle> <circle id="XMLID_1108_" style="fill:#FF5959;" cx="148.499" cy="41.999" r="28"></circle> <circle id="XMLID_1109_" style="fill:#FF5959;" cx="190.499" cy="55" r="24"></circle> <path id="XMLID_584_" style="fill:#FFE165;" d="M269.181,282.999H27.817C12.518,282.999,0,270.482,0,255.182l0,0 c0-15.299,12.518-27.817,27.817-27.817h241.364c15.299,0,27.817,12.518,27.817,27.817l0,0 C296.998,270.482,284.48,282.999,269.181,282.999z"></path> <path id="XMLID_583_" style="fill:#FFE165;" d="M269.181,173.243H27.817C12.518,173.243,0,160.725,0,145.426l0,0 c0-15.299,12.518-27.817,27.817-27.817h241.364c15.299,0,27.817,12.518,27.817,27.817l0,0 C296.998,160.725,284.48,173.243,269.181,173.243z"></path> <path id="XMLID_582_" style="fill:#FFA250;" d="M269.181,228.121H27.817C12.518,228.121,0,215.603,0,200.304l0,0 c0-15.299,12.518-27.817,27.817-27.817h241.364c15.299,0,27.817,12.518,27.817,27.817l0,0 C296.998,215.603,284.48,228.121,269.181,228.121z"></path> <path id="XMLID_581_" style="fill:#FFA250;" d="M269.181,118.365H27.817C12.518,118.365,0,105.847,0,90.548l0,0 c0-15.299,12.518-27.817,27.817-27.817h241.364c15.299,0,27.817,12.518,27.817,27.817l0,0 C296.998,105.847,284.48,118.365,269.181,118.365z"></path> <path id="XMLID_1110_" style="fill:#FFFEB9;" d="M47,62.731v126.293c0,15.299,12.518,27.817,27.817,27.817l0,0 c15.299,0,27.817-12.518,27.817-27.817V62.731H47z"></path> <path id="XMLID_1111_" style="fill:#FFFEB9;" d="M101.878,62.731v82.683c0,15.299,12.518,27.817,27.817,27.817l0,0 c15.299,0,27.817-12.518,27.817-27.817V62.731H101.878z"></path> </g> </g></svg>

            <div class="flex col align-center">
                <span class="card-title">${suti.nev}</span>
                <span class="card-descr">${suti.tipus}</span>
            </div>

            <span class="card-primary">${arak}</span>
        `;

        return sutiKartya;

    }


}
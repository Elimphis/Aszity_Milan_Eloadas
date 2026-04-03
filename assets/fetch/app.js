const API       = "/assets/fetch/PHP/api.php";
const FORM      = document.getElementById("suti-letrehozas-kontener"); 
const MESSAGE   = document.getElementById("message");

window.onload = async function() {

    await fetchSuti();

    document.getElementById("suti-felvetele").addEventListener("click", sutiMentes);

    let torles = document.getElementsByClassName('suti-torles');

    for (let i = 0; i < torles.length; i ++) {

        torles[i].addEventListener('click', (e) => {

            sutiTorles(torles[i].dataset.id);

        })

    }

    let update = document.getElementsByClassName('suti-update');

    for (let i = 0; i < update.length; i ++) {

        update[i].addEventListener('click', (e) => {

            sutiUpdate(update[i].dataset.id, e);

        })

    }

};

function sutiMentes () {

    const nev       = document.getElementById("suti-neve").value;
    const tipus     = document.getElementById("suti-tipusa").value;
    const dijazott  = document.getElementById("suti-dijazott").checked;


    if (nev.length < 1 || tipus.length < 1) {

        MESSAGE.innerText = "Minden mező kitöltése kötelező!";
        MESSAGE.style.color = "red";

        return;

    }

    const sutiAdat = {

        nev      : nev,
        tipus    : tipus,
        dijazott : dijazott

    };

    fetch(API, {
        method  : "POST",
        headers : {"Content-Type": "application/json"},
        body    : JSON.stringify(sutiAdat)
    })
    .then(res => res.json())
    .then(data => {

        FORM.reset();

        if (data.success == true) {

            MESSAGE.innerText = data.message;
            MESSAGE.style.color = "green";

        }
        else {

            MESSAGE.innerText = "Hiba történt a folyamat közben: " + data.error;
            MESSAGE.style.color = "red";

        }

        fetchSuti();

    })
    .catch(error => {

        MESSAGE.innerText = "Hiba történt a folyamat közben!";
        MESSAGE.style.color = "red";

        console.log(error)

    });

}

function sutiUpdate (id, btn) {

    const row = btn.target.closest('tr');
    const ch  = document.getElementsByClassName("can-hide");

    for (let i = 0; i < ch.length; i ++) {

        ch[i].remove();

    }


    let wrapper = document.createElement('tr')
    wrapper.innerHTML = `
        <td colspan="5" class="can-hide">
            <form class="flex row gap-1 w-fa card padding-1 border-soft box-shadow" id="suti-update-kontener">

                <input type="hidden" id="suti-update-id" value="${id}" />
                <input 
                    type="text" 
                    id="suti-update-neve" 
                    placeholder="Adja meg a sütemény nevét"
                    value="${row.querySelector('.suti-nev').textContent}"
                />
                <input 
                    type="text" 
                    id="suti-update-tipusa" 
                    placeholder="Adja meg a sütemény típusát"
                    value="${row.querySelector('.suti-tipus').textContent}"
                />
                <div class="flex row align-center gap-1">
                    <label for="suti-dijazott">Díjazott sütemény</label>
                    <input 
                        type="checkbox"
                        name="suti-dijazott"
                        id="suti-update-dijazott"
                        value="1"
                        ${row.querySelector('.suti-dijazott').textContent == "Igen" ? "checked" : ""}
                    />
                </div>

                <button type="button" class="flex w-fc suti-mentese-post" id="suti-mentese-post">Sütemény mentése</button>

            </form>
        </td>
    `;

    insertAfter(row, wrapper)

    document.getElementById("suti-mentese-post").addEventListener('click', sutiUpdateMentes);

}

function sutiUpdateMentes () {

    const sutiAdat = {

        id       : document.getElementById('suti-update-id').value,
        nev      : document.getElementById('suti-update-neve').value,
        tipus    : document.getElementById('suti-update-tipusa').value,
        dijazott : document.getElementById('suti-update-dijazott').checked,

    }

    fetch(API, {
        method  : "PUT",
        headers : {"Content-Type": "application/json"},
        body    : JSON.stringify(sutiAdat)
    })
    .then(res => res.json())
    .then(data => {

        if (data.success == true) {

            MESSAGE.innerText = data.message;
            MESSAGE.style.color = "green";

        }
        else {

            MESSAGE.innerText = "Hiba történt a folyamat közben: " + data.error;
            MESSAGE.style.color = "red";

        }

        fetchSuti();

    })
    .catch(error => {

        MESSAGE.innerText = "Hiba történt a folyamat közben!";
        MESSAGE.style.color = "red";

        console.log(error)

    });

}

function sutiTorles (id) {

    const sutiAdat = {
        id : id
    };

    if (confirm("Biztosan törölni szeretné ezt a süteményt?")) {

        fetch(API, {
            method  : "DELETE",
            headers : {"Content-Type": "application/json"},
            body    : JSON.stringify(sutiAdat)
        })
        .then(res => res.json())
        .then(data => {

            if (data.success == true) {

                MESSAGE.innerText = data.message;
                MESSAGE.style.color = "green";

            }
            else {

                MESSAGE.innerText = "Hiba történt a folyamat közben: " + data.error;
                MESSAGE.style.color = "red";

            }

            fetchSuti();

        })
        .catch(error => {

            MESSAGE.innerText = "Hiba történt a folyamat közben!";
            MESSAGE.style.color = "red";

            console.log(error)

        });        

    }

}

async function fetchSuti () {

    document.getElementById('sutiTabla').innerHTML = "";

    await fetch(API)
    .then(res => res.json())
    .then(data => {

        if (data.success == false ) {

            document.getElementById('message').textContent = "Hiba történt a lekérdezés közben: " . data.error;
            return;

        }

        data.data.forEach(suti => {
            
            document.getElementById('sutiTabla').innerHTML += `
                <tr>
                    <td class="suti-id">${suti.id}</td>
                    <td class="suti-nev">${suti.nev}</td>
                    <td class="suti-tipus">${suti.tipus}</td>
                    <td class="suti-dijazott">${suti.dijazott === 0 ? 'Nem' : 'Igen'}</td>
                    <td>
                        <div class="flex row align-center justify-center gap-1">
                            <div class="card-badge pointer suti-update" data-id="${suti.id}" suti-akcio="suti-modositas" title="Sütemény szerkesztése">
                                <svg width="1rem" height="1rem" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#0042aa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"></path> </g></svg>
                            </div>
                            <div class="card-badge pointer suti-torles" data-id="${suti.id}" suti-akcio="suti-torles" title="Sütemény törlése">
                                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#ff2600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </div>
                        </div>
                    </td>
                </tr>
            `;

        });


    })
    .catch(error => {

        MESSAGE.innerText = "Hiba történt a folyamat közben!";
        MESSAGE.style.color = "red";

        console.log(error)

    });

}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
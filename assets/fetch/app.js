const API  = "/assets/fetch/PHP/api.php";
const FORM = document.getElementById("suti-letrehozas-kontener"); 

function sutiMentes () {

    const sutiAdat = new FormData(FORM);

    fetch(API, {
        method  : POST,
        headers : {"Content-Type": "application/json"},
        body    : JSON.stringify(sutiAdat)
    })
    .then(res => res.json())
    .then(data => {

        FORM.reset();
        document.getElementById("message").innerText = data.status;

        console.log(data);
        // fetchSuti();

    });

}

function fetchSuti () {

    fetch(API)
    .then(res => res.json())
    .then(data => {

        console.log(data);

        if (data.success == false ) {

            document.getElementById('message').textContent = "Hiba történt a lekérdezés közben: " . data.error;
            return;

        }

        data.data.forEach(suti => {
            
            document.getElementById('sutiTabla').innerHTML += `
                <tr>
                    <td>${suti.id}</td>
                    <td>${suti.nev}</td>
                    <td>${suti.tipus}</td>
                    <td>${suti.dijazott === 0 ? 'Nem' : 'Igen'}</td>
                    <td></td>
                </tr>
            `;

        });


    });

}

fetchSuti();
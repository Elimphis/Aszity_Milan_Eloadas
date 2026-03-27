import React, { useState }  from "react";
import SutiTabla            from "/src/tables/SutiTabla";
import SutiSzerkesztForm    from "/src/forms/SutiSzerkesztForm";
import AddSutiForm          from "/src/forms/AddSutiForm";

const App = () => {

  const sutemenyek                              = [
    { id: 1, nev: "Süni", tipus: "vegyes", dijazott: 0 },
    { id: 2, nev: "Gesztenyealagút", tipus: "vegyes", dijazott: 0 },
    { id: 3, nev: "Sajtos pogácsa", tipus: "sós teasütemény", dijazott: 0 },
    { id: 4, nev: "Diós-mákos", tipus: "bejgli", dijazott: 0 },
    { id: 5, nev: "Sajttorta (málnás)", tipus: "torta", dijazott: 0 },
    { id: 6, nev: "Citrom", tipus: "torta", dijazott: 0 },
    { id: 7, nev: "Eszterházy", tipus: "tortaszelet", dijazott: 0 },
    { id: 8, nev: "Rákóczi-túrós", tipus: "pite", dijazott: 0 },
    { id: 9, nev: "Meggyes kocka", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 10, nev: "Legényfogó", tipus: "torta", dijazott: -1 },
    { id: 11, nev: "Alpesi karamell", tipus: "tortaszelet", dijazott: 0 },
    { id: 12, nev: "Kókuszcsók", tipus: "édes teasütemény", dijazott: 0 },
    { id: 13, nev: "Habos mákos", tipus: "pite", dijazott: 0 },
    { id: 14, nev: "Szilvás", tipus: "pite", dijazott: 0 },
    { id: 15, nev: "Juhtúrós párna", tipus: "sós teasütemény", dijazott: 0 },
    { id: 16, nev: "Mákos guba", tipus: "tortaszelet", dijazott: 0 },
    { id: 17, nev: "Néró", tipus: "édes teasütemény", dijazott: 0 },
    { id: 18, nev: "Sacher", tipus: "tortaszelet", dijazott: 0 },
    { id: 19, nev: "Citrom", tipus: "tortaszelet", dijazott: 0 },
    { id: 20, nev: "Ribizlihabos-almás réteges", tipus: "különleges torta", dijazott: -1 },
    { id: 21, nev: "Három kívánság", tipus: "torta", dijazott: -1 },
    { id: 22, nev: "Dobos", tipus: "torta", dijazott: 0 },
    { id: 23, nev: "Epres mascarpone", tipus: "tortaszelet", dijazott: 0 },
    { id: 24, nev: "Csokoládémousse", tipus: "torta", dijazott: 0 },
    { id: 25, nev: "Oroszkrém", tipus: "torta", dijazott: 0 },
    { id: 26, nev: "Medvetalp", tipus: "vegyes", dijazott: 0 },
    { id: 27, nev: "Trüffel", tipus: "torta", dijazott: 0 },
    { id: 28, nev: "Tejszínes gyümölcsös (meggy)", tipus: "torta", dijazott: 0 },
    { id: 29, nev: "Mákos-szilvalekváros", tipus: "bejgli", dijazott: 0 },
    { id: 30, nev: "Ribizlihabos-almás réteges tortaszelet", tipus: "tortaszelet", dijazott: 0 },
    { id: 31, nev: "Marcipános vágott", tipus: "édes teasütemény", dijazott: 0 },
    { id: 32, nev: "Indiáner", tipus: "vegyes", dijazott: 0 },
    { id: 33, nev: "Meggyes", tipus: "pite", dijazott: 0 },
    { id: 34, nev: "Mákos", tipus: "bejgli", dijazott: 0 },
    { id: 35, nev: "Sós karamella", tipus: "torta", dijazott: 0 },
    { id: 36, nev: "Legényfogó", tipus: "tortaszelet", dijazott: 0 },
    { id: 37, nev: "Rigó Jancsi", tipus: "torta", dijazott: 0 },
    { id: 38, nev: "Tejszínes gyümölcsös (erdei gyümölcs)", tipus: "torta", dijazott: 0 },
    { id: 39, nev: "Ez+Az (csokoládé és gesztenye)", tipus: "torta", dijazott: 0 },
    { id: 40, nev: "Málnás mascarpone", tipus: "torta", dijazott: 0 },
    { id: 41, nev: "Dobos", tipus: "tortaszelet", dijazott: 0 },
    { id: 42, nev: "Ferrero", tipus: "torta", dijazott: 0 },
    { id: 43, nev: "Vegyes házi pite falatok", tipus: "pite", dijazott: 0 },
    { id: 44, nev: "Ökörszem", tipus: "édes teasütemény", dijazott: 0 },
    { id: 45, nev: "Danubius kocka", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 46, nev: "Sajtkrémmel töltött fánkocska", tipus: "sós teasütemény", dijazott: 0 },
    { id: 47, nev: "Túrókrém gyümölccsel díszítve", tipus: "tortaszelet", dijazott: 0 },
    { id: 48, nev: "Almás", tipus: "pite", dijazott: 0 },
    { id: 49, nev: "Mignon", tipus: "vegyes", dijazott: 0 },
    { id: 50, nev: "Csokoládémousse fényes csokoládéval", tipus: "torta", dijazott: 0 },
    { id: 51, nev: "Vágott sós (sós omlós)", tipus: "sós teasütemény", dijazott: 0 },
    { id: 52, nev: "Nagyi sós", tipus: "sós teasütemény", dijazott: 0 },
    { id: 53, nev: "Vegyes sós", tipus: "sós teasütemény", dijazott: 0 },
    { id: 54, nev: "Somlói", tipus: "tortaszelet", dijazott: 0 },
    { id: 55, nev: "Tiramisu", tipus: "tortaszelet", dijazott: 0 },
    { id: 56, nev: "Hegyvidék", tipus: "tortaszelet", dijazott: 0 },
    { id: 57, nev: "Szedres csokoládé", tipus: "tortaszelet", dijazott: 0 },
    { id: 58, nev: "Pogácsák vegyesen", tipus: "sós teasütemény", dijazott: 0 },
    { id: 59, nev: "Lúdláb", tipus: "torta", dijazott: 0 },
    { id: 60, nev: "Sacher", tipus: "torta", dijazott: 0 },
    { id: 61, nev: "Eszterházy", tipus: "torta", dijazott: 0 },
    { id: 62, nev: "Zalavári gesztenye", tipus: "tortaszelet", dijazott: 0 },
    { id: 63, nev: "Gesztenyegolyó", tipus: "vegyes", dijazott: 0 },
    { id: 64, nev: "Pisztáciás-málnás mascarpone", tipus: "tortaszelet", dijazott: 0 },
    { id: 65, nev: "Habos mákos", tipus: "vegyes", dijazott: 0 },
    { id: 66, nev: "Franciakrémes", tipus: "krémes", dijazott: 0 },
    { id: 67, nev: "Gesztenye kocka", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 68, nev: "Pisztáciás-málnás mascarpone", tipus: "torta", dijazott: 0 },
    { id: 69, nev: "Málnás kocka", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 70, nev: "Sajttorta (málnás)", tipus: "tortaszelet", dijazott: 0 },
    { id: 71, nev: "Túrókrém gyümölccsel", tipus: "torta", dijazott: 0 },
    { id: 72, nev: "Csokis kaland", tipus: "különleges torta", dijazott: -1 },
    { id: 73, nev: "Somlói", tipus: "torta", dijazott: 0 },
    { id: 74, nev: "Palermo", tipus: "torta", dijazott: 0 },
    { id: 75, nev: "Szilvalekváros", tipus: "bejgli", dijazott: 0 },
    { id: 76, nev: "Ünnepi diótorta grillázzsal", tipus: "torta", dijazott: 0 },
    { id: 77, nev: "Oroszkrém", tipus: "tortaszelet", dijazott: 0 },
    { id: 78, nev: "Mini zserbó", tipus: "édes teasütemény", dijazott: 0 },
    { id: 79, nev: "Sajtos masni", tipus: "sós teasütemény", dijazott: 0 },
    { id: 80, nev: "Zserbó", tipus: "pite", dijazott: 0 },
    { id: 81, nev: "Tejszínes gyümölcsös (málna)", tipus: "torta", dijazott: 0 },
    { id: 82, nev: "Marcipános csokoládé", tipus: "torta", dijazott: 0 },
    { id: 83, nev: "Csokis kaland", tipus: "tortaszelet", dijazott: 0 },
    { id: 84, nev: "Marcipán tekercs", tipus: "édes teasütemény", dijazott: 0 },
    { id: 85, nev: "Képviselőfánk", tipus: "vegyes", dijazott: 0 },
    { id: 86, nev: "Epres omlett", tipus: "vegyes", dijazott: 0 },
    { id: 87, nev: "Mini linzer", tipus: "édes teasütemény", dijazott: 0 },
    { id: 88, nev: "Linzerkarika", tipus: "vegyes", dijazott: 0 },
    { id: 89, nev: "Szedres csokoládé", tipus: "torta", dijazott: 0 },
    { id: 90, nev: "Narancsív", tipus: "édes teasütemény", dijazott: 0 },
    { id: 91, nev: "Gesztenyepüré", tipus: "vegyes", dijazott: 0 },
    { id: 92, nev: "Palermo", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 93, nev: "Csokis néró", tipus: "édes teasütemény", dijazott: 0 },
    { id: 94, nev: "Flódni", tipus: "pite", dijazott: 0 },
    { id: 95, nev: "Mézeskalács", tipus: "torta", dijazott: 0 },
    { id: 96, nev: "Olívás pogácsa", tipus: "sós teasütemény", dijazott: 0 },
    { id: 97, nev: "Florentin", tipus: "édes teasütemény", dijazott: 0 },
    { id: 98, nev: "Tiramisu", tipus: "torta", dijazott: 0 },
    { id: 99, nev: "Zoli kedvence (vágott édes tea)", tipus: "édes teasütemény", dijazott: 0 },
    { id: 100, nev: "Erdei gyümölcs kocka", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 101, nev: "Rákóczi-túrós", tipus: "tortaszelet", dijazott: 0 },
    { id: 102, nev: "Mézeskrémes", tipus: "pite", dijazott: 0 },
    { id: 103, nev: "Trüffel", tipus: "tortaszelet", dijazott: 0 },
    { id: 104, nev: "Szilvás papucs", tipus: "édes teasütemény", dijazott: 0 },
    { id: 105, nev: "Zalavári gesztenye", tipus: "torta", dijazott: -1 },
    { id: 106, nev: "Danubius", tipus: "torta", dijazott: 0 },
    { id: 107, nev: "Alpesi karamell", tipus: "torta", dijazott: 0 },
    { id: 108, nev: "Puncs", tipus: "torta", dijazott: 0 },
    { id: 109, nev: "Gesztenye szív", tipus: "vegyes", dijazott: 0 },
    { id: 110, nev: "Ez+Az (csokoládé és gesztenye)", tipus: "tortaszelet", dijazott: 0 },
    { id: 111, nev: "Tökmagos félhold", tipus: "sós teasütemény", dijazott: 0 },
    { id: 112, nev: "Burgonyás pogácsa", tipus: "sós teasütemény", dijazott: 0 },
    { id: 113, nev: "Somlói galuska", tipus: "vegyes", dijazott: 0 },
    { id: 114, nev: "Puncs", tipus: "tortaszelet", dijazott: 0 },
    { id: 115, nev: "Lekváros vágott", tipus: "édes teasütemény", dijazott: 0 },
    { id: 116, nev: "Oreo", tipus: "torta", dijazott: 0 },
    { id: 117, nev: "Vintage", tipus: "torta", dijazott: 0 },
    { id: 118, nev: "Rigó Jancsi", tipus: "tejszínes sütemény", dijazott: 0 },
    { id: 119, nev: "Feketeerdő", tipus: "torta", dijazott: 0 },
    { id: 120, nev: "Kókuszos vágott", tipus: "édes teasütemény", dijazott: 0 },
    { id: 121, nev: "Feketeerdő", tipus: "tortaszelet", dijazott: 0 },
    { id: 122, nev: "Moscauer", tipus: "édes teasütemény", dijazott: 0 },
    { id: 123, nev: "Diós", tipus: "bejgli", dijazott: 0 },
    { id: 124, nev: "Rákóczi-túrós", tipus: "torta", dijazott: 0 },
    { id: 125, nev: "Három kívánság", tipus: "különleges torta", dijazott: 0 },
    { id: 126, nev: "Gesztenyés-karamellás", tipus: "bejgli", dijazott: 0 },
    { id: 127, nev: "Gesztenyés szív", tipus: "édes teasütemény", dijazott: 0 },
    { id: 128, nev: "Ropi", tipus: "sós teasütemény", dijazott: 0 },
    { id: 129, nev: "Paleolit étcsokoládé", tipus: "különleges torta", dijazott: 0 },
    { id: 130, nev: "Túrós", tipus: "pite", dijazott: 0 },
    { id: 131, nev: "Ischler", tipus: "vegyes", dijazott: 0 },
    { id: 132, nev: "Lúdláb", tipus: "tortaszelet", dijazott: 0 },
    { id: 133, nev: "Csokoládémousse", tipus: "tortaszelet", dijazott: 0 },
    { id: 134, nev: "Dió", tipus: "torta", dijazott: 0 },
    { id: 135, nev: "Krémes", tipus: "krémes", dijazott: 0 },
    { id: 136, nev: "Mini ischler", tipus: "édes teasütemény", dijazott: 0 },
    { id: 137, nev: "Paleolit étcsokoládé", tipus: "tortaszelet", dijazott: 0 },
    { id: 138, nev: "Tejfölös túrós hajtogatott", tipus: "sós teasütemény", dijazott: 0 },
    { id: 139, nev: "Mákos guba", tipus: "torta", dijazott: 0 }
  ];

  const [sutemenyLista, setSutemenyLista]       = useState(sutemenyek);
  const [aktualisSutemeny, setAktualisSutemeny] = useState(null);
  const [szerkesztes, setSzerkesztes]           = useState(false);


  const addSutemeny = sutemeny => {

    sutemeny.id = Math.max(...sutemenyLista.map(s => s.id), 0) + 1;
    setSutemenyLista([...sutemenyLista, sutemeny]);

  };


  const deleteSutemeny = id => {

    setSzerkesztes(false);
    setSutemenyLista(sutemenyLista.filter(s => s.id !== id));

  };


  const editRow = sutemeny => {

    setSzerkesztes(true);
    setAktualisSutemeny(sutemeny);

  };


  const updateSutemeny = (id, updatedSutemeny) => {

    setSzerkesztes(false);
    setSutemenyLista(
      sutemenyLista.map(s => (s.id === id ? updatedSutemeny : s))
    );

  };

  return (
    <div>
      <h1>Sütemény CRUD alkalmazás</h1>

      <br />

      <h2>{szerkesztes ? "Sütemény szerkesztése" : "Új sütemény hozzáadása"}</h2>

      {!szerkesztes ? (
        <AddSutiForm addSuti={addSutemeny} />
      ) : (
        <SutiSzerkesztForm
          setEditing={setSzerkesztes}
          aktualisSuti={aktualisSutemeny}
          setAktualisSuti={setAktualisSutemeny}
          sutiSzerkeszt={updateSutemeny}
        />
      )}

      <br />

      <h2>Sütemények listája</h2>

      <SutiTabla
        sutik={sutemenyLista}
        editRow={editRow}
        deleteSuti={deleteSutemeny}
      />
    </div>
  );
};

export default App;
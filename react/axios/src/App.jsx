import React, { useState, useEffect }   from "react";
import api                              from "./api";

import SutiTabla            from "./tables/SutiTabla";
import SutiSzerkesztForm    from "./forms/SutiSzerkesztForm";
import AddSutiForm          from "./forms/AddSutiForm";

const App = () => {

  const [sutemenyLista, setSutemenyLista]       = useState([]);
  const [aktualisSutemeny, setAktualisSutemeny] = useState(null);
  const [szerkesztes, setSzerkesztes]           = useState(false);


  useEffect(() => {

    api.get("/sutik")
      .then(res => setSutemenyLista(res.data))
      .catch(err => console.error(err));

  }, []);


  const addSutemeny = sutemeny => {

    api.post("/sutik", sutemeny)
      .then(res => {
        setSutemenyLista([...sutemenyLista, res.data]);
      })
      .catch(err => console.error(err));

  };


  const deleteSutemeny = id => {

    api.delete(`/sutik/${id}`)
      .then(() => {
        setSutemenyLista(sutemenyLista.filter(s => s.id !== id));
      })
      .catch(err => console.error(err));

  };


  const editRow = sutemeny => {

    setSzerkesztes(true);
    setAktualisSutemeny(sutemeny);

  };


  const updateSutemeny = (id, updatedSutemeny) => {

    api.put(`/sutik/${id}`, updatedSutemeny)
      .then(res => {
        setSutemenyLista(
          sutemenyLista.map(s => (s.id === id ? res.data : s))
        );
        setSzerkesztes(false);
      })
      .catch(err => console.error(err));

  };

  return (
    <div>
      <h1>Sütemény CRUD alkalmazás</h1>

      <h2>
        {szerkesztes
          ? "Sütemény szerkesztése"
          : "Új sütemény hozzáadása"}
      </h2>

      {!szerkesztes ? (
        <AddSutiForm addSuti={addSutemeny} />
      ) : (
        <SutiSzerkesztForm
          setEditing={setSzerkesztes}
          aktualisSuti={aktualisSutemeny}
          sutiSzerkeszt={updateSutemeny}
        />
      )}

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
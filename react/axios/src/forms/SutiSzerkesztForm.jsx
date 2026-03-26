import React, { useState, useEffect } from "react";

const SutiSzerkesztForm = ({ aktualisSuti, setEditing, sutiSzerkeszt }) => {


  const [sutemeny, setSutemeny] = useState(aktualisSuti);


  useEffect(() => {

    setSutemeny(aktualisSuti);

  }, [aktualisSuti]);


  const handleInputChange = e => {

    const { name, value } = e.target;
    setSutemeny({ ...sutemeny, [name]: value });

  };

  
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        sutiSzerkeszt(sutemeny.id, sutemeny);
      }}
    >
      <label>Név</label>
      <input
        name="nev"
        value={sutemeny?.nev || ""}
        onChange={handleInputChange}
      />

      <label>Típus</label>
      <input
        name="tipus"
        value={sutemeny?.tipus || ""}
        onChange={handleInputChange}
      />

      <label>Díjazott</label>
      <input
        type="number"
        name="dijazott"
        value={sutemeny?.dijazott || 0}
        onChange={handleInputChange}
      />

      <button>Módosítás</button>
      <button type="button" onClick={() => setEditing(false)}>
        Mégse
      </button>
    </form>
  );
};

export default SutiSzerkesztForm;
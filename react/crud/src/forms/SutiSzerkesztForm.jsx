import React, { useState, useEffect } from "react";

const SutiSzerkesztForm = props => {
  const [sutemeny, setSutemeny] = useState(props.aktualisSuti);

  useEffect(() => {
    setSutemeny(props.aktualisSuti);
  }, [props.aktualisSuti]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSutemeny({ ...sutemeny, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.sutiSzerkeszt(sutemeny.id, sutemeny);
      }}
    >
      <label>Név</label>
      <input
        type="text"
        name="nev"
        value={sutemeny?.nev || ""}
        onChange={handleInputChange}
      />

      <label>Típus</label>
      <input
        type="text"
        name="tipus"
        value={sutemeny?.tipus || ""}
        onChange={handleInputChange}
      />

      <label>Díjazott</label>
      <input
        type="checkbox"
        name="dijazott"
        checked={sutemeny?.dijazott || false}
        onChange={handleInputChange}
      />

      <button>Módosítás</button>
      <button type="button" onClick={() => props.setEditing(false)}>
        Mégse
      </button>
    </form>
  );
};

export default SutiSzerkesztForm;
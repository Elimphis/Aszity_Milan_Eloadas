import React, { useState } from "react";

const AddSutiForm = props => {
  const [sutemeny, setSutemeny] = useState({
    nev: "",
    tipus: "",
    dijazott: 0
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSutemeny({ ...sutemeny, [name]: value });
  };

  return (
    <form
      className="flex row align-center gap-1"
      onSubmit={event => {
        event.preventDefault();
        if (!sutemeny.nev || !sutemeny.tipus) return;
        props.addSuti(sutemeny);
        setSutemeny({ nev: "", tipus: "", dijazott: 0 });
      }}
    >
      <label>Név</label>
      <input
        type="text"
        name="nev"
        value={sutemeny.nev}
        onChange={handleInputChange}
      />

      <label>Típus</label>
      <input
        type="text"
        name="tipus"
        value={sutemeny.tipus}
        onChange={handleInputChange}
      />

      <label>Díjazott</label>
      <input
        type="checkbox"
        name="dijazott"
        checked={sutemeny.dijazott}
        onChange={handleInputChange}
      />

      <button>Hozzáadás</button>
    </form>
  );
};

export default AddSutiForm;
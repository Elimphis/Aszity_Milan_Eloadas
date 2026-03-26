import React, { useState } from "react";

const AddSutiForm = ({ addSuti }) => {


  const [sutemeny, setSutemeny] = useState({

    nev: "",
    tipus: "",
    dijazott: 0

  });


  const handleInputChange = e => {

    const { name, value } = e.target;
    setSutemeny({ ...sutemeny, [name]: value });
    
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!sutemeny.nev || !sutemeny.tipus) return;
        addSuti(sutemeny);
        setSutemeny({ nev: "", tipus: "", dijazott: 0 });
      }}
    >
      <label>Név</label>
      <input name="nev" value={sutemeny.nev} onChange={handleInputChange} />

      <label>Típus</label>
      <input name="tipus" value={sutemeny.tipus} onChange={handleInputChange} />

      <label>Díjazott</label>
      <input
        type="number"
        name="dijazott"
        value={sutemeny.dijazott}
        onChange={handleInputChange}
      />

      <button>Hozzáadás</button>
    </form>
  );
};

export default AddSutiForm;
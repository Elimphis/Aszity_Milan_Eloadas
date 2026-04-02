import { useEffect, useState }  from "react";
import axios                    from "axios";

function App() {

  const [sutik, setSutik]     = useState([]);
  const [message, setMessage] = useState("");

  const [nev, setNev]           = useState("");
  const [tipus, setTipus]       = useState("");
  const [dijazott, setDijazott] = useState(0);

  const [editId, setEditId] = useState(null);

  
  useEffect(() => {

    fetchSutik();

  }, []);


  const fetchSutik = async () => {

    const res = await axios.get("api.php");
    setSutik(res.data.data);
    setMessage(res.data.success ? "Adatok betöltve" : "Hiba történt");

  };


  const submit = async () => {

    let res;

    if (editId) {

      res = await axios.put("api.php", {

        id: editId,
        nev,
        tipus,
        dijazott

      });

      setEditId(null);

    } else {

      res = await axios.post("api.php", {
        nev,
        tipus,
        dijazott
      });

    }


    setMessage(res.data.message || res.data.error);


    setNev("");
    setTipus("");
    setDijazott(0);


    fetchSutik();

  };


  const editSuti = (suti) => {

    setEditId(suti.id);
    setNev(suti.nev);
    setTipus(suti.tipus);
    setDijazott(suti.dijazott);

  };


  const deleteSuti = async (id) => {

    if (!confirm("Biztosan törlöd?")) return;

    const res = await axios.delete("api.php", {
      data: { id }
    });

    setMessage(res.data.message || res.data.error);
    fetchSutik();

  };
  

  return (
    <div>
      <p>{message}</p>
      <h2>Sütemény CRUD alkalmazás</h2>

      <div>
        <input
          value={nev}
          onChange={(e) => setNev(e.target.value)}
          placeholder="Név"
        />

        <input
          value={tipus}
          onChange={(e) => setTipus(e.target.value)}
          placeholder="Típus"
        />

        <input
          type="number"
          value={dijazott}
          onChange={(e) => setDijazott(e.target.value)}
          placeholder="Díjazott"
        />

        <button onClick={submit}>
          {editId ? "Módosítás" : "Hozzáadás"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Típus</th>
            <th>Díjazott</th>
            <th>Műveletek</th>
          </tr>
        </thead>

        <tbody>
          {sutik.map((suti) => (
            <tr key={suti.id}>
              <td>{suti.id}</td>
              <td>{suti.nev}</td>
              <td>{suti.tipus}</td>
              <td>{suti.dijazott}</td>
              <td>
                <button onClick={() => editSuti(suti)}>
                  Szerkeszt
                </button>

                <button onClick={() => deleteSuti(suti.id)}>
                  Töröl
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
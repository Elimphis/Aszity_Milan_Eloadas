import React from "react";

const SutiTabla = props => (
  <table>
    <thead>
      <tr>
        <th>Név</th>
        <th>Típus</th>
        <th>Díjazott</th>
        <th>Műveletek</th>
      </tr>
    </thead>
    <tbody>
      {props.sutik.length > 0 ? (
        props.sutik.map(s => (
          <tr key={s.id}>
            <td>{s.nev}</td>
            <td>{s.tipus}</td>
            <td>{s.dijazott}</td>
            <td>
              <button onClick={() => props.editRow(s)}>Szerkeszt</button>
              <button onClick={() => props.deleteSuti(s.id)}>Töröl</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>Nincs sütemény</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default SutiTabla;
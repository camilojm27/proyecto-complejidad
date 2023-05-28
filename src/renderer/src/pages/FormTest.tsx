import React, { useState } from 'react'

export const Form = () => {
  const [rowCount, setRowCount] = useState(0)
  const [columnCount, setColumnCount] = useState(0)
  const [tableData, setTableData] = useState([])

  const handleRowCountChange = (e) => {
    const count = parseInt(e.target.value, 10)
    setRowCount(count)
    initializeTableData(count, columnCount)
  }

  const handleColumnCountChange = (e) => {
    const count = parseInt(e.target.value, 10)
    setColumnCount(count)
    initializeTableData(rowCount, count)
  }

  const initializeTableData = (rows, columns) => {
    const newData = []
    for (let i = 0; i < rows; i++) {
      const row = Array(columns).fill(0)
      newData.push(row)
    }
    setTableData(newData)
  }

  const handleCellValueChange = (e, rowIndex, columnIndex) => {
    const newData = [...tableData]
    newData[rowIndex][columnIndex] = parseInt(e.target.value, 10)
    setTableData(newData)
  }

  return (
    <div>
      <label htmlFor="rowCount">Número de filas:</label>
      <input type="number" id="rowCount" value={rowCount} onChange={handleRowCountChange} />

      <label htmlFor="columnCount">Número de columnas:</label>
      <input
        type="number"
        id="columnCount"
        value={columnCount}
        onChange={handleColumnCountChange}
      />

      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td key={columnIndex}>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleCellValueChange(e, rowIndex, columnIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// export const Form = (): JSX.Element => {
//   const [numTeams, setNumTeams] = useState(0)
//   const [minSize, setMinSize] = useState(0)
//   const [maxSize, setMaxSize] = useState(0)
//   const [distancias, setDistancias] = useState([numTeams, numTeams].fill(0))
//
//   const navigate = useNavigate()
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log('Número de equipos:', numTeams)
//     console.log('Tamaño mínimo:', minSize)
//     console.log('Tamaño máximo:', maxSize)
//     console.log('Distancias:', distancias)
//     //navigate(`/teams/${numTeams}/${minSize}/${maxSize}`)
//   }
//   const handleChange = (rowIndex, colIndex, value) => {
//     const updatedDistanciasEquipo = [...distancias]
//     console.log(rowIndex, colIndex, value)
//     console.log(distancias)
//     updatedDistanciasEquipo[rowIndex][colIndex] = Number.parseInt(value.toString())
//     setDistancias(updatedDistanciasEquipo)
//     updatedDistanciasEquipo[colIndex][rowIndex] = Number.parseInt(value.toString())
//     setDistancias(updatedDistanciasEquipo)
//     console.log(distancias)
//   }
//
//   const generateTableRows = () => {
//     const rows = []
//     for (let i = 0; i < numTeams; i++) {
//       const row = []
//       for (let j = 0; j < numTeams; j++) {
//         const distancia = i === j ? 0 : distancias[i]?.[j] || distancias[j]?.[i] || '' // Set diagonal values to 0
//         row.push(
//           <td key={j}>
//             <input
//               className="border border-gray-400 p-2 w-full"
//               type="number"
//               defaultValue={distancia}
//               onChange={(e) =>
//                 handleChange(
//                   Number.parseInt(i),
//                   Number.parseInt(j),
//                   Number.parseInt(e.target.value)
//                 )
//               }
//             />
//           </td>
//         )
//       }
//       rows.push(<tr key={i}>{row}</tr>)
//     }
//     return rows
//   }
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Ingrese los datos del campeonato</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block font-bold mb-2" htmlFor="numEquipos">
//             Número de equipos:
//           </label>
//           <input
//             className="border border-gray-400 p-2 w-full"
//             type="number"
//             id="numEquipos"
//             value={numTeams}
//             onChange={(e) => setNumTeams(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2" htmlFor="tamanioMinimo">
//             Tamaño mínimo de cada gira o permanencia:
//           </label>
//           <input
//             className="border border-gray-400 p-2 w-full"
//             type="number"
//             id="tamanioMinimo"
//             value={minSize}
//             onChange={(e) => setMinSize(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2" htmlFor="tamanioMaximo">
//             Tamaño máximo de cada gira o permanencia:
//           </label>
//           <input
//             className="border border-gray-400 p-2 w-full"
//             type="number"
//             id="tamanioMaximo"
//             value={maxSize}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxSize(e.target.value)}
//             required
//           />
//         </div>
//         {numTeams > 0 && (
//           <div className="mb-4">
//             <h2 className="text-xl font-bold mb-4">
//               Ingrese las distancias entre ciudades para cada equipo:
//             </h2>
//             <table className="border-collapse border border-gray-400">
//               <tbody>{generateTableRows()}</tbody>
//             </table>
//           </div>
//         )}
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           type="submit"
//         >
//           Siguente
//         </button>
//       </form>
//     </div>
//   )
// }

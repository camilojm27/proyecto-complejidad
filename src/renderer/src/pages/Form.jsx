import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const Form = () => {
  const [numTeams, setNumTeams] = useState('')
  const [minSize, setMinSize] = useState('')
  const [maxSize, setMaxSize] = useState('')
  const [distancias, setDistancias] = useState([[]])

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Número de equipos:', numTeams)
    console.log('Tamaño mínimo:', minSize)
    console.log('Tamaño máximo:', maxSize)
    console.log('Distancias:', distancias)
    //navigate(`/teams/${numTeams}/${minSize}/${maxSize}`)
  }
  const handleChange = (rowIndex, colIndex, value) => {
    const updatedDistanciasEquipo = [...distancias]
    console.log(rowIndex, colIndex, value)
    console.log(distancias)
    updatedDistanciasEquipo[rowIndex][colIndex] = Number.parseInt(value.toString())
    setDistancias(updatedDistanciasEquipo)
    updatedDistanciasEquipo[colIndex][rowIndex] = Number.parseInt(value.toString())
    setDistancias(updatedDistanciasEquipo)
    console.log(distancias)
  }

  const generateTableRows = () => {
    const rows = []
    for (let i = 0; i < numTeams; i++) {
      const row = []
      for (let j = 0; j < numTeams; j++) {
        const distancia = i === j ? 0 : distancias[i]?.[j] || distancias[j]?.[i] || '' // Set diagonal values to 0
        row.push(
          <td key={j}>
            <input
              className="border border-gray-400 p-2 w-full"
              type="number"
              defaultValue={distancia}
              onChange={(e) => handleChange(i, j, e.target.value)}
            />
          </td>
        )
      }
      rows.push(<tr key={i}>{row}</tr>)
    }
    return rows
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ingrese los datos del campeonato</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="numEquipos">
            Número de equipos:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="number"
            id="numEquipos"
            value={numTeams}
            onChange={(e) => setNumTeams(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="tamanioMinimo">
            Tamaño mínimo de cada gira o permanencia:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="number"
            id="tamanioMinimo"
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="tamanioMaximo">
            Tamaño máximo de cada gira o permanencia:
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="number"
            id="tamanioMaximo"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            required
          />
        </div>
        {numTeams > 1 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">
              Ingrese las distancias entre ciudades para cada equipo:
            </h2>
            <table className="border-collapse border border-gray-400">
              <tbody>{generateTableRows()}</tbody>
            </table>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Siguente
        </button>
      </form>
    </div>
  )
}

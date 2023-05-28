import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const Form = (): JSX.Element => {
  const [numTeams, setNumTeams] = useState(0)
  const [minSize, setMinSize] = useState(0)
  const [maxSize, setMaxSize] = useState(0)
  const [matrix, setMatrix] = useState([])

  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Número de equipos:', numTeams)
    console.log('Tamaño mínimo:', minSize)
    console.log('Tamaño máximo:', maxSize)
    //navigate(`/teams/${numTeams}/${minSize}/${maxSize}`)
  }

  const handleSizeChange = (event) => {
    const newSize = event.target.value
    setNumTeams(newSize)
    const newMatrix = Array.from({ length: newSize }, (_, rowIndex) =>
      Array.from({ length: newSize }, (_, cellIndex) => (rowIndex === cellIndex ? 0 : ''))
    )
    setMatrix(newMatrix)
  }
  const handleCellChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    cellIndex: number
  ) => {
    const newMatrix: number[] = [...matrix]
    newMatrix[rowIndex][cellIndex] = Number.parseInt(event.target.value)
    if (rowIndex < cellIndex) {
      newMatrix[cellIndex][rowIndex] = Number.parseInt(event.target.value)
    }
    setMatrix(newMatrix)
    console.log(newMatrix)
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
            onChange={handleSizeChange}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxSize(e.target.value)}
            required
          />
        </div>
        {numTeams > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">
              Ingrese las distancias entre ciudades para cada equipo:
            </h2>
            <table className="border-collapse">
              <tbody>
                {matrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-800 p-2">
                        <input
                          type="number"
                          value={cell}
                          onChange={(event) => handleCellChange(event, rowIndex, cellIndex)}
                          readOnly={rowIndex === cellIndex || rowIndex > cellIndex}
                          className="w-full"
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Procesar
        </button>
      </form>
    </div>
  )
}

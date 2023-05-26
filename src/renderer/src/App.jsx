import { useState } from 'react'
import Versions from './components/Versions'

const Form = () => {
  const [numTeams, setNumTeams] = useState('')
  const [minSize, setMinSize] = useState('')
  const [maxSize, setMaxSize] = useState('')
  const [distancias, setDistancias] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Número de equipos:', numTeams)
    console.log('Tamaño mínimo:', minSize)
    console.log('Tamaño máximo:', maxSize)
    console.log('Distancias:', distancias)
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
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="distancias">
            Distancias entre ciudades sedes (separadas por espacios en blanco):
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full"
            id="distancias"
            rows="4"
            value={distancias}
            onChange={(e) => setDistancias(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

function App() {
  const [ls, setls] = useState('')

  async function handleButtonClick() {
    const lss = await window.api.getLs()
    setls(lss)
    console.log(lss)
  }

  return (
    <div className="">
      <button onClick={handleButtonClick}>Run CLI Command</button>
      <pre>{ls}</pre>
      <Form></Form>
      <Versions />
    </div>
  )
}

export default App

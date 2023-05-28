import React, { useState } from 'react'

function App() {
  const [size, setSize] = useState(0)
  const [matrix, setMatrix] = useState([])

  const handleSizeChange = (event) => {
    const newSize = event.target.value
    setSize(newSize)
    const newMatrix = Array.from({ length: newSize }, () =>
      Array.from({ length: newSize }, () => '')
    )
    setMatrix(newMatrix)
  }

  const handleCellChange = (event, rowIndex, cellIndex) => {
    const newMatrix = [...matrix]
    newMatrix[rowIndex][cellIndex] = event.target.value
    setMatrix(newMatrix)
    console.log(newMatrix)
  }

  return (
    <div className="p-4">
      <label htmlFor="size" className="block mb-2">
        Enter size of table:
      </label>
      <input
        id="size"
        type="number"
        value={size}
        onChange={handleSizeChange}
        className="border rounded p-2 mb-4"
      />
      <table className="border-collapse border border-gray-800">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-800 p-2">
                  <input
                    type="number"
                    value={cell}
                    onChange={(event) => handleCellChange(event, rowIndex, cellIndex)}
                    className="w-full"
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

export default App

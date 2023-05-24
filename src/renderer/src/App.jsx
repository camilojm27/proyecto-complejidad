import { useState } from 'react'

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
    </div>
  )
}

export default App

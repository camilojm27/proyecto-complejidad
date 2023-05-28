import { useState } from 'react'
import Versions from './components/Versions'
import Stepper from './components/Stepper'
import { Form } from './pages/Form'

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
      <Stepper />
      <Form></Form>
      <Versions />
    </div>
  )
}

export default App

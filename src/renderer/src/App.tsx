import { Form } from './pages/Form'
import Versions from './components/Versions'

function App(): JSX.Element {
  return (
    <div className="p-4">
      <Form></Form>
      <Versions />
    </div>
  )
}

export default App

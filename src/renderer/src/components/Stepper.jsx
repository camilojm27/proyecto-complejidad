import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Stepper.css'

const Stepper = () => {
  const { maxSize, minSize, numTeams } = useParams()
  const steps = new Array(Number.parseInt(numTeams)).fill('Equipo')
  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)
  return (
    <>
      <h1 className="text-center">Ingrese la información de cada equipo</h1>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && 'active'} ${
              (i + 1 < currentStep || complete) && 'complete'
            } `}
          >
            <div className="step">{i + 1 < currentStep || complete ? <img /> : i + 1}</div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      {!complete && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1)
          }}
        >
          {currentStep === steps.length ? 'Finish' : 'Next'}
        </button>
      )}
    </>
  )
}

export default Stepper

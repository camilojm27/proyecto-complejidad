import { useState } from 'react'
import './stepper.css'

const Stepper = () => {
  const steps = []
  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)
  return (
    <>
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
          className="btn"
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

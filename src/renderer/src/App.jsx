function App() {
  function handleButtonClick() {
    console.log(window.api.ls())
  }

  return (
    <div className="">
      <button onClick={handleButtonClick}>Run CLI Command</button>
    </div>
  )
}

export default App

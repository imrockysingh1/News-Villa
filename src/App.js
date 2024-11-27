import React from 'react'
import backgroundimage from './assets/background.jpg'
import Weather from './Components/Weather'
const App = () => {
  return (
    <div className='app' style={{backgroundImage: `url(${backgroundimage})` , backgroundSize: 'cover',backgroundPosition: 'center',minHeight:'100vh',}}> 
      <Weather/>
    </div>
  )
}

export default App

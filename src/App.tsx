import { Home } from "./pages/Home"
import { WeatherDetail } from "./pages/WeatherDetail";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherDetail/>} />
      </Routes>
  )
}

export default App

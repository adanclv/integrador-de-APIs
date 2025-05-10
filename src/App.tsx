import { Home } from "./pages/Home"
import { News } from "./pages/News";
import { WeatherDetail } from "./pages/WeatherDetail";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherDetail/>} />
        <Route path="/news" element={<News />} />
      </Routes>
  )
}

export default App

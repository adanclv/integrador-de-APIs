import CurrencyConverter from "./pages/CurrencyConverter";
import { Home } from "./pages/Home"
import { News } from "./pages/News";
import Population from "./pages/Population";
import { WeatherDetail } from "./pages/WeatherDetail";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherDetail/>} />
        <Route path="/news" element={<News />} />
        <Route path="/pop" element={<Population />} />
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  )
}

export default App

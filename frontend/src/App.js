import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import LocationsPage from './components/Locations/LocationsPage';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <LocationProvider>
      <BrowserRouter>
        <Routes>
            <Route paht="/home" element={<HomePage />} />
            <Route path="/locations" element={<LocationsPage/>} />
            <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  );
}

export default App;

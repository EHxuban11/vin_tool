import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MenuComponent from './Components/MenuComponent';
import LandingPage from './Pages/ToolPage';
import DocumentationPage from './Pages/DocumentationPage';
function App() {
  return (
    <Router>

      <div className="App">
        < MenuComponent />
        <Routes>
              <Route path="/" element={<LandingPage />} />
             <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
      </div>
    </ Router>

  );
}

export default App;

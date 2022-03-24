import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrencyHistory from './pages/CurrencyHistory';
import Home from './pages/Home';

function App() {
  return (
    <div className="App" style={{position: 'relative'}}>
    
      <Router>
        <Routes>
          <Route path='/' element = {<Home />}/>
          <Route path='/currency/:charCode' element = {<CurrencyHistory />}/>
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;




import InputForm from './components/InputForm';
import TravelForm from './components/TravelForm';
import Error from './components/Error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <Router>
      <Routes>

        <Route path="/" element={<TravelForm />} />
        {/* <Route path="/details" element={<InputForm />} /> */}
        <Route path="/train/:from/:to/:dd/:mm/:yyyy" element={<InputForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App

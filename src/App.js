import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/pages/HomePage/Home'
import Footer from './components/pages/Footer/Footer'
import GoogleLoginComponent from './components/GoogleLogin';

import Registration from './components/pages/Registration/Registration';
import Interview from './components/Interview'
//import Products from './components/pages/'

function App() {
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/sign-up' element={<GoogleLoginComponent/>}/>   
        <Route path='/pages/Registration' element={<Registration/>}/>
        <Route path='/Interview' element={<Interview/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

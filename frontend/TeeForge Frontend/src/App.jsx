
import './App.css'
import AboutPage from './components/AboutPage';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import TShirtDesigner from './components/ShirtPreview';


function App() {

  return (
    <div className='entire-page'>
      <Header />
      <div className='content'>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/orders' element={<OrderForm />}/>
            <Route path='/design' element={<TShirtDesigner />}/>
            <Route path='/login' element={<LoginPage />}/>
          </Routes>
      </div>
        <Footer />
    </div>
  )
}

export default App;

import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './organism/Header';
import Footer from './organism/Footer';
import CategoryNav from './organism/CategoryNav';
import LoginCheck from './login/LoginCheck';
import {LoginStateProvider} from './store/loginState-context';

function App() {
  return (
    <>
      <LoginStateProvider>
        <Header />
        <CategoryNav />
        <Outlet />
        <Footer />
        <LoginCheck></LoginCheck>
      </LoginStateProvider>
    </>
  );
}

export default App;

import { Route, Switch } from 'wouter';
import './App.css';
import Register from './pages/Register';
import Users from './pages/Preregistration';
import UploadVoucher from './pages/UploadVoucher';
import Info from './pages/Info';
import Payments from './pages/Payments';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Switch>
          <Route path="/">
            <Register />
          </Route>
          <Route path="/preinscripciones">
            <Users />
          </Route>
          <Route path="/pagar/:userId">
            <UploadVoucher />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/pagos">
            <Payments />
          </Route>
          <Route>
            <div>404 - Página no encontrada</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

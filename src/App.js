// import logo from './logo.svg';
// import { db } from "./FireBaseConectio";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./Routes";
import AuthProvider from "./Context/auth";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/* <button onClick={() => toast("Teste Toast!")}>Testar Toast</button> */}
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

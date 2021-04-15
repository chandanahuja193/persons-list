import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useHistory } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import RedirectPage from "./Components/RedirectPage";
import Dashboard from "./Components/Dashboard";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter history={history}>
       <Route path="/" component={RedirectPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

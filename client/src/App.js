import NavBar from './components/Navbar';
import "./App.css"
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'

//path에 따라서 보여주는거 다르게 함
function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Route path="/"> 
        <Home/>
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </BrowserRouter>
  );
}

export default App;

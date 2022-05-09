import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import List from './pages/list'
import Add from './pages/add'
import Edit from './pages/edit'
import { ToastContainer } from 'react-toastify'

const Routes = () => {
  return useRoutes([
    { path: "/", element: <List /> },
    { path: "/add", element: <Add /> },
    { path: "/edit/:id", element: <Edit /> },
  ])
}

function App() {
  return (
    <div className="container my-4">
      <Router>
        <Routes />
      </Router>
      <ToastContainer position='bottom-center' autoClose={2000}/>
    </div>
  )
}

export default App

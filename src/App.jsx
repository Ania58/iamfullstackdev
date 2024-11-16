import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home.jsx'
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./InputCreate.jsx";


const App = () => {
  const [data, setData] = useState(null)
  const urlApi = 'http://localhost:5000'

const fetchData = async () => {
  try {
    const response = await fetch(urlApi , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    const resData = await response.json()
    setData(resData)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData()
}, [])

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/create">Create Task</Link>
        </nav>
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home data={data} />} />
           
            {data.map(item => (
              <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
            ))
            }
            <Route path="/create" element={<InputCreate fetchData={fetchData} />} />
          </Routes>
        }
        
      </div>
    </Router>
  )
};

export default App;

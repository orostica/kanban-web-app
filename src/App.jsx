import {Routes, Route} from 'react-router-dom'
import Kanban from './pages/kanban/kanban'
import Colaborador from './pages/colaboradores/colaboradores'
import Cargos from './pages/cargos/cargos'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Kanban />}/>
        <Route path='/colaboradores' element={<Colaborador />}/>
        <Route path='/cargos' element={<Cargos />}/>
      </Routes>
    </>
  )
}

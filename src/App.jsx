import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Index';
import Dashboard from './pages/Dashboard/Index';
import Appointment from './pages/Appointment/Index';
import Owner from './pages/Owner/Index';
import NotFound from './pages/NotFound/Index'
import esEs from 'antd/locale/es_ES';

function App() {

  return (
  <ConfigProvider locale={esEs}>
    <Router>
      <Routes>
        <Route path="/" Component={() => <Login /> } />
        <Route path="/dashboard" Component={() => <Dashboard /> }/>
        <Route path="/appointments" Component={() => <Appointment /> }/>
        <Route path="/owners" Component={() => <Owner /> }/>
        {/* <Route path="/clientdashboard/:cdid" Component={() => <ClientDashboard /> }/> */}
        {/* <Route path="/dashboard/:params" Component={() => <div>hola mundo2</div>}/> const { postSlug } = useParams(); */}
        <Route path="*" Component={() => <NotFound />}/>
      </Routes>
    </Router>
  </ConfigProvider>
  )
}

export default App

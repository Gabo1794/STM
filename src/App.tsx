import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Index';
import Dashboard from './pages/Dashboard/Index';
import NotFound from './pages/NotFound/Index';
import ClientDashboard from './pages/ClientDashboard/Index';
import type { Locale } from 'antd/es/locale';
import esEs from 'antd/locale/es_ES';

function App() {
  const locale: Locale = esEs;

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
    locale={locale}
  >
    <Router>
      <Routes>
        <Route path="/" Component={() => <Login /> } />
        <Route path="/dashboard" Component={() => <Dashboard /> }/>
        <Route path="/clientdashboard/:cdid" Component={() => <ClientDashboard /> }/>
        {/* <Route path="/dashboard/:params" Component={() => <div>hola mundo2</div>}/> const { postSlug } = useParams(); */}
        <Route path="*" Component={() => <NotFound />}/>
      </Routes>
    </Router>
  </ConfigProvider>
  )
}

export default App

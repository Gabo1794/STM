import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Index';
import Dashboard from './pages/Dashboard/Index';
import NotFound from './pages/NotFound/Index';

function App() {

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <Router>
      <Routes>
        <Route path="/" Component={() => <Login /> } />
        <Route path="/dashboard" Component={() => <Dashboard /> }/>
        {/* <Route path="/dashboard/:params" Component={() => <div>hola mundo2</div>}/> const { postSlug } = useParams(); */}
        <Route path="*" Component={() => <NotFound />}/>
      </Routes>
    </Router>
  </ConfigProvider>
  )
}

export default App

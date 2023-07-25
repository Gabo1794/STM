import { Button, ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
        <Route path="/" Component={() => <div>hola mundo</div>}/>
        <Route path="/dashboard" Component={() => <div>hola mundo2</div>}/>
        {/* <Route path="/dashboard/:params" Component={() => <div>hola mundo2</div>}/> const { postSlug } = useParams(); */}
        <Route path="*" Component={() => <div>Not found</div>}/>
      </Routes>
    </Router>
  </ConfigProvider>
  )
}

export default App

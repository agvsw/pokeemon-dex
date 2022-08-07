import "./App.css";
import { Breadcrumb, Layout, Menu, Row, Col, } from 'antd';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import PokemonList from './pages/pokemon-list/pokemon-list'
import PokemonDetail from "./pages/pokemon-detail/pokemon-detail";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header style={{backgroundColor: '#1c80ad'}}>
        <div style={{color: 'white', fontWeight: 'bold', fontSize: 'x-large', fontFamily: 'cursive'}}>
          Pokemon Dex
        </div>
      </Header>
      <Content style={{ padding: '50px', background: '#FFF'}}>
        <Router>
          <Routes>
            <Route exact path='/' element={< PokemonList />}></Route>
            <Route exact path='/detail' element={< PokemonDetail />}></Route>
          </Routes>
        </Router>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Agus Wibawa</Footer>
  </Layout>
  );
}

export default App;

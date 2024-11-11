import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto';
import AdicionarCategoria from './AdicionarCategoria';
import { Container } from 'react-bootstrap';
import './App.css'; // Mantemos a importação do CSS

function App() {
  return (
    <Router>
      <Container style={{ backgroundColor: '#537584' }}>
        <p>
        <Link to="/adicionar" style={{color:'white'}} > Adicionar Produto</Link>
        </p>
        
        <p>
        <Link to="/categoria" style={{color:'white'}} > Adicionar Categoria</Link>
        </p>
        <p>
        <Link to="/" style={{color:'white'}} >Voltar</Link>
        </p>
        
        <Routes>
        <Route path='/' />
          <Route path="/adicionar" element={<AdicionarProduto />} />
          <Route path='/categoria' element={<AdicionarCategoria/>}/>
        </Routes>
      </Container>
    </Router>
  );
}
export default App;

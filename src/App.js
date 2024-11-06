import React from 'react';
import './App.css';                                                        
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto.js';
import AdicionarCategoria from './AdicionarCategoria.js';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container>
        <Link to="/adicionar" style={{color:'white'}} > Adicionar Produto</Link>
        <Link to="/categoria" style={{color:'white'}} > Adicionar Categoria</Link>
        <Link to="/" style={{color:'white'}} >Voltar</Link>
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

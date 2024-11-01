import React from 'react';
import './App.css';                                                                             
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container>
        <Link to="/adicionar" style={{color:'white'}} > Adicionar Produto</Link>
        <Routes>
          <Route path="/adicionar" element={<AdicionarProduto />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

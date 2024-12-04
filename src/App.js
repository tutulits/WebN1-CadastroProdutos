import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto';
import AdicionarCategoria from './AdicionarCategoria';
import AdicionarFornecedor from './AdicionarFornecedor';
import ListarProduto from './ListarProduto';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaClipboardList } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <body>
      <Router>
        <div className="app-container">
         



          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/adicionar" element={
                <ProtectedRoute>
                  <AdicionarProduto />
                </ProtectedRoute>
              } />
              <Route path="/categoria" element={
                <ProtectedRoute>
                  <AdicionarCategoria />
                </ProtectedRoute>
              } />
              <Route path="/fornecedor" element={
                <ProtectedRoute>
                  <AdicionarFornecedor />
                </ProtectedRoute>
              } />
              <Route path="/listar" element={
                <ProtectedRoute>
                  <ListarProduto />
                </ProtectedRoute>
              } />

              <Route path="/" element={<Login />} />
            </Routes>
          </Container>

        </div>
      </Router>
    </body>

  );
}

export default App;

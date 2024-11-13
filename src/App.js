import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto';
import AdicionarCategoria from './AdicionarCategoria';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaClipboardList } from 'react-icons/fa';  // Importando ícones para botões
import './App.css';  // Importando o CSS com a cor de fundo

function App() {
  return (
    <body>
    <Router>
      {/* Aplique a classe app-container aqui para garantir que o fundo se estenda */}
      <div className="app-container">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Navbar.Brand href="/"> 🛒 Tutulits Market</Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/adicionar" className="nav-link">Adicionar Produto 🏷️</Link>
            <Link to="" className="nav-link">Adicionar Fornecedores 📂</Link>
            <Link to="/categoria" className="nav-link">Adicionar Categoria 📂</Link>
            <Link to="/" className="nav-link">Voltar ⬅️</Link>
          </Nav>
        </Navbar>

        {/* Corpo da página com Cards */}
        <Container>
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Adicionar Produto 🏷️</Card.Title>
                  <Card.Text>
                    Cadastre novos produtos de forma rápida e eficiente no Tutulits Market!
                  </Card.Text>
                  <Link to="/adicionar">
                    <Button variant="primary">
                      <FaPlus /> Adicionar Produto
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Adicionar Fornecedores 📂</Card.Title>
                  <Card.Text>
                    Cadastre seus parceiros comerciais no Tutulits Market!
                  </Card.Text>
                  <Link to="">
                    <Button variant="danger">
                      <FaClipboardList /> Adicionar Fornecedores
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Adicionar Categoria 📂</Card.Title>
                  <Card.Text>
                    Organize seus produtos criando categorias no Tutulits Market!
                  </Card.Text>
                  <Link to="/categoria">
                    <Button variant="success">
                      <FaClipboardList /> Adicionar Categoria
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

          </Row>

          <Routes>
            <Route path="/" />
            <Route path="/adicionar" element={<AdicionarProduto />} />
            <Route path="/categoria" element={<AdicionarCategoria />} />
          </Routes>
        </Container>
      </div>
    </Router>
    
</body>    

  );
}

export default App;

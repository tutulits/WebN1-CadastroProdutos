import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto';
import AdicionarCategoria from './AdicionarCategoria';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaClipboardList } from 'react-icons/fa';  // Importando ícones para botões
import './App.css'; 

function App() {
  return (
    <Router>
      <Container fluid style={{ backgroundColor: '#537584' }}>
        {/* Navbar para navegação */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Navbar.Brand href="/"> 🛒 Sistema V1.0 </Navbar.Brand>
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
                    Cadastre novos produtos de forma rápida e eficiente!
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
                    Cadastre seus parceiros comerciais!
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
                    Organize seus produtos criando categorias!
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
      </Container>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdicionarProduto from './AdicionarProduto';
import AdicionarCategoria from './AdicionarCategoria';
import AdicionarFornecedor from './AdicionarFornecedor';
import ListarProduto from './ListarProduto';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaClipboardList } from 'react-icons/fa';  
import './App.css';  

function App() {
  return (
    <body>
    <Router>
      <div className="app-container">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Navbar.Brand href="/"> 🛒 Tutulits Market</Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/adicionar" className="corzinha">Adicionar Produto 🏷️</Link>
            <Link to="/listar" className='corzinha'>Listar Produto 🏷️</Link>
            <Link to="/fornecedor" className="corzinha">Adicionar Fornecedores 📂</Link>
            <Link to="/categoria" className="corzinha">Adicionar Categoria 📂</Link>
            <Link to="/" className="corzinha">Voltar ⬅️</Link>
          </Nav>
        </Navbar>

       
        <Container>
          <Row className="mb-4">
            <Col md={6} lg={3}>
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

            <Col md={6} lg={3}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Adicionar Fornecedores 📂</Card.Title>
                  <Card.Text>
                    Cadastre seus parceiros comerciais no Tutulits Market!
                  </Card.Text>
                  <Link to="/fornecedor">
                    <Button variant="danger">
                      <FaClipboardList /> Adicionar Fornecedores
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
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

            <Col md={6} lg={3}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Listar Produtos 📂</Card.Title>
                  <Card.Text>
                    Liste seus produtos no Tutulits Market!
                  </Card.Text>
                  <Link to="/listar">
                    <Button variant="danger">
                      <FaClipboardList /> Listar Produtos
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
            <Route path="/fornecedor" element={<AdicionarFornecedor/>} />
            <Route path='/listar' element={<ListarProduto/>} />
          </Routes>
        </Container>

        <Container>
                    <Routes>
                        {/* Rota de login */}
                        <Route path="/login" element={<Login />} />

                        {/* Rotas protegidas */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

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

                        {/* Página inicial redirecionando para login ou dashboard */}
                        <Route path="/" element={<Login />} />
                    </Routes>
                </Container>

      </div>
    </Router>   
</body>    

  );
}

export default App;

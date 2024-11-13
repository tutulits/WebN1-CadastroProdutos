import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function AdicionarFornecedor() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const Cadastrar = (evento) => {
    evento.preventDefault();
    const novoFornecedor = { nome, endereco, telefone, email };

    axios.post('http://localhost:3001/fornecedor', novoFornecedor)
      .then(() => {
        alert('Fornecedor adicionado com sucesso!');
      })
      .catch((erro) => {
        console.error('Erro de rede:', erro);
        alert('Erro ao adicionar Fornecedor: ' + erro.message);
      });
  };

  return (
    <Container>
      <h1 className="centro mt-3" style={{ marginBottom: '40px' }}>Cadastro de Fornecedor</h1>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <div className="produto-container">
            <form onSubmit={Cadastrar}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Nome:</div>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Digite o nome da Fornecedor' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Endereco:</div>
                    <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="form-input" required />
                  </label>
                </div>

                
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>telefone:</div>
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder='Digite o nome da Fornecedor' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Email:</div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
                  </label>
                </div>

                <Button type="submit" variant="secondary" style={{ flex: 1 }}>Adicionar Fornecedor</Button>
                <Link to="/adicionar" style={{ flex: 1 }}></Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdicionarFornecedor;

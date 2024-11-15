import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './AdicionarProduto.css';

function AdicionarFornecedor() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const validarTelefone = (telefone) => {
    const regexTelefone = /^\d{10,11}$/; // Validação simples para telefone (10 ou 11 dígitos)
    return regexTelefone.test(telefone);
  };

  const Cadastrar = (evento) => {
    evento.preventDefault();

    // Validação de campos antes de enviar
    if (!validarEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (!validarTelefone(telefone)) {
      alert('Por favor, insira um número de telefone válido (apenas números, com 10 ou 11 dígitos).');
      return;
    }

    const novoFornecedor = { nome, endereco, telefone, email };

    axios.post('http://localhost:3001/fornecedor', novoFornecedor)
      .then(() => {
        alert('Fornecedor adicionado com sucesso!');
        // Limpar campos após cadastro bem-sucedido
        setNome('');
        setEndereco('');
        setTelefone('');
        setEmail('');
      })
      .catch((erro) => {
        console.error('Erro de rede:', erro);
        alert('Erro ao adicionar Fornecedor: ' + erro.response?.data || erro.message);
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
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Digite o nome do fornecedor' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Endereço:</div>
                    <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='Digite o endereço do fornecedor' className="form-input" required />
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Telefone:</div>
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder='Digite o telefone (somente números)' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Email:</div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite o email do fornecedor' className="form-input" required />
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

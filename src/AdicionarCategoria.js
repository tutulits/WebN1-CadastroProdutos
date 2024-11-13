import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function AdicionarCategoria() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState('');

  const Cadastrar = (evento) => {
    evento.preventDefault();
    const novaCategoria = { nome, descricao };

    axios.post('http://localhost:3001/categoria', novaCategoria)
      .then(() => {
        alert('Categoria adicionado com sucesso!');
      })
      .catch((erro) => {
        console.error('Erro de rede:', erro);
        alert('Erro ao adicionar Categoria: ' + erro.message);
      });
  };

  return (
    <Container>
      <h1 className="centro mt-3" style={{ marginBottom: '40px' }}>Cadastro de Categoria</h1>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <div className="produto-container">
            <form onSubmit={Cadastrar}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Nome:</div>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Digite o nome da categoria' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Descrição:</div>
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-input" required />
                  </label>
                </div>

                <Button type="submit" variant="secondary" style={{ flex: 1 }}>Adicionar Categoria</Button>
                <Link to="/adicionar" style={{ flex: 1 }}></Link>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdicionarCategoria;

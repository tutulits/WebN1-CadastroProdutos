import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './AdicionarProduto.css';
import './App.css';

function AdicionarProduto() {
  const [nome_produto, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [preco, setPreco] = useState('');
  const [quantidade_estoque, setQuantidadeEstoque] = useState('');
  const [fornecedor, setFornecedor] = useState(''); // Fornecedor selecionado
  const [fornecedores, setFornecedores] = useState([]); // Lista de fornecedores
  const [dataCadastro, setData] = useState('');
  const [validade, setValidade] = useState('');
  const [quantidade, setQuantia] = useState('');
  const [multiplicacao, setMultiplicacao] = useState(0);

  // Buscar as categorias e fornecedores da API
  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });

    axios.get('http://localhost:3001/fornecedores') // Nova chamada para obter fornecedores
      .then(response => {
        setFornecedores(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar fornecedores:", error);
      });
  }, []);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    const novoProduto = {
      nome_produto,
      descricao,
      categoria,
      preco,
      quantidade_estoque,
      fornecedor, // Incluir fornecedor selecionado no objeto
      data_cadastro: dataCadastro,
      validade,
      quantidade,
      multiplicacao
    };

    axios.post('http://localhost:3001/adicionar', novoProduto)
      .then(() => {
        alert('Produto adicionado com sucesso!');
      })
      .catch((erro) => {
        console.error('Erro de rede:', erro);
        alert('Erro ao adicionar Produto: ' + erro.message);
      });
  };

  const calcularMultiplicacao = () => {
    const N1 = parseFloat(quantidade);
    const N2 = parseFloat(preco); 
    if (!isNaN(N1) && !isNaN(N2)) {
      return (N1 * N2).toFixed(2);
    } else {
      return 0; 
    }
  };

  const handleQuantidadeChange = (e) => {
    const novoQuantidade = e.target.value;
    setQuantia(novoQuantidade); 
    setMultiplicacao(calcularMultiplicacao(novoQuantidade, preco)); 
  };

  const handlePrecoChange = (e) => {
    const novoPreco = e.target.value;
    setPreco(novoPreco); 
    setMultiplicacao(calcularMultiplicacao(quantidade, novoPreco)); 
  };

  return (
    <Container>
      <h1 className="centro mt-3" style={{ marginBottom: '40px' }}>Cadastro de Produtos</h1>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <div className="produto-container">
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Nome Produto:</div>
                    <input type="text" value={nome_produto} onChange={(e) => setNome(e.target.value)} placeholder='Digite nome do produto aqui' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Descrição:</div>
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-input" required />
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Categoria:</div>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="form-input" required>
                      <option value="" disabled>Selecione uma categoria</option>
                      {categorias.map((cat) => (
                        <option key={cat.id_categoria} value={cat.id_categoria}>
                          {cat.nome}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Preço:</div>
                    <input type="number" value={preco} onChange={handlePrecoChange} className="form-input" required />
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Estoque:</div>
                    <input type="number" value={quantidade_estoque} onChange={(e) => setQuantidadeEstoque(e.target.value)} placeholder='Insira a quantidade!' className="form-input" required />
                  </label>

                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Fornecedor:</div>
                    <select value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} className="form-input" required>
                      <option value="" disabled>Selecione um fornecedor</option>
                      {fornecedores.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Data Compra:</div>
                    <input type='date' value={dataCadastro} onChange={(e) => setData(e.target.value)} className="form-input" required></input>
                  </label>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Validade:</div>
                    <input type='date' value={validade} onChange={(e) => setValidade(e.target.value)} className="form-input" required></input>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Quantidade:</div>
                    <input type='number' value={quantidade} onChange={handleQuantidadeChange} className="form-input" required></input>
                  </label>
                </div>

                <Button type="submit" variant="secondary" style={{ flex: 1 }}>Adicionar Produto</Button>
                <Link to="/adicionar" style={{ flex: 1 }}></Link>

                <div>
                  <b>Multiplicação Produto: {multiplicacao}</b>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdicionarProduto;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BarcodeReader from 'react-barcode-reader';
import JsBarcode from 'jsbarcode';
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
  const [fornecedor, setFornecedor] = useState('');
  const [fornecedores, setFornecedores] = useState([]); // Lista de fornecedores
  const [dataCadastro, setData] = useState('');
  const [validade, setValidade] = useState('');
  const [quantidade, setQuantia] = useState('');
  const [multiplicacao, setMultiplicacao] = useState(0);
  const [barcode, setBarcode] = useState('');
  const [barcodeGenerated, setBarcodeGenerated] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const lerBarra = (data) => {
    setBarcode(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

 
  const gerarBarra = () => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcode, { format: "CODE128" });
    setBarcodeGenerated(canvas.toDataURL());
  };

  useEffect(() => {
    // Função para buscar os fornecedores
    const fetchFornecedores = () => {
      axios.get('http://localhost:3001/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });
      
      axios.get('http://localhost:3001/fornecedores')
        .then(response => {
          console.log(response.data);
          setFornecedores(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar fornecedores:", error);
        });
    };

    
    fetchFornecedores();
  }, [location]); 

  

  const handleSubmit = (evento) => {
    evento.preventDefault();
    const novoProduto = {
      nome_produto,
      descricao,
      categoria,
      preco,
      quantidade_estoque,
      fornecedor,
      data_cadastro: dataCadastro,
      validade,
      quantidade,
      multiplicacao,
      codigo_barras: barcode
    };

    axios.post('http://localhost:3001/adicionar', novoProduto)
      .then(() => {
        alert('Produto adicionado com sucesso!');
        navigate('/listar');
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
                  <label style={{ flex: 1 }}>
                    <div style={{ color: 'black' }}>Código de Barras</div>
                    <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)}  className="form-input" required />
                  </label>
                </div>

                <Button type="button" variant='success' onClick={gerarBarra}>Gerar Código de Barras</Button>
                <Button type="submit" variant="secondary" style={{ flex: 1 }}>Adicionar Produto</Button>
                <BarcodeReader onError={handleError} onScan={lerBarra} />
                <Link to="/adicionar" style={{ flex: 1 }}></Link>



                {barcodeGenerated && (
                  <div>
                    <h3 style={{color:"black"}}>Código de Barras Gerado:</h3>
                    <img src={barcodeGenerated} alt="Código de Barras" />
                  </div>
                )}

             

              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdicionarProduto;

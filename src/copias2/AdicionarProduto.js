import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './AdicionarProduto.css';  // Importar CSS específico para o componente
import './App.css';

function AdicionarProduto() {
    const [nome_produto, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);  // Estado para armazenar as categorias
    const [preco, setPreco] = useState('');
    const [quantidade_estoque, setQuantidade] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [dataCadastro, setData] = useState('');
    const [validade, setValidade] = useState('');
    const [quantidade, setQuantia] = useState('');
    const [multiplicacao, setMultiplicacao] = useState('');

    // UseEffect para buscar as categorias do backend
    useEffect(() => {
        axios.get('http://localhost:3001/categorias')
            .then(response => {
                setCategorias(response.data);  // Armazena as categorias na variável de estado
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error);
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
            fornecedor, 
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
                console.error('Erro de rede:', erro);  // Debug
                alert('Erro ao adicionar Produto: ' + erro.message);
            });
    };

    const multiplicar = () => {
        const N1 = parseFloat(quantidade);
        const N2 = parseFloat(preco);
        if (!isNaN(N1) && !isNaN(N2)) {
            setMultiplicacao(N1 * N2);
        } else {
            setMultiplicacao(0);
        }
    }

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
                                        <input type="number" value={preco} onChange={(e) => { setPreco(e.target.value); multiplicar(); }} className="form-input" required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Estoque:</div>
                                        <input type="number" value={quantidade_estoque} onChange={(e) => setQuantidade(e.target.value)} placeholder='Insira a quantidade!' className="form-input" required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Fornecedor:</div>
                                        <input type="text" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} className="form-input" required />
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
                                        <input type='number' value={quantidade} onChange={(e) => { setQuantia(e.target.value); multiplicar(); }} className="form-input" required></input>
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

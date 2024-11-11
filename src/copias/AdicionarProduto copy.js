import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AdicionarProduto() {
    const [nome_produto, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade_estoque, setQuantidade] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [dataCadastro, setData] = useState('');
    const[validade, setValidade] = useState('');
    const [quantidade, setQuantia] = useState('');
    const [multiplicacao, setMultiplicacao] = useState('');

    const handleSubmit = (evento) => {
        evento.preventDefault();
        const novoProduto = { nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro: dataCadastro, validade: validade, quantidade, multiplicacao};

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
                <Col sm={1}></Col>
                <Col sm={8}>

                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                        <form onSubmit={handleSubmit}>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Nome Produto:</div>
                                        <input type="text" value={nome_produto} onChange={(e) => setNome(e.target.value)} placeholder='Digite nome do produto aqui' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Descricao:</div>
                                        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)}  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Categoria:</div>
                                        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder='Categoria produto' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Preço:</div>
                                        <input type="number" value={preco} onChange={(e) => {setPreco(e.target.value); multiplicar();}} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Estoque:</div>
                                        <input type="number" value={quantidade_estoque} onChange={(e) => setQuantidade(e.target.value)} placeholder='Insira a quantidade!' style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>

                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Fornecedor:</div>
                                        <input type="text" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Data Compra:</div>
                                        <input type='date' value={dataCadastro} onChange={(e) => setData(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required></input>
                                    </label>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Validade:</div>
                                        <input type='date' value={validade} onChange={(e) => setValidade(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required></input>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <label style={{ flex: 1 }}>
                                        <div style={{ color: 'black' }}>Quantidade:</div>
                                        <input type='number' value={quantidade} onChange={(e) => {setQuantia(e.target.value); multiplicar()}} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} required></input>
                                    </label>
                                </div>
                                

                                <Button type="submit" variant="secondary" style={{ flex: 1 }}>Adicionar Produto</Button>
                                <Link to="/adicionar" style={{ flex: 1 }}></Link>

                                <div>
                                    <b>Multiplicação Produto:{multiplicacao}</b>
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

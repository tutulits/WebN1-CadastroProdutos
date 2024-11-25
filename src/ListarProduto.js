import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListarProduto() {
    const [produto, setProduto] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/listar')
            .then((resposta) => {
                setProduto(resposta.data);
            })
            .catch((erro) => {
                alert('Erro ao buscar Produto: ' + erro.message);
            });
    }, []);
    return (
        <div>
            <h2 className='centro'>Lista de Produtos</h2>
            <ul>
                {produto.map((produto) => (
                    <li key={produto.id}>
                        {produto.nome_produto} - {produto.descricao} - {produto.categoria} - {produto.preco} - {produto.quantidade_estoque} - {produto.fornecedor} - {produto.data_cadastro} - {produto.validade}- {produto.quantidade}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ListarProduto;
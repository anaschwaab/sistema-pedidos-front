import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

export function Home() {
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [vendasGeral, setVendasGeral] = useState([]);
    const [vendasPorCliente, setVendasPorCliente] = useState(0);
    const [vendasPorProduto, setVendasPorProduto] = useState(0);
    const [quantidadePorCliente, setQuantidadePorCliente] = useState(0);
    const [quantidadePorProduto, setQuantidadePorProduto] = useState(0);
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [selectedProdutoId, setSelectedProdutoId] = useState(null);

    useEffect(() => {
        initializeTable();
        if (selectedClienteId) {
            getTotalVendasPorCliente(selectedClienteId);
            getQuantidadePorCliente(selectedClienteId);
        }
        if (selectedProdutoId) {
            getTotalVendasPorProduto(selectedProdutoId);
            getQuantidadePorProduto(selectedProdutoId);
        }
    }, [selectedClienteId, selectedProdutoId]);


    function initializeTable() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/pedidos")
            .then(response => {
                setPedidos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/vendas")
            .then(response => {
                setVendasGeral(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function getTotalVendasPorCliente(clienteId) {
        axios.get(`http://localhost:3001/vendas?clienteId=${clienteId}`)
            .then(response => {
                console.log(response.data)
                setVendasPorCliente(response.data.vendasPorCliente);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function getQuantidadePorCliente(clienteId) {
        axios.get(`http://localhost:3001/quantidades?clienteId=${clienteId}`)
            .then(response => {
                console.log(response.data)
                setQuantidadePorCliente(response.data.quantidadePorCliente);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function getTotalVendasPorProduto(produtoId) {
        axios.get(`http://localhost:3001/vendas?produtoId=${produtoId}`)
            .then(response => {
                console.log(response.data)
                setVendasPorProduto(response.data.vendasPorProduto);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function getQuantidadePorProduto(produtoId) {
        axios.get(`http://localhost:3001/quantidades?produtoId=${produtoId}`)
            .then(response => {
                console.log(response.data)
                setQuantidadePorProduto(response.data.quantidadePorProduto);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function resetCampoPesquisaCliente() {
        setSelectedClienteId(null);
    };

    function resetCampoPesquisaProduto() {
        setSelectedProdutoId(null);
    };

    return (
        <div>
            <Container>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Dashboard</h1>
                </div>
                <hr />
                <div className="d-flex justify-content-evenly">
                    <Card className="card-home">
                        <Card.Body>
                            <Card.Title>Total de Vendas Geral</Card.Title>
                            <Card.Text style={{ color: "#021B79", fontWeight: "bold", fontSize: 50 }}
                                className="d-flex justify-content-center">
                                {vendasGeral.vendas?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="card-home">
                        <Card.Body>
                            <Card.Title>Total de Pedidos</Card.Title>
                            <Card.Text style={{ color: "#021B79", fontWeight: "bold", fontSize: 50 }}
                                className="d-flex justify-content-center">
                                {pedidos.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div className="container" >
                        <div className="row mb-3 mt-3">
                            <select
                                className="form-select"
                                value={selectedClienteId || ""}
                                onChange={(e) => {
                                    setSelectedClienteId(e.target.value);
                                    setVendasPorCliente(0);
                                }}
                            >
                                <option value="">Filtre por cliente...</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedClienteId && (
                            <div className="produtoss container">
                                <h2 style={{ color: "#021B79", fontWeight: "bold", fontSize: 25 }}>Total de vendas/quantidade por cliente:</h2>
                                <div className="row mb-3 mt-3" style={{ display: "flex", justifyContent: "space-around", gap: 8 }}>
                                    <Card className="card-selected" key={selectedClienteId.id}>
                                        <Card.Body>
                                            <Card.Title>Total de Vendas</Card.Title>
                                            <Card.Text style={{ color: "#021B79", fontWeight: "bold", fontSize: 50 }}
                                                className="d-flex justify-content-center">
                                                {vendasPorCliente ? parseFloat(vendasPorCliente)?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className="card-selected">
                                        <Card.Body>
                                            <Card.Title>Total de Pedidos</Card.Title>
                                            <Card.Text style={{ color: "#021B79", fontWeight: "bold", fontSize: 50 }}
                                                className="d-flex justify-content-center">
                                                {quantidadePorCliente}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {selectedClienteId && (
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button className="mb-3 mt-0.5 button-sistema" onClick={() => resetCampoPesquisaCliente()}>Limpar seleção</button>
                            </div>
                        )}
                    </div>
                    <div className="produtos container">
                        <div className="row mb-3 mt-3">
                            <select
                                className="form-select"
                                value={selectedProdutoId || ""}
                                onChange={(e) => {
                                    setSelectedProdutoId(e.target.value);
                                    setVendasPorProduto(0);
                                }}
                            >
                                <option value="">Filter por produto...</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedProdutoId && (
                            <div className="produtoss container">
                                <h2 style={{ color: "#021B79", fontWeight: "bold", fontSize: 25 }}>Total de vendas/quantidade por produto:</h2>
                                <div className="row mb-3 mt-3" style={{ display: "flex", justifyContent: "space-around", gap: 8 }}>
                                    <Card className="card-selected" key={selectedProdutoId.id}>
                                        <Card.Body>
                                            <Card.Title>Total de Vendas</Card.Title>
                                            <Card.Text style={{ color: "#021B79", fontWeight: "bold", fontSize: 50 }}
                                                className="d-flex justify-content-center">
                                                { vendasPorProduto? parseFloat(vendasPorProduto)?.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card className="card-selected">
                                        <Card.Body>
                                            <Card.Title>Total de Pedidos</Card.Title>
                                            <Card.Text style={{ color: "#021B79", fontWeight: "bold", fontSize: 50 }}
                                                className="d-flex justify-content-center">
                                                {quantidadePorProduto}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {selectedProdutoId && (
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button className="mb-3 mt-0.5 button-sistema" onClick={() => resetCampoPesquisaProduto()}>Limpar seleção</button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}
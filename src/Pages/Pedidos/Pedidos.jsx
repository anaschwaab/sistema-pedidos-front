import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Modal, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash, BsInfoSquareFill } from "react-icons/bs";

export function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedVendedor, setSelectedVendedor] = useState(null);
    const [selectedTransportadora, setSelectedTransportadora] = useState(null);
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showVendedorModal, setShowVendedorModal] = useState(false);
    const [showTransportadoraModal, setShowTransportadoraModal] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3001/pedidos")
            .then((response) => {
                console.log(response.data);
                setPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleDelete(id) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        axios
            .delete(`http://localhost:3001/pedidos/${deleteId}`)
            .then((response) => {
                console.log(response.data);
                toast.success(response.data.message, {
                    position: "bottom-right",
                    duration: 2000,
                });
                setShowDeleteModal(false);
                setPedidos(pedidos.filter((pedido) => pedido.id !== deleteId));
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    duration: 2000,
                });
            });
    }

    function handleCloseModal() {
        setShowDeleteModal(false);
    }

    function handleClienteModal(cliente) {
        setSelectedCliente(cliente);
        setShowClienteModal(true);
    }

    function handleCloseClienteModal() {
        setShowClienteModal(false);
    }

    function handleVendedorModal(vendedor) {
        setSelectedVendedor(vendedor);
        setShowVendedorModal(true);
    }

    function handleCloseVendedorModal() {
        setShowVendedorModal(false);
    }

    function handleTransportadoraModal(transportadora) {
        setSelectedTransportadora(transportadora);
        setShowTransportadoraModal(true);
    }

    function handleCloseTransportadoraModal() {
        setShowTransportadoraModal(false);
    }

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Pedidos</h1>
            </div>
            <hr />
            <Row>
                {pedidos.map((pedido) => {
                    console.log(pedidos)
                    const dataPedido = new Date(pedido.data_inicio);
                    const dia = String(dataPedido.getUTCDate()).padStart(2, '0');
                    const mes = String(dataPedido.getUTCMonth() + 1).padStart(2, '0');
                    const ano = dataPedido.getUTCFullYear();
                    const dataFormatada = `${dia}/${mes}/${ano}`;
                    
                    return (
                        <Col md={7} style={{ width: "100%"}} key={pedido.id} >
                            <Card className="mb-4">
                                <Card.Header>
                                    <Card.Title>PEDIDO N° 
                                    <span style={{ color: "grey", fontSize: "12px"}}> {pedido.id}</span>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
                                    <div >
                                    <Card.Text>
                                        <strong>Pedido realizado:</strong> {dataFormatada}
                                    </Card.Text>
                                    <Card.Text style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                        <strong>Cliente:</strong>{" "}
                                        {pedido.cliente?.nome}<BsInfoSquareFill style={{ cursor: "pointer" }} onClick={() => handleClienteModal(pedido.cliente)} />
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Tipo de Transporte:</strong> {pedido.tipo_transporte}
                                    </Card.Text>
                                    <Card.Text style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                        <strong>Vendedor:</strong> {pedido.vendedor?.nome}<BsInfoSquareFill style={{ cursor: "pointer" }} onClick={() => handleVendedorModal(pedido.vendedor)} />
                                    </Card.Text>
                                    <Card.Text style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                        <strong>Transportadora:</strong> {pedido.transportadora?.nome}<BsInfoSquareFill style={{ cursor: "pointer" }} onClick={() => handleTransportadoraModal(pedido.transportadora)} />
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Observação:</strong>{" "}
                                        {pedido.observacao ? pedido.observacao : "-"}
                                    </Card.Text>
                                    </div>
                                    <div >
                                    <Card.Text>
                                        <strong>Pagamento:</strong> {pedido.pagamento}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Produtos:</strong>{" "}
                                        {pedido.produtos.map((produto) => (
                                            <ul>{`${produto.nome}/${produto.origem}`}</ul>
                                        ))}
                                    </Card.Text>
                                    </div>
                                </Card.Body>
                                <Card.Footer style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="outline-warning"
                                        as={Link}
                                        to={`/pedidos/editar/${pedido.id}`}
                                    >
                                        <BsPencil />
                                    </Button>{" "}
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleDelete(pedido.id)}
                                    >
                                        <BsTrash />
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza de que deseja excluir este pedido?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showClienteModal} onHide={handleCloseClienteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Informações do Cliente</Modal.Title>
                </Modal.Header>
                {selectedCliente && (
                    <Modal.Body>
                        <p>
                            <strong>Nome:</strong> {selectedCliente.nome}
                        </p>
                        <p>
                            <strong>Endereço:</strong> {selectedCliente.endereco}
                        </p>
                        <p>
                            <strong>Cidade:</strong> {selectedCliente.cidade}
                        </p>
                        <p>
                            <strong>Estado:</strong> {selectedCliente.estado}
                        </p>
                        <p>
                            <strong>Observação:</strong> {selectedCliente.observacao ? selectedCliente.observacao : '-'}
                        </p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseClienteModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showVendedorModal} onHide={handleCloseVendedorModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Informações do Vendedor</Modal.Title>
                </Modal.Header>
                {selectedVendedor && (
                    <Modal.Body>
                        <p>
                            <strong>Nome:</strong> {selectedVendedor.nome}
                        </p>
                        <p>
                            <strong>Cargo:</strong> {selectedVendedor.cargo}
                        </p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVendedorModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTransportadoraModal} onHide={handleCloseTransportadoraModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Informações da Transportadora</Modal.Title>
                </Modal.Header>
                {selectedTransportadora && (
                    <Modal.Body>
                        <p>
                            <strong>Nome:</strong> {selectedTransportadora.nome}
                        </p>
                        <p>
                            <strong>Endereço:</strong> {selectedTransportadora.endereco}
                        </p>
                        <p>
                            <strong>Cidade:</strong> {selectedTransportadora.cidade}
                        </p>
                        <p>
                            <strong>Estado:</strong> {selectedTransportadora.estado}
                        </p>
                        <p>
                            <strong>Observação:</strong> {selectedTransportadora.observacao ? selectedTransportadora.observacao : '-'}
                        </p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTransportadoraModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

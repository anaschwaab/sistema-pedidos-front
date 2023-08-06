import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";

export function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    function handleDelete(id) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        axios
            .delete(`http://localhost:3001/produtos/${deleteId}`)
            .then((response) => {
                console.log(response.data);
                toast.success(response.data.message, {
                    position: "bottom-right",
                    duration: 2000,
                });
                setShowDeleteModal(false);
                setProdutos(produtos.filter((produto) => produto.id !== deleteId));
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

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Produtos</h1>
            </div>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Origem</th>
                        <th>Valor Item</th>
                        <th>Frete</th>
                        <th>Desconto</th>
                        <th>Valor Total</th>
                        <th>Editar</th>
                        <th>Apagar</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => {
                        return (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.origem}</td>
                                <td>{parseFloat(produto.valor_venda).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}</td>
                                <td>{parseFloat(produto.valor_frete).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}</td>
                                <td>{parseFloat(produto.valor_desconto).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}</td>
                                <td>{parseFloat(produto.valor_total).toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}</td>
                                <td>
                                    <Button variant="outline-warning" as={Link} to={`/produtos/editar/${produto.id}`}><BsPencil /></Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleDelete(produto.id)}><BsTrash /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja excluir este produto?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
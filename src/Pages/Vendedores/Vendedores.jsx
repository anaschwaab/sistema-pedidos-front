import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";

export function Vendedores() {
    const [vendedores, setVendedores] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/vendedores")
            .then(response => {
                setVendedores(response.data);
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
            .delete(`http://localhost:3001/vendedores/${deleteId}`)
            .then((response) => {
                console.log(response.data);
                toast.success(response.data.message, {
                    position: "bottom-right",
                    duration: 2000,
                });
                setShowDeleteModal(false);
                setVendedores(vendedores.filter((vendedor) => vendedor.id !== deleteId));
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
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Vendedores</h1>
            </div>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Editar</th>
                        <th>Apagar</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores.map(vendedor => {
                        return (
                            <tr key={vendedor.id}>
                                <td>{vendedor.nome}</td>
                                <td>{vendedor.cargo}</td>
                                <td>
                                    <Button variant="outline-warning" as={Link} to={`/vendedores/editar/${vendedor.id}`}><BsPencil /></Button>
                                </td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => handleDelete(vendedor.id)}><BsTrash /></Button>
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
                    Tem certeza de que deseja excluir este vendedor?
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
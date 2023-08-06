import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function EditarPedido() {

    const [clientes, SetClientes] = useState([]);
    const [produtos, SetProdutos] = useState([]);
    const [vendedores, SetVendedores] = useState([]);
    const [transportadoras, SetTransportadoras] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/pedidos/${id}`, data)
        .then(response => {
            console.log(response);
            navigate("/pedidos");
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/pedidos?id=${id}`)
        .then((response) => {
            const { data_inicio, tipo_transporte, pagamento, observacao, clienteId, produtoId, vendedorId, transportadoraId } = response.data;
            reset({ data_inicio, tipo_transporte, pagamento, observacao, clienteId, produtoId, vendedorId, transportadoraId  });
        });
    }, [id, reset]);

    useEffect(() => {
        axios.get("http://localhost:3001/clientes")
            .then((response) => {
                SetClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get("http://localhost:3001/produtos")
            .then((response) => {
                SetProdutos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get("http://localhost:3001/vendedores")
            .then((response) => {
                SetVendedores(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get("http://localhost:3001/transportadoras")
            .then((response) => {
                SetTransportadoras(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Edição de pedido</h1>
            </div>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Select
                        className={errors.clienteId && "is-invalid"}
                        {...register("clienteId", {
                            required: "Por favor, escolha um cliente para registrar o pedido!",
                        })}>
                        <option value="" desabled>Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.clienteId?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select
                        className={errors.produtoId && "is-invalid"}
                        {...register("produtoId", {
                            required: "Por favor, escolha um produto para registrar o pedido!",
                        })}>
                        <option value="" disabled>Selecione um produto</option>
                        {produtos.map((produto) => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.produtoId?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select
                        className={errors.vendedorId && "is-invalid"}
                        {...register("vendedorId", {
                            required: "Por favor, escolha um vendedor para registrar o pedido!",
                        })}>
                        <option value="" disabled>Selecione um vendedor</option>
                        {vendedores.map((vendedor) => (
                            <option key={vendedor.id} value={vendedor.id}>
                                {vendedor.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.vendedorId?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select
                        className={errors.transportadoraId && "is-invalid"}
                        {...register("transportadoraId", {
                            required: "Por favor, escolha uma transportadora para registrar o pedido!",
                        })}>
                        <option value="" disabled>Selecione uma Transportadora</option>
                        {transportadoras.map((transportadora) => (
                            <option key={transportadora.id} value={transportadora.id}>
                                {transportadora.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.transportadoraId?.message}
                    </Form.Text>
                </Form.Group>

                <div className="d-flex w-100 justify-content-start gap-5">
                    <Form.Group className="mb-3">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            type="date"
                            className={errors.data_inicio && "is-invalid"}
                            {...register("data_inicio", {
                                required: "A data é obrigatória."
                            })} />
                        {errors.data_inicio && (
                            <Form.Text className="invalid-feedback">
                                {errors.data_inicio.message}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Transporte</Form.Label>
                        <div className={errors.tipo_transporte && "is-invalid"}>
                            <Form.Check inline type="radio" label="CIF" name="CIF" id="CIF" value="1 - CIF" {...register("tipo_transporte", {
                                required: "Por favor, escolha o tipo de transporte."
                            })} />
                            <Form.Check inline type="radio" label="FOB" name="FOB" id="FOB" value="2 - FOB" {...register("tipo_transporte", {
                                required: "Por favor, escolha o tipo de transporte."
                            })} />
                        </div>
                        {errors.tipo_transporte && (
                            <Form.Text className="invalid-feedback">
                                {errors.tipo_transporte.message}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pagamento</Form.Label>
                        <div className={errors.pagamento && "is-invalid"}>
                            <Form.Check inline type="radio" label="À vista" name="vista" id="vista" value="À vista" {...register("pagamento", {
                                required: "Por favor, escolha o tipo de pagamento."
                            })} />
                            <Form.Check inline type="radio" label="À prazo" name="prazo" id="prazo" value="À prazo" {...register("pagamento", {
                                required: "Por favor, escolha o tipo de pagamento."
                            })} />
                        </div>
                        {errors.pagamento && (
                            <Form.Text className="invalid-feedback">
                                {errors.pagamento.message}
                            </Form.Text>
                        )}
                    </Form.Group>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Observação</Form.Label>
                    <Form.Control as="textarea" rows={3} {...register("observacao")} />
                </Form.Group>

                <button className="mb-3 mt-0.5 button-sistema" variant="primary" type="submit">Editar</button>

            </Form>
        </div>
    )
}
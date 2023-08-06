import axios from "axios";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function NovoProduto() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/produtos", data)
            .then(response => {
                console.log(response);
                navigate("/produtos");
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Cadastro de produtos</h1>
            </div>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Origem</Form.Label>
                    <Form.Select 
                    className={errors.origem && "is-invalid"}
                    {...register("origem", {
                        required: "Por favor, escolha a origem para registrar o pedido!",
                    })} defaultValue="">
                        <option value="" disabled>Selecione a origem do produto</option>
                        <option value="Comprado">Comprado</option>
                        <option value="Fabricado">Fabricado</option>
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.origem?.message}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Valor da Venda</Form.Label>
                    <Form.Control
                        className={errors.valor_venda && "is-invalid"}
                        type="number"
                        step="0.01"
                        {...register("valor_venda", {
                            required: "Por favor, preencha o campo."
                        })}
                    />
                    {errors.valor_venda && (
                        <Form.Text className="invalid-feedback">
                            {errors.valor_venda.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Valor do Frete</Form.Label>
                    <Form.Control
                        className={errors.valor_frete && "is-invalid"}
                        type="number"
                        step="0.01"
                        {...register("valor_frete", {
                            required: "Por favor, preencha o campo."
                        })}
                    />
                    {errors.valor_frete && (
                        <Form.Text className="invalid-feedback">
                            {errors.valor_frete.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Desconto</Form.Label>
                    <Form.Control
                        className={errors.valor_desconto && "is-invalid"}
                        type="number"
                        step="0.01"
                        {...register("valor_desconto", {
                            required: "Por favor, preencha o campo."
                        })}
                    />
                    {errors.valor_desconto && (
                        <Form.Text className="invalid-feedback">
                            {errors.valor_desconto.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Valor Total</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        readOnly
                        {...register("valor_total")}
                    />
                </Form.Group>

                <button className="mb-3 mt-0.5 button-sistema" variant="primary" type="submit">Cadastrar</button>

            </Form>
        </div>
    );
};
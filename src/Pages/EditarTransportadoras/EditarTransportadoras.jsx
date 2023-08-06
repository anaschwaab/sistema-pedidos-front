import axios from "axios";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function EditarTransportadoras() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/transportadoras/${id}`, data)
        .then(response => {
            console.log(response);
            navigate("/transportadoras");
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/transportadoras?id=${id}`)
        .then((response) => {
            const { nome, endereco, cidade, estado, observacao } = response.data;
            reset({ nome, endereco, cidade, estado, observacao });
        })
    }, [id, reset]);

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Edição de transportadora</h1>
            </div>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" className={errors.endereco && "is-invalid"} {...register("endereco", { required: "O endereco é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.endereco && <Form.Text className="invalid-feedback">{errors.endereco.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" className={errors.cidade && "is-invalid"} {...register("cidade", { required: "A cidade é obrigatória.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.cidade && <Form.Text className="invalid-feedback">{errors.cidade.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control type="text" className={errors.estado && "is-invalid"} {...register("estado", { required: "O estado é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.estado && <Form.Text className="invalid-feedback">{errors.estado.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Observação</Form.Label>
                    <Form.Control type="text" {...register("observacao")}></Form.Control>
                </Form.Group>

                <button className="mb-3 mt-0.5 button-sistema" variant="primary" type="submit">Editar</button>

            </Form>
        </div>
    );
};
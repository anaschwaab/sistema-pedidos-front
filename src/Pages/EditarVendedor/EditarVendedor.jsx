import axios from "axios";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function EditarVendedor() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/vendedores/${id}`, data)
            .then(response => {
                console.log(response);
                navigate("/vendedores");
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/vendedores?id=${id}`)
        .then((response) => {
            const { nome, cargo } = response.data;
            reset({ nome, cargo });
        })
    }, [id, reset]);

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <h1 style={{ color: "#021B79", marginTop: "0.3em" }}>Edição de vendedores</h1>
            </div>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control type="text" className={errors.cargo && "is-invalid"} {...register("cargo", { required: "O cargo é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.cargo && <Form.Text className="invalid-feedback">{errors.cargo.message}</Form.Text>}
                </Form.Group>

                <button className="mb-3 mt-0.5 button-sistema" variant="primary" type="submit">Editar</button>

            </Form>
        </div>
    );
};
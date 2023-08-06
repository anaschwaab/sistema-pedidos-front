import { Link } from "react-router-dom";
import "./style.css";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../CustomToggle/CustomToggle";
import CustomDropdownItem from "../CustomDropdownItem/CustomDropdownItem";

export function Header() {
    return (
        <header className="header w-100 px-3 py-2">
            <nav className="container d-flex justify-content-between align-items-center">
                <Link to="/">
                    <h1>Sistema de Pedidos</h1>
                </Link>
                <div className="d-flex gap-4">
                    <Dropdown className="d-flex gap-4">
                        <Dropdown.Toggle as={CustomToggle} id="pedidos-dropdown">
                            Pedidos
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem>
                                <Link to="/pedidos">Ver pedidos</Link>
                            </CustomDropdownItem>
                            <CustomDropdownItem>
                                <Link to="/pedidos/novo">Adicionar pedidos</Link>
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-flex gap-4">
                        <Dropdown.Toggle as={CustomToggle} id="clientes-dropdown">
                            Clientes
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem>
                                <Link to="/clientes">Ver clientes</Link>
                            </CustomDropdownItem>
                            <CustomDropdownItem>
                                <Link to="/clientes/novo">Adicionar cliente</Link>
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-flex gap-4">
                        <Dropdown.Toggle as={CustomToggle} id="produtos-dropdown">
                            Produtos
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem>
                                <Link to="/produtos">Ver produtos</Link>
                            </CustomDropdownItem>
                            <CustomDropdownItem>
                                <Link to="/produtos/novo">Adicionar produto</Link>
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-flex gap-4">
                        <Dropdown.Toggle as={CustomToggle} id="vendedores-dropdown">
                            Vendedores
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem>
                                <Link to="/vendedores">Ver vendedores</Link>
                            </CustomDropdownItem>
                            <CustomDropdownItem>
                                <Link to="/vendedores/novo">Adicionar vendedor</Link>
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="d-flex gap-4">
                        <Dropdown.Toggle as={CustomToggle} id="transportadoras-dropdown">
                            Transportadoras
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <CustomDropdownItem>
                                <Link to="/transportadoras">Ver transportadoras</Link>
                            </CustomDropdownItem>
                            <CustomDropdownItem>
                                <Link to="/transportadoras/novo">Adicionar transportadora</Link>
                            </CustomDropdownItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
        </header>
    );
}
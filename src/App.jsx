import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./Pages/Root/Root";
import { Home } from "./Pages/Home/Home";
import { NovoCliente } from "./Pages/NovoCliente/NovoCliente";
import { NovoTransportadora } from "./Pages/NovaTransportadora/NovaTransportadora";
import { NovoProduto } from "./Pages/NovoProduto/NovoProduto";
import { NovoVendedor } from "./Pages/NovoVendedor/NovoVendedor";
import { NovoPedido } from "./Pages/NovoPedido/NovoPedido";
import { Clientes } from "./Pages/Clientes/Clientes";
import { Pedidos } from "./Pages/Pedidos/Pedidos";
import { EditarCliente } from "./Pages/EditarCliente/EditarCliente";
import { EditarProduto } from "./Pages/EditarProdutos/EditarProdutos";
import { Produtos } from "./Pages/Produtos/Produtos";
import { Transportadoras } from "./Pages/Transportadora/Transportadora";
import { EditarTransportadoras } from "./Pages/EditarTransportadoras/EditarTransportadoras";
import { EditarVendedor } from "./Pages/EditarVendedor/EditarVendedor";
import { Vendedores } from "./Pages/Vendedores/Vendedores";
import { EditarPedido } from "./Pages/EditarPedido/EditarPedido";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/clientes" element={<Clientes />}/>
                        <Route path="/clientes/novo" element={<NovoCliente />} />
                        <Route path="/clientes/editar/:id" element={<EditarCliente />}/>
                        <Route path="/pedidostable" element={<Pedidos />}/>
                        <Route path="/pedidos" element={<Pedidos />}/>
                        <Route path="/pedidos/novo" element={<NovoPedido />}/>
                        <Route path="/pedidos/editar/:id" element={<EditarPedido />}/>
                        <Route path="/transportadoras" element={<Transportadoras />}/>
                        <Route path="/transportadoras/novo" element={<NovoTransportadora />}/>
                        <Route path="/transportadoras/editar/:id" element={<EditarTransportadoras />}/>
                        <Route path="/vendedores" element={<Vendedores />} />
                        <Route path="/vendedores/novo" element={<NovoVendedor />} />
                        <Route path="/vendedores/editar/:id" element={<EditarVendedor />} />
                        <Route path="/produtos" element={<Produtos />}/>
                        <Route path="/produtos/novo" element={<NovoProduto />}/>
                        <Route path="/produtos/editar/:id" element={<EditarProduto />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
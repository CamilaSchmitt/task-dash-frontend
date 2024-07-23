import { useState, useEffect } from "react";
import QuadroContext from "./QuadroContext";
import {
    getQuadrosAPI, getQuadroPorCodigoAPI,
    deleteQuadroAPI, cadastrarQuadroAPI
} from "../../../servicos/QuadroServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Quadro() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo: "", nome: "" });
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: 0, nome: "" , autor: "" });
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getQuadroPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastrarQuadroAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaQuadros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaQuadros = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getQuadrosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteQuadroAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaQuadros();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaQuadros();
    }, []);


    return (
        <QuadroContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />

        </QuadroContext.Provider>
    )
}

// import WithAuth from "../../../seguranca/WithAuth";
export default WithAuth(Quadro);

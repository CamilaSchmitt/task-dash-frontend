import { useState, useEffect } from "react";
import TarefaContext from "./TarefaContext";
import { getQuadrosAPI } from "../../../servicos/QuadroServico";
import {
    getTarefasAPI, getTarefaPorCodigoAPI,
    deleteTarefaAPI, cadastrarTarefaAPI
} from "../../../servicos/TarefaServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Tarefa() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaQuadros, setListaQuadros] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: "", descricao: "", prioridade: "", 
        data_criacao: new Date().toISOString().slice(0, 10), quadro: ""
    });
    const [carregando, setCarregando] = useState(true);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", titulo: "", descricao: "", prioridade: "",
            data_criacao: new Date().toISOString().slice(0, 10), quadro: ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getTarefaPorCodigoAPI(codigo));
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
            let retornoAPI = await cadastrarTarefaAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaTarefas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaTarefas = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getTarefasAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaQuadros = async () => {
        try {
            setListaQuadros(await getQuadrosAPI());
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteTarefaAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaTarefas();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaTarefas();
        recuperaQuadros();
    }, []);


    return (
        <TarefaContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaQuadros
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />

        </TarefaContext.Provider>
    )
}

export default WithAuth(Tarefa);

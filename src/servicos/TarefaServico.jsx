import { getToken } from "../seguranca/Autenticacao";

export const getTarefasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefa`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getTarefaPorCodigoAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefa/${codigo}`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteTarefaAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefa/${codigo}`,
    {
        method : "DELETE",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const cadastrarTarefaAPI = async (metodo, objeto) => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefa`,
    {
        method : metodo,
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        },
        body : JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
}
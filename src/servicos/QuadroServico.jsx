import { getToken } from "../seguranca/Autenticacao";

export const getQuadrosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/quadro`,
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

export const getQuadroPorCodigoAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/quadro/${codigo}`,
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

export const deleteQuadroAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/quadro/${codigo}`,
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

export const cadastrarQuadroAPI = async (metodo, objeto) => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/quadro`,
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
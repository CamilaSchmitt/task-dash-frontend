import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import TarefaContext from "./TarefaContext";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaQuadros }
        = useContext(TarefaContext);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className="modal fade" id="modalEdicao"
            tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5"
                            id="exampleModalLabel">Edição de Produtos</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            {/* <div className="mb-3">
                                <label htmlFor="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control" id="txtCodigo"
                                    readOnly name="codigo" value={objeto.codigo} onChange={handleChange} />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="txtTitulo" className="form-label">Titulo</label>
                                <input type="text" className="form-control"
                                    id="txtTitulo" placeholder="Informe o titulo"
                                    required name="titulo" value={objeto.titulo}
                                    onChange={handleChange} />
                                <div className="valid-feedback">
                                    Titulo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o titulo!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDescricao"
                                    className="form-label">Descrição</label>
                                <input type="text" className="form-control"
                                    id="txtDescricao" placeholder="Informe a descrição"
                                    required name="descricao" value={objeto.descricao}
                                    onChange={handleChange} />
                                <div className="valid-feedback">
                                    Descrição OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe a descrição!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectPrioridade"
                                    className="form-label">Prioridade</label>
                                <select className="form-control"
                                    id="selectPrioridade"
                                    required name="prioridade"
                                    value={objeto.prioridade}
                                    onChange={handleChange} >
                                    <option disabled="true" value="">Selecione a prioridade</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </select>
                                <div className="valid-feedback">
                                    Prioridade OK!
                                </div>
                                <div className="invalid-feedback">
                                    Selecione a prioridade!
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDataCriacao"
                                    className="form-label">Data de Criacao</label>
                                <input type="date" className="form-control"
                                    id="txtDataCriacao"
                                    required name="data_criacao"
                                    value={objeto.data_criacao}
                                    onChange={handleChange} />
                                <div className="valid-feedback">
                                    Data de criação OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe a data de criação!
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="selectQuadro"
                                    className="form-label">Quadro</label>
                                <select type="text" className="form-control"
                                    id="selectQuadro"
                                    required name="quadro" value={objeto.quadro}
                                    onChange={handleChange} >
                                    <option disabled="true" value="">Selecione o quadro</option>
                                    {
                                        listaQuadros.map((quadro) => (
                                            <option key={quadro.codigo}
                                                value={quadro.codigo}>
                                                {quadro.nome}
                                            </option>
                                        ))
                                    }
                                </select>
                                <div className="valid-feedback">
                                    Quadro OK!
                                </div>
                                <div className="invalid-feedback">
                                    Selecione o quadro
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Fechar</button>
                            <button type="submit"
                                className="btn btn-success">
                                Salvar
                                <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;

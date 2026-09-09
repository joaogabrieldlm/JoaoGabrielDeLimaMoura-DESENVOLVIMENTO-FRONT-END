import { instalarEventosDoQuadro } from "./renderizacao.js";
import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

async function iniciar() {
    const quadro = document.querySelector("[data-quadro]");

    if (!quadro) {
        throw new Error("Contêiner [data-quadro] não encontrado.");
    }

    let tarefas = [];
    instalarEventosDoQuadro(quadro, () => tarefas);

    renderizarEstado("carregando");

    try {
        tarefas = await carregarTarefas();

        renderizarEstado(tarefas.length === 0 ? "vazio" : "sucesso", tarefas);
    } catch (erro) {
        renderizarEstado("erro", erro);
    }
}

iniciar();

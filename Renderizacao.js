const CLASSE_POR_STATUS = {
    "a-fazer": "status-fazer",
    "em-andamento": "status-andamento",
    "em-revisao": "status-revisao",
    "concluida": "status-concluido",
};

const ROTULO_PRIORIDADE = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
};

function criarCampo(rotulo, valor, classe = "texto-padrao") {
    const paragrafo = document.createElement("p");
    paragrafo.className = classe;

    const forte = document.createElement("strong");
    forte.textContent = `${rotulo}:`;

    paragrafo.append(forte, ` ${valor}`);
    return paragrafo;
}

export function criarCartao(tarefa) {
    const cartao = document.createElement("article");
    const classeStatus = CLASSE_POR_STATUS[tarefa.status] ?? "status-fazer";
    cartao.className = `cartao-tarefa ${classeStatus}`;
    cartao.dataset.tarefaId = tarefa.id;

    const titulo = document.createElement("h4");
    titulo.className = "titulo-cartao";
    titulo.textContent = tarefa.titulo;

    const prioridade = ROTULO_PRIORIDADE[tarefa.prioridade] ?? tarefa.prioridade;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.dataset.acao = "ver-detalhes";
    const rotuloBotao = document.createElement("span");
    rotuloBotao.textContent = "Ver detalhes";
    botao.append(rotuloBotao);

    cartao.append(
        titulo,
        criarCampo("Projeto", tarefa.projeto),
        criarCampo("Responsável", tarefa.responsavel),
        criarCampo("Prazo", tarefa.prazo, "texto-pequeno"),
        criarCampo("Prioridade", prioridade, "texto-pequeno"),
        botao
    );

    return cartao;
}

export function renderizarTarefas(tarefas, quadro) {
    const colunas = quadro.querySelectorAll("[data-lista-status]");

    colunas.forEach((lista) => {
        const status = lista.dataset.listaStatus;
        const tarefasDoStatus = tarefas.filter((tarefa) => tarefa.status === status);

        if (tarefasDoStatus.length === 0) {
            const mensagemVazia = document.createElement("li");
            mensagemVazia.className = "texto-pequeno";
            mensagemVazia.textContent = "Nenhuma tarefa nesta coluna.";
            lista.replaceChildren(mensagemVazia);
            return;
        }

        const itens = tarefasDoStatus.map((tarefa) => {
            const item = document.createElement("li");
            item.append(criarCartao(tarefa));
            return item;
        });

        lista.replaceChildren(...itens);
    });
}

export function instalarEventosDoQuadro(quadro, obterTarefas) {
    quadro.addEventListener("click", (evento) => {
        if (!(evento.target instanceof Element)) return;

        const botao = evento.target.closest('button[data-acao="ver-detalhes"]');
        if (!botao || !quadro.contains(botao)) return;

        const cartao = botao.closest("[data-tarefa-id]");
        if (!cartao) return;

        const tarefas = obterTarefas();
        const tarefa = tarefas.find((item) => item.id === cartao.dataset.tarefaId);
        if (!tarefa) return;

        console.log("Detalhes da tarefa:", tarefa);
    });
}

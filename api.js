export async function carregarTarefas() {

    const resposta = await fetch("./dados.json");
  
    if (!resposta.ok) {
        const erro = new Error(`Resposta HTTP ${resposta.status}`);
        erro.status = resposta.status;
        throw erro;
    }

    const documento = await resposta.json();
    return documento.tarefas ?? [];
}

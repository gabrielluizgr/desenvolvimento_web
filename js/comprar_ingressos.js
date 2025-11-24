/* DOMContentLoaded
 Utilizado para executar a função após ter terminado de carregar todo HTML
 Garantindo que os elementos já existam no DOM para que o JS consiga acessa-los
*/ 
document.addEventListener("DOMContentLoaded", function() {
    // Jogos é um objeto, (imagine como se fosse um banco de dados em memoria)
    const jogos = {
        // Cada chave tem um objeto com nome: descricao: ingressosDisp: valor:
        1: { nome: "Internacional (RS) x Corinthians (SP)", descricao: "Internacional (RS) x Corinthians (SP) no Estádio Beira-Rio!", ingressosDisp: 3523, valor: 90 },
        2: { nome: "Grêmio (RS) x Flamengo (RJ)", descricao: "Grêmio (RS) x Flamengo (RJ) na Arena do Grêmio!", ingressosDisp: 5823, valor: 80 },
        3: { nome: "São Paulo (SP) x Santos (SP)", descricao: "São Paulo (SP) x Santos (SP) no Estádio Morumbis!", ingressosDisp: 0, valor: 100 },
        4: { nome: "Atlético Mineiro (MG) x Cruzeiro (MG)", descricao: "Atlético Mineiro (MG) x Cruzeiro (MG) na Arena MRV!", ingressosDisp: 1865, valor: 90 },
    };

    // selectJogo nome da variavel no JS. (nome deixa bem claro que é um select do jogo)
    // getElementById -> pega o id="select_jogo" na view (html) - Mesmo serve para as outras variaveis.
    const selectJogo = document.getElementById("select_jogo");
    const containerFormulario = document.getElementById("container_formulario");
    const form = document.getElementById("formulario_comprar_ingressos");

    // createElement -> Cria uma div dinamicamente via JS.
    const infoDiv = document.createElement("div");
    // Adiciona uma classe ( nessa caso CSS ) Alerta e um margin top 
    infoDiv.classList.add("alert", "mt-3");
    // Adiciona a div dentro do container do formulario (appendChild) Insere um elementro dentro de outro elemento.
    containerFormulario.appendChild(infoDiv);

    // Fica (ouvindo o evento selectJogo) executando toda vez que usuario muda a opção (change)
    selectJogo.addEventListener("change", function() {
        // Pega a opcao (valor) que foi selecionado, correspondente no "banco" de jogos
        const jogoSelecionado = jogos[this.value];

        // Apenas uma verificacao pra sair da funcao caso nao encontre um jogo
        if (!jogoSelecionado) return;

        // Criado uma variavel com um if ternario.
            /*
                Se vagas > 0  "alert-success" (tem vaga, mensagem verde/positiva).
                Se vagas === 0  "alert-danger" (lotado, mensagem vermelha/negativa).
                ? -> é o nosso IF
                : -> é o nosso ELSE
            */
        let classeAlerta = jogoSelecionado.ingressosDisp > 0 ? "alert-success" : "alert-danger";

        // Aqui ele monta nossa clase conforme o alerta anterior.
        infoDiv.className = `alert ${classeAlerta} mt-3`;

        // InnerHTML montar o html para a view. toFixed -> quantas casas decimais. 
        infoDiv.innerHTML = `
            <strong>${jogoSelecionado.nome}</strong><br>
            ${jogoSelecionado.descricao}<br>
            Ingressos disponíveis: <b>${jogoSelecionado.ingressosDisp}</b><br>
            Valor do ingresso: <b>R$ ${jogoSelecionado.valor.toFixed(2)}</b>
        `;
    });

    // Adiciona um "ouvinte" para o envio do formulario (submit)
    form.addEventListener("submit", function(j) {
        // Evita que a pagina seja carregada ou enviar os dados para o servidor.
        j.preventDefault();
        const jogoId = selectJogo.value;
        const qtd = parseInt(document.getElementById("qtd").value);

        if (!qtd || qtd <= 0) {
            alert("Informe uma quantidade válida de ingressos!");
            return;
        }

        // Apenas verifica se jogo tem um valor (ID).
        if (!jogoId) {
            alert("Selecione um jogo antes de prosseguir!");
            return;
        }

        // Pega os dados do jogo escolhido
        const jogo = jogos[jogoId];
        // Compara o jogo pra ver se tem ainda vagas
        if (jogo.ingressosDisp === 0) {
            alert("Desculpe, este jogo está lotado!");
            return;
        }

        const valorTotal = jogo.valor * qtd;

        // Muda as classes para mostrar as informações sobre o jogo
        infoDiv.className = "alert alert-info mt-3";
        infoDiv.innerHTML = `
            ✅ Compra realizada com sucesso!<br>
            <b>${jogo.nome}</b> - Valor unitário: R$ ${jogo.valor.toFixed(2)}<br>
            Quantidade comprada: <b>${qtd}</b><br>
            <b>Total: R$ ${valorTotal.toFixed(2)}</b><br>
            Um e-mail de confirmação foi enviado para você.
        `;
    });
});

/*

RESUMO

    Página carrega: código é executado.

    Usuário escolhe um jogo no <select>:

    Script busca o jogo no objeto jogos.

    Mostra nome, descrição, vagas e valor.

    Se não houver vagas, o alerta fica “vermelho”.

    Usuário preenche o formulário e clica em “Enviar”:

    O envio padrão é bloqueado (preventDefault).

    Se nenhum jogo foi escolhido -> alerta pedindo para selecionar.

    Se o jogo está lotado -> alerta avisando que não dá pra inscrever.

    Se está tudo ok -> mensagem de sucesso na infoDiv.

*/

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formulario_jogo');
    const btnCancelar = document.getElementById('btn_cancelar');
    const containerFormulario = document.getElementById('container_formulario');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('alert', 'mt-3');
    containerFormulario.appendChild(infoDiv);

    function mostrarAlerta(classe, mensagem) {
        infoDiv.className = `alert ${classe} mt-3`;
        infoDiv.innerHTML = mensagem;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const nome = document.getElementById('nome').value.trim();
        const valor = parseFloat(document.getElementById('valor').value);
        const dataInicio = document.getElementById('data_inicio').value;
        const horaInicio = document.getElementById('hora_inicio').value;
        const descricao = document.getElementById('descricao').value.trim();

        if (!nome || !valor || !dataInicio || !horaInicio || !descricao) {
            mostrarAlerta("alert-danger", "❌ Preencha todos os campos!");
            return;
        }

        if (valor <= 0) {
            mostrarAlerta("alert-danger", "❌ O valor deve ser maior que zero!");
            return;
        }

        mostrarAlerta("alert-success", `
            ✅ Jogo cadastrado com sucesso!<br>
            <strong>${nome}</strong><br>
            Valor: <b>R$ ${valor.toFixed(2)}</b><br>
            Data e Hora de Início: ${dataInicio} às ${horaInicio}<br>
            Descrição: ${descricao}
        `);

        form.reset();
    });

    btnCancelar.addEventListener("click", function(event) {
        event.preventDefault();

        mostrarAlerta("alert-danger", `
            ❌ Cadastro cancelado.<br>
            Nenhuma informação foi salva.
        `);

        form.reset();
    });

});

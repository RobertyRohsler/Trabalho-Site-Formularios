
    const formulario = document.getElementById("formInscricao");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        
        evento.preventDefault();

        const mensagem = document.getElementById("mensagem");

        
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const curso = document.getElementById("curso").value;
        const modalidadeSelecionada = document.querySelector(
            'input[name="modalidade"]:checked'
        );
        const observacoes = document.getElementById("observacoes").value.trim();

        
        if (!nome || !email || !curso || !modalidadeSelecionada) {
            mensagem.textContent = "Preencha todos os campos obrigatórios.";
            return;
        }

    
        const campoCurso = document.getElementById("curso");
        const nomeCurso = campoCurso.options[campoCurso.selectedIndex].text;

        
        const inscricao = {
            nome: nome,
            email: email,
            telefone: telefone,
            curso: nomeCurso,
            modalidade: modalidadeSelecionada.value,
            observacoes: observacoes
        };

        try {
            
            sessionStorage.setItem(
                "inscricaoQualifica",
                JSON.stringify(inscricao)
            );

            mensagem.textContent = "Inscrição validada! Abrindo o resultado...";

            
            window.location.href = "resultado_inscricao.html";

        } catch (erro) {
            mensagem.textContent =
                "Não foi possível preparar a inscrição. Tente novamente.";
        }
    });
}

const statusInscricao = document.getElementById("statusInscricao");

if (statusInscricao) {
    const areaDados = document.getElementById("dadosInscricao");

    try {
        const dadosSalvos = sessionStorage.getItem("inscricaoQualifica");

        if (dadosSalvos) {
            const inscricao = JSON.parse(dadosSalvos);

            
            document.getElementById("resultadoNome").textContent = inscricao.nome;

            document.getElementById("resultadoEmail").textContent = inscricao.email;

            document.getElementById("resultadoTelefone").textContent = inscricao.telefone || "Não informado";

            document.getElementById("resultadoCurso").textContent = inscricao.curso;

            document.getElementById("resultadoModalidade").textContent = inscricao.modalidade;

            document.getElementById("resultadoObservacoes").textContent = inscricao.observacoes || "Nenhuma observação";

            
            areaDados.hidden = false;
            statusInscricao.textContent = "Inscrição preparada com sucesso! Confira os dados abaixo.";

            
            sessionStorage.removeItem("inscricaoQualifica");

        } else {
            statusInscricao.textContent = "Nenhuma inscrição encontrada. Preencha o formulário para continuar.";
        }

    } catch (erro) {
        statusInscricao.textContent = "Não foi possível carregar os dados da inscrição.";
    }
}

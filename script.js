function calculadoraIdade(event) {
    event.preventDefault()
    let dadosUsuario = pegarValores();
    let idadeAtual = calcular(dadosUsuario.ano, dadosUsuario.anoNacimento);
    let classificaoFinal = classficacao(idadeAtual);
    let usuariosSalvosFinal = organizarDados(dadosUsuario, idadeAtual, classificaoFinal)
    let dadosUsuarioSalvos = dadosSalvos(usuariosSalvosFinal);

    carregarUsuario (dadosUsuarioSalvos)

}

// Passo 1 -  Pegar valor
function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim(); //Cortar espacos adicionais no comeco e final da string
    let diaRecebido = parseFloat(document.getElementById("dia-nascimento").value);
    let mesRecebido = parseFloat(document.getElementById("mes-nascimento").value);
    let anoRecebido = parseFloat(document.getElementById("ano-nascimento").value);

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaRecebido,
        mes: mesRecebido,
        anoNacimento: anoRecebido,
        ano: anoAtual,
    }

    console.log(dadosUsuario);
    return dadosUsuario;
}

function calcular(ano, anoNacimento) {
    let idade = ano - anoNacimento;
    console.log(idade);
    return idade;

}

function classficacao(idadeAtual) {
    if (idadeAtual < 12) {
        return "Criança"
    } else if (idadeAtual < 17) {
        return "Adolescente"
    } else if (idadeAtual < 65) {
        return "Adulto"
    } else {
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, idadeAtual, classificaoFinal) {

    let dadosAtualizados = {
        ...dadosUsuario,
        idadeAtualizada: idadeAtual,
        classficacaoAtualizada: classificaoFinal,
    }

    console.log(dadosAtualizados);
    return dadosAtualizados
}

function dadosSalvos(salvos) {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(salvos)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

function carregarUsuario() {
    let listaUsuarios = [];
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuário cadastrado!</td>
        </tr>`

    } else {
        montarTabela(listaUsuarios);
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuario());

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template +=`<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="data de nascimento">${pessoa.dia}/${pessoa.mes}/${pessoa.anoNacimento}</td>
        <td data-cell="idade">${pessoa.idadeAtualizada}</td>
        <td data-cell="faixa etária">${pessoa.classficacaoAtualizada}</td>
    </tr>` 
    });

    tabela.innerHTML = template; 
}

function deletarRegistros() {
    localStorage.clear("usuariosCadastrados")
    window.location.reload();
}








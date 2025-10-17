// URL da API para json-server
const URL_API = "http://localhost:3000/employees";

// Elementos que serão utilizados (corpo da tabela e input de filtros)
const infosFuncionarios = document.getElementById("infos__funcionarios");
const filtros = document.getElementById("filtros");

// Array que vai armazenar todos os funcionários
let listaFuncionarios = [];

// Pega funcionários de API e chama função que vai popular a tabela
async function buscaFuncionarios() {
    const busca = await fetch(URL_API);
    listaFuncionarios = await busca.json();
    populaTabela(listaFuncionarios);
}

// Populando a tabela
function populaTabela(listaFuncionarios) {
    infosFuncionarios.innerHTML = '';

    listaFuncionarios.forEach(funcionario => {
        const tr = document.createElement("tr");

        // Foto
        const colunaFoto = document.createElement("td");
        const imagem = document.createElement("img");
        imagem.src = funcionario.image;
        imagem.className = "foto__do__funcionario";
        colunaFoto.appendChild(imagem);

        // Nome
        const colunaNome = document.createElement("td");
        colunaNome.textContent = funcionario.name;

        // Cargo
        const colunaCargo = document.createElement("td");
        colunaCargo.textContent = funcionario.job;

        // Data de admissão
        const colunaAdmissao = document.createElement("td");
        colunaAdmissao.textContent = formataData(funcionario.admission_date);

        // Telefone
        const colunaTelefone = document.createElement("td");
        colunaTelefone.textContent = funcionario.phone;

        tr.append(colunaFoto, colunaNome, colunaCargo, colunaAdmissao, colunaTelefone);
        infosFuncionarios.appendChild(tr);
    });
}

// Formatação da data: dd/mm/aaaa
function formataData(data) {
    const dataFormatada = new Date(data);
    // Dia do mês, garantindo 2 dígitos
    const dia = String(dataFormatada.getUTCDate()).padStart(2, "0");
    // Mês + 1, pois retorna de 0-11, sendo assim temos 1-12
    const mes = String(dataFormatada.getUTCMonth() + 1).padStart(2, "0");
    // Ano de admissão
    const ano = dataFormatada.getUTCFullYear();
    // Retorna no padrão desejado
    return `${dia}/${mes}/${ano}`;
}

// Filtro do input de texto
function filtrarInfos() {
    const inputTexto = filtros.value.toLowerCase().trim();

    // Retorna todas as infos caso o input esteja vazio
    if (inputTexto === '') {
        populaTabela(listaFuncionarios);
        return;
    }

    const infosFiltradas = listaFuncionarios.filter(funcionario => {
        return (
            funcionario.name.toLowerCase().includes(inputTexto) || 
            funcionario.job.toLowerCase().includes(inputTexto) || 
            funcionario.phone.toLowerCase().includes(inputTexto)
        );
    });

    populaTabela(infosFiltradas);
}

// Aguarda input de texto no campo de filtros
filtros.addEventListener('input', filtrarInfos);

buscaFuncionarios();
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

    listaFuncionarios.forEach((funcionario, index) => {
        const trPrincipal = document.createElement("tr");

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
        colunaCargo.className = "desktop__only";

        // Data de admissão
        const colunaAdmissao = document.createElement("td");
        colunaAdmissao.textContent = formataData(funcionario.admission_date);
        colunaAdmissao.className = "desktop__only";

        // Telefone
        const colunaTelefone = document.createElement("td");
        colunaTelefone.textContent = funcionario.phone;
        colunaTelefone.className = "desktop__only";

        // 
        const colunaExpandir = document.createElement("td");
        colunaExpandir.className = "mobile__only";
        const btnExpandir = document.createElement("button");
        btnExpandir.className = "btn-expand";
        btnExpandir.innerHTML = '<i class="material-icons">expand_more</i>';
        btnExpandir.setAttribute("data-bs-toggle", "collapse");
        btnExpandir.setAttribute("data-bs-target", `#detalhes__${index}`);
        btnExpandir.setAttribute("aria-expanded", "false");
        colunaExpandir.appendChild(btnExpandir);

        trPrincipal.append(colunaFoto, colunaNome, colunaCargo, colunaAdmissao, colunaTelefone, colunaExpandir);
        infosFuncionarios.appendChild(trPrincipal);

        // Detalhes e accordion
        const trDetalhes = document.createElement("tr");
        trDetalhes.className = "tr__detalhes collapse";
        trDetalhes.id = `detalhes__${index}`;

        const colunaDetalhes = document.createElement("td");
        colunaDetalhes.colSpan = 6; // Ocupa todas as colunas
        colunaDetalhes.className = "accordion__detalhes";

        colunaDetalhes.innerHTML = `
            <div class="detalhes__colunas__mobile">
                <span class="detalhe__cargo">Cargo</span>
                <span>${funcionario.job}</span>
            </div>
            <div class="detalhes__colunas__mobile admissao">
                <span class="detalhe__admissao">Data de admissão</span>
                <span>${formataData(funcionario.admission_date)}</span>
            </div>
            <div class="detalhes__colunas__mobile">
                <span class="detalhe__telefone">Telefone</span>
                <span>${funcionario.phone}</span>
            </div>
        `;

        trDetalhes.appendChild(colunaDetalhes);
        infosFuncionarios.appendChild(trDetalhes);
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
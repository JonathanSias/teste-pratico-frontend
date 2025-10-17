# Sobre o Projeto
Este projeto é uma solução do teste técnico para Front-End da BeTalent que consiste em construir a visualização de uma tabela com dados que virão de uma API simulada, em json-server.

Foi realizado um fork do repositório original e criada uma branch separada para a resolução, mantendo organização e separação das informações.

Todos os detalhes de interface do usuário foram seguidos segundo do link do projeto no Figma, fornecido no README original.

O projeto foi feito utilizando as seguintes ferramentas:
- HTML;
- CSS;
- JavaScript;
- json-server;
- Bootstrap (apenas para o accordion da tabela);
- Material Icons (apenas para o ícone do accordion).

# Pré-Requisitos
É necessário a instalação do json-server [json-server](https://github.com/typicode/json-server) na máquina que irá rodar o projeto. Dessa forma o json-server ficaré sendo executado em segundo plano para que os dados do projeto possam ser acessados.

Além disso o Git é necessário para o controle de versionamento e visualização da solução na branch que foi desenvolvida.

Para facilitar a execução, recomenda-se a instalação da extensão "Live Server" no VSCode. Dessa forma é possível executar o projeto de forma mais rápida.

# Rodando a Aplicação
- Clonar o projeto;
- Mudar para branch da solução [git branch dev/jsias-solution];
- Rodar o json-server no terminal [`json-server --watch db.json`];
- Executar o projeto com o Live Server no VSCode.
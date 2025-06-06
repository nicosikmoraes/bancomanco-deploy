# Banco Manco

# Author: Nicolas Siqueira Moraes

This project is a digital bank made using angular where you can create your own account, deposit, withdraw, transfer your money and keep track of all the transitions at the historic, it also use a fake api (json-server) to be the database so your data will be save in real time.

# Screen Design - Figma
https://www.figma.com/design/MEYvQMTd8fMK0jhfI0vMbo/Banco-Manco?node-id=0-1&p=f&t=Ay5r7FzHrnEKy0FK-0

# Design System - Figma
https://www.figma.com/design/MEYvQMTd8fMK0jhfI0vMbo/Banco-Manco?node-id=25-125&t=3VsAaGGI8KiTbHEv-0

# Technologies
- Angular
- TypeScript
- Html
- Css
- Bootstrap
- Json-server 
- SweetAlert2 (Alerts)
- Ngx-mask

# How to start
1. Clone the repository `git clone <url>`
2. Open the termianl at the project root
3. Install dependecies `npm i`
4. Run Json-server `npm run json-server`
5. Open another terminal also at the project root
6. Run the project `npx ng serve`
7. Open the application with the url "http://localhost:4200/"
8. Enjoy

## Screenshots
![image](https://github.com/user-attachments/assets/9566f540-4f06-4053-b3b6-aea8d2914fa5)
![image](https://github.com/user-attachments/assets/695c4e4a-2f1a-48fc-b4d3-d3f29d566efa)
![image](https://github.com/user-attachments/assets/3e165402-aba9-4a54-8b2e-0e3997049647)
![image](https://github.com/user-attachments/assets/150e2f33-fa02-471c-aa9d-99e8224dd16b)
![image](https://github.com/user-attachments/assets/ef517606-aaac-4c32-a2ae-a2b30ea8f804)
![image](https://github.com/user-attachments/assets/19641693-f6ae-4199-bc48-4e29eb78e992)
![image](https://github.com/user-attachments/assets/6d9c773c-b052-4586-abb4-1339a340025d)
![image](https://github.com/user-attachments/assets/7cc981bc-aa64-49e3-a17d-72aa0b318ba8)
![image](https://github.com/user-attachments/assets/79d1975c-c950-4d80-8e64-309f7a3a0632)

## Checklist
#### RA1 - Prototipar e projetar interfaces gráficas de usuário, considerando princípios de usabilidade e experiência do usuário.
- [x] ID1: O aluno desenvolveu protótipos de interfaces que demonstram compreensão das diretrizes de usabilidade.
- [x] ID2: O aluno projetou interfaces responsivas que se adaptam a diferentes tamanhos de tela.
#### RA2 - Criar e reutilizar componentes em frameworks frontend, desenvolvendo interfaces modulares, responsivas e estilizadas.
- [x] ID3: O aluno desenvolveu componentes reutilizáveis que são aplicáveis em diferentes contextos da aplicação, garantindo que se adaptem de maneira responsiva em vários tamanhos de tela.
- [x] ID4: O aluno incorporou componentes de frameworks CSS para aprimorar a aparência e funcionalidade da aplicação de maneira consistente.
- [x] ID5: O aluno aplicou diretivas estruturais para renderizar elementos de forma condicional, permitindo a exibição ou ocultação de conteúdo com base em condições dinâmicas.
- [x] ID6: O aluno utilizou diretivas estruturais para repetir elementos de interface de maneira dinâmica, a fim de criar listas, galerias ou outras visualizações baseadas em conjuntos de dados.
- [x] ID7: O aluno aplicou Pipes de maneira eficaz para formatar a apresentação de dados, garantindo que as informações exibidas sejam legíveis, esteticamente agradáveis e atendam aos requisitos de apresentação específicos para cada contexto.
#### RA3 - Sincronizar dados entre a interface gráfica e o modelo de dados, aplicando técnicas de binding para manter a consistência.
- [x] ID8: O aluno demonstrou a compreensão e a aplicação de técnicas de one-way data binding, como Interpolation e Property Binding, para exibir e atualizar dados na interface gráfica de maneira unidirecional.
- [x] ID9: O aluno demonstrou a aplicação de técnicas de event binding para capturar eventos do usuário na interface e interagir com o modelo de dados, mantendo a consistência e a sincronização entre os dois.
- [x] ID10: O aluno implementou a técnica de two-way data binding para criar uma sincronização bidirecional automática entre a interface e o modelo de dados, permitindo uma atualização eficiente dos dados em ambos os lados.
- [x] ID11: O aluno fez uso eficaz de variáveis de template para manipulação dinâmica dos dados na interface gráfica, demonstrando a capacidade de exibir informações de maneira flexível e adaptável.
#### RA4 - Implementar comunicação eficaz entre componentes, utilizando padrões de comunicação e serviços para compartilhar lógica e dados.
- [x] ID12: O aluno criou comunicação entre componentes não relacionados hierarquivamente por meio de serviços através do mecanismo de injeção de dependência, compartilhando lógica ou informações.
- [ ] ID13: O aluno utilizou efetivamente as diretivas @Input e @Output para estabelecer uma comunicanção em uma hierarquia de componentes, passando e recebendo dados entre componentes de maneira segura e consistente.
#### RA5 - Criar interfaces de navegação intuitivas e responsivas, implementando roteamento em aplicações de página única (SPA).
- [x] ID14: O aluno configurou rotas para diferentes partes da aplicação, permitindo a navegação entre páginas distintas.
- [ ] ID15: O aluno demonstrou a habilidade de passar dados entre componentes que representam diferentes telas usando parâmetros de rotas, garantindo uma troca eficiente de informações.
- [x] ID16: O aluno criou uma estrutura de navegação aninhada para representar hierarquias de conteúdo.
- [x] ID17: O aluno aplicou guardas de rotas para controlar o acesso a rotas específicas da aplicação, assegurando que somente usuários autorizados possam acessar determinadas partes da interface.
#### RA6 - Realizar requisições assíncronas para serviços web, compreendendo os protocolos e formatos de troca de dados, tratando respostas e erros.
- [x] ID19: O aluno fez requisições assíncronas a uma API simulada, compreendendo os protocolos HTTP e formatos de dados para as operações GET, POST, PUT, PATCH e DELETE.
- [x] ID20: O aluno tratou respostas de sucesso e erros das requisições assíncronas de forma apropriada.
- [x] ID21: O aluno aplicou validações de entrada nos campos do formulário, utilizando técnicas como expressões regulares (REGEX), e apresentou mensagens de erro claras e informativas para auxiliar os usuários a corrigir entradas incorretas.
- [x] ID22: O aluno desabilitou adequadamente o botão de submit enquanto o formulário continha campos inválidos, promovendo uma experiência de usuário mais intuitiva e evitando a submissão de dados incorretos.
- [ ] ID23: O aluno demonstrou a capacidade de utilizar Promises para tratar respostas assíncronas.
- [x] ID24: O aluno demonstrou a capacidade de utilizar Observables para tratar respostas assíncronas.
#### RA7 - Gerenciar o código-fonte de maneira eficiente, implementar boas práticas de controle de versão e colaborar em projetos de desenvolvimento.
- [x] ID25: O aluno criou um repositório no GitHub utilizando a estrutura do Gitflow, estabelecendo as branches "main" e "develop", demonstrando proficiência em boas práticas de controle de versão e organização do projeto.
- [x] ID26: O aluno colaborou de maneira efetiva com outros membros do projeto, realizando fusões (merges) e resolução de conflitos de código de forma adequada e alinhada às práticas de desenvolvimento colaborativo.
- [ ] ID27: O aluno planejou, configurou e executou o processo de build da aplicação, preparando-a para produção e realizou o deploy em um ambiente de hospedagem, tornando-a prontamente acessível para uso.


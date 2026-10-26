# Personal Project Tracker

Aplicação web para organizar projetos pessoais, acompanhar tarefas e registar o tempo dedicado a cada projeto. Inclui uma interface em HTML, CSS e JavaScript, uma API REST em Node.js/Express, persistência através do Supabase e funcionalidades de IA com a API da OpenAI.

## Funcionalidades

- **Registo e autenticação:** criação de conta e início de sessão com email e palavra-passe.
- **Gestão de projetos:** criar, consultar e editar projetos, incluindo nome, descrição, datas e estado.
- **Estados do projeto:** Criado, Aberto, Concluído e Cancelado.
- **Gestão de tarefas:** adicionar tarefas a um projeto, estimar horas e acompanhar a conclusão.
- **Registo de tempo:** guardar data, horas e notas sobre o trabalho realizado.
- **Resumo do projeto:** consultar informação geral, tarefas e tempos registados.
- **Geração de tarefas com IA:** sugerir tarefas iniciais a partir do nome e descrição do projeto.
- **Validação e feedback:** validação de formulários e mensagens de resultado.

## Tecnologias

**Frontend**
- HTML5, CSS3 e JavaScript com módulos ES
- Bootstrap 5 e Bootstrap Icons

**Backend**
- Node.js e Express 5
- Supabase JavaScript Client
- JSON Web Tokens (JWT) para tokens de sessão
- dotenv e cors
- OpenAI SDK para funcionalidades de IA

## Estrutura do repositório

~~~text
.
├── Back/
│   ├── db/
│   │   └── superbaseClient.js       # Cliente Supabase
│   ├── middleware/
│   │   └── auth.js                  # Criação e validação de tokens JWT
│   ├── services/
│   │   ├── estados.js               # Consulta de estados
│   │   ├── projectos.js             # Acesso aos projetos
│   │   ├── tarefa.js                # Acesso às tarefas
│   │   ├── tempos.js                # Acesso aos registos de tempo
│   │   └── user.js                  # Acesso aos utilizadores
│   ├── index.js                     # API Express e endpoints
│   ├── package.json                 # Dependências do backend
│   └── package-lock.json
├── Front/
│   ├── Login.html                   # Ecrã de login e registo
│   ├── PersonalProject.html         # Interface de gestão de projetos
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── Login.js
│       ├── PersonalProject.js
│       ├── Variables/               # Estado partilhado da interface
│       ├── controller/              # Listas e detalhes de projetos, tarefas e tempos
│       ├── data/                    # Modelos, autenticação e acesso a dados
│       ├── functions/               # Funções auxiliares
│       └── widget/                  # Feedback, modais e validação
├── .gitignore
├── LICENSE
└── README.md
~~~

## Pré-requisitos

- [Node.js](https://nodejs.org/) com npm
- Um projeto no [Supabase](https://supabase.com/)
- Uma chave API da [OpenAI](https://platform.openai.com/api-keys), necessária para as funcionalidades de IA

## Configuração e execução

### 1. Clonar o repositório

~~~bash
git clone https://github.com/Kardogalrica/Personal_Project_Tracket.git
cd Personal_Project_Tracket
~~~

### 2. Instalar as dependências do backend

~~~bash
cd Back
npm install
~~~

### 3. Configurar as variáveis de ambiente

Cria um ficheiro .env dentro da pasta Back/ com os valores do teu ambiente:

~~~dotenv
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_KEY=<supabase-api-key>
JWT_SECRET=<secret-aleatorio-forte>
OPENAI_API_KEY=<openai-api-key>
~~~

Gera um segredo JWT forte. Não coloques chaves reais no repositório nem as partilhes publicamente.

### 4. Preparar a base de dados

O backend espera as seguintes tabelas no Supabase:

- **users** — utilizadores.
- **projectos** — projetos e respetivo proprietário.
- **tarefas** — tarefas associadas a projetos.
- **tempos** — registos de tempo associados a projetos.
- **estados** — estados dos projetos.

A consulta de resumo também utiliza a vista **vw_projectos_resumo**. Configura as tabelas, relações, restrições e vista antes de executar a aplicação. Os ficheiros em Back/services/ mostram os campos utilizados pelo backend.

### 5. Iniciar a API

A partir da pasta Back/:

~~~bash
node index.js
~~~

A API escuta em http://localhost:3000. O package.json não define atualmente um script start; o comando acima executa diretamente o ficheiro de entrada.

### 6. Abrir o frontend

Com a API em execução, serve a pasta Front/ através de um servidor HTTP local e abre Login.html. A interface envia pedidos para http://localhost:3000. Podes usar uma extensão como Live Server ou outro servidor estático local. Abrir os HTML diretamente com o protocolo file:// pode causar limitações com módulos JavaScript ou pedidos HTTP.

## Principais endpoints da API

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| POST | /CriaUser | Criar utilizador |
| POST | /Login | Iniciar sessão |
| POST | /ValidaUtilizador | Validar dados de registo ou login |
| POST | /GetToken | Gerar token a partir de um ID de utilizador |
| GET | /GetUserIdSession | Obter o ID do utilizador autenticado |
| GET | /GetEstados | Consultar estados de projeto |
| GET | /GetDetalheProjectos | Consultar projetos do utilizador autenticado |
| POST | /GetDetalheProjectoById | Consultar detalhes de um projeto |
| POST | /CreateUpdateProjecto | Criar ou atualizar projeto |
| POST | /GetTarefasByIdProjecto | Consultar tarefas de um projeto |
| POST | /CreateUpdateTarefa | Criar ou atualizar tarefa |
| POST | /GetTemposByIdProjecto | Consultar tempos de um projeto |
| POST | /CreateUpdateTempo | Criar ou atualizar registo de tempo |
| POST | /gerar-lista | Gerar sugestões de tarefas com IA |
| POST | /agenteProjeto | Responder a mensagens relacionadas com projetos usando IA |

Os endpoints protegidos por verifyToken requerem um token JWT no cabeçalho Authorization, no formato Bearer <token>. Consulta Back/index.js para os requisitos específicos de cada endpoint.

## Funcionalidades de IA

O endpoint /gerar-lista utiliza o modelo gpt-4.1-mini para propor entre 5 e 8 tarefas, cada uma com título e estimativa de horas, com base no nome e na descrição do projeto.

Existe também o endpoint /agenteProjeto, destinado a responder a perguntas sobre projetos. Antes de disponibilizar estas funcionalidades publicamente, revê a autenticação, a autorização e o acesso aos dados.

## Segurança e limitações conhecidas

Esta secção descreve aspetos observados no código atual; não constitui uma auditoria de segurança. Antes de usar o projeto com dados reais ou o publicar na Internet, revê especialmente:

- **Palavras-passe:** o serviço de utilizadores compara e guarda palavras-passe diretamente. Implementa hashing seguro antes de utilização real.
- **Autorização por projeto:** confirma que todas as operações sobre tarefas e tempos verificam que o projeto pertence ao utilizador autenticado.
- **Endpoints de IA:** revê a autenticação e autorização destes endpoints e remove dependências de identificadores de utilizador fixos antes de os expor.
- **Segredos:** mantém as chaves Supabase, OpenAI e JWT apenas em variáveis de ambiente e nunca em ficheiros versionados.
- **CORS:** restringe as origens permitidas de acordo com o ambiente.
- **Testes:** o comando de teste em package.json é apenas um placeholder; não está configurada uma suite de testes automatizados.

## Licença

Consulta o ficheiro [LICENSE](LICENSE) para conhecer os termos da licença do projeto.

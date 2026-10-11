/* 
npx nodemon index.js 
*/

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
/* Criação Tokens */
import {generateToken,verifyToken,GetUserIdSession} from './middleware/auth.js'
/* Tabelas */
import {CreateUser, GetUserByEmail} from './services/user.js'
import {GetEstados} from './services/estados.js'
import {GetDetalheProjecto,GetDetalheProjectoById,CreateProjecto,UpdateProjecto} from './services/projectos.js'
import {GetTarefasByIdProjecto,CreateTarefas,UpdateTarefas} from './services/tarefa.js'
import {GetTemposByIdProjecto,CreateTempo,UpdateTempo} from './services/tempos.js'

/* OpenIA */
import OpenAI from "openai";


dotenv.config();
/* await CreateUser("joao123", "joao@email.com", "123456"); */

/* const user = await CreateUser("joao123","joao@email.com","123456");
console.log("User criado:", user); */

/* const t = generateToken(86)
console.log(t) */

const app = express();

app.use(cors());
app.use(express.json()); 

app.post("/GetToken",async (req, res) => {
    const {iduser} = req.body;

    /* console.log(iduser) */

    const t = generateToken(iduser)
    /* console.log(t) */

  return res.json({ Token: t });
});

app.post("/CriaUser", async(req, res) => {

    const { Username, Email, Password } = req.body;   

    const UserLogin = await GetUserByEmail(Email)

    if (UserLogin) {
        return res.status(400).json({ erro: 'Utilizador já existe' });
    }

    const user = await CreateUser(Username,Email,Password);
    /* console.log("User criado:", user); */

    const t = generateToken(user.id)

    /* console.log('Token Criado:'+t) */

    return res.json({  userid: user.id,
                Token: t
            });


})

app.post("/Login", async(req, res) => {
    const {Email, Password } = req.body;

    const UserLogin = await GetUserByEmail(Email)
    if(UserLogin && UserLogin.password === Password) {
        const t = generateToken(UserLogin.id)
        return res.json({  userid: UserLogin.id, 
                    Token: t
                });
    } else {
        return res.status(400).json({ erro: 'Utilizador Invalido' });
    }
})

/* app.get("/VerificaUsers",verifyToken, async (req, res) => {
    const { Username, Email, Password } = req.body;

    console.log('Username: '+Username+', Email: '+Email+' ,Password: '+Password)

  res.json({ ok: true });
}); */

/* Users */
app.get("/GetUserIdSession",verifyToken, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = GetUserIdSession(token)
    res.json({ userid: user.userId });
});

app.post("/ValidaUtilizador", async (req, res) => {
    const {Email, Password, IsNew} = req.body;

    if(Password === '' || Email === '') {
       return res.json({IsValid: false}) 
    }

    const UserLogin = await GetUserByEmail(Email)

    if(UserLogin && IsNew) {
        return res.json({IsValid: false})
    } if(UserLogin && !IsNew && UserLogin.password === Password) {
        return res.json({IsValid: true})
    } if(!UserLogin && IsNew) {
        return res.json({IsValid: true})
    } else {
        return res.json({IsValid: false})
    }

})

/* Estados */
app.get("/GetEstados",verifyToken,async(req, res) => {
    const estados = await GetEstados()

    return res.json(estados)
})

/* Projectos */
app.get("/GetDetalheProjectos",verifyToken,async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = GetUserIdSession(token)

    const Detalhes = await GetDetalheProjecto(user.userId)

    if(Detalhes) {
       return res.json(Detalhes) 
    } else {
        return res.json({})
    }
})

app.post("/GetDetalheProjectoById",verifyToken,async (req, res) => {
    const {Id} = req.body

    if(!Id || Id === 0) {
        return res.json({})
    }

    const token = req.headers.authorization.split(" ")[1]
    const user = GetUserIdSession(token)

    const Detalhe = await GetDetalheProjectoById(user.userId,Id)

    if(Detalhe) {
       return res.json(Detalhe) 
    } else {
        return res.json({})
    }
})

app.post("/CreateUpdateProjecto",verifyToken,async (req, res) => {
    const {projecto} = req.body

    const token = req.headers.authorization.split(" ")[1]
    const user = GetUserIdSession(token)

    projecto.user_id = user.userId

    if(projecto.Id === 0 ) {
        const Detalhe = await CreateProjecto(projecto.nome,projecto.descricao,projecto.dataCriação,projecto.dataAbertura,projecto.dataFecho,projecto.user_id,projecto.estado)

        if(Detalhe) {
            /* console.log(Detalhe) */
        return res.json(Detalhe) 
        } else {
            return res.json({})
        }

    } else {
        console.log(projecto)
        const Detalhe = await UpdateProjecto(projecto.Id,projecto.nome,projecto.descricao,projecto.dataCriação,projecto.dataAbertura,projecto.dataFecho,projecto.user_id,projecto.estado)

        if(Detalhe) {
            /* console.log(Detalhe) */
        return res.json(Detalhe) 
        } else {
            return res.json({})
        }
    }

})

/* Tarefas */
app.post("/GetTarefasByIdProjecto",verifyToken,async (req, res) => {
    const {Id} = req.body

    if(!Id || Id === 0) {
        return res.json({})
    }

    const Detalhe = await GetTarefasByIdProjecto(Id)

    if(Detalhe) {
       return res.json(Detalhe) 
    } else {
        return res.json({})
    }
})

app.post("/CreateUpdateTarefa",verifyToken,async (req, res) => {
    const {tarefa} = req.body

    if(tarefa.Id === 0 ) {
        const Detalhe = await CreateTarefas(tarefa.Titulo,tarefa.Estimativa,tarefa.IsConcluido,tarefa.ProjectoId)

        if(Detalhe) {
            /* console.log(Detalhe) */
        return res.json(Detalhe) 
        } else {
            return res.json({})
        }

    } else {
        console.log(tarefa)
        const Detalhe = await UpdateTarefas(tarefa.Id,tarefa.Titulo,tarefa.Estimativa,tarefa.IsConcluido,tarefa.ProjectoId)

        if(Detalhe) {
            /* console.log(Detalhe) */
        return res.json(Detalhe) 
        } else {
            return res.json({})
        }
    }

})

/* Tempos */
app.post("/GetTemposByIdProjecto",verifyToken,async (req, res) => {
    const {Id} = req.body

    if(!Id || Id === 0) {
        return res.json({})
    }

    const Detalhe = await GetTemposByIdProjecto(Id)

    if(Detalhe) {
       return res.json(Detalhe) 
    } else {
        return res.json({})
    }
})

app.post("/CreateUpdateTempo",verifyToken,async (req, res) => {
    const {tempo} = req.body

    if(tempo.Id === 0 ) {
        const Detalhe = await CreateTempo(tempo.Notas,tempo.Data,tempo.Horas,tempo.ProjectoId)

        if(Detalhe) {
            /* console.log(Detalhe) */
        return res.json(Detalhe) 
        } else {
            return res.json({})
        }

    } else {
        console.log(tempo)
        const Detalhe = await UpdateTempo(tempo.Id,tempo.Notas,tempo.Data,tempo.Horas,tempo.ProjectoId)

        if(Detalhe) {
            /* console.log(Detalhe) */
        return res.json(Detalhe) 
        } else {
            return res.json({})
        }
    }

})

// Agente IA
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint principal
app.post("/gerar-lista", async (req, res) => {
  const { nome, descricao } = req.body;
    console.log("📌 Endpoint chamado");
    console.log("Body recebido:", req.body);
    console.log('oi')
  if (!nome || !descricao) {
    return res.status(400).json({ erro: "nome e descricao obrigatórios" });
  }

  try {
    const prompt = `
        És um assistente que cria tarefas iniciais para projetos.

        Projeto:
        Nome: ${nome}
        Descrição: ${descricao}

        Regras:
        - Gera entre 5 e 8 tarefas
        - Cada tarefa deve ter:
        - titulo (string curta)
        - estimativa (número de horas, inteiro)
        - Não uses markdown
        - Não expliques nada
        - Responde apenas com JSON válido

        Formato de resposta:
        [
        { "titulo": "...", "estimativa": 2 }
        ]
        `;

    // Chamada ao modelo
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    // Extrair texto puro do modelo
    let texto = response.choices[0].message.content;
    if (Array.isArray(texto)) {
      texto = texto.map(p => p.text).join(""); // garante string única
    }
    // JSON parse seguro
/*     let lista;
    try {
      const parsed = JSON.parse(texto);
      lista = parsed.lista; // deve existir "lista" no JSON
    } catch (e) {
      console.error("JSON inválido recebido do LLM:", texto);
      return res.status(500).json({ erro: "JSON inválido", raw: texto });
    } */

    const lista = JSON.parse(texto); // texto → array de objetos
    res.json({ lista }); // agora devolve JSON real
    console.log('terminou')            

/*     res.json(texto); */
  } catch (err) {
    console.error("Erro ao chamar OpenAI:", err);
    res.status(500).json({ erro: "Erro ao gerar lista" });
  }
});

app.post("/agenteProjeto", async (req, res) => {

  const { menssague } = req.body

  try {

    const prompt = `És um agente de IA que responde a perguntas sobre projetos.`

    const tools = [
      {
        type: "function",
        function: {
          name: "get_detalhe_projecto",
          description: "Obtém os detalhes do projeto de um utilizador",
          parameters: {
            type: "object",
            /* Onde se mete os imputs da ação e se diz o que cada um corresponde */
            properties: {},
          }
        }
      }
    ]

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: menssague }
      ],
      tools
    })

    const message = response.choices[0].message

    if (message.tool_calls) {

      const toolCall = message.tool_calls[0]

      if (toolCall.function.name === "get_detalhe_projecto") {
        /* exemplo: args.userId ou nesta caso 114 */
        const data = await GetDetalheProjecto(114)

        const final = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: menssague },
            message,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              content: JSON.stringify(data)
            }
          ]
        })

        return res.json({
          resposta: final.choices[0].message.content
        })
      }
    }

    res.json({
      resposta: message.content
    })

  } catch (err) {

    console.error("Erro ao chamar OpenAI:", err)

    res.status(500).json({
      erro: "Erro ao gerar resposta"
    })
  }

})

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));

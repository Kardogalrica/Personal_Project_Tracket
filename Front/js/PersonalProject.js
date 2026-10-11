import { RecordProjecto } from './data/dominio/Projecto.js'
import { RecordTarefas } from './data/dominio/Tarafa.js'
import { RecordTempo } from './data/dominio/Tempo.js'
import { SetP, SetRp, SetTa, SetTe } from './Variables/SetVariables.js'
import { ChangeListaProjecto } from './controller/CriaListaProjectos.js'
import { ChangeDetalhe } from './controller/DetalheProjecto.js'
import { ChangeListaTarefas } from './controller/ListaTarefa.js'
import { ChangeListaTempo } from './controller/ListaTempo.js'
import { Feedback } from './widget/Feedback.js'
import { ValidationInput } from './widget/Validation.js'
import { Modal } from './widget/Modal.js'
import { ListeningToken } from './data/auth/Login.js'

try {
    const btnAdicionarProjecto = document.querySelector('#criarProjeto')

    const btnAdicionarTarefa = document.querySelector('#criarTarefa')

    const btnAdicionarTempo = document.querySelector('#criarTempo')

    const btnAbrir = document.querySelector('#Abrir')
    const btnConcluir = document.querySelector('#Concluir')
    const btnCancelar = document.querySelector('#Cancelar')

    ListeningToken()

    ChangeListaProjecto()

    ChangeDetalhe()

    ChangeListaTarefas()

    ChangeListaTempo()

    SetP.set()

    btnAdicionarProjecto.addEventListener('click', async () => {

        var nome = document.querySelector('#nome-Projeto').value
        var descricao = document.querySelector('#descricao-Projeto').value

        let m = new Modal()

        var valid = true

        let validNome = new ValidationInput()
        let validDescricao = new ValidationInput()

        if(nome === '') {
            validNome.invalid ('nome-Projeto', 'Campo Obrigatório')
            valid = false
        } else {
            validNome.reset('nome-Projeto')
        }

        if(descricao === '') {
            validDescricao.invalid('descricao-Projeto', 'Campo Obrigatório')
            valid = false
        } else {
            validDescricao.reset('descricao-Projeto')
        }

        if(valid) {
            let rP = new RecordProjecto()

            try {
                await rP.init(0)
                rP.set(nome,descricao,1)

                await rP.save()                
            } catch (e) {
                throw new Error(e)
            } finally {
                Feedback('feedback-menssague-sucess','Projecto Criado com sucesso')

                SetP.set()
                SetRp.set(rP.record.Id)

                m.hide('criar_Projecto')                
            }

        }

    })

    btnAdicionarTarefa.addEventListener('click', async () => {
        var nome = document.querySelector('#nome-Tarefa').value
        var estimativa = document.querySelector('#Estimativa-Tarefa').value

        let m = new Modal()

        var valid = true

        let validNome = new ValidationInput()
        let validEstimativa = new ValidationInput()

        if(nome === '') {
            valid = false
            validNome.invalid('nome-Tarefa','Campo Obrigatório')
        } else {
            validNome.reset('nome-Tarefa')
        }

        if( Number(estimativa) === 0) {
            valid = false
            validEstimativa.invalid('Estimativa-Tarefa','Campo Obrigatório')
        } else {
            validEstimativa.reset('Estimativa-Tarefa')
        }

        if(valid) {
            let rT = new RecordTarefas()

            try {
                await rT.init(0,SetRp.get())
                rT.set(nome,false,Number(estimativa))

                await rT.save()

            } catch (e) {
                throw new Error(e)
            } finally {
                SetTa.set(SetRp.get()) 
                Feedback('feedback-menssague-sucess','Tarefa Criada com sucesso')
                
                m.hide('criar_Tarefas')

                SetRp.set(SetRp.get())
            }
        }

    })

    btnAdicionarTempo.addEventListener('click', async () => {
        let data = document.querySelector('#data-tempo').value
        let horas  = document.querySelector('#Horas').value
        let notas  = document.querySelector('#notas').value

        let m = new Modal()

        var valid = true

        let validData = new ValidationInput()
        let validHoras = new ValidationInput()
        let validNotas = new ValidationInput()

        if(data === '') {
            valid = false
            validData.invalid('data-tempo','Campo Obrigatório')
        } else {
            validData.reset('data-tempo')
        }

        if(Number(horas) === 0) {
            valid = false
            validHoras.invalid('Horas','Campo Obrigatório')
        } else {
            validHoras.reset('Horas')
        }

        if( notas === '') {
            valid = false
            validNotas.invalid('notas','Campo Obrigatório')
        } else {
            validNotas.reset('notas')
        }

        if(valid) {
            let rTe = new RecordTempo

            try {
                await rTe.init(0,SetRp.get())
                rTe.set(new Date(data).toISOString(), Number(horas),notas)

                await rTe.save()                
            } catch (e) {
                throw new Error(e)
            } finally {
                SetTe.set(SetRp.get()) 
                
                Feedback('feedback-menssague-sucess','Tempo registado com sucesso')
                
                m.hide('criar_Tempo')
                SetRp.set(SetRp.get())             
            }

        }

    })

    btnAbrir.addEventListener('click', async () => {
        let rP = new RecordProjecto()

        try {
            await rP.init(SetRp.get())
            rP.setEstado(2)

            await rP.save()            
        } catch (e) {
            throw new Error(e)
        } finally {
            SetP.set()
            SetRp.set(rP.record.Id)
            Feedback('feedback-menssague-sucess','Projecto Aberto com sucesso')            
        }
    })

    btnConcluir.addEventListener('click', async () => {
        let rP = new RecordProjecto()

        try {
            await rP.init(SetRp.get())
            rP.setEstado(3)

            await rP.save()            
        } catch (e) {
            throw new Error(e)
        } finally {
            SetP.set()
            SetRp.set(rP.record.Id)
            
            Feedback('feedback-menssague-sucess','Projecto Comcluido com sucesso')
        }
    })

    btnCancelar.addEventListener('click', async () => {
        let rP = new RecordProjecto()

        try {
            await rP.init(SetRp.get())
            rP.setEstado(4)

            await rP.save()            
        } catch (e) {
            throw new Error(e)
        } finally {
            SetP.set()
            SetRp.set(rP.record.Id)
            Feedback('feedback-menssague-sucess','Projecto Cancelado com sucesso')        
        }

    })

/* Ver melhor isto */
    document.querySelector('#CriarTarefasAuto').addEventListener('click', async () => {
    /*     console.log('oi') */

        var nome = document.querySelector('#nome-Projeto').value
        var descricao = document.querySelector('#descricao-Projeto').value

        let m = new Modal()

        var valid = true

        let validNome = new ValidationInput()
        let validDescricao = new ValidationInput()

        if(nome === '') {
            validNome.invalid ('nome-Projeto', 'Campo Obrigatório')
            valid = false
        } else {
            validNome.reset('nome-Projeto')
        }

        if(descricao === '') {
            validDescricao.invalid('descricao-Projeto', 'Campo Obrigatório')
            valid = false
        } else {
            validDescricao.reset('descricao-Projeto')
        }

        if(valid) {
            let rP = new RecordProjecto()
            await rP.init(0)

            rP.set(nome,descricao,1)

            rP.save()

        /* fetch('http://localhost:5678/webhook-test/CriaTarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                descricao: descricao
            })
        })
            .then(res => res.json())
            .then(data => {
                data.forEach(el=> {
                    let rT = new RecordTarefas()
                    rT.init(0,rP.record.Id)
            
                    rT.set(el.titulo,false,Number(el.estimativa))

                    rT.save()

                    Feedback('feedback-menssague-sucess','Projecto Criado com sucesso')

                    SetP.set()

                    m.hide('criar_Projecto')
                });
            })
            .catch(err => console.error(err));        


        } */
        
            fetch("http://localhost:3000/gerar-lista", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: nome, descricao: descricao })
                })
                .then(res => res.json())
                .then(data => 
                    data.lista.forEach(el=> {
                        let rT = new RecordTarefas()

                        rT.init(0,rP.record.Id)
                
                        rT.set(el.titulo,false,Number(el.estimativa))

                        rT.save()

                        Feedback('feedback-menssague-sucess','Projecto Criado com sucesso')
                        nome = ''
                        descricao = ''

                        SetP.set()

                        m.hide('criar_Projecto')
                    })
                )
                .catch(err => console.error(err));
        }

        SetP.set()
        SetRp.set(rP.record.Id)

})
    
} catch (e) {
    console.log(e)
}

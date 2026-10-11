import {getCookie} from '../auth/Login.js'

/* Criar um só para apagar */
/* Este Record só serve para criar */
export function RecordTarefas() {
    
    
    this.record = {
        Id: null,
        IdProjecto:null,        
        titulo: '',
        concluida: false,
        estimativa: 0,
    };

    this.init = async function (Id,IdProjecto) {
        this.record.Id = Id
        this.record.IdProjecto = IdProjecto
    }

    this.set = function(titulo, concluida, estimativa) {
        if(typeof titulo !== 'string' || typeof concluida !== 'boolean' || typeof estimativa !== 'number' || titulo.trim() === '' || estimativa <= 0) {
            throw new Error('Tentativa de atribuir Valores invalidos á tarefa')
        }

        this.record.titulo = titulo
        this.record.concluida = concluida
        this.record.estimativa = estimativa

    }

    this.save = async function(callback) {

        // validação
        if (typeof this.record.titulo !== 'string' || typeof this.record.concluida !== 'boolean' || typeof this.record.estimativa !== 'number' || this.record.titulo.trim() === '' || this.record.estimativa <= 0 ) {
            throw new Error('Tentativa de atribuir valores inválidos á tarefa')
        }

        const tarefa = {tarefa: {
                Id:this.record.Id,
                Titulo:this.record.titulo,
                Estimativa:this.record.estimativa,
                IsConcluido:this.record.concluida,
                ProjectoId:this.record.IdProjecto}
            }

        try {
            const responseCreateTarefa = await fetch('http://localhost:3000/CreateUpdateTarefa', {
                                method: 'POST',
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + getCookie('Token')
                                },
                                body: JSON.stringify(tarefa)
                            });
            let data = await responseCreateTarefa.json()

            this.record.Id = data.id

        } catch (e) {
            throw new Error(e)
        } finally {
            if (callback instanceof Function) { callback(); }
        }

    }
}
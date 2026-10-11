import {getCookie} from '../auth/Login.js'

/* Criar um só para apagar */
/* Este Record só serve para criar */
export function RecordTempo() {
    this.record = {
        Id:0,
        IdProjecto:0,
        data:'',
        horas:0,
        notas:'',
    }

    this.init = async function(Id,IdProjecto) {
        this.record.Id = Id
        this.record.IdProjecto = IdProjecto       
    }

    this.set = function(data, horas, notas) {
        if(typeof data !== 'string' || typeof horas !== 'number' || typeof notas !== 'string' || data.trim() === '' || horas <= 0 || notas.trim() === '') {
            throw new Error('Tentativa de atribuir Valores invalidos ao tempo')
        }


        this.record.data = data
        this.record.horas = horas
        this.record.notas = notas
    }

    this.save = async function(callback) {

        // validação
        if (typeof this.record.data !== 'string' || typeof this.record.horas !== 'number' || typeof this.record.notas !== 'string' || this.record.data.trim() === '' || this.record.horas <= 0 || this.record.notas.trim() === '') {
            throw new Error('Tentativa de atribuir valores inválidos á tarefa')
        }

        const tempo = {tempo: {
            Id:this.record.Id,
            Notas:this.record.notas,
            Data:this.record.data,
            Horas:this.record.horas,
            ProjectoId:this.record.IdProjecto,}
        }

        try {
            const responseCreateTempo = await fetch('http://localhost:3000/CreateUpdateTempo', {
                                method: 'POST',
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + getCookie('Token')
                                },
                                body: JSON.stringify(tempo)
                            });
            let data = await responseCreateTempo.json() 
            this.record.Id = data.id                      
        } catch (e) {
            throw new Error(e)
        } finally {
            if (callback instanceof Function) { callback(); }            
        } 
    }    
}
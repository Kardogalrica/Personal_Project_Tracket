import {getCookie} from '../auth/Login.js'

export const Estados = {
    data: null,

    async init() {
        if(!this.data) {
            try {
                const responseEstados = await fetch('http://localhost:3000/GetEstados', {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie('Token')
                    },
                });

                this.data = await responseEstados.json();

            } catch (e) {
                throw new Error(e)
            }            
        }
    },

    ValidaEstado(Id) {
        console.log(this.data)
        const i = this.data.findIndex(e => e.Id === Id);
        return i !== -1;
    },

    GetEstado(Id) {
        if (Id === 0) {
            return {};
        }

        if (!this.ValidaEstado(Id)) {
            throw new Error('Erro: Estado não encontrado');
        }

        const i = this.data.findIndex(e => e.Id === Id);
        return this.data[i];
    }
};

/* Estado	Significado
Criado	Projeto acabou de ser criado; ainda não iniciado.
Aberto	Projeto em andamento; tarefas podem ser adicionadas e tempo registado.
Concluído	Projeto finalizado; tarefas e tempo não podem ser alterados.
Cancelado	Projeto abortado; não pode ser reaberto nem registrar tempo, apenas visualização. */

/* 
[Criado] 
   | abrir()
   v
[Aberto]

[Aberto] 
   | concluir()
   v
[Concluído]

[Aberto] 
   | cancelar()
   v
[Cancelado]

 */
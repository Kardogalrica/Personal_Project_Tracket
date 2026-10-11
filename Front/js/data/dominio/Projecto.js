import {getCookie} from '../auth/Login.js'

export const Projectos = {   
    data: [],

    async init() {

        try {
            const responseProjectos = await fetch('http://localhost:3000/GetDetalheProjectos', {
                                method: 'GET',
                                headers:{
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + getCookie('Token')
                                },
                            });
            
            let data = await responseProjectos.json();

            if(!data) {
                this.data = []
                return
            }

            const datap = data.map(d => ({
                Id:d.id,
                nome:d.nome,
                ClassName:d.class,
                Label:d.label
            }))

            this.data = datap

        } catch (e) {
            throw new Error(e)
        }
    },
}

export function RecordProjecto() {
    this.isLoading = false

    this.record = null

    this.Tarefas = []

    this.Tempos = []

    this.Estado = {}

    this.init = async function(id) {
        if(!this.isLoading) {

            if(id === 0) {
                    this.record = {}
                    this.record.Id = 0
                    this.record.estado = 0
                    this.record.dataCriação = ''
                    this.record.dataAbertura = '' 
                    this.record.dataFecho = ''
                    return
            }

            try {
                const dataBody = {
                    Id:id
                }

                                // Projecto
                const responseProjecto = await fetch('http://localhost:3000/GetDetalheProjectoById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('Token'),
                },
                body: JSON.stringify(dataBody),
                });

                if (!responseProjecto.ok) {
                throw new Error(`GetDetalheProjectoById falhou: ${responseProjecto.status}`);
                }

                let dataP = await responseProjecto.json();

                if (!Array.isArray(dataP) || dataP.length === 0) {
                this.record = {
                    Id: 0,
                    estado: 0,
                    dataCriação: '',
                    dataAbertura: '',
                    dataFecho: '',
                    nome: '',
                    descricao: '',
                    htotal: 0,
                    hestimadas: 0,
                    ttarefas: 0,
                };
                } else {
                const p = dataP[0];
                this.record = {
                    Id: p.id,
                    estado: p.estado_id,
                    dataCriação: p.datacriacao || '',
                    dataAbertura: p.dataabertura || '',
                    dataFecho: p.datafeccho || '', // confirma nome do campo
                    nome: p.nome || '',
                    descricao: p.descricao || '',
                    htotal: Number(p.total_horas) || 0,
                    hestimadas: Number(p.total_estimativa) || 0,
                    ttarefas: Number(p.total_tarefas) || 0,
                };

                this.Estado = {
                    Id: p.estado_id,
                    Label: p.label,
                    Class: (p.class || '').split(' ').filter(Boolean),
                };
                }

                // Tarefas
                const responseTarefas = await fetch('http://localhost:3000/GetTarefasByIdProjecto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('Token'),
                },
                body: JSON.stringify(dataBody),
                });

                if (!responseTarefas.ok) {
                throw new Error(`GetTarefasByIdProjecto falhou: ${responseTarefas.status}`);
                }

                let dataTarefas = await responseTarefas.json();
                this.Tarefas = Array.isArray(dataTarefas) ? dataTarefas : [];

                // Tempos
                const responseTempos = await fetch('http://localhost:3000/GetTemposByIdProjecto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getCookie('Token'),
                },
                body: JSON.stringify(dataBody),
                });

                if (!responseTempos.ok) {
                throw new Error(`GetTemposByIdProjecto falhou: ${responseTempos.status}`);
                }

                let dataTempos = await responseTempos.json();

                if (Array.isArray(dataTempos) && dataTempos.length > 0) {
                this.Tempos = dataTempos;
                } else {
                this.Tempos = [];
                }
                
                
            } catch (e) {
                throw new Error(e)
            } finally {
                this.isLoading = true
            }
        }
    }

    this.refresh = async function() {
        this.isLoading = false
        await this.init(this.record.Id)
    }

    this.set = function(nome,descricao,estado) {
        if( typeof nome !== 'string' || typeof descricao !== 'string' || typeof estado !== 'number'  || nome.trim() === '' || estado <= 0 || estado > 4) {
            throw new Error('Tentativa de atribuir Valores invalidos ao Projecto')
        }
        this.record.nome = nome
        this.record.descricao = descricao
        this.record.estado = estado
    }

    this.setEstado = function(estado) {
        if(estado <= 0 ||  estado > 4) {
            throw new Error('Tentativa de atribuir Valores invalidos ao Projecto')
        }
        this.record.estado = estado
    }

    this.save = async function(callback) {
        // validação
        if (typeof this.record.nome !== 'string' || typeof this.record.descricao !== 'string' || typeof this.record.estado !== 'number' || !Number.isInteger(this.record.estado) || this.record.nome.trim() === '' || this.record.estado <= 0) {
            throw new Error('Tentativa de atribuir valores inválidos ao Projecto')
        }

        this.record.dataCriação = this.record.Id === 0 ? new Date().toISOString() : this.record.dataCriação
        this.record.dataAbertura = this.record.estado === 2 ?  new Date().toISOString() : this.record.dataAbertura
        this.record.dataFecho = this.record.estado === 3 || this.record.estado === 4 ?  new Date().toISOString() : this.record.dataFecho

            const projecto = {projecto: {
                Id:this.record.Id,
                nome:this.record.nome,
                descricao:this.record.descricao,
                dataCriação:this.record.dataCriação,
                dataAbertura:this.record.dataAbertura,
                dataFecho:this.record.dataFecho,
                estado:this.record.estado}
            }
            
        try {

                const responseCreateProjeto = await fetch('http://localhost:3000/CreateUpdateProjecto', {
                                    method: 'POST',
                                    headers:{
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + getCookie('Token')
                                    },
                                    body: JSON.stringify(projecto)
                                });
                let data = await responseCreateProjeto.json()

                this.record.Id = data.id
            
            
        } catch (e) {
            throw new Error(e)
        } finally {
            await this.refresh(this.record.Id)
            if (callback instanceof Function) { callback(); }
        }
    }
}
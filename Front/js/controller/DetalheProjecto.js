import { RecordProjecto } from '../data/dominio/Projecto.js'

import { SetRp, SetTa, SetTe } from '../Variables/SetVariables.js'

import {FormateDte} from '../functions/FormateDate.js'

export function ChangeDetalhe() {
    ToogleDetahe('NoSelecion-Project','Selecion-Project')
    DetalheProjecto('NomeProjeto','descricaoProjeto','LabelEstado','Dt_CriadoEm','Dt_AbertoEm','t-tarefas','t-estitimadas','t-trabalhadas')
    SetRp.ChangeEvent(()=> {
        ToogleDetahe('NoSelecion-Project','Selecion-Project')
        DetalheProjecto('NomeProjeto','descricaoProjeto','LabelEstado','Dt_CriadoEm','Dt_AbertoEm','t-tarefas','t-estitimadas','t-trabalhadas')
        SetTa.set(SetRp.get())
        SetTe.set(SetRp.get())
    }
)
}

async function DetalheProjecto(widegetNome,widegetDescrição,widegetLabelEstado,WidgetDTCriadoEm,WidgetDTAbertoEm,widgetTotalTarefas,widgetEtimadas,widgetHorasTrabalhadas) {
    if(SetRp.get() === 0) {
        document.querySelector('#'+widegetNome).innerHTML = "(Não Defenido)" 
        document.querySelector('#'+widegetDescrição).innerHTML = "(Não Defenido)" 
        document.querySelector('#'+widegetLabelEstado).innerHTML = ''
        document.querySelector('#'+WidgetDTCriadoEm).innerHTML = ''
        document.querySelector('#'+WidgetDTAbertoEm).innerHTML = ''
        document.querySelector('#'+widgetTotalTarefas).innerHTML = ''
        document.querySelector('#'+widgetEtimadas).innerHTML = ''
        document.querySelector('#'+widgetHorasTrabalhadas).innerHTML = ''
       GereBtnEstados('Abrir','Concluir','Cancelar','Apagar','Tarefas','Tempos',0)
    } else {
            let RP = new RecordProjecto()

        try {
            await RP.init(SetRp.get())            
        } catch (e) {
            throw new Error(e)
        } finally {
            document.querySelector('#'+widegetNome).innerHTML = RP.record.nome 
            document.querySelector('#'+widegetDescrição).innerHTML = RP.record.descricao
            document.querySelector('#'+widegetLabelEstado).innerHTML = RP.Estado.Label
            document.querySelector('#'+widegetLabelEstado).className = ''
            document.querySelector('#'+widegetLabelEstado).classList.add(...RP.Estado.Class)
            document.querySelector('#'+WidgetDTCriadoEm).innerHTML = FormateDte(new Date(RP.record.dataCriação))
            document.querySelector('#'+WidgetDTAbertoEm).innerHTML = RP.record.dataAbertura === '' ? '-' : FormateDte(new Date(RP.record.dataAbertura))
            document.querySelector('#'+widgetTotalTarefas).innerHTML = RP.record.ttarefas
            document.querySelector('#'+widgetEtimadas).innerHTML = RP.record.hestimadas +'h'
            document.querySelector('#'+widgetHorasTrabalhadas).innerHTML = RP.record.htotal +'h'
            GereBtnEstados('Abrir','Concluir','Cancelar','Apagar','Tarefas','Tempos',RP.record.estado)
        }

    }
}

function ToogleDetahe(widgetEmpty, widgetNotEmpty) {
    if(SetRp.get() === 0) {
        document.querySelector('#'+widgetEmpty).classList.remove('d-none')
        document.querySelector('#'+widgetNotEmpty).classList.add('d-none')
    } else {
        document.querySelector('#'+widgetEmpty).classList.add('d-none')
        document.querySelector('#'+widgetNotEmpty).classList.remove('d-none')
    }
}

function GereBtnEstados(btnAbrir, btnConcluir, btnCancelar,btnApagar,btnTarefas,btnTempos,estado) {
    document.querySelector('#'+btnAbrir).disabled = true
    document.querySelector('#'+btnConcluir).disabled = true
    document.querySelector('#'+btnCancelar).disabled = true
    document.querySelector('#'+btnApagar).disabled = true
    document.querySelector('#'+btnTarefas).disabled = true
    document.querySelector('#'+btnTempos).disabled = true
    if(estado === 1) {
        document.querySelector('#'+btnAbrir).disabled = false
        document.querySelector('#'+btnCancelar).disabled = false
        document.querySelector('#'+btnApagar).disabled = false
        document.querySelector('#'+btnTarefas).disabled = false
    }

    if(estado === 2) {
        document.querySelector('#'+btnConcluir).disabled = false
        document.querySelector('#'+btnCancelar).disabled = false
        document.querySelector('#'+btnTarefas).disabled = false
        document.querySelector('#'+btnTempos).disabled = false
    }
}
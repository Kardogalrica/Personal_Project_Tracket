import { RecordProjecto } from '../data/dominio/Projecto.js'

import { SetTa } from '../Variables/SetVariables.js'

export function ChangeListaTarefas() {
    SetTa.ChangeEvent((value)=> {
        CreateListaTarefa(value,'listaTarefas')
    }
)
}

async function CreateListaTarefa(IdProjecto,WidgetId) {
    let P = new RecordProjecto

    try {
        await P.init(IdProjecto)   
    } catch (e) {
        throw new console.Error(e);
    } finally {
        let dataTarefas = P.Tarefas
        if(dataTarefas.lenght === 0) {
            return
        }
        const listaTarefa = document.querySelector('#'+WidgetId)
        listaTarefa.innerHTML = dataTarefas.map(el => `<li class="list-group-item">
                                                                                <div class="d-flex gap-3 align-items-center">
                                                                                    <div class="flex-grow-1">
                                                                                        <div class="h5">${el.titulo}</div>
                                                                                        <div class="p-1 text-secondary">${el.estimativa} h</div>                                                                            
                                                                                    </div> 
                                                                                    <a class="border border-danger rounded-circle p-2 text-center icon-circulo btn-apagar" data-value="${el.Id}">
                                                                                        <i class="bi bi-trash text-danger"></i>
                                                                                    </a>                                                                           
                                                                                </div>
                                                                                </li>`).join('')
        listaTarefa.querySelectorAll('.btn-apagar').forEach(el => {
            el.addEventListener('click', (e) => {
                /* Aqui mando o Id e apago o record */
                console.log(e.target.closest('.btn-apagar').dataset.value)
            })
        })
    }
    

}
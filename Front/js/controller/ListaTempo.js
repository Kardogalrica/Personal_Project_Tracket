import { RecordProjecto } from '../data/dominio/Projecto.js'

import { SetTe } from '../Variables/SetVariables.js'

import {FormateDte} from '../functions/FormateDate.js'

export function ChangeListaTempo() {
    SetTe.ChangeEvent((value)=> {
        CreateListaTempo(value,'listaTempo')
    }
)
}

async function CreateListaTempo(IdProjecto,WidgetId) {
    let P = new RecordProjecto

    try {
        await P.init(IdProjecto)        
    } catch (e) {
        throw new Error(e)
    } finally {
        let dataTempos = P.Tempos
        if(dataTempos.lenght === 0) {
            return
        }
        const listaTempo = document.querySelector('#'+WidgetId)
        listaTempo.innerHTML = dataTempos.map(el => `<li class="list-group-item">
                <div class="d-flex gap-3 align-items-center">
                    <div class="flex-grow-1">
                        <div class="h5">
                            ${el.notas}                        
                        </div>
                        <div class="p-1 text-secondary"> 
                            <span class="h5">${el.horas} h </span> - ${FormateDte(new Date(el.data))}
                        </div> 
                    </div>
                    <div>
                        <button class="btn border border-danger rounded-circle p-2 text-center icon-circulo btn-apagar" data-value="${el.Id}" ${((P.record.estado !== 2 ) ? 'disabled' : '')}>
                            <i class="bi bi-trash text-danger"></i>
                        </button>
                    </div>
                </div>
            </li>`).join('')        
    }

    listaTempo.querySelectorAll('.btn-apagar').forEach(el => {
            el.addEventListener('click', (e) => {
                /* Aqui mando o Id e apago o record */
                console.log(e.target.closest('.btn-apagar').dataset.value)
            })
        })

}
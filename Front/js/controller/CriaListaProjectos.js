import { Projectos } from '../data/dominio/Projecto.js'
import { SetP, SetRp } from '../Variables/SetVariables.js'

export async function ChangeListaProjecto() {
    SetP.ChangeEvent( async ()=> {
        let P = Projectos

        try {
            await P.init()            
        } catch (e) {
            throw new Error(e)            
        } finally {
            CriaListaProjecto(P.data,'listaProjectos')
            SelectList(SetRp.get(),'listaProjectos')
        }

    }
)
}

function CriaListaProjecto(data, widgetId) {
    /* se projectos tiver os estados deixa de ser necessário ussar Estados aqui */
    var lista = document.querySelector('#'+widgetId)
    lista.innerHTML = ''
    data.forEach((el) => {
        const a = document.createElement('a')
        a.dataset.value = el.Id
        a.classList.add('list-group-item','list-group-item-action','bg-traspararente','border-0','py-3')
        a.innerHTML = `<strong class="me-3">${el.nome}</strong><label class="${el.ClassName}">${el.Label}</label>`

        a.addEventListener('click', () => {
            SetRp.set(el.Id)
        })

        lista.appendChild(a)
    })
}

SetRp.ChangeEvent((Id) => {
    SelectList(Id,'listaProjectos')
})

function SelectList(Id,widgetId) {
    if(Id === 0) {
        return
    }

    var listaLink = document.querySelectorAll('#'+widgetId+' > a')
    
    listaLink.forEach((el) => {
        el.classList.remove('active')

        if(Number(el.dataset.value) === Id) {
            el.classList.add('active')
        }
    })
}

/* `<a href="#" class="list-group-item list-group-item-action bg-traspararente border-0">${el.nome}</a>` */

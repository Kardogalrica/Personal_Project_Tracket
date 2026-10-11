export function Feedback(IdWidget,Messague) {
    var f = document.querySelector('#'+IdWidget)

    if(f.classList.contains('d-none')) {
        f.classList.remove('d-none')
        f.querySelector('div').innerText = Messague
        setTimeout(() => {
            f.classList.add('d-none')
        }, 5000);
    }        
}


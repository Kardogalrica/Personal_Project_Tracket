export function ValidationInput() {
    this.invalid = function (widgetId,Messague) {
        var input = document.querySelector('#'+widgetId)
        var menssague = document.querySelector('#'+widgetId+' + div')

        input.classList.add('is-invalid')
        menssague.innerText = Messague
    }

    this.reset = function(widgetId) {
        var input = document.querySelector('#'+widgetId)
        input.classList.remove('is-invalid')
    }
}
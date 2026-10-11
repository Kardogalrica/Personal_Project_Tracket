export function Modal() {
    this.hide = function(widgetId) {
        const modalEl = document.querySelector('#'+widgetId)
        const modal = bootstrap.Modal.getInstance(modalEl)
        modal.hide()
    }
}
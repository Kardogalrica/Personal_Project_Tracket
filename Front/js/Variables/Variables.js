export function Variable(initialValue) {
    let value = initialValue
    const callbacks = []

    // Obter valor atual
    this.get = function() {
        return value
    }

    // Definir novo valor e notificar todos os callbacks
    this.set = function(newValue = '') {
        value = newValue
        callbacks.forEach(cb => cb(value))
    }

    // Registar um callback
    this.ChangeEvent = function(callback) {
        if (typeof callback === 'function') {
            callbacks.push(callback)
        }
    }
}




/* export function Variable(initialValue) {
    let value = initialValue
    const callbacks = []

    this.get = function() {
        return value
    }

    this.set = function(newValue) {
        if (newValue === value) return
        value = newValue
        callbacks.forEach(cb => cb(value))
    }

    this.ChangeEvent = function(callback) {
        if (callback instanceof Function) {
            callbacks.push(callback)
        }
    }
}
 */
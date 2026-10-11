export const storage = {
    get(key) {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : []
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    remove(key) {
        localStorage.removeItem(key)
    }
}
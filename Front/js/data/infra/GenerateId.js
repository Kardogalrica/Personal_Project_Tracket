export const GenerateId = {
    getId(data) {
        if(!Array.isArray(data) || data.length === 0) {
            return 1
        } 

    const Id = data.map((el) => el.Id)

    return Math.max(...Id) + 1

    }
}
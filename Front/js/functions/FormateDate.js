export function FormateDte(date) {
    const month = date.getMonth()+1
 return date.getDate()+'/'+ month +'/'+date.getFullYear()
}
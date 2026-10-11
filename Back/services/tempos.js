import {supabase} from "../db/superbaseClient.js";

export async function GetTemposByIdProjecto(IdProjecto) {
    const { data, error } = await supabase
    .from('tempos')
    .select('*')
    .eq('projeto_id', IdProjecto)

    if(!error) {
        const tempos = data.map((d) => ({
                                        Id:d.id, 
                                        notas:d.notas,
                                        data:d.data,
                                        horas:d.horas,
                                        IdProjecto:d.projeto_id
                                    }))
        return tempos
    } else {
        throw new Error(error.message)
    }
}

export async function CreateTempo(Notas,Data,Horas,ProjectoId) {
    const { data, error } = await supabase 
    .from('tempos') 
    .insert([{
        notas:Notas,
        data:Data || null,
        horas:Horas,
        projeto_id:ProjectoId
    }]) 
    .select() 
    .single()
    
    if(!error) { 
        return data 
    } else { 
        throw new Error(error.message) 
    } 
}

export async function UpdateTempo(Id,Notas,Data,Horas,ProjectoId) {

    const { data, error } = await supabase
        .from('tempos')
        .update({
            notas:Notas,
            data:Data || null,
            horas:Horas,
            projeto_id:ProjectoId
        })
        .eq('id', Id)
        .select()
        .single();

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}
import {supabase} from "../db/superbaseClient.js";

export async function GetTarefasByIdProjecto(IdProjecto) {
    const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('projeto_id', IdProjecto)

    if(!error) {
        const tarefas = data.map((d) => ({
                                        Id:d.id, 
                                        titulo:d.titulo,
                                        estimativa:d.estimativa,
                                        concluido:d.isconcluido,
                                        IdProjecto:d.projeto_id
                                    }))
        return tarefas
    } else {
        throw new Error(error.message)
    }
}

export async function CreateTarefas(Titulo,Estimativa,IsConcluido,ProjectoId) {
    const { data, error } = await supabase 
    .from('tarefas') 
    .insert([{
        titulo:Titulo,
        estimativa:Estimativa,
        isconcluido:IsConcluido,
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

export async function UpdateTarefas(Id,Titulo,Estimativa,IsConcluido,ProjectoId) {

    const { data, error } = await supabase
        .from('tarefas')
        .update({
            titulo:Titulo,
            estimativa:Estimativa,
            isconcluido:IsConcluido,
            projeto_id:ProjectoId
        })
        .eq('id',Id)
        .select()
        .single();

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}
import {supabase} from "../db/superbaseClient.js";

export async function GetProjetos(user_id) {
    const { data, error } = await supabase
    .from('projectos')
    .select('*')
    .eq('user_id', user_id)

    if(!error) {

        const projetos = data.map((d) => ({
                                        Id:d.id, 
                                        dataAbertura:d.dataabertura || '',
                                        dataCriação:d.datacriacao,
                                        dataFecho:d.datafecho || '',
                                        descrição:d.descricao,
                                        estado:d.estado_id,
                                        nome:d.nome
                                    }))
        return projetos
    } else {
        throw new Error(error.message)
    }
}

export async function GetDetalheProjecto(user_id) {
    const { data, error } = await supabase
    .from('vw_projectos_resumo')
    .select('*')
    .eq('user_id', user_id)

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}

export async function GetDetalheProjectoById(user_id,Id) {
    const { data, error } = await supabase
    .from('vw_projectos_resumo')
    .select('*')
    .eq('user_id', user_id)
    .eq('id',Id)

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}

export async function CreateProjecto(ProjectoNome,ProjectoDescricao,ProjectoDataCriacao,ProjectoDataAbertura,ProjectoDataFecho,ProjectoUser_id,ProjectoEstado_id) {
    const { data, error } = await supabase 
    .from('projectos') 
    .insert([{
        nome:ProjectoNome,
        descricao:ProjectoDescricao,
        datacriacao:ProjectoDataCriacao || null,
        dataabertura:ProjectoDataAbertura || null,
        datafecho:ProjectoDataFecho || null,
        user_id:ProjectoUser_id,
        estado_id:ProjectoEstado_id
    }]) 
    .select() 
    .single()
    
    if(!error) { 
        return data 
    } else { 
        throw new Error(error.message) 
    } 
}

export async function UpdateProjecto(ProjectoId,ProjectoNome,ProjectoDescricao,ProjectoDataCriacao,ProjectoDataAbertura,ProjectoDataFecho,ProjectoUser_id,ProjectoEstado_id) {

    const { data, error } = await supabase
        .from('projectos')
        .update({
            nome:ProjectoNome,
            descricao:ProjectoDescricao,
            datacriacao:ProjectoDataCriacao || null,
            dataabertura:ProjectoDataAbertura || null,
            datafecho:ProjectoDataFecho || null,
            user_id:ProjectoUser_id,
            estado_id:ProjectoEstado_id
        })
        .eq('id', ProjectoId)
        .select()
        .single();

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}
/* CREATE TABLE Estados (
  id SERIAL PRIMARY KEY,
  Label VARCHAR(250),
  Class VARCHAR(500)
); */

/* INSERT INTO Estados (label,class)
VALUES
('Criado','border rounded-pill p-1 text-center w-auto text-secondary bg-secondary-subtle'),
('Aberto','border rounded-pill p-1 text-center w-auto text-info bg-primary-subtle'),
('Concluído','border rounded-pill p-1 text-center w-auto text-success bg-success-subtle'),
('Cancelado','border rounded-pill p-1 text-center w-auto text-danger bg-danger-subtle') */


import {supabase} from "../db/superbaseClient.js";

export async function GetEstados() {
    const { data, error } = await supabase
    .from('estados')
    .select('*')

    if(!error) {

        const estados = data.map((d) => ({Id:d.id, 
                                        Label:d.label,
                                        Class:d.class.split(' ') || ''}))
        return estados
    } else {
        throw new Error(error.message)
    }
}
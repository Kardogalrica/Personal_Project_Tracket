import {supabase} from "../db/superbaseClient.js";

/* CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(250),
  email VARCHAR(250),
  password VARCHAR(250)
); */

/* ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email); */

export async function CreateUser(UserName,Email,PassWord) {

    const { data, error } = await supabase 
    .from('users') 
    .insert([{ username:UserName,email:Email,password:PassWord}]) 
    .select() 
    .single()
    
    if(!error) { 
        return data 
    } else { 
        throw new Error(error.message) 
    } 
}

export async function GetUsers() {

    const { data, error } = await supabase
    .from('users')
    .select('*')

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}

export async function GetUserById(id) {

    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}

export async function GetUserByEmail(Email) {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', Email)
    .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data; // pode ser null
}

export async function UpdateUserById_Password(id,password) {

    const { data, error } = await supabase
        .from('users')
        .update({ password: password })
        .eq('id', id)
        .select();

    if(!error) {
        return data
    } else {
        throw new Error(error.message)
    }
}

export async function DeleteUserById(id) {

    const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

    if(!error) {
        return 
    } else {
        throw new Error(error.message)
    }
}
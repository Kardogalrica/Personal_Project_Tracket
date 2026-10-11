const container = document.querySelector('.container')
const registerBtn = document.querySelector('.register-btn')
const loginBtn = document.querySelector('.login-btn')

const PaginaDestino = 'PersonalProject.html'

/* Registar */
const btnRegister = document.querySelector('#btn-register')
const UserNameRegister = document.querySelector('#username-register')
const EmailRegister = document.querySelector('#email-register')
const PassRegister = document.querySelector('#pass-register')
const MUserNameRegistar = document.querySelector('#m-username-register')
const MEmailRegistar = document.querySelector('#m-email-register')
const MPassRegistar = document.querySelector('#m-pass-register')

/* Login */
const btnLogin = document.querySelector('#btn-login')
const EmailLogin = document.querySelector('#email-login')
const PassLogin = document.querySelector('#pass-login')
const MEmailLogin = document.querySelector('#m-email-login')
const MPassLogin = document.querySelector('#m-pass-login')

registerBtn.addEventListener('click', () => {
    container.classList.add('active')
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active')
})

/* Ação registar */

btnRegister.addEventListener('click', async (e) => {
    e.preventDefault()

    var IsValid = true

    if(UserNameRegister.value === '') {
        IsValid = false
        MUserNameRegistar.classList.remove('d-none')
        MUserNameRegistar.innerText = 'Campo Obrigatório'
    } else {
        MUserNameRegistar.classList.add('d-none')
        MUserNameRegistar.innerText = ''
    }

    if(EmailRegister.value === '') {
        IsValid = false
        MEmailRegistar.classList.remove('d-none')
        MEmailRegistar.innerText = 'Campo Obrigatório'
    } else {
        MEmailRegistar.classList.add('d-none')
        MEmailRegistar.innerText = ''
    }

    if(PassRegister.value === '') {
        IsValid = false
        MPassRegistar.classList.remove('d-none')
        MPassRegistar.innerText = 'Campo Obrigatório'
    } else {
        MPassRegistar.classList.add('d-none')
        MPassRegistar.innerText = ''
    }

    if(!IsValid) {
        return
    }

    try {
        const responseV = await fetch('http://localhost:3000/ValidaUtilizador', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                Email: EmailRegister.value,
                Password: PassRegister.value,
                IsNew: true
            })
        })

        const data = await responseV.json()

        IsValid = data.IsValid

        if(IsValid) {
            const responseCriate =  await fetch('http://localhost:3000/CriaUser', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({  Username: UserNameRegister.value,
                                        Email: EmailRegister.value,
                                        Password: PassRegister.value
                                    })
            })
            const dataCrieate = await responseCriate.json()

            if(dataCrieate) {
                var d = new Date();
                d.setHours(d.getHours() + 1); // adiciona 1 hora
                document.cookie = 'Token=' + dataCrieate.Token + ';expires=' + d.toUTCString() + ';path=/';
                window.location.href = PaginaDestino
            }
            MEmailRegistar.classList.add('d-none')
            MEmailRegistar.innerText = ''

        } else {
            /* console.error('Not valid') */
            MEmailRegistar.classList.remove('d-none')
            MEmailRegistar.innerText = 'Utilizador já existe'
        }

    } catch(err) {
        console.error(err)
    }
})

btnLogin.addEventListener('click', async (e) => {
    e.preventDefault()

    var IsValid = true

    if(EmailLogin.value === '') {
        IsValid = false
        MEmailLogin.classList.remove('d-none')
        MEmailLogin.innerText = 'Campo Obrigatório'
    } else {
        MEmailLogin.classList.add('d-none')
        MEmailLogin.innerText = ''
    }

    if(PassLogin.value === '' ) {
        IsValid = false
        MPassLogin.classList.remove('d-none')
        MPassLogin.innerText = 'Campo Obrigatório'
    } else {
        MPassLogin.classList.add('d-none')
        MPassLogin.innerText = ''
    }

    if(!IsValid) {
        return
    }

    try {

        const responseV = await fetch('http://localhost:3000/ValidaUtilizador', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                Email: EmailLogin.value,
                Password: PassLogin.value,
                IsNew: false
            })
        })

        const data = await responseV.json()

        IsValid = data.IsValid

        if(IsValid) {
            const responseLogin = await fetch('http://localhost:3000/Login',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    Email:EmailLogin.value,
                    Password:PassLogin.value
                })
            })

            const dataLogin = await responseLogin.json()

            if(dataLogin) {
                    var d = new Date();
                    d.setHours(d.getHours() + 1); // adiciona 1 hora
                    document.cookie = 'Token=' + dataLogin.Token + ';expires=' + d.toUTCString() + ';path=/';
                    window.location.href = PaginaDestino
            }            
        } else {
            MPassLogin.classList.remove('d-none')
            MPassLogin.innerText = 'A Password está incorreta' 
        }

    } catch (err) {
        console.error(err)
    }
})
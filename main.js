const usuario = {
    login: '',
    senha: ''
}

const LOGADO = 'userLogado';
const USER = 'user';

$(document).ready(()=>{
    console.log('JQuery loaded.');
    console.log(window.location.href)
    if(window.location.href.includes('index')){
    verificaLogin();
    }
});

// Functions

const getPagina = (page, target) => {
    $.ajax({
        url: page,
        dataType: 'html',
        success: (pResponse) => {
            $(target).html(pResponse);
        }
    });
}

const realizaLogin = (user) => {
    localStorage.setItem(LOGADO, 'true');
    localStorage.setItem(USER, JSON.stringify(user));
    window.location.href = 'home.html';
}

const realizaLogoff = () => {
    localStorage.removeItem(LOGADO);
    localStorage.removeItem(USER);
}

const verificaLogin = () => {
    if(localStorage.getItem(LOGADO) == 'true'){
        console.log('Logado');
        window.location.href = 'home.html';
    } else {
        console.log('Deslogado');
        return false;
    }
}

const getRegistroStorage = (key) =>{
    return localStorage.getItem(key);
}

const insertRegistroStorage = (key, value) => {
    if(typeof value == usuario){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const getItem = (key) => {
    return localStorage.getItem(key);
}

const setItem = (key, value) => {
    localStorage.setItem(key, value);
}

const getJsonItem = (key) => {
    var obj = getItem(key);
    return JSON.parse(obj);
}

const setJsonItem = (key, value) => {
    var obj = JSON.stringify(value);
    setItem(key, obj);
}

const removeItem = (key) => {
    localStorage.removeItem(key);
}

 $('#logout').click((e)=>{
        realizaLogoff();
        localStorage.clear();
        window.location.href = 'index.html';
});

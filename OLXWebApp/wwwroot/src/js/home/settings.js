// для примера
const exProfile = {
    email: 'login@login.tu',
    password: 'example',
    name: 'Ira',
    phone: '79021002030',
    countAccounts: 5,
    countAdvert: 12,
    proxy: ['178.109.10.20:8080', '172.100.20.30:5678'],
    captcha: '6Le5-c0SAAAAAHXM3sIrsXBlRh'
};

let profile = {};
const url = 'https://localhost:44379';
const pathProfile = '/User/Profile'; // Вставить свой путь для загрузки данных профиля
const pathProfileUpdate = '/User/UpdateProfile'; // Вставить свой путь для обновления профиля

function uploadDataForm(key, val) {
    console.log(document.forms['settings_form']);
    console.log(key, val);
    if (Array.isArray(val)) {
        console.log(key, 'is array');
        let container = document.querySelector('#inputs_' + key);
        container.innerHTML = '';
        if (val.length > 0) {
            val.forEach((el, idx) => {
                let inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'field array-item-input';
                inp.name = key + '_' + idx;
                inp.value = el;
                container.append(inp);
            });
        } else {
            profile[key].push('');
            let inp = document.createElement('input');
            inp.type = 'text';
            inp.className = 'field array-item-input';
            inp.name = key + '_' + 0;
            inp.value = '';
            container.append(inp);
        }
    } else {
        let inp = document.querySelector('#' + key);
        console.log(inp, '#' + key);
        inp.value = val;
    }
}

async function loadDataProfile() {
    try {
        const response = await fetch(url + pathProfile, {
            method: "GET"
        });
        const json = await response.json();
        profile = json;
        for (const [key, value] of Object.entries(json)) {
            uploadDataForm(key, value);
        }
    } catch (e) {
        console.log(e.message);
    }
}

async function handleSaveProfile() {
    let form = document.forms['settings_form'];
    console.log(form);
    let data = Array.from(new FormData(form))
        .reduce((r, [k, v]) => { r[k] = v; return r }, {});

    data.proxy = [];
    for (const [key, value] of Object.entries(data)) {
        if (key.indexOf('proxy_') == 0) {
            let btl = key.split('_');
            data.proxy[btl[1]] = value;
        }
    }
    console.log(data);

    try {
        const response = await fetch(url + pathProfileUpdate, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                captcha: data.captcha,
                proxy: data.proxy
            }
        });
        console.log(response.ok);

    } catch (e) {
        console.log(e.message);
    }
}

function setNewInputProxy() {
    let container = document.querySelector('#inputs_proxy');
    profile.proxy.push('');

    let inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'field array-item-input';
    inp.name = 'proxy_' + (profile.proxy.length - 1);
    inp.value = '';
    container.append(inp);
}

loadDataProfile();

document.querySelector('#proxy_btn').addEventListener('click', setNewInputProxy);
document.querySelector('#save_btn').addEventListener('click', handleSaveProfile);
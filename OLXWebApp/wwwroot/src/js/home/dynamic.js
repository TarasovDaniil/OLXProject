let currentAccountCheck = [];
let currentToken = '';

let newAccounts = {};

const url = 'https://localhost:5001';
const path = '/User/AddAdvert'; //Заменить на реальный путь отправки формы для объявления
const pathUpload = '/User/AddPhoto'; //заменить на реальный путь отправки изображений

let valCategories = [];

function showPassword(id){
    console.log(id);
    const x = document.getElementById('password_'+id);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function generateRandomToken(){
    let randomstring = Math.random().toString(36).slice(-8);
    if(newAccounts.hasOwnProperty(randomstring)){
        return generateRandomToken();
    }
    return randomstring;
}

function createElementCheckBoxInput(token){
    //const token = generateRandomToken();

    let td = document.createElement('td');
    let label = document.createElement('label');
    label.className = 'first_inputs';

    let check = document.createElement('input');
    check.type = 'checkbox';
    check.style.opacity = 0;

    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'Login_'+token;
    input.placeholder = 'Логин';
    input.className = 'enter_inputs';
    if(newAccounts[token]){
        input.value = newAccounts[token].Login;
    }
    input.addEventListener('input', function(e){
        newAccounts[token].Login = e.target.value;
        console.log(newAccounts);
    });
    label.append(check,input);
    td.append(label);

    return td;
}

function createElementInput(token, placeholder, name, type){
    let td = document.createElement('td');
    let label = document.createElement('label');

    let input = document.createElement('input');
    input.type = type;
    input.name = name+'_'+token;
    input.placeholder = placeholder;
    input.className = 'enter_inputs';
    if(newAccounts[token]){
        input.value = newAccounts[token][name];
    }
    input.addEventListener('input', function(e){
        newAccounts[token][name] = e.target.value;
        console.log(newAccounts);
    });

    label.append(input);
    td.append(label);

    return td;
}

function createElementCheckBox(id, login){
    let td = document.createElement('td');
    let check = document.createElement('input');
    check.type = 'checkbox';
    check.id = 'account_'+id;
    check.name = 'account_'+id;
    if(currentAccountCheck.indexOf('account_'+id) >= 0){
        check.checked = true;
    }
    check.addEventListener('change', function(e){
        if(currentAccountCheck.indexOf('account_'+id) < 0 && e.currentTarget.checked){
            currentAccountCheck.push('account_'+id);
        }
    });
    let label = document.createElement('label');
    label.htmlFor = 'account_'+id;
    label.className = 'checkbox_label';
    label.append(login);
    td.append(check, label);
    return td;
}

function createElementPassword(id, password){
    let td = document.createElement('td');
    let label = document.createElement('label');

    let input = document.createElement('input');
    input.type = 'password';
    input.value = password;
    input.name = 'password_'+id;
    input.id = 'password_'+id;

    let img = document.createElement('img');
    img.src = '../../assets/eye.png';
    img.alt = 'eye';
    img.className = 'pass_eye';
    img.onclick = function(e){
        showPassword(id);
    };

    label.append(input, img);
    td.append(label);
    return td;
}

function createElementText(text){
    let td = document.createElement('td');
    td.append(text);
    return td;
}

function setLineAccount(user){
    let tr = document.createElement('tr');
    tr.id = 'account_'+user.id;

    tr.append(
        createElementCheckBox(user.id, user.login),
        createElementPassword(user.id, user.password),
        createElementText(user.name),
        createElementText(user.phone)
    );
    return tr;
}

function getUsersPagination(users){
    let table = document.querySelector('#accounts tbody');
    table.innerHTML = '';
    console.log(users);
    users.forEach((val) => {
        table.append(setLineAccount(val));
    });
}

async function getUserAccountsPaginator(page){
    try {
        const response = await fetch(url + '/User/GetAccountsOlx?page=' + page, {
            method: "GET"
        });
        return await response.json();
    }catch (e) {
        return  [];
    }
}

async function getCountAccounts() {
    try {
        const response = await fetch(url + '/User/GetCountAccountsOlx', {
            method: "POST"
        });
        let count = await response.json();
        return count;
    } catch (e) {
        return 1;
    }
}

async function getUserAccounts(){
    try {
        getUsersPagination(await getUserAccountsPaginator(1));
        let maxPage = Math.ceil(parseInt(await getCountAccounts()) / 5);

        const paginator = new Paginator(1, maxPage, document.querySelector('#btns'), async function onChange(page) {
            let usr = await getUserAccountsPaginator(page);
            getUsersPagination(usr);
        });
        paginator.render();
    }catch (e){
        console.log(e.message);
    }
}

function createNewAccount(){
    const token = generateRandomToken();
    currentToken = token;
    let table = document.querySelector('#new_account tbody');
    table.innerHTML = '';
    newAccounts = [];

    let tr = document.createElement('tr');
    tr.id = token;
    newAccounts[token] = {
        Login: '',
        Password: '',
        Name: '',
        Phone: ''
    };

    tr.append(
        createElementCheckBoxInput(token),
        createElementInput(token, 'Пароль', 'Password', 'password'),
        createElementInput(token, 'Имя', 'Name', 'text'),
        createElementInput(token, 'Номер телефона', 'Phone', 'number'),
    )
    console.log(newAccounts);
    table.append(tr);
}

async function deleteAccounts(){
    for (const val of currentAccountCheck) {
        let it = val.split("_");
        if(it[1]){
            try {
                await fetch(url + '/User/DeleteOLXAccount?id='+parseInt(it[1]), {
                    method: "GET"
                });

            }catch (e){
                console.log(e.message);
            }
        }
    }
    currentAccountCheck = [];
    getUserAccounts();
}

async function saveAccounts(){
    for (const [key, value] of Object.entries(newAccounts)) {
        for (const [key, val] of Object.entries(value)) {
            if(!val){
                return;
            }
        }
    }
    try {
        const response = await fetch(url + '/User/AddAccountOlx', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(newAccounts[currentToken])
        });
        if(response.ok){
            createNewAccount();
            getUserAccounts();
        }

    }catch (e){
        console.log(e.message);
    }
}

function list_to_tree(list) {
    let map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== 0) {
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

function setCities(cities){
    let loc = document.querySelector('#form_location');
    loc.innerHTML = '';

    cities.sort((a, b) => a.name > b.name ? 1 : -1).forEach((city) => {
        let opt = document.createElement('option');
        opt.value = city.id;
        opt.append(city.name);
        loc.append(opt);
    });
}

let requiredCodes = [];

function setInputForm(attr) {
    let section = document.createElement('section');
    let p = document.createElement('p');
    p.append(attr.label + (attr.unit ? '('+attr.unit+')' : ''));
    section.append(p);

    let er = document.createElement('span');
    er.className = 'error-span';

     if(attr.values.length == 0){
         attr.validation.required ? requiredCodes.push(attr.code) : null;
        let input = document.createElement('input');
        input.className = 'input_1';
        input.name = attr.code;
         if(attr.validation.numeric){
             input.type = 'number';
         }else{
            input.type = 'text';
         }
         input.addEventListener('blur', function (e){
             if(attr.validation.required && section.className !== 'error-valid'){
                 if(!e.target.value){
                     if(requiredCodes.indexOf(attr.code) === -1) {
                         requiredCodes.push(attr.code);
                     }
                     section.className = 'error-valid';
                     er.innerText = 'Обязательно к заполнению';
                 }
             }
         });
         input.addEventListener('input', function (e){
             console.log('blur');
             let isError = false;
             let message = '';

             if(!isError && attr.validation.min !== null && attr.validation.max !== null){
                 let inp = parseInt(e.target.value);
                 if(attr.validation.min < inp && attr.validation.max > inp){
                     isError = false;
                 }else if(attr.validation.min > inp){
                     isError = true;
                     message = 'Не менее '+attr.validation.min;
                 }else if(attr.validation.max < inp){
                     isError = true;
                     message = 'Не более '+attr.validation.max;
                 }
             }

             if(isError){
                 if(requiredCodes.indexOf(attr.code) === -1) {
                     requiredCodes.push(attr.code);
                 }
                 section.className = 'error-valid';
                 er.innerText = message;
             }else{
                 let idx = requiredCodes.indexOf(attr.code);
                 if(idx !== -1) {
                     requiredCodes.splice(idx, 1);
                 }
                 section.className = '';
                 er.innerText = '';
             }
         });

         section.append(input);

    }else{
         let input = document.createElement('select');
         input.className = 'input_1 input-select';
         input.name = attr.code;
         attr.values.forEach((val) => {
             let opt = document.createElement('option');
             opt.value = val.code;
             opt.append(val.label);
             input.append(opt);
         });
         section.append(input);
     }
     section.append(er);
     return section;
}

function setAttributes(attrs, parentId){
    let elAttr = document.querySelector('#category-attr');
    elAttr.innerHTML = '';
    requiredCodes = [];

    let section = document.createElement('section');
    let p = document.createElement('p');
    let input = document.createElement('input');
    input.type = 'number';
    input.className = 'input_1';
    if (parentId == 6) {
        input.name = 'salary';
        p.innerText = 'Зарплата';
    } else {
        input.name = 'price';
        p.innerText = 'Цена';
    }

    section.append(p, input);
    elAttr.append(section);

    attrs.forEach((val) => {
        let sec = setInputForm(val);
        elAttr.append(sec);
    });
}

let attributes = [];

async function getAttributes(id, parentId){
    try {
        await fetch(url+'/User/GetAttribute?id='+id, {
            method: "POST"
        }).then((va)=>{
            return va.json();
        }).then((val) => {
            attributes = val.data;
            setAttributes(val.data, parentId);
        });

    }catch (e){
        console.log(e.message);
    }
}

let stackCategories = [];
let stackNames = [];

function setCategories(cats){
    let parentCat = document.querySelector('.dropdown-content');
    let current = document.querySelector('#drop-current');
    parentCat.innerHTML = '';

    cats.forEach((cat) => {
        let a = document.createElement('a');
        let inp = document.querySelector('#category_id');
        if(inp.value == cat.id){
            if(document.querySelector('.a_active')) {
                document.querySelector('.a_active').className = '';
            }
            a.className = 'a_active';
        }
        a.addEventListener('click', function () {

            for (let i = 0; i < valCategories.length; i++) {
                if (inp.value == valCategories[i].id) {
                    if (valCategories[i].parentId == cat.parentId) {
                        stackCategories = stackCategories.slice(0, stackCategories.length - 1);
                        stackNames = stackNames.slice(0, stackNames.length - 1);
                        current.children[current.children.length - 1].remove();
                        if (document.querySelector('.a_active')) {
                            document.querySelector('.a_active').className = '';
                        }
                    }
                }
            }

            stackCategories.push(cat.id);
            stackNames.push(cat.name);
            let item = document.createElement('a');
            item.innerHTML = '<span style="margin-right: 1.2vw;">✖</span>' + cat.name + '<span style="margin-left: 1.2vw;">➤<span>';
            item.addEventListener('click', function(){
                let idx = stackCategories.indexOf(cat.id);
                if(idx == stackCategories.length - 1){
                    current.children[current.children.length - 1].remove();
                }else{
                    let removeStack = stackCategories.slice(idx);
                    removeStack.forEach((_, index) => {
                        current.children[idx].remove();
                    });
                }
                stackCategories = stackCategories.slice(0, idx);
                stackNames = stackNames.slice(0, idx);
                console.log('stack', stackCategories);
                setCategories(cats);
            });
            
            if (cat.children.length > 0) {
                setCategories(cat.children);
            } else {
                item.className = 'a_hidden';
                inp.value = cat.id;

                let p = document.querySelector('#category_name');
                p.innerHTML = stackNames.join(', ');

                document.querySelectorAll('.drop-cont').forEach((el) => {
                    el.classList.toggle("show");
                });
                a.className = 'a_active';

                getAttributes(cat.id, cat.parentId);
            }
            current.append(item);
        });
        a.addEventListener('mouseout', function (){

        });
        a.append(cat.name);
        parentCat.append(a);
    });
    console.log(cats);
}

async function loadDataCategories(){
    try {
        await fetch(url+'/User/GetCategories', {
            method: "POST"
        }).then((va)=>{
            return va.json();
        }).then((val) => {
            valCategories = val.data;
            let cats = list_to_tree(val.data);
            let btn = document.querySelector('.dropbtn');
            btn.addEventListener('click', function(){
                document.querySelectorAll('.drop-cont').forEach((el) => {
                    el.classList.toggle("show");
                });
            });
            setCategories(cats);
        });

    }catch (e){
        console.log(e.message);
    }
}

let cities = [];

async function loadDataCities() {
    let inp = document.querySelector('#external_id');
    inp.value = new Date().getTime();
    try {
        await fetch(url+'/User/GetCities', {
            method: "POST"
        }).then((va)=>{
            return va.json();
        }).then((val) => {
            console.log(val);
            cities = val.data;
            setCities(val.data);
        });
    }catch (e){
        console.log(e.message);
    }
}

function convertJsonToFormData(data) {
    const formData = new FormData();
    const entries = Object.entries(data);

    for (let i = 0; i < entries.length; i++) {
        // don't try to be smart by replacing it with entries.each, it has drawbacks
        const arKey = entries[i][0]
        let arVal = entries[i][1]
        if (typeof arVal === 'boolean') {
            arVal = arVal === true ? 1 : 0
        }
        if (Array.isArray(arVal)) {
            if ('File' in window && arVal[0] instanceof File) {
                for (let z = 0; z < arVal.length; z++) {
                    formData.append(`${arKey}[]`, arVal[z])
                }

                continue // we don't need to append current element now, as its elements already appended
            } else if (arVal[0] instanceof Object) {
                for (let j = 0; j < arVal.length; j++) {
                    if (arVal[j] instanceof Object) {
                        // if first element is not file, we know its not files array
                        for (const prop in arVal[j]) {
                            if (Object.prototype.hasOwnProperty.call(arVal[j], prop)) {
                                // do stuff
                                if (!isNaN(Date.parse(arVal[j][prop]))) {
                                    // console.log('Valid Date \n')
                                    // (new Date(fromDate)).toUTCString()
                                    formData.append(
                                        `${arKey}[${j}][${prop}]`,
                                        new Date(arVal[j][prop])
                                    )
                                } else {
                                    formData.append(`${arKey}[${j}][${prop}]`, arVal[j][prop])
                                }
                            }
                        }
                    }
                }
                continue
            } else {
                arVal = JSON.stringify(arVal)
            }
        }

        if (arVal === null) {
            continue
        }
        formData.append(arKey, arVal)
    }
    return formData
}

async function uploadFiles(images) {
    let form = new FormData();
    images.forEach((val) => {
        form.append('images', val);
    });
    try {
        const response = await fetch(url + pathUpload, {
            method: "POST",
            body: form
        });
        return await response.json();
    } catch (e) {
        console.log(e.message);
    }
}

async function serializeData(data) {
    let itog = data;
    itog.contact = {
        name: data.name,
        phone: data.phone
    }
    itog.price = {
        value: parseInt(data.price)
    }

    let loc = cities.find((val) => {
        return val.id == data.location;
    });
    itog.location = {
        city_id: parseInt(data.location),
        latitude: loc.latitude,
        longitude: loc.longitude
    }

    itog.images = [];

    itog.attributes = [];
    attributes.forEach((val) => {
        itog.attributes.push({
            code: val.code,
            value: data[val.code]
        });
        delete itog[val.code];
    });

    for (let i = 0; i < document.getElementById('upfile').files.length; i++) {
        itog.images.push(document.getElementById('upfile').files[i]);
    }

    itog.images = await uploadFiles(itog.images);
    itog.images = itog.images.map((val) => {
        return {
            url: val
        }
    });
    itog.category_id = parseInt(itog.category_id);

    delete itog.name;
    delete itog.phone;
    delete itog['file[]'];

    return itog;
}

async function handleDropSubmit() {
    let form = document.forms['parameter'];
    console.log(form);
    let data = Array.from(new FormData(form))
        .reduce((r, [k, v]) => { r[k] = v; return r }, {});

    try {
        for (const [key, value] of Object.entries(data)) {
            if (key == 'File') {
                if (!value.name) return;
            } else if (requiredCodes.indexOf(key) !== -1) {
                return;
            } else {
                if (!value) return;
            }
        }
    } catch (e) {
        console.log(e.message);
    }

    try {
        const response = await fetch(url + path, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(await serializeData(data))
        });
        if (response.ok) {
            let form = document.forms['parameter'];
            form.reset();

            let elAttr = document.querySelector('#category-attr');
            elAttr.innerHTML = '';
            requiredCodes = [];

            let btnFile = document.querySelector('#file_btn');
            btnFile.className = '';
            btnFile.innerHTML = '<p>Фото</p>\n' +
                '                    <section class="right_clip">\n' +
                '                        <img src="/src/assets/images/clip.png" class="clip"/>\n' +
                '                    </section>';
        }
    } catch (e) {
        console.log(e.message);
    }
}

document.querySelector('#exit_btn').addEventListener('click', deleteAccounts);
document.querySelector('#home_add_btn').addEventListener('click', saveAccounts);
document.querySelector('#drop_btn').addEventListener('click', handleDropSubmit);

document.querySelector('.download_btn').addEventListener('click', function () {
    const scrollTarget = document.querySelector('#addvert');

    const offsetPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

getUserAccounts();
createNewAccount();
loadDataCategories();
loadDataCities();

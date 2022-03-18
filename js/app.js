const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, estado, indice = '') => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
            <input type="checkbox" ${estado} data-indice=${indice}>
            <div>${tarefa}</div>
            <input type="button" value="X" data-indice=${indice}>`
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.estado, indice));
}

const cadastrarNovaTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': texto, 'estado': '' })
        setBanco(banco);
        atualizarTela();
        evento.target.value = ''
    }
}
const removeritem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco)
    atualizarTela();
}
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].estado = banco[indice].estado === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}
const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removeritem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', cadastrarNovaTarefa);
document.getElementById('todoList').addEventListener('click', clickItem);
atualizarTela();
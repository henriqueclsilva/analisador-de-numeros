let num = document.querySelector('input#fnum');
let lista = document.querySelector('select#flista');
let res = document.querySelector('div#res');
let valores = [];
const feedbackAdicionado = document.getElementById('feedback-adicionado');
const feedbackErro = document.getElementById('feedback-erro');

num.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionar();
    }
});

function mostrarFeedback(mensagem, sucesso = true) {
    const feedbackDiv = sucesso ? feedbackAdicionado : feedbackErro;
    feedbackDiv.textContent = mensagem;
    feedbackDiv.classList.add('show');
    setTimeout(() => {
        feedbackDiv.classList.remove('show');
        feedbackDiv.textContent = '';
    }, 2000);
}

function isNumero(n) {
    return !isNaN(n) && Number(n) >= 1 && Number(n) <= 100;
}

function inLista(n, l) {
    return l.indexOf(Number(n)) !== -1;
}

function limparLista() {
    if (valores.length > 0) {
        valores = [];
        lista.innerHTML = '';
        res.innerHTML = '';
        res.style.display = 'block';
    } else {
        alert('A lista já está vazia.');
    }
}

function removerSelecionado() {
    if (lista.selectedIndex !== -1) {
        valores.splice(lista.selectedIndex, 1);
        lista.removeChild(lista.options[lista.selectedIndex]);
        res.innerHTML = '';
        res.style.display = 'block';
    } else {
        alert('Selecione um valor na lista para remover.');
    }
}

function adicionar() {
    const valorDigitado = num.value.trim();

    if (!valorDigitado) {
        mostrarFeedback('[ERRO] Por favor, digite um número.', false);
    } else if (!isNumero(valorDigitado)) {
        mostrarFeedback('[ERRO] Valor inválido. Digite um número entre 1 e 100.', false);
    } else if (inLista(valorDigitado, valores)) {
        mostrarFeedback(`[ERRO] O valor ${valorDigitado} já foi inserido na lista!`, false);
    } else {
        valores.push(Number(valorDigitado));
        let item = document.createElement('option');
        item.text = valorDigitado;
        lista.appendChild(item);
        res.innerHTML = '';
        res.style.display = 'block';
        mostrarFeedback(`Valor ${valorDigitado} adicionado!`);
    }
    num.value = '';
    num.focus();
}

function finalizar() {
    if (valores.length === 0) {
        alert('Adicione valores antes de finalizar!');
        res.style.display = 'none';
    } else {
        let tot = valores.length;
        let maior = valores[0];
        let menor = valores[0];
        let soma = 0;
        let media = 0;

        for (let pos in valores) {
            soma += valores[pos];
            if (valores[pos] > maior) maior = valores[pos];
            if (valores[pos] < menor) menor = valores[pos];
        }
        media = soma / tot;
        res.innerHTML = '';
        res.style.display = 'grid';

        let titulo = document.createElement('h3');
        titulo.textContent = 'Resultados da Análise';
        res.appendChild(titulo);

        function criarItemResultado(rotulo, valor) {
            let rotuloElemento = document.createElement('p');
            rotuloElemento.textContent = rotulo + ':';
            res.appendChild(rotuloElemento);

            let valorElemento = document.createElement('p');
            valorElemento.textContent = valor;
            res.appendChild(valorElemento);
        }

        criarItemResultado('Total de números', tot);
        criarItemResultado('Menor valor', menor);
        criarItemResultado('Maior valor', maior);
        criarItemResultado('Soma dos valores', soma);
        criarItemResultado('Média dos valores', media.toFixed(2));
    }
}
let num = document.querySelector('input#fnum')
let lista = document.querySelector('select#flista')
let res = document.querySelector('div#res')
let valores = []

num.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionar();
    }
});

function isNumero(n) {
    if (!isNaN(n) && Number(n) >= 1 && Number(n) <= 100) {
        return true;
    } else {
        return false;
    }
}

function inLista(n, l) {
    if (l.indexOf(Number(n)) != -1) {
        return true
    } else {
        return false
    }
}

function limparLista() {
    if (valores.length > 0) {
        valores = [];
        lista.innerHTML = '';
        res.innerHTML = '';
    } else {
        window.alert('A lista já está vazia.');
    }
}

function removerSelecionado() {
    if (lista.selectedIndex != -1) {
        valores.splice(lista.selectedIndex, 1);
        lista.removeChild(lista.options[lista.selectedIndex]);
        res.innerHTML = '';
    } else {
        window.alert('Selecione um valor na lista para remover.');
    }
}

function adicionar() {
    const valorDigitado = num.value.trim();

    if (!valorDigitado) {
        window.alert('[ERRO] Por favor, digite um número.');
    } else if (!isNumero(valorDigitado)) {
        window.alert('[ERRO] Valor inválido. Digite um número entre 1 e 100.');
    } else if (inLista(valorDigitado, valores)) {
        window.alert(`[ERRO] O valor ${valorDigitado} já foi inserido na lista!`);
    } else {
        valores.push(Number(valorDigitado));
        let item = document.createElement('option');
        item.text = `Valor ${valorDigitado} adicionado`;
        lista.appendChild(item);
        res.innerHTML = '';

        let feedbackDiv = document.getElementById('feedback-adicionado');
        feedbackDiv.textContent = `Valor ${valorDigitado} adicionado!`;
        feedbackDiv.style.opacity = 1;
        setTimeout(() => {
            feedbackDiv.style.opacity = 0;
            feedbackDiv.textContent = '';
        }, 2000);
    }
    num.value = '';
    num.focus();
}

function finalizar() {
    if (valores.length == 0) {
        window.alert('Adicione valores antes de finalizar!')
    } else {
        let tot = valores.length
        let maior = valores[0]
        let menor = valores[0]
        let soma = 0
        let media = 0

        for (let pos in valores) {
            soma += valores[pos]
            if (valores[pos] > maior)
                maior = valores[pos]
            if (valores[pos] < menor)
                menor = valores[pos]
        }
        media = soma / tot
        res.innerHTML = ''

        let p1 = document.createElement('p');
        p1.textContent = `Ao todo, temos ${tot} números cadastrados.`;
        res.appendChild(p1);

        let p2 = document.createElement('p');
        p2.textContent = `O menor valor informado foi ${menor}`;
        res.appendChild(p2);

        let p3 = document.createElement('p');
        p3.textContent = `O maior valor informado foi ${maior}`;
        res.appendChild(p3);

        let p4 = document.createElement('p');
        p4.textContent = `Somando todos os valores informados, temos ${soma}`;
        res.appendChild(p4);

        let p5 = document.createElement('p');
        p5.textContent = `A média dos valores informados é ${media}`;
        res.appendChild(p5);
    }
}
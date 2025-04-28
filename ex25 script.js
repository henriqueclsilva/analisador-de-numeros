let num = document.querySelector('input#fnum')
let lista = document.querySelector('select#flista')
let res = document.querySelector('div#res')
let valores = []

function isNumero(n) {
    if(Number(n) >= 1 && Number(n) <= 100) {
        return true
    }   else {
        return false
    }
}

function inLista(n, l) {
    if (l.indexOf(Number(n)) != -1) {
        return true
    } else {
        return false
    }
}

function adicionar() {
    if (isNumero(num.value) && !inLista(num.value , valores)) {
        valores.push(Number(num.value))
        let item = document.createElement('option')
        item.text = `Valor ${num.value} adicionado`
        lista.appendChild(item)
        res.innerHTML = ''
    } else {
        window.alert('[ERRO] Valor inválido ou já inserido na lista!')
    }
    num.value = ''
    num.focus()
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
        res.innerHTML = '' // Limpar o conteúdo anterior

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
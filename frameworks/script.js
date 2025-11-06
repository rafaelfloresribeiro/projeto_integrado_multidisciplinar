const conta = {
    nome: 'João Silva',
    saldo: 5000.00,
    historicoTransacoes: []
}

document.addEventListener('DOMContentLoaded', function() {
    atualizarSaldo()
    atualizarHistorico()
})

function atualizarSaldo() {
    const saldoElement = document.getElementById('contaSaldo')
    saldoElement.textContent = conta.saldo.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

function gerarCodigoUnico() {
    const now = new Date()
    const timestamp = now.getTime()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    return `TRF-${timestamp}-${random}`
}

function validarSaldo(valor) {
    if (valor <= 0) {
        return { valido: false, erro: 'O valor deve ser maior que zero.' }
    }
    
    if (conta.saldo < valor) {
        return { 
            valido: false, 
            erro: `Saldo insuficiente. Disponível: R$ ${conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
        }
    }
    
    return { valido: true }
}

function registrarTransacao(valor, contaDestino) {
    const transacao = {
        codigo: gerarCodigoUnico(),
        data: new Date().toLocaleString('pt-BR'),
        valor: valor,
        destino: contaDestino,
        tipo: 'Transferência'
    }
    
    conta.saldo -= valor
    
    conta.historicoTransacoes.unshift(transacao)
    
    return transacao
}

function atualizarHistorico() {
    const historicoElement = document.getElementById('historicoTransacoes')
    
    if (conta.historicoTransacoes.length === 0) {
        historicoElement.innerHTML = '<p class="text-muted mb-0">Nenhuma transação realizada.</p>'
        return
    }
    
    let html = ''
    conta.historicoTransacoes.forEach(transacao => {
        html += `
            <div class="transaction-item fade-in">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <strong class="text-primary">${transacao.tipo}</strong>
                            <span class="text-danger fw-bold">- R$ ${transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <p class="mb-1">Para: ${transacao.destino}</p>
                        <small class="transaction-code d-block mb-1">Código: ${transacao.codigo}</small>
                        <small class="text-muted">Data: ${transacao.data}</small>
                    </div>
                </div>
            </div>
        `
    })
    
    historicoElement.innerHTML = html
}

function processarTransferencia(valor, contaDestino) {
    const validacao = validarSaldo(valor)
    if (!validacao.valido) {
        return {
            sucesso: false,
            erro: validacao.erro
        }
    }
    
    const transacao = registrarTransacao(valor, contaDestino)
    
    return {
        sucesso: true,
        codigoTransacao: transacao.codigo,
        dataTransacao: transacao.data,
        valor: valor,
        saldoAtual: conta.saldo,
        mensagem: 'Transferência realizada com sucesso!'
    }
}

document.getElementById('transferenciaForm').addEventListener('submit', function(e) {
    e.preventDefault()
    
    const valorInput = document.getElementById('valorTransferencia')
    const destinoInput = document.getElementById('contaDestino')
    
    const valor = parseFloat(valorInput.value)
    const contaDestino = destinoInput.value.trim()
    
    if (!contaDestino) {
        mostrarResultado(false, 'Por favor, informe o nome do destinatário.')
        return
    }
    
    const resultado = processarTransferencia(valor, contaDestino)
    
    if (resultado.sucesso) {
        mostrarResultado(true, `
            <h4 class="alert-heading">Transferência Concluída!</h4>
            <p class="mb-2"><strong>Código:</strong> ${resultado.codigoTransacao}</p>
            <p class="mb-2"><strong>Destinatário:</strong> ${contaDestino}</p>
            <p class="mb-2"><strong>Valor:</strong> R$ ${resultado.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p class="mb-2"><strong>Data:</strong> ${resultado.dataTransacao}</p>
            <hr>
            <p class="mb-0"><strong>Novo Saldo:</strong> R$ ${resultado.saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        `)
        
        atualizarSaldo()
        atualizarHistorico()
        
        valorInput.value = ''
        destinoInput.value = ''
    } else {
        mostrarResultado(false, resultado.erro)
    }
})

function mostrarResultado(sucesso, mensagem) {
    const resultadoElement = document.getElementById('resultadoTransferencia')
    
    resultadoElement.className = sucesso ? 'alert alert-success fade-in' : 'alert alert-danger fade-in'
    resultadoElement.innerHTML = mensagem
    resultadoElement.classList.remove('d-none')
    
    resultadoElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
}
const transacoes = [
    { id: 1, data: '15/01/2024', descricao: 'Compra Supermercado', valor: -350.75 },
    { id: 2, data: '14/01/2024', descricao: 'Depósito Salário', valor: 6500.00 },
    { id: 3, data: '13/01/2024', descricao: 'Transferência PIX', valor: -1500.00 },
    { id: 4, data: '12/01/2024', descricao: 'Compra E-commerce', valor: -289.90 },
    { id: 5, data: '11/01/2024', descricao: 'Investimento Ações', valor: -5200.00 },
    { id: 6, data: '10/01/2024', descricao: 'Restaurante', valor: -120.50 },
    { id: 7, data: '09/01/2024', descricao: 'Transferência Recebida', valor: 7500.00 },
    { id: 8, data: '08/01/2024', descricao: 'Manutenção Veículo', valor: -850.00 },
    { id: 9, data: '07/01/2024', descricao: 'Compra Eletrônicos', valor: -3200.00 },
    { id: 10, data: '06/01/2024', descricao: 'Consulta Médica', valor: -280.00 },
    { id: 11, data: '05/01/2024', descricao: 'Investimento CDB', valor: -3000.00 },
    { id: 12, data: '04/01/2024', descricao: 'Bonus Trabalho', valor: 1200.00 },
    { id: 13, data: '03/01/2024', descricao: 'Compra Imóvel', valor: -25000.00 },
    { id: 14, data: '02/01/2024', descricao: 'Aluguel', valor: -1800.00 },
    { id: 15, data: '01/01/2024', descricao: 'Transferência Família', valor: 5500.00 }
]

function carregarTransacoes() {
    const lista = document.getElementById('lista-transacoes')
    
    transacoes.forEach(transacao => {
        const valorAbsoluto = Math.abs(transacao.valor)
        const isAlta = valorAbsoluto >= 5000
        const isEntrada = transacao.valor > 0
        
        const item = document.createElement('div')
        item.className = `list-group-item ${isAlta ? 'transacao-alta' : ''}`
        
        item.innerHTML = `
            <div class="row align-items-center">
                <div class="col-8">
                    <div class="fw-bold">${transacao.descricao}</div>
                    <small class="text-muted">${transacao.data}</small>
                </div>
                <div class="col-4 text-end">
                    <span class="${isEntrada ? 'text-success' : 'text-danger'} fw-bold">
                        ${isEntrada ? '+' : '-'} R$ ${valorAbsoluto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </span>
                </div>
            </div>
            ${isAlta ? '<small class="text-danger mt-1 d-block"><strong>VALOR ELEVADO</strong></small>' : ''}
        `
        
        lista.appendChild(item)
    })
}

document.addEventListener('DOMContentLoaded', carregarTransacoes)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formCadastro')
    const cpfInput = document.getElementById('cpf')
    const telefoneInput = document.getElementById('telefone')

    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        }
        e.target.value = value
    })

    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2')
                value = value.replace(/(\d{4})(\d)/, '$1-$2')
            } else {
                value = value.replace(/(\d{2})(\d)/, '($1) $2')
                value = value.replace(/(\d{5})(\d)/, '$1-$2')
            }
        }
        e.target.value = value
    })

    function validarCPF(cpf) {
        const cpfLimpo = cpf.replace(/\D/g, '')
        return cpfLimpo.length === 11
    }

    function validarNascimento(data) {
        const nascimento = new Date(data)
        const hoje = new Date()
        const idade = hoje.getFullYear() - nascimento.getFullYear()
        const mes = hoje.getMonth() - nascimento.getMonth()
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            return idade - 1 >= 18
        }
        return idade >= 18
    }

    function validarTelefone(telefone) {
        const telefoneLimpo = telefone.replace(/\D/g, '')
        return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11
    }

    document.getElementById('btnCadastrar').addEventListener('click', function(e) {
        e.preventDefault()
        
        const cpf = cpfInput.value
        const nascimento = document.getElementById('nascimento').value
        const telefone = telefoneInput.value
        
        let valido = true

        if (!validarCPF(cpf)) {
            cpfInput.classList.add('is-invalid')
            document.getElementById('cpfError').textContent = 'CPF deve conter 11 dígitos'
            valido = false
        } else {
            cpfInput.classList.remove('is-invalid')
            cpfInput.classList.add('is-valid')
        }

        if (!nascimento || !validarNascimento(nascimento)) {
            document.getElementById('nascimento').classList.add('is-invalid')
            document.getElementById('nascimentoError').textContent = 'É necessário ter pelo menos 18 anos'
            valido = false
        } else {
            document.getElementById('nascimento').classList.remove('is-invalid')
            document.getElementById('nascimento').classList.add('is-valid')
        }

        if (!validarTelefone(telefone)) {
            telefoneInput.classList.add('is-invalid')
            document.getElementById('telefoneError').textContent = 'Telefone deve conter 10 ou 11 dígitos'
            valido = false
        } else {
            telefoneInput.classList.remove('is-invalid')
            telefoneInput.classList.add('is-valid')
        }

        if (valido) {
            alert('Cadastro realizado com sucesso!')
            form.reset()
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid')
            })
        }
    })

})
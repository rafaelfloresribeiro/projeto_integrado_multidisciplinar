DELIMITER //

CREATE PROCEDURE CalcularSaldoEListarTransacoes(
    IN p_conta_id INT,
    IN p_data_inicio DATE,
    IN p_data_fim DATE
)
BEGIN
    -- Calcular saldo da conta no período
    SELECT 
        SUM(CASE 
            WHEN tipo_transacao = 'ENTRADA' THEN valor 
            ELSE -valor 
        END) AS saldo_periodo
    FROM transacoes 
    WHERE conta_id = p_conta_id 
        AND data_transacao BETWEEN p_data_inicio AND p_data_fim;

    -- Listar 10 últimas transações do período
    SELECT 
        id_transacao,
        data_transacao,
        descricao,
        tipo_transacao,
        valor,
        categoria
    FROM transacoes 
    WHERE conta_id = p_conta_id 
        AND data_transacao BETWEEN p_data_inicio AND p_data_fim
    ORDER BY data_transacao DESC, id_transacao DESC
    LIMIT 10;
END //

DELIMITER ;
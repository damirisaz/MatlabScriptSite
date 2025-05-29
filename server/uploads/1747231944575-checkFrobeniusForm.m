function isFrobenius = checkFrobeniusForm(A)
    % Проверка, является ли матрица A матрицей Фробениуса
    % Вход: A - квадратная матрица
    % Выход: isFrobenius - логическое значение (true, если матрица является матрицей Фробениуса)
    
    % Проверка на квадратность матрицы
    [n, m] = size(A);
    if n ~= m
        error('Матрица должна быть квадратной');
    end
    
    % Изначально предполагаем, что матрица Фробениуса
    isFrobenius = true;
    
    % Проверка на верхнюю треугольную форму
    for i = 2:n
        for j = 1:i-1
            if A(i,j) ~= 0
                isFrobenius = false;
                return;
            end
        end
    end
end

function isFrobenius = checkFrobeniusForm(A)
    % Проверяет, является ли матрица A формой Фробениуса
    % Вход: A - квадратная матрица
    % Выход: isFrobenius - логическое значение (true, если матрица в форме Фробениуса)
    
    % Проверка на квадратность матрицы
    [n, m] = size(A);
    if n ~= m
        error('Матрица должна быть квадратной');
    end
    
    % Инициализация результата
    isFrobenius = true;
    
    % Проверка 1: Все элементы под главной диагональю равны 0 или 1
    for i = 2:n
        for j = 1:i-1
            if A(i,j) ~= 0 && A(i,j) ~= 1
                isFrobenius = false;
                break;
            end
        end
        if ~isFrobenius
            break;
        end
    end
    
    % Проверка 2: Под главной диагональю ровно один ненулевой элемент в каждом столбце
    if isFrobenius
        for j = 1:n-1
            % Считаем количество единиц в столбце j ниже главной диагонали
            onesCount = sum(A(j+1:end,j) == 1);
            if onesCount ~= 1
                isFrobenius = false;
                break;
            end
        end
    end
    
    % Проверка 3: В последнем столбце - коэффициенты полинома (произвольные числа)
    % (Эта проверка уже подразумевается предыдущими)
    
    % Проверка 4: Над главной диагональю только последний столбец может иметь ненулевые элементы
    if isFrobenius
        for i = 1:n-1
            for j = i+1:n-1
                if A(i,j) ~= 0
                    isFrobenius = false;
                    break;
                end
            end
            if ~isFrobenius
                break;
            end
        end
    end
    
end
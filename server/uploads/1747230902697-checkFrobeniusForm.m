function isFrobenius = checkFrobeniusForm(A)
    % ���������, �������� �� ������� A ������ ����������
    % ����: A - ���������� �������
    % �����: isFrobenius - ���������� �������� (true, ���� ������� � ����� ����������)
    
    % �������� �� ������������ �������
    [n, m] = size(A);
    if n ~= m
        error('������� ������ ���� ����������');
    end
    
    % ������������� ����������
    isFrobenius = true;
    
    % �������� 1: ��� �������� ��� ������� ���������� ����� 0 ��� 1
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
    
    % �������� 2: ��� ������� ���������� ����� ���� ��������� ������� � ������ �������
    if isFrobenius
        for j = 1:n-1
            % ������� ���������� ������ � ������� j ���� ������� ���������
            onesCount = sum(A(j+1:end,j) == 1);
            if onesCount ~= 1
                isFrobenius = false;
                break;
            end
        end
    end
    
    % �������� 3: � ��������� ������� - ������������ �������� (������������ �����)
    % (��� �������� ��� ��������������� �����������)
    
    % �������� 4: ��� ������� ���������� ������ ��������� ������� ����� ����� ��������� ��������
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
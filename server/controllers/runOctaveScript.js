import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export const runOctaveScript = (scriptPath, inputTxtPath) => {
  return new Promise((resolve, reject) => {
    const raw = fs.readFileSync(inputTxtPath, 'utf-8').trim();

    let parsedInput;
    if (raw.includes('\n')) {
      const matrix = raw
        .split('\n')
        .map(row => row.trim().split(/\s+/).map(Number));
      parsedInput = '[' + matrix.map(r => r.join(' ')).join('; ') + ']';
    } else if (raw.split(/\s+/).length > 1) {
      parsedInput = '[' + raw.split(/\s+/).map(Number).join(' ') + ']';
    } else {
      parsedInput = raw;
    }

    // Получаем имя функции из оригинального имени файла
    const originalFilename = path.basename(scriptPath); // e.g., 1747231944575-checkFrobeniusForm.m
    const functionName = originalFilename.split('-').slice(1).join('-').replace('.m', '');

    // Путь к временному файлу с правильным именем
    const tempFunctionPath = path.join(path.dirname(scriptPath), `${functionName}.m`);
    fs.copyFileSync(scriptPath, tempFunctionPath);

    // Пишем временный вызывающий скрипт
    const tempExecPath = path.join(path.dirname(scriptPath), 'temp_exec.m');
    const callCode = `
      addpath('${path.dirname(scriptPath)}');
      input = ${parsedInput};
      result = ${functionName}(input);
      if result
        disp(1)
      else
        disp(0)
      end
    `;
    fs.writeFileSync(tempExecPath, callCode);

    // Запуск
    exec(`octave --silent ${tempExecPath}`, (err, stdout, stderr) => {
      fs.unlinkSync(tempExecPath);
      fs.unlinkSync(tempFunctionPath); // удаляем временный .m с правильным именем

      if (err) return reject(stderr || err);

      const output = stdout.trim();
      resolve(output.endsWith('1'));
    });
  });
};

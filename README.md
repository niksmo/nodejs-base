# Base Node.js

Версия Node.js: 18.16.0

Используемый тип модулей: ECMAScript

## 3-calc

Программа разработана с целью тренировки навыков разделения приложения на модули

Работа с программой:

Перейдите в папку 3-calc и запустите приложение, передав 3 переменные:

```
cd 3-calc
node index.js 2 2 add
```

- первая переменная `a`
- вторая переменная `b`
- третья переменная оператор `add`, `multiply`, `subtruct`, `split`

Вышеуказанный пример эквивалентен `2 + 2`

## 3-calc-event

Тот же 3-calc, но разработанный с использованием объекта `EventEmitter` из стандартной библиотеки

Работа с программой:

Перейдите в папку 3-calc-event и запустите приложение, передав 3 переменные:

```
cd 3-cacl-event
node index.js 2 2 add
```

## 4-timer

Программа разработана с целью тренировки навыков работы с таймерами

Работа с программой:

Перейдите в папку 4-calc и запустите приложение, передав от 1 до 3 аргументов:

```
cd 4-timer
node index.js 0h 1m 30s
```

Важно указать корректный тип передаваемого значения:

- h (часы)
- m (минуты)
- s (секунды)

Последовательность не имеет значения, такая команда будет работать:

```
node index.js 30s 0h 1m
```

## 5-multithreads

Программа разработана с целью тренировки навыков разделения вычислений на параллельные потоки внутри одного процесса

Формат ввода: массив длинной 9\*10^6 с числами не превышающими 10^9 по модулю

Проводимые вычисления:

1. Каждое значение умножается на 999999 и добавляется в дополнительные 3 массива.
2. Если значение делиться на 3 без остатка, то счетчик инкрементируется.

Результатом работы функции является посчитанное количество входных значений делящихся на 3 без остатка.

Работа с программой:

Перейдите в 5-multithreads и сгенерируйте файл с данными для массива, в директории с программой появится файл `big-array.txt`:

```
cd 5-multithreads
node get-data.js
```

Выполните запуск программы `app.js`:

```
node app.js
```

В терминале будет выведен результат работы вычислений:

- `getTotalSync` в одном потоке
- `getTotalInThreads` в количестве потоков поддерживаемых вашим процессором

По окончанию работы с программой рекомендуется удалить файл `big-array.txt` из-за большого объёма.

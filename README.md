# Base NodeJs

## 3-calc

Программа для тренировки навыков разделения приложения на модули

Используемый тип модулей: ECMAScript

Работа с программой:

Перейдите в папку 3-calc и запустите `nodejs`, передав 3 переменные:

```
node index.js 2 2 add
```

- первая переменная `a`
- вторая переменная `b`
- третья переменная оператор `add`, `multiply`, `subtruct`, `split`

Вышеуказанный пример эквивалентен `2 + 2`

## 3-calc-event

Тот же 3-calc, но разработанный с использованием объекта `EventEmitter`

Работа с программой:

Перейдите в папку 3-calc-event и запустите `nodejs`, передав 3 переменные:

```
node index.js 2 2 add
```

## 4-timer

Программа для тренировки навыков работы с таймерами

Работа с программой:

Перейдите в папку 4-calc и запустите `nodejs`, передава от 1 до 3 аргументов:

```
node index.js 0h 1m 30s
```

Важно указать корректный тип передаваемого значения:

- h (часы)
- m (минуты)
- s (секунды)

Последовательность не имеет значения, такая последовательно будет работать:

```
node index.js 30s 0h 1m
```

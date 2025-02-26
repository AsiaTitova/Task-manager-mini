# Task manager mini

Приложение для постановлки, контроля и выполнения задач

## Стек технологий

Фреймворк: Next.js
Основной язык: TS
Управления состоянием: Zustand
Для работы с формами используются библиотеки React-hooks-forms и zod для валидации
Архитектура - FSD[https://feature-sliced.design/ru/docs]


## Node v

-v 20.14.0

## Запуск проекта

Для начала необходима установка зависимостей проекта

```bash
yarn install
```

Для того, чтобы запустить проект локально, необходимо выполнить следующие команду

```bash
yarn run dev
```

Для того, чтобы собрать проект, необходимо выполнить следующую команду

```bash
yarn run build
```


Также в проекте присуствуют дополнительные команды:

```bash
"start": "Эта команда используется для запуска вашего Next.js приложения в режиме production (продакшн). next start запускает сервер Next.js, который обрабатывает ваше приложение и предоставляет его клиентам через HTTP. Обычно используется для запуска приложения на сервере в production окружении"
"lint": "Данная команда используется для запуска инструмента линтинга в проекте Next.js. next lint включает встроенный линтер, который анализирует ваш код на предмет синтаксических ошибок, стилевых конвенций и потенциальных проблем. Линтер помогает поддерживать качество кода и согласованность стиля в проекте"
"lint:fix": "Эта команда аналогична предыдущей ("lint"), но с опцией --fix. next lint --fix пытается автоматически исправить обнаруженные линтером проблемы, которые могут быть автоматически исправлены. Например, это может быть исправление отступов, добавление пропущенных точек с запятой и т.д."
```

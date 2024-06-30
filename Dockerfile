# Указываем базовый образ
FROM node:18-alpine as base

WORKDIR /app

RUN npm install -g pnpm

# Копируем только необходимые файлы для установки зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем клиентские зависимости
WORKDIR /app/client
COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install

# Копируем серверные зависимости
WORKDIR /app/server
COPY server/package.json server/pnpm-lock.yaml ./
RUN pnpm install

# Создаем финальный образ для приложения
FROM node:18-alpine

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем установленные зависимости из предыдущего этапа
COPY --from=base /app /app

# Копируем весь проект в контейнер
COPY . .

# Перейдем в папку client и собираем клиент
WORKDIR /app/client
RUN pnpm build

# Возвращаемся в корневую директорию
WORKDIR /app

# Указываем порт, который будет слушать контейнер
EXPOSE 5000

# Запускаем приложение
CMD ["pnpm", "start"]




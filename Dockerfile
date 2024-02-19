# Образ линукс Alpine с версией Node 16
FROM node:16.13-alpine

# Указываю рабочую директорию
WORKDIR /app

# Копирую package.json & package-lock.json внутрь контейнера
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирую всё остальное приложение в контейнер
COPY . .

# Устанавливаю Призму ORM
RUN npm install -g prisma

# Генерируем Prisma-client
RUN prisma generate

# Копирую Prisma schema 
COPY prisma/schema.prisma ./prisma/

# Открываю ПОРТ
EXPOSE 3000

# Запускаю сервер внутри контейнера
CMD ["npm", "start"]

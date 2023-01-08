# Gunakan image dari docker community yang sudah ada, disini menggunakan alpine-linux yang sudah terinstal node versi 16.17
FROM node:16.17-alpine as node
# Jalankan perintah untuk update package list
RUN apk update && \
    apk add --no-cache curl

# Deskripsikan direktori project di dalam container docker nanti
WORKDIR /app
# Copy semua file project ke dalam direktori /app
COPY . .
# Jalankan perintah untuk install & build next.js
RUN npm install
RUN npm run build

# Definikan port yang akan digunakan dalam container docker
EXPOSE 3000
# Jalankan npm run start di terminal
CMD ["npm", "start"]
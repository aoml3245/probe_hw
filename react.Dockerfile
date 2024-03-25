# DockerFile
# DockerHub에서 버전에 맞는 이미지를 찾아주자
FROM node

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]

# Viagem 365 - Birdy

*O projeto tem como objetivo planejar, registrar e explorar destinos turísticos, naturais e sustentáveis, com experiências positivas, facilidade e segurança. O nome 'Birdy' foi escolhido pensando na sensação de liberdade e aventura. 
O aplicativo permitirá aos usuários explorar novos destinos e experiências, desfrutando da beleza e diversidade da natureza de forma leve, como um passarinho.🐦*

### 🛠️ Foi desenvolvido com:
- node.js
- sequelize
- express
- pg PostgreSQL
- cors
- dotenv

### 🔒 Para autenticação e criptografia de senhas:
- jsonwebtoken
- bcrypt

### ✅ Para validações:
- cpf-check

### 🗺️ Para requisições geográficas:
- axios
- nominatim-geocoder

### 🩺 Para testes e documentação:
- swagger-autogen
- swagger-jsdoc

# 🎬 Para rodar o repositório:

### 🐑 Clone o repositório

### 🗃️ Crie o banco de dados (o nome do banco de dados está configurado como 'viagem365')

### 🔑 Configure o arquivo .env_example com as informações locais, alterando para o nome .env


### 📦 Instale as dependências:
`npm install`


### 🏗️ Gere as estruturas das tabelas rodando a migration:
`sequelize db:migrate`


### 🎲 Alimente com os primeiros cadastros rodando o seed:
`npx sequelize-cli db:seed:all` 


## 📽️ Para rodar o repositório em ambiente local:
`npm run swagger`

`npm run start`


## 🛝 Acesse pelo navegador:
http://localhost:3000/docs/

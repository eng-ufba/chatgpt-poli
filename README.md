# GUIA PARA RODAR O CHATGPT POLI 

Este documento serve como um guia para o trabalho de conclusão de curso na modalidade software no curso de engenharia de controle e automação cursado na Universidade Federal da Bahia (UFBA). O guia fornece instruções passo a passo para iniciantes que desejam executar o projeto "chatgpt-poli", que consiste em um frontend desenvolvido em React e um backend em Python com Flask. É fundamental seguir todas as etapas com atenção para assegurar o correto funcionamento do projeto.

## Índice

1. [Pré-requisitos](#pré-requisitos)
   - 1.1 [Baixaindo VSCode](#vscode)
   - 1.2 [Baixaindo Python 3.11.0](#python-3110)
   - 1.3 [Baixaindo Node.js 18.12.1](#nodejs-18121)

2. [Passo 1: Clonar o Projeto](#passo-1-clonar-o-projeto)
   - 2.1 [Abrir o VSCode](#abrir-o-vscode)
   - 2.2 [Abrir o Terminal](#abrir-o-terminal)
   - 2.3 [Clonar o Projeto do GitHub](#clonar-o-projeto-do-github)

3. [Passo 2: Configurar o Backend](#passo-2-configurar-o-backend)
   - 3.1 [Acessar o Site da OpenAI](#acessar-o-site-da-openai)
   - 3.2 [Criar uma Conta ou Fazer Login](#criar-uma-conta-ou-fazer-login)
   - 3.3 [Gerar uma Chave de API](#gerar-uma-chave-de-api)
   - 3.4 [Copiar a Chave de API](#copiar-a-chave-de-api)
   - 3.5 [Abrir o Terminal do VSCode](#abrir-o-terminal-do-vscode)
   - 3.6 [Navegar até a Pasta do Backend](#navegar-até-a-pasta-do-backend)
   - 3.7 [Criar o Arquivo .env](#criar-o-arquivo-env)
   - 3.8 [Abrir o Arquivo .env](#abrir-o-arquivo-env)

4. [Passo 3: Rodar o Backend](#passo-3-rodar-o-backend)

5. [Passo 4: Rodar o Frontend](#passo-4-rodar-o-frontend)

6. [Passo 5: Acessar a Aplicação](#passo-5-acessar-a-aplicação)

<hr />

### Passo 1: Clonar o Projeto

1. Abra o VSCode após a instalação.

2. Abra o terminal no VSCode. Para fazer isso, clique em "Terminal" no menu superior e selecione "New Terminal."

3. No terminal, cole o seguinte comando para clonar o projeto a partir do repositório no GitHub:

   ```bash
   git clone https://github.com/eng-ufba/chatgpt-poli.git
   ```

### Passo 2: Configurar o Backend

Antes de rodar o backend, você precisa configurar a variável de ambiente `OPENAI_API_KEY`.

1. Acesse o [site da OpenAI](https://platform.openai.com/).

2. Crie uma conta ou faça login em sua conta existente.

3. Navegue para a seção de chaves de API em [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

4. Clique em "Create new secret key" para gerar uma nova chave de API.

5. Copie a chave API gerada.

6. Abra o terminal do VSCode.

7. Navegue até a pasta do backend usando o comando `cd`:

   ```bash
   cd chatgpt-poli/backend
   ```

8. Crie um arquivo `.env` no diretório do backend:

   ```bash
   touch .env
   ```

9. Abra o arquivo `.env` com um editor de texto, como o VSCode:

   ```bash
   code .env
   ```

10. Cole a chave API copiada no arquivo `.env` no seguinte formato:

   ```bash
   OPENAI_API_KEY=sua-chave-aqui
   ```

### Passo 3: Rodar o Backend

Agora você pode rodar o backend.

1. No terminal do VSCode, navegue para a pasta raiz do projeto:

   ```bash
   cd ..
   ```

2. Volte para a pasta do backend:

   ```bash
   cd backend
   ```

3. Instale as dependências do Python listadas no arquivo `requirements.txt` com o comando:

   ```bash
   pip install -r requirements.txt
   ```

4. Após a instalação bem-sucedida das dependências, inicie o servidor Flask com o seguinte comando:

   ```bash
   python app.py
   ```

### Passo 4: Rodar o Frontend

Agora, vamos configurar e executar o frontend do projeto.

1. No terminal do VSCode, volte à pasta raiz do projeto:

   ```bash
   cd ..
   ```

2. Navegue para a pasta do frontend:

   ```bash
   cd frontend
   ```

3. Instale as dependências do Node.js executando o comando:

   ```bash
   npm ci
   ```

4. Após a instalação das dependências do frontend, inicie o servidor de desenvolvimento com o seguinte comando:

   ```bash
   npm start
   ```

### Passo 5: Acessar a Aplicação

Abra o seu navegador da web e digite o seguinte endereço na barra de endereços:

```
http://localhost:3000/chatgpt-poli
```

Agora, você deve conseguir acessar a aplicação que combina o frontend React e o backend Python com Flask.

Parabéns! Você conseguiu rodar o projeto com sucesso. Se você tiver alguma dúvida ou encontrar algum problema durante o processo, sinta-se à vontade para perguntar ou procurar ajuda em recursos de programação online.
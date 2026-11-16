<div align="center">
<img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="300"></a>

# 🧭 Compass Web

![Status](https://img.shields.io/badge/Status-Concluido-green?logo=github&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue.svg?logo=docker&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-Compass-grass?logo=mongodb&logoColor=white&style=for-the-badge)
![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg?logo=mozilla&style=for-the-badge)

**MongoDB Compass direto no navegador.**
<br>
Uma versão web do MongoDB Compass, containerizada e pronta para deploy, permitindo gerenciar seus bancos de dados MongoDB de qualquer lugar.

[Reportar Bug](https://github.com/seu-usuario/compass-web/issues) • [Solicitar Feature](https://github.com/seu-usuario/compass-web/issues)

</div>

---

## 📑 Índice

* [📸 Sobre o Projeto](#-sobre-o-projeto)
  * [Principais Funcionalidades](#principais-funcionalidades)
* [🛠️ Tecnologias Utilizadas](#tecnologias)
* [💻 Pré-requisitos](#-pré-requisitos)
* [🚀 Como Rodar o Projeto Localmente](#-como-rodar-o-projeto-localmente)
* [🐳 Rodando com Docker](#-rodando-com-docker)
* [🚀 Deploy em Produção](#-deploy-em-produção)
  * [Discloud (Recomendado)](#discloud-recomendado)
* [❓ FAQ & Solução de Problemas](#-perguntas-frequentes-faq--solução-de-problemas)
* [📂 Estrutura do Projeto](#-estrutura-do-projeto)
* [🤝 Como Contribuir](#-como-contribuir)
* [⚖️ Licença](#licenca)
* [🤙 Créditos](#-créditos)

---

## 📸 Sobre o Projeto

O **Compass Web** é uma implementação containerizada do MongoDB Compass para acesso via navegador. Baseado no projeto [compass-web](https://github.com/haohanyang/compass-web) de haohanyang, esta versão adiciona um wrapper Node.js personalizado e Dockerfile otimizado para facilitar o deploy em ambientes de produção.

### Principais Funcionalidades
* **🌐 Acesso via Navegador:** Gerencie seus bancos MongoDB sem instalar nada localmente.
* **🔒 Autenticação Integrada:** Sistema de login opcional para proteger o acesso.
* **🔍 Interface Completa:** Todas as funcionalidades do MongoDB Compass original.
* **📊 Visualização de Dados:** Explore coleções, documentos e índices com interface intuitiva.
* **⚡ Query Builder:** Execute queries complexas com suporte a agregações.
* **🐳 Containerizado:** Deploy simplificado com Docker.
* **🔐 Conexões Seguras:** Suporte completo a SSL/TLS e autenticação MongoDB.

---

## <a id="tecnologias"></a>🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **Base:** [compass-web](https://github.com/haohanyang/compass-web) by haohanyang
* **Runtime:** Node.js 20
* **Wrapper:** Script Node.js personalizado para gerenciamento de variáveis de ambiente
* **Containerização:** Docker
* **Frontend:** React (MongoDB Compass UI)

---

## 💻 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Git](https://git-scm.com)
* [Docker](https://www.docker.com/get-started) (Recomendado)
* Uma instância MongoDB acessível (local ou remota)

---

## 🚀 Como Rodar o Projeto Localmente

### 🐳 Rodando com Docker

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/compass-web.git
cd compass-web
```

#### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# URI de Conexão com MongoDB (OBRIGATÓRIO)
CW_MONGO_URI=mongodb://usuario:senha@host:27017/database

# Autenticação de Acesso ao Compass Web (OPCIONAL, mas recomendado)
CW_BASIC_AUTH_USERNAME=admin
CW_BASIC_AUTH_PASSWORD=senha_segura_aqui
```

> [!CAUTION]
> O arquivo **`.env`** contém dados sensíveis como credenciais do MongoDB e senhas de acesso.
>
> **NUNCA** faça *commit* ou exponha este arquivo publicamente. O `.env` já está listado no `.gitignore` para prevenir isso, mas **sempre verifique** antes de enviar suas alterações para o repositório.

#### 3. Construir a Imagem Docker

```bash
docker build -t compass-web .
```

#### 4. Executar o Container

```bash
docker run -d -p 8080:8080 --env-file .env --name compass-web compass-web
```

#### 5. Acessar a Aplicação

Abra seu navegador e acesse: `http://localhost:8080`

Se você configurou autenticação, será solicitado usuário e senha definidos em `CW_BASIC_AUTH_USERNAME` e `CW_BASIC_AUTH_PASSWORD`.

---

## 🚀 Deploy em Produção

### Discloud (Recomendado)

O Compass Web está pré-configurado para ser implantado na **Discloud**.

#### 📝 Configuração do `discloud.config`

Para hospedar na Discloud, você precisa criar um arquivo `discloud.config` na raiz do projeto:

1. Acesse o [**Gerador de discloud.config**](https://discloud.com/discloud.config) da Discloud.
2. Preencha os seguintes parâmetros:
   * **ID:** Seu subdominio cadastrado na Discloud
   * **Type:** Site
   * **Main:** Dockerfile
   * **Name:** Nome do seu app
   * **RAM:** 512 (mínimo recomendado)
   * **VLAN:** true (se conectar a banco MongoDB na Discloud)
   * **APT:** tools
3. Baixe o arquivo gerado e adicione à raiz do projeto.

Exemplo de `discloud.config`:

```ini
ID=compassweb
TYPE=site
MAIN=Dockerfile
NAME=Kallum Compass
RAM=512
VLAN=true
APT=tools
```

#### 🔑 Configurando as Variáveis de Ambiente

No painel da Discloud, adicione as seguintes variáveis de ambiente:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| **`CW_MONGO_URI`** | URI de conexão do MongoDB | `mongodb://user:pass@mongo.vlan:27017/db` |
| **`CW_BASIC_AUTH_USERNAME`** | Usuário de acesso ao Compass Web | `admin` |
| **`CW_BASIC_AUTH_PASSWORD`** | Senha de acesso ao Compass Web | `SenhaSegura123!` |

> [!IMPORTANT]
> Se você estiver usando uma instância MongoDB também hospedada na Discloud:
> * Certifique-se de que **VLAN está ativada** em ambas as aplicações (MongoDB e Compass Web)
> * Use `mongodb` como hostname na URI de conexão
> * Exemplo: `mongodb://user:pass@mongodb:27017/database`

#### 📦 Realizando o Deploy

Com o `discloud.config` criado e as variáveis configuradas:

1. Acesse o painel da [Discloud](https://discloud.com/)
2. Faça upload do projeto compactado (ZIP)
3. Aguarde o build e deploy automático

---

### Deploy em Outras Plataformas

O Compass Web pode ser hospedado em qualquer plataforma que suporte Docker:

* **Railway:** Conecte o repositório GitHub e configure as variáveis de ambiente
* **Render:** Deploy automático via Dockerfile
* **DigitalOcean App Platform:** Suporte nativo a Docker
* **AWS ECS/Fargate:** Para ambientes corporativos

---

## ❓ Perguntas Frequentes (FAQ) & Solução de Problemas

### 🔌 Erro: "CW_MONGO_URI não definida!"

Este é um erro crítico que impede a aplicação de iniciar.

* **Causa:** A variável de ambiente `CW_MONGO_URI` não foi configurada.
* **Solução:** Verifique se o arquivo `.env` existe e contém a linha `CW_MONGO_URI=mongodb://...`

### 🔒 A autenticação não está funcionando

Se o navegador não pedir usuário e senha:

* **Solução:** Certifique-se de que AMBAS as variáveis estão definidas:
  * `CW_BASIC_AUTH_USERNAME`
  * `CW_BASIC_AUTH_PASSWORD`
* Se apenas uma estiver definida, o modo seguro não será ativado.

### 🌐 Não consigo conectar ao MongoDB

* **Verifique a URI de conexão:** O formato correto é `mongodb://usuario:senha@host:porta/database`
* **Firewall:** Certifique-se de que o MongoDB aceita conexões remotas
* **VLAN (Discloud):** Se ambos estiverem na Discloud, use `mongodb` como hostname
* **Credenciais:** Confirme que o usuário tem permissões no banco de dados

### 🐳 O container não inicia

Execute `docker logs compass-web` para ver os erros. Os mais comuns são:

* Falta da variável `CW_MONGO_URI`
* Erro de sintaxe no arquivo `.env`
* Porta 8080 já em uso (altere a variável `PORT`)

### ⚠️ Aviso: "Rodando em modo público (sem senha)"

Isso significa que a aplicação está acessível sem autenticação.

* **Para desenvolvimento local:** Isso é aceitável
* **Para produção:** SEMPRE configure `CW_BASIC_AUTH_USERNAME` e `CW_BASIC_AUTH_PASSWORD`

### 🐛 Como Reportar um Bug

1. Verifique se já não foi reportado nas [Issues](https://github.com/seu-usuario/compass-web/issues)
2. Abra uma nova Issue com:
   * Descrição detalhada do problema
   * Logs do container (`docker logs compass-web`)
   * Versão do Docker
   * Sistema operacional

---

## 📂 Estrutura do Projeto

```
compass-web/
├── Dockerfile           # Configuração da imagem Docker
├── start.js             # Script wrapper para inicialização
├── .env                 # Variáveis de ambiente (NÃO COMITAR!)
├── .gitignore           # Arquivos ignorados pelo Git
├── discloud.config      # Configuração para deploy na Discloud
└── README.md            # Este arquivo
```

### 📄 Sobre os Arquivos Principais

* **`Dockerfile`**: Define a imagem Docker baseada em Node.js 20, instala o `compass-web` globalmente e configura o ambiente.
* **`start.js`**: Script inteligente que:
  * Lê o arquivo `.env` com suporte a senhas complexas
  * Valida variáveis obrigatórias
  * Inicia o `compass-web` com os parâmetros corretos
  * Gerencia logs e códigos de saída

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Se você tem uma ideia de melhoria:

1. Faça um Fork do projeto
2. Crie uma Branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Faça o Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## <a id="licenca"></a>⚖️ Licença
 
Este projeto está licenciado sob a **Mozilla Public License 2.0 (MPL-2.0)**.
 
### Resumo:
* ✅ **Você pode:** Usar comercialmente, modificar, distribuir, usar de forma privada e contar com a concessão de patentes dos contribuidores.
* ❌ **Você NÃO pode:** Usar o nome, as marcas ou os logotipos do autor sem permissão, nem responsabilizá-lo pelo uso do software.
* 🏷️ **Obrigatório:** Disponibilizar o código-fonte dos arquivos cobertos pela licença, incluindo as suas modificações, sob a mesma MPL 2.0 (*copyleft* por arquivo), e manter os avisos de licença e de copyright.
* 🧩 **Flexibilidade:** Você pode combinar o código com arquivos próprios, que podem ter outra licença, desde que cumpra a MPL 2.0 nos arquivos cobertos por ela.
* 🛡️ **Garantia:** O software é fornecido "como está", sem garantias de qualquer tipo.

> [!NOTE]
> O [compass-web](https://github.com/haohanyang/compass-web) original possui sua própria licença, que deve ser respeitada ao usar a ferramenta base. Esta licença MPL 2.0 aplica-se especificamente ao Dockerfile e ao script `start.js` desenvolvidos para containerização.

> [!TIP]
> Já que esse resumo não substitui a licença caso queira ler o texto legal completo, consulte o arquivo [LICENSE](./LICENSE) neste repositório ou a [página oficial da MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

---

## 🤙 Créditos

Este projeto é uma implementação containerizada baseada no excelente trabalho de:

* **[haohanyang/compass-web](https://github.com/haohanyang/compass-web)** - Implementação original do MongoDB Compass para web
* **[MongoDB Inc.](https://www.mongodb.com/)** - Desenvolvedores do MongoDB Compass original

O Dockerfile e script `start.js` foram desenvolvidos para facilitar o deploy em ambientes de produção com suporte a autenticação e configuração robusta via variáveis de ambiente.

---

<div align="center">

Feito com 🧡 por [**Kallum**](https://github.com/thekallum)

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>

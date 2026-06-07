# 🚗 Dashboard de Gerenciamento de Frota

Uma aplicação web moderna, responsiva e de alta performance desenvolvida para o gerenciamento de frotas de automóveis. O sistema foi construído utilizando **Vue 3** com a arquitetura **Composition API** e integrado em tempo real com o banco de dados em nuvem **Firebase Cloud Firestore**.

---

## 🚀 Funcionalidades Atuais (CRUD Completo)

* **Entrada Inteligente:** A aplicação inicia estrategicamente na aba de cadastro, otimizando o fluxo de uso para novos registros.
* **Cadastro Simplificado ($C$):** Validação e inserção de novos veículos nas nuvens com tipagem numérica corrigida de fábrica para ano e quilometragem.
* **Listagem Dinâmica ($R$):** Tabela elegante para visualização dos veículos cadastrados, com formatação monetária/regionalizada para a quilometragem (`pt-BR`).
* **Sincronização em Tempo Real:** Graças ao listener `onSnapshot` do Firestore, qualquer alteração no banco de dados reflete na tela instantaneamente, sem necessidade de atualizar a página.
* **Edição Prática ($U$):** Permite resgatar as informações de um veículo existente, preencher o formulário automaticamente e atualizar os dados direto no servidor.
* **Exclusão Segura ($D$):** Sistema de remoção de registros com duplo fator de confirmação inteiramente gerenciado por modais customizados.
* **UX/UI Aperfeiçoada:** Substituição de todos os alertas primitivos do navegador (`alert` e `confirm`) por Modais de Notificação dinâmicos, animados e elegantes.

---

## 🛠️ Tecnologias e Arquitetura

O projeto preza pelo desacoplamento de código e organização profissional de arquivos:

* **Framework Principal:** [Vue 3](https://vuejs.org/) (com `<script setup>`).
* **Persistência e Banco de Dados:** [Firebase](https://firebase.google.com/) (Cloud Firestore SDK v10+).
* **Estilização Isolada:** Estrutura baseada em **CSS Modules** (`.module.css`), garantindo que o estilo de um componente nunca vaze ou gere conflitos com outros elementos globais.
* **Gerenciamento de Estado:** Fluxo de dados unidirecional através de propriedades (`props`) e eventos customizados (`emits`).

### 📂 Estrutura de Pastas Relevantes

```text
src/
├── components/
│   ├── FormCars.vue                 # Formulário de cadastro/edição
│   ├── FormCars.module.css
│   ├── ListCars.vue                 # Tabela de exibição de dados
│   ├── ListCars.module.css
│   ├── Navbar.vue                   # Controle de alternância de abas
│   ├── Navbar.module.css
│   ├── NotificationModal.vue        # Modais dinâmicos (Avisos e Confirmações)
│   └── NotificationModal.module.css
├── firebase.js                      # Configuração e inicialização do SDK Google
└── App.vue                          # Orquestrador global de estados e lógica do CRUD
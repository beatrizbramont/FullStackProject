
# ✅ 2ManyTareas

O **2ManyTareas** é um sistema web de **gerenciamento de tarefas pessoais** com integração entre **frontend (Next.js)** e **backend (Flask)**.  
O objetivo é oferecer uma experiência intuitiva e moderna para que o usuário possa **organizar suas atividades, acompanhar o progresso e visualizar suas metas** de forma simples e eficiente.

---

## 🧩 Estrutura do Projeto

```
📁 2ManyTareas/         → API em Flask (Python)
📁 frontend/            → Interface em Next.js (React + TailwindCSS)
├── README.md            → (este arquivo)

```

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend
- **Next.js 14** (React + TypeScript)
- **TailwindCSS**
- **Lucide-react** (ícones)
- **Axios** (requisições HTTP)
- **React-datepicker** (calendário customizado)
- **Framer Motion** (animações suaves)

### 🔹 Backend
- **Python 3.11+**
- **Flask**
- **Flask-CORS**
- **SQLAlchemy**
- **SQLite** (banco de dados local)
- **Requests** (comunicação entre serviços)
- **unittest** (testes automatizados)

---

## 🧠 Funcionalidades Principais

| Módulo | Descrição |
|--------|------------|
| 🧍‍♀️ **Usuário** | Cadastro, login e autenticação de usuários. |
| 🗂️ **Tarefas** | CRUD completo de tarefas (criar, listar, editar, excluir). |
| 🕓 **Status de tarefas** | Acompanhe tarefas “A fazer”, “Em andamento”, “Concluídas” e “Aguardando”. |
| 🗓️ **Calendário interativo** | Visualize as tarefas por data com destaque no calendário. |
| 💾 **Persistência de dados** | Todas as informações são salvas via API Flask com SQLAlchemy. |

---

## ⚙️ Como Executar o Projeto

### 🔸 1. Clonar o repositório
```bash
git clone https://github.com/seuusuario/2ManyTareas.git
cd 2ManyTareas
```

---

### 🔸 2. Rodar o Backend (Flask)
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # (Windows)
source venv/bin/activate # (Linux/Mac)

pip install -r requirements.txt
python app.py
```
O backend estará disponível em:
```
http://127.0.0.1:8001
```

---

### 🔸 3. Rodar o Frontend (Next.js)
```bash
cd 2manytareas-next
npm install
npm run dev
```
O frontend estará disponível em:
```
http://localhost:3000
```

---

## 🎨 Identidade Visual

O 2ManyTareas segue um estilo **dark moderno**, com destaque para:
- **Verde principal (#00C896)** — para botões e destaques;  
- **Tons de azul, roxo e marrom** — para representar o status das tarefas;  
- Layout minimalista, arredondado e responsivo;  
- Ícones **Lucide** e componentes animados com **Framer Motion**.

---

## 🧑‍💻 Autoria

**Beatriz Oliveira Bramont**  
Estagiária em TI | Desenvolvedora Full Stack  
💼 [LinkedIn](https://www.linkedin.com/in/beatrizbramont)  
💻 [GitHub](https://github.com/beatrizbramont)

---

## 🏁 Status do Projeto

✅ Funcionalidades principais implementadas  
🚧 Refinando integração entre calendário, tarefas e autenticação  
🎯 Próximos passos: integração com notificações e versão mobile responsiva  


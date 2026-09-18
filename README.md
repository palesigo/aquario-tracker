# Aquário Tracker

PWA para controlar as trocas de água e de filtro (Bio Clear + 2x Bio Carb) de um aquário.

## Funcionalidades

- Registo de trocas de água (data, litros opcionais, observações)
- Registo de trocas de filtro, distinguindo Bio Clear, Bio Carb 1 e Bio Carb 2
- Painel de estado que mostra a última troca e os dias decorridos por filtro
- Histórico completo com opção de apagar registos
- Exportação de backup em JSON e CSV
- Importação de backup em JSON (substitui os dados atuais)
- Funciona offline (dados guardados em IndexedDB no dispositivo)
- Instalável como app (PWA)

## Stack

- React 18 + TypeScript
- Vite
- Dexie.js (IndexedDB)
- vite-plugin-pwa (service worker + manifest)

## Como correr localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Publicar no GitHub Pages

1. Cria o repositório no GitHub (ex: `aquario-tracker`).
2. Ajusta em `vite.config.ts` o campo `base` para `/<nome-do-repositorio>/`
   (já está definido como `/aquario-tracker/` — muda se usares outro nome).
3. Faz push do código:

```bash
git init
git add .
git commit -m "Primeira versão do Aquário Tracker"
git branch -M main
git remote add origin https://github.com/<o-teu-user>/aquario-tracker.git
git push -u origin main
```

4. Configura o GitHub Pages (Settings > Pages) para publicar a partir da branch
   `gh-pages`, ou usa uma GitHub Action de deploy (`peaceiris/actions-gh-pages`
   ou `actions/deploy-pages`) para publicar a pasta `dist` gerada pelo `npm run build`.

## Dados e backup

Os dados ficam guardados apenas no browser (IndexedDB), no dispositivo onde a app
é usada. Não há sincronização entre dispositivos nesta versão. Usa a aba **Backup**
para exportar regularmente um ficheiro JSON (ou CSV) e guardá-lo num local seguro
(ex: Google Drive, email para ti próprio). Podes importar esse JSON mais tarde
para restaurar os dados.

## Notas de arquitetura

- **Bio Carb 1 / Bio Carb 2** são tratados como itens de filtro distintos, para
  saberes exatamente qual dos dois trocar a seguir (o painel de estado mostra
  a data da última troca e os dias decorridos de cada um).
- Sem backend: tudo corre no browser, sem custos de servidor.
- Se no futuro precisares de sincronizar entre vários dispositivos, o próximo
  passo natural é adicionar Supabase ou Firebase como camada de sincronização,
  mantendo o Dexie como cache local offline-first.

# NLW eSports - WEB
## Criação de Projeto
Execute no `PowerShell`:
```
npm create vite@latest
npm i
```


## Tailwind CSS - Repositório de CSS
### Instalação
Execute no `PowerShell`:
```
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
### Configuração
Abra `tailwind.config.cjs` e coloque adicione em `contents` o caminho dos arquivos que usarão o CSS
```
content: ['./src/**/*.tsx']
```
Crie `src/styles/main.css` contendo:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Instale as extensão
* `bradlc.vscode-tailwindcss`
* `csstools.postcss`

## Phosphor - Repositório de Ícones
### Instalação
Execute no `PowerShell`:
```
npm i phosphor-react
```
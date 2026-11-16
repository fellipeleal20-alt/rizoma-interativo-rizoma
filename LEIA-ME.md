# Ramo, Reza, Raízes — rizoma interativo (mesa touchscreen)

## Como abrir
1. Descompacte a pasta inteira (não separe os arquivos).
2. Abra `index.html` no Google Chrome ou Edge. Funciona **offline**.
3. Para modo quiosque (tela cheia, sem barras):
   - Windows: dê dois cliques em `iniciar-windows.bat`
   - Mac/Linux: `./iniciar-mac-linux.sh`
   (ajuste o caminho do Chrome nos arquivos se necessário).

## Como o visitante usa
Tela inicial com a orientação → "Explorar o rizoma" (ou começar por um território).
Toque nos círculos do desenho para abrir o painel; toque nas raízes rosas ou nos botões "Raízes que levam a outros pontos" para seguir as conexões.
Arraste para mover, pince (dois dedos) para ampliar. "Rizoma completo" volta à vista geral.
Após 90 s sem toque, volta sozinho à tela inicial (sem interromper quem está tocando).

## Modo administrativo (só para a equipe)
Na tela inicial, **mantenha o dedo por 4 segundos sobre o título "Ramo, Reza, Raízes"**
(ou abra `index.html?admin`, ou use Ctrl+Alt+A). PIN inicial: **2026** (mude em "Configurações").
Dá para editar títulos, textos, falas, linha cartográfica, comunidade, conexões, posição dos pontos
(reposicionar tocando no mapa), criar/excluir pontos e anexar fotografias.
- As edições ficam salvas no navegador deste computador.
- **Exportar content.js** gera o arquivo para copiar sobre `data/content.js` (backup / outro computador).
- **Restaurar original** descarta as edições locais.

## Fotografias
Coloque as imagens na pasta `fotos/` e informe o caminho no admin (ex.: `fotos/cerrado1.jpg`), ou envie pelo próprio admin.
Cada foto só aparece se estiver marcada como **"autorizada para exibição pública"**; caso contrário, mostra um espaço reservado.
Nenhuma fotografia foi inventada.

## Trocar a ilustração
Substitua `assets/rizoma.jpg` mantendo a proporção 2400×1540 (ou ajuste `config.imagem` em `data/content.js`) e reposicione os pontos pelo admin.

## Estrutura
- `data/content.js` — todo o conteúdo (pontos, falas, conexões, territórios)
- `js/app.js` — navegação, painéis, conexões, inatividade · `js/admin.js` — modo administrativo
- `css/style.css`, `fonts/` (offline) · `assets/rizoma.jpg` · `fotos/`

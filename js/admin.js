(function () {
'use strict';
let R, A, sel = null, DB, el;
const LINHAS = { dura: 'Linha dura', flexivel: 'Linha flexível', fuga: 'Linha de fuga', articulacao: 'Articulação entre linhas' };
const COMS = { 'monte-alto': 'Monte Alto', nogueiras: 'Quilombo dos Nogueiras', ambas: 'Ambas' };

function entrar() {
  A = document.getElementById('admin'); A.hidden = false; A.innerHTML = '';
  let digitos = '';
  const vis = el('div', { class: 'vis' }, '');
  const ok = () => { if (digitos === String(R.data.config.pin)) { A.querySelector('.pin').remove(); painel(); } else { digitos = ''; vis.textContent = ''; vis.style.color = '#A4502B'; } };
  const teclas = el('div', { class: 'teclas' }, ...['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Sair', '0', 'OK'].map(t => el('button', { onclick: () => {
    vis.style.color = ''; if (t === 'Sair') { A.hidden = true; return; } if (t === 'OK') return ok(); digitos += t; vis.textContent = '•'.repeat(digitos.length); } }, t)));
  A.append(el('div', { class: 'pin' }, el('h2', { style: 'font-family:var(--hand);font-size:48px;margin:0' }, 'Modo administrativo'), el('div', {}, 'Digite o PIN'), vis, teclas));
}

function salvar(msg) { R.DB.set('conteudo', JSON.parse(JSON.stringify(R.data))); R.indexar(); if (msg) aviso(msg); }
function aviso(m) { const a = document.getElementById('aviso'); a.textContent = m; a.classList.add('on'); setTimeout(() => a.classList.remove('on'), 1800); }
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'ponto';

function painel() {
  const D = R.data;
  A.innerHTML = '';
  const topo = el('div', { class: 'topo' },
    el('b', {}, 'Administração · Ramo, Reza, Raízes'),
    el('button', { onclick: novo }, '+ Novo ponto'),
    el('button', { onclick: exportar }, 'Exportar content.js'),
    el('button', { onclick: importar }, 'Importar'),
    el('button', { onclick: config }, 'Configurações e territórios'),
    el('button', { onclick: restaurar }, 'Restaurar original'),
    el('button', { onclick: () => { A.hidden = true; R.refresh(); } }, 'Sair'));
  const lista = el('div', { class: 'lista' }, ...D.pontos.map(p => el('button', { class: p.id === sel ? 'sel' : '', onclick: () => { sel = p.id; painel(); } }, p.titulo)));
  const grid = el('div', { class: 'grid' }, lista, sel ? form(D.pontos.find(p => p.id === sel)) : el('div', { style: 'padding:30px' }, 'Escolha um ponto à esquerda para editar ou crie um novo. Alterações ficam salvas neste computador; use “Exportar content.js” para gerar um arquivo que substitui data/content.js.'));
  A.append(topo, grid);
}

function campo(rot, input) { return el('label', {}, rot, input); }
function form(p) {
  const D = R.data;
  const inp = (v, t = 'text') => { const i = el('input', { type: t }); i.value = v == null ? '' : v; return i; };
  const sel_ = (opts, v) => { const s = el('select'); Object.entries(opts).forEach(([k, n]) => { const o = el('option', { value: k }, n); if (k === v) o.selected = true; s.append(o); }); return s; };
  const ta = (v, h) => { const t = el('textarea'); t.value = v || ''; if (h) t.style.minHeight = h + 'px'; return t; };
  const titulo = inp(p.titulo), rotulo = inp(p.rotulo), x = inp(p.x, 'number'), y = inp(p.y, 'number');
  const com = sel_(COMS, p.comunidade), lin = sel_(LINHAS, p.linha);
  const texto = ta(p.texto, 110), pista = ta(p.pista, 60), lacuna = ta(p.lacuna, 60);
  const frases = ta((p.frases || []).map(f => (f.c === 'monte-alto' ? 'MA| ' : f.c === 'nogueiras' ? 'NO| ' : '') + f.t).join('\n'), 140);
  // fotos
  const fotosBox = el('div', { style: 'display:grid;gap:8px' });
  const fotos = JSON.parse(JSON.stringify(p.fotos || []));
  const pintaFotos = () => { fotosBox.innerHTML = ''; fotos.forEach((f, i) => {
    const leg = inp(f.legenda); leg.oninput = () => f.legenda = leg.value;
    const au = el('input', { type: 'checkbox' }); au.checked = !!f.autorizada; au.onchange = () => f.autorizada = au.checked;
    const file = el('input', { type: 'file', accept: 'image/*' });
    file.onchange = async () => { const fl = file.files[0]; if (!fl) return; const id = 'f' + Date.now() + i; await R.DB.set('foto:' + id, fl); f.src = 'idb:' + id; pintaFotos(); };
    const caminho = inp(f.src && f.src.startsWith('idb:') ? '(imagem enviada neste computador)' : f.src); caminho.oninput = () => f.src = caminho.value; if (f.src && f.src.startsWith('idb:')) caminho.disabled = true;
    fotosBox.append(el('div', { class: 'fotoitem' }, campo('Legenda / descrição do espaço', leg), campo('Arquivo na pasta fotos/ (ex.: fotos/cerrado1.jpg) ou envie abaixo', caminho), file,
      el('label', { style: 'flex-direction:row;align-items:center;gap:8px;font-weight:400' }, au, 'Imagem autorizada para exibição pública'), el('button', { type: 'button', onclick: () => { fotos.splice(i, 1); pintaFotos(); } }, 'Remover este espaço')));
  }); fotosBox.append(el('button', { type: 'button', onclick: () => { fotos.push({ src: '', legenda: '', autorizada: false }); pintaFotos(); } }, '+ Espaço para fotografia')); };
  pintaFotos();
  // ligações
  const ligs = {}; (p.ligacoes || []).forEach(l => ligs[l.no] = l.porque || '');
  const ligBox = el('div', { style: 'display:grid;gap:6px' });
  D.pontos.filter(q => q.id !== p.id).forEach(q => {
    const jaPorOutro = (q.ligacoes || []).some(l => l.no === p.id);
    const cb = el('input', { type: 'checkbox' }); cb.checked = (q.id in ligs) || jaPorOutro; if (jaPorOutro && !(q.id in ligs)) cb.disabled = true;
    const why = inp(ligs[q.id] || ''); why.placeholder = 'por que se conectam? (opcional)';
    cb.onchange = () => { if (cb.checked) ligs[q.id] = why.value; else delete ligs[q.id]; }; why.oninput = () => { if (q.id in ligs) ligs[q.id] = why.value; };
    ligBox.append(el('div', { class: 'liga' }, cb, el('span', {}, q.titulo + (jaPorOutro && !(q.id in ligs) ? ' (definida no outro ponto)' : '')), why));
  });
  const f = el('form', { onsubmit: e => e.preventDefault() },
    el('h2', {}, 'Editar: ' + p.titulo),
    campo('Título do painel', titulo), campo('Rótulo curto no mapa', rotulo),
    el('div', { class: 'linha2' }, campo('Comunidade', com), campo('Linha cartográfica', lin)),
    el('div', { class: 'linha2' }, campo('Posição x (0–' + D.config.imagem.largura + ')', x), campo('Posição y (0–' + D.config.imagem.altura + ')', y)),
    el('button', { type: 'button', onclick: () => { A.hidden = true; const b = el('div', { class: 'admin-banner' }, 'Toque no mapa onde o ponto deve ficar'); document.body.append(b);
      R.escolherPosicao((px, py) => { b.remove(); p.x = px; p.y = py; salvar('Posição atualizada'); R.refresh(); A.hidden = false; painel(); }); } }, 'Reposicionar tocando no mapa'),
    campo('Texto explicativo (curto, linguagem acessível)', texto),
    campo('Falas registradas — uma por linha, exatamente como fornecidas. Prefixe com MA| (Monte Alto) ou NO| (Nogueiras)', frases),
    campo('Para aprofundar / nota (opcional)', pista),
    campo('Conteúdo a complementar (aparece como aviso no painel; deixe vazio se não houver)', lacuna),
    el('h3', {}, 'Fotografias'), fotosBox,
    el('h3', {}, 'Conexões com outros pontos'), ligBox,
    el('div', { style: 'display:flex;gap:10px;margin-top:10px' },
      el('button', { type: 'button', style: 'background:#4A7A42;color:#fff', onclick: () => {
        p.titulo = titulo.value; p.rotulo = rotulo.value; p.comunidade = com.value; p.linha = lin.value; p.x = +x.value; p.y = +y.value;
        p.texto = texto.value; p.pista = pista.value; p.lacuna = lacuna.value;
        p.frases = frases.value.split('\n').map(s => s.trim()).filter(Boolean).map(s => { const m = s.match(/^(MA|NO)\|\s*(.*)$/); return m ? { t: m[2], c: m[1] === 'MA' ? 'monte-alto' : 'nogueiras' } : { t: s, c: '' }; });
        p.fotos = fotos; p.ligacoes = Object.entries(ligs).map(([no, porque]) => ({ no, porque }));
        D.pontos.forEach(q => { if (q.id !== p.id && !(q.id in ligs)) { /* mantém ligações definidas no outro ponto */ } });
        salvar('Salvo'); painel(); } }, 'Salvar'),
      el('button', { type: 'button', style: 'color:#A4502B', onclick: () => { if (confirm('Excluir este ponto?')) { D.pontos = D.pontos.filter(q => q.id !== p.id); D.pontos.forEach(q => q.ligacoes = (q.ligacoes || []).filter(l => l.no !== p.id)); sel = null; salvar('Ponto excluído'); painel(); } } }, 'Excluir ponto')));
  return f;
}

function novo() {
  const D = R.data; const nome = prompt('Título do novo ponto:'); if (!nome) return;
  let id = slug(nome), n = 2; while (D.pontos.some(p => p.id === id)) id = slug(nome) + '_' + n++;
  D.pontos.push({ id, titulo: nome, rotulo: nome, x: D.config.imagem.largura / 2, y: D.config.imagem.altura / 2, comunidade: 'ambas', linha: 'flexivel', texto: '', frases: [], pista: '', lacuna: 'Conteúdo a complementar.', fotos: [], ligacoes: [] });
  sel = id; salvar('Novo ponto criado: use “Reposicionar” para colocá-lo no mapa'); painel();
}
function config() {
  const D = R.data; A.innerHTML = '';
  const pin = el('input', { type: 'text' }); pin.value = D.config.pin;
  const idle = el('input', { type: 'number' }); idle.value = D.config.inatividadeSegundos;
  const ori = el('textarea'); ori.value = D.config.orientacao;
  const tm = el('textarea'); tm.style.minHeight = '130px'; tm.value = D.territorios['monte-alto'].apresentacao;
  const tn = el('textarea'); tn.style.minHeight = '130px'; tn.value = D.territorios['nogueiras'].apresentacao;
  const F = D.fichaTecnica || (D.fichaTecnica = { projeto: '', contexto: '', pessoas: [], instituicao: '', programa: '', extra: '' });
  const fpes = el('textarea'); fpes.style.minHeight = '170px'; fpes.value = (F.pessoas || []).map(x => x.nome + ' | ' + (x.funcao || '')).join('\n');
  const fproj = el('input', { type: 'text' }); fproj.value = F.projeto || '';
  const fctx = el('textarea'); fctx.value = F.contexto || '';
  const finst = el('textarea'); finst.value = F.instituicao || '';
  const fprog = el('input', { type: 'text' }); fprog.value = F.programa || '';
  const fext = el('textarea'); fext.value = F.extra || '';
  const sob = el('textarea'); sob.style.minHeight = '150px'; sob.value = D.sobre.nota;
  A.append(el('div', { class: 'topo' }, el('b', {}, 'Configurações'), el('button', { onclick: painel }, 'Voltar')),
    el('form', { onsubmit: e => e.preventDefault() },
      campo('PIN do modo administrativo', pin), campo('Segundos de inatividade até voltar ao início', idle), campo('Frase de orientação da tela inicial', ori),
      el('h3', {}, 'Ficha técnica'), campo('Título do projeto', fproj), campo('Contexto (linha abaixo do título)', fctx),
      campo('Equipe — uma pessoa por linha, no formato: Nome | Função', fpes), campo('Instituição', finst), campo('Programa', fprog), campo('Agradecimentos e apoio (opcional)', fext),
      campo('Apresentação — Monte Alto', tm), campo('Apresentação — Nogueiras', tn), campo('Nota de cuidados (painel “As linhas”)', sob),
      el('button', { type: 'button', style: 'background:#4A7A42;color:#fff', onclick: () => { D.config.pin = pin.value; D.config.inatividadeSegundos = +idle.value || 90; D.config.orientacao = ori.value;
        D.territorios['monte-alto'].apresentacao = tm.value; D.territorios['nogueiras'].apresentacao = tn.value; D.sobre.nota = sob.value;
        F.projeto = fproj.value; F.contexto = fctx.value; F.instituicao = finst.value; F.programa = fprog.value; F.extra = fext.value;
        F.pessoas = fpes.value.split('\n').map(l => l.trim()).filter(Boolean).map(l => { const i = l.indexOf('|'); return i < 0 ? { nome: l, funcao: '' } : { nome: l.slice(0, i).trim(), funcao: l.slice(i + 1).trim() }; });
        salvar('Salvo'); painel(); } }, 'Salvar')));
}

async function paraDataUrl(blob) { return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); }); }
async function exportar() {
  const d = JSON.parse(JSON.stringify(R.data));
  for (const p of d.pontos) for (const f of (p.fotos || [])) if (f.src && f.src.startsWith('idb:')) { const b = await R.DB.get('foto:' + f.src.slice(4)); if (b) f.src = await paraDataUrl(b); }
  const txt = '/* CONTEÚDO DO RIZOMA — gerado pelo modo administrativo */\nwindow.RIZOMA_DATA = ' + JSON.stringify(d, null, 1) + ';\n';
  const a = el('a', { href: URL.createObjectURL(new Blob([txt], { type: 'text/javascript' })), download: 'content.js' }); document.body.append(a); a.click(); a.remove();
  aviso('content.js exportado');
}
function importar() {
  const i = el('input', { type: 'file', accept: '.js,.json' });
  i.onchange = async () => { const t = await i.files[0].text(); try { const j = JSON.parse(t.replace(/^[\s\S]*?window\.RIZOMA_DATA\s*=\s*/, '').replace(/;\s*$/, '')); if (!j.pontos) throw 0; R.data = j; salvar('Importado'); sel = null; R.indexar(); painel(); } catch (e) { alert('Arquivo inválido.'); } };
  i.click();
}
async function restaurar() { if (confirm('Descartar as edições deste computador e voltar ao conteúdo original do arquivo?')) { await R.DB.del('conteudo'); location.reload(); } }

function pronto() {
  R = window.RIZOMA; DB = R.DB; el = R.el;
  const t = document.getElementById('titulo-intro'); let h = null;
  const ini = () => { h = setTimeout(entrar, 4000); }, fim = () => clearTimeout(h);
  t.addEventListener('pointerdown', ini); ['pointerup', 'pointerleave', 'pointercancel'].forEach(e => t.addEventListener(e, fim));
  document.addEventListener('keydown', e => { if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') entrar(); });
  if (new URLSearchParams(location.search).has('admin')) { document.getElementById('intro').classList.add('some'); entrar(); }
}
if (window.RIZOMA) pronto(); else window.addEventListener('rizoma-pronto', pronto);
})();

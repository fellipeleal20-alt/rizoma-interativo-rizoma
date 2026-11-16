(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function el(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const k in (attrs || {})) { if (k === 'class') e.className = attrs[k]; else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); }
  kids.flat().forEach(c => e.append(c && c.nodeType ? c : document.createTextNode(c == null ? '' : c)));
  return e;
}

/* ---------- armazenamento local (IndexedDB) para edições e fotos ---------- */
const DB = (() => {
  let p = null;
  const open = () => p || (p = new Promise((res, rej) => { try { const r = indexedDB.open('rizoma-ramo-reza-raizes', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } }));
  const tx = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => { const t = db.transaction('kv', mode); const q = fn(t.objectStore('kv')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
  return { get: k => tx('readonly', s => s.get(k)).catch(() => undefined), set: (k, v) => tx('readwrite', s => s.put(v, k)).catch(() => {}), del: k => tx('readwrite', s => s.delete(k)).catch(() => {}) };
})();

let D = window.RIZOMA_DATA, byId = {}; window.RIZOMA_ORIG = JSON.parse(JSON.stringify(window.RIZOMA_DATA));
const IMG = { w: 2400, h: 1540 };
const params = new URLSearchParams(location.search);
const state = { sel: null, com: 'todos', painel: null, ultimo: Date.now(), reiniciando: false };
const vp = $('#viewport'), stage = $('#stage'), pontosEl = $('#pontos'), fios = $('#fios'), painel = $('#painel');
let vw = innerWidth, vh = innerHeight, V = { x: 0, y: 0, k: 1 };
const BAR = 96;

function indexar() { byId = {}; D.pontos.forEach(p => byId[p.id] = p); IMG.w = D.config.imagem.largura; IMG.h = D.config.imagem.altura; }
const linhaDe = p => D.linhas[p.linha] || D.linhas.articulacao;
const nomeCom = c => c === 'ambas' ? 'Monte Alto e Nogueiras' : (D.territorios[c] ? D.territorios[c].nome : '');

/* ---------- conexões ---------- */
function liga(id) {
  const out = new Map();
  (byId[id].ligacoes || []).forEach(l => out.set(l.no, l.porque || ''));
  D.pontos.forEach(p => { if (p.id !== id) (p.ligacoes || []).forEach(l => { if (l.no === id && !out.has(p.id)) out.set(p.id, l.porque || ''); }); });
  return [...out].filter(([k]) => byId[k]).map(([no, porque]) => ({ no, porque }));
}
function arestas() {
  const m = new Map();
  D.pontos.forEach(p => (p.ligacoes || []).forEach(l => { if (!byId[l.no]) return; const k = [p.id, l.no].sort().join('|'); if (!m.has(k)) m.set(k, [p.id, l.no]); }));
  return [...m.values()];
}
function curva(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
  let h = 0; for (const ch of a.id + b.id) h = (h * 31 + ch.charCodeAt(0)) | 0;
  const off = Math.min(d * 0.2, 170) * ((a.id < b.id ? 1 : -1) * (h % 2 ? 1 : -1));
  return `M${a.x} ${a.y} Q${(a.x + b.x) / 2 - dy / d * off} ${(a.y + b.y) / 2 + dx / d * off} ${b.x} ${b.y}`;
}
const NS = 'http://www.w3.org/2000/svg';
function svg(tag, attrs) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
function renderFios() {
  fios.innerHTML = ''; fios.setAttribute('viewBox', `0 0 ${IMG.w} ${IMG.h}`);
  const amb = svg('g', {}); const dst = svg('g', { id: 'dst' });
  arestas().forEach(([a, b], i) => {
    const d = curva(byId[a], byId[b]);
    amb.append(svg('path', { d, class: 'amb' }));
    if (i % 3 === 0) { const c = svg('circle', { r: 4.5, fill: '#999142', opacity: '.7' }); const m = svg('animateMotion', { dur: (11 + (i * 1.7) % 9) + 's', repeatCount: 'indefinite', path: d, begin: (i % 7) + 's' }); c.append(m); amb.append(c); }
  });
  fios.append(amb, dst);
}
function destacarFios(id) {
  const dst = $('#dst'); dst.innerHTML = ''; if (!id) return;
  liga(id).forEach(l => {
    const d = curva(byId[id], byId[l.no]);
    dst.append(svg('path', { d, class: 'dst' }), svg('path', { d, class: 'alvo', 'data-vai': l.no }));
    const c = svg('circle', { r: 9, fill: '#51391F', stroke: '#FBF7E9', 'stroke-width': 3 }); c.append(svg('animateMotion', { dur: '3.2s', repeatCount: 'indefinite', path: d })); dst.append(c);
  });
}

/* ---------- pontos ---------- */
function renderPontos() {
  pontosEl.innerHTML = '';
  D.pontos.forEach(p => pontosEl.append(el('button', { class: 'ponto linha-' + p.linha, 'data-id': p.id, style: `left:${p.x}px;top:${p.y}px`, 'aria-label': p.titulo },
    el('span', { class: 'anel' }), el('span', { class: 'rotulo' }, p.rotulo || p.titulo))));
  estado();
}
function estado() {
  const viz = state.sel ? new Set(liga(state.sel).map(l => l.no)) : new Set();
  document.body.classList.toggle('sel-ativo', !!state.sel);
  $$('.ponto').forEach(b => {
    const p = byId[b.dataset.id];
    b.classList.toggle('ativo', p.id === state.sel);
    b.classList.toggle('vizinho', viz.has(p.id));
    const fora = state.com !== 'todos' && p.comunidade !== 'ambas' && p.comunidade !== state.com;
    b.classList.toggle('dim', fora || (state.sel && p.id !== state.sel && !viz.has(p.id) && false));
  });
  $('#filtros').textContent = state.com === 'todos' ? '' : nomeCom(state.com);
}

/* ---------- vista (zoom/pan) ---------- */
const fit = () => Math.min(vw / IMG.w, (vh - BAR) / IMG.h) * 0.985;
function clamp(v) {
  const s = fit() * v.k, w = IMG.w * s, h = IMG.h * s, m = 120, ah = vh - BAR;
  v.x = w <= vw - 2 * m ? (vw - w) / 2 : Math.min(m, Math.max(vw - w - m, v.x));
  v.y = h <= ah - 2 * m ? (ah - h) / 2 : Math.min(m, Math.max(ah - h - m, v.y));
  return v;
}
function aplicar() {
  stage.style.width = IMG.w + 'px'; stage.style.height = IMG.h + 'px';
  stage.style.transform = `translate(${V.x}px,${V.y}px) scale(${fit() * V.k})`;
}
function irHome() { V = clamp({ x: 0, y: 0, k: 1 }); aplicar(); }
let anim = null;
function animar(t, ms = 850) {
  t = clamp({ ...t }); const a = { ...V }, t0 = performance.now(); cancelAnimationFrame(anim);
  const passo = now => { const u = Math.min(1, (now - t0) / ms), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    V = { x: a.x + (t.x - a.x) * e, y: a.y + (t.y - a.y) * e, k: a.k + (t.k - a.k) * e }; aplicar(); if (u < 1) anim = requestAnimationFrame(passo); else anim = null; };
  anim = requestAnimationFrame(passo);
}
const painelW = () => Math.min(600, vw * 0.42) + 36;
function focar(p, k = 1.55) {
  const pw = painel.hidden ? 0 : painelW(), esq = painel.classList.contains('esq');
  const l = esq ? pw : 0, r = esq ? vw : vw - pw, s = fit() * k;
  animar({ k, x: (l + r) / 2 - p.x * s, y: (vh - BAR) / 2 - p.y * s });
}
function zoomEm(cx, cy, nk) {
  nk = Math.min(4, Math.max(1, nk)); const s0 = fit() * V.k, wx = (cx - V.x) / s0, wy = (cy - V.y) / s0, s1 = fit() * nk;
  V = clamp({ k: nk, x: cx - wx * s1, y: cy - wy * s1 }); aplicar();
}

/* ---------- gestos de toque ---------- */
const ptrs = new Map(); let pinch0 = null;
vp.addEventListener('pointerdown', e => { ativ(); cancelAnimationFrame(anim); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, moved: false, alvo: e.target });
  if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch0 = { d: Math.hypot(a.x - b.x, a.y - b.y), k: V.k }; } });
vp.addEventListener('pointermove', e => { const p = ptrs.get(e.pointerId); if (!p) return; ativ();
  if (ptrs.size === 1) { const dx = e.clientX - p.x, dy = e.clientY - p.y; if (Math.hypot(e.clientX - p.x0, e.clientY - p.y0) > 10) p.moved = true;
    if (p.moved) { V = clamp({ ...V, x: V.x + dx, y: V.y + dy }); aplicar(); } }
  else if (ptrs.size === 2 && pinch0) { p.moved = true; p.x = e.clientX; p.y = e.clientY; const [a, b] = [...ptrs.values()]; a.moved = b.moved = true;
    zoomEm((a.x + b.x) / 2, (a.y + b.y) / 2, pinch0.k * Math.hypot(a.x - b.x, a.y - b.y) / pinch0.d); }
  p.x = e.clientX; p.y = e.clientY; });
const fimPtr = e => { const p = ptrs.get(e.pointerId); if (!p) return; ptrs.delete(e.pointerId); pinch0 = null;
  if (e.type === 'pointerup' && !p.moved && ptrs.size === 0) toque(p.alvo); };
vp.addEventListener('pointerup', fimPtr); vp.addEventListener('pointercancel', fimPtr);
vp.addEventListener('wheel', e => { e.preventDefault(); ativ(); zoomEm(e.clientX, e.clientY, V.k * (e.deltaY < 0 ? 1.15 : 1 / 1.15)); }, { passive: false });
function toque(t) {
  const pt = t.closest && t.closest('.ponto'); if (pt) return abrir(pt.dataset.id);
  const v = t.closest && t.closest('[data-vai]'); if (v) return abrir(v.dataset.vai);
}
document.addEventListener('contextmenu', e => e.preventDefault());

/* ---------- painéis ---------- */
function chipLinha(p) { const l = linhaDe(p); return el('span', { class: 'chip', style: `--c:${l.cor}` }, el('i'), l.nome); }
function chipCom(c) { return el('span', { class: 'chip' }, nomeCom(c)); }
async function urlFoto(src) {
  if (!src) return null;
  if (src.startsWith('idb:')) { const b = await DB.get('foto:' + src.slice(4)); return b ? URL.createObjectURL(b) : null; }
  return src;
}
function slotFoto(f) {
  const pend = (msg) => el('figure', {}, el('div', { class: 'foto vazia' }, msg));
  if (!f.src || !f.autorizada) return pend('Espaço reservado para fotografia' + (f.legenda ? ': ' + f.legenda : '') + (f.src && !f.autorizada ? ' (aguardando autorização de uso)' : ''));
  const fig = el('figure', {}), box = el('div', { class: 'foto' });
  const img = el('img', { alt: f.legenda || '' }); box.append(img); if (f.legenda) box.append(el('figcaption', {}, f.legenda)); fig.append(box);
  urlFoto(f.src).then(u => { if (u) img.src = u; else fig.replaceWith(pend('Fotografia não encontrada')); });
  img.onerror = () => fig.replaceWith(pend('Fotografia não encontrada'));
  return fig;
}
function mostrarPainel(lado, nodes) {
  painel.className = lado; painel.hidden = false; painel.innerHTML = '';
  painel.append(...nodes); void painel.offsetWidth; painel.style.animation = 'none'; void painel.offsetWidth; painel.style.animation = '';
}
function cabecalho(chips, titulo) {
  return el('header', {}, el('button', { class: 'fechar', onclick: fechar }, 'Fechar'), el('div', { class: 'chips' }, chips), el('h2', {}, titulo));
}
function abrir(id) {
  const p = byId[id]; if (!p) return; ativ(); state.sel = id; state.painel = 'ponto';
  const corpo = el('div', { class: 'corpo' }, el('p', { class: 'texto' }, p.texto));
  if ((p.frases || []).length) { corpo.append(el('h3', {}, 'Falas registradas')); p.frases.forEach(f => corpo.append(el('blockquote', {}, '“' + f.t + '”', f.c ? el('small', {}, nomeCom(f.c)) : ''))); }
  if (p.pista) corpo.append(el('p', { class: 'nota' }, p.pista));
  if (p.lacuna) corpo.append(el('p', { class: 'lacuna' }, p.lacuna));
  if ((p.fotos || []).length) { corpo.append(el('h3', {}, 'Registros')); corpo.append(el('div', { class: 'fotos' }, p.fotos.map(slotFoto))); }
  const lg = liga(id);
  if (lg.length) { corpo.append(el('h3', {}, 'Raízes que levam a outros pontos'));
    corpo.append(el('div', { class: 'conex' }, lg.map(l => { const q = byId[l.no], c = linhaDe(q).cor; return el('button', { style: `--c:${c}`, onclick: () => abrir(l.no) }, el('em', {}, q.titulo), l.porque ? el('span', {}, l.porque) : ''); }))); }
  corpo.append(el('p', { class: 'nota' }, 'Leitura interpretativa da pesquisa; as falas são registros dos participantes, sem identificação.'));
  mostrarPainel(p.x > IMG.w / 2 ? 'esq' : 'dir', [cabecalho([chipLinha(p), chipCom(p.comunidade)], p.titulo), corpo]);
  estado(); destacarFios(id); focar(p);
}
function abrirTerritorio(c) {
  ativ(); const t = D.territorios[c]; state.sel = null; state.com = c; state.painel = 'territorio'; destacarFios(null);
  const corpo = el('div', { class: 'corpo' }, el('p', { class: 'texto' }, t.apresentacao), el('h3', {}, 'Temas para explorar'),
    el('div', { class: 'lista-temas' }, t.temas.map(x => el('button', { onclick: () => abrir(x.no) }, x.rotulo))),
    el('p', { class: 'nota' }, 'Os temas emergiram da pesquisa; não descrevem todos os moradores nem devem ser lidos como oposição entre as comunidades.'),
    el('h3', {}, 'Pontes entre os territórios'), el('p', { class: 'texto', style: 'font-size:19px' }, 'Veja como os dois territórios se conectam.'),
    el('div', { class: 'lista-temas' }, el('button', { onclick: () => { state.com = 'todos'; abrir('coracao'); } }, 'Partir do coração do rizoma')));
  mostrarPainel(c === 'monte-alto' ? 'esq' : 'dir', [cabecalho([chipCom(c)], t.nome), corpo]); estado(); animar({ k: 1, x: 0, y: 0 });
}
function abrirLinhas() {
  ativ(); state.sel = null; state.painel = 'linhas'; destacarFios(null); estado();
  const corpo = el('div', { class: 'corpo' });
  ['dura', 'flexivel', 'fuga'].forEach(k => { const l = D.linhas[k]; corpo.append(el('h3', { style: `color:${l.cor}` }, l.nome), el('p', { class: 'texto' }, l.resumo)); });
  corpo.append(el('p', { class: 'nota' }, D.sobre.nota));
  mostrarPainel('dir', [cabecalho([], 'As linhas do rizoma'), corpo]); animar({ k: 1, x: 0, y: 0 });
}
function abrirFicha() {
  ativ(); state.sel = null; state.painel = 'ficha'; destacarFios(null); estado();
  const f = D.fichaTecnica || (window.RIZOMA_ORIG && window.RIZOMA_ORIG.fichaTecnica) || { pessoas: [] };
  const corpo = el('div', { class: 'corpo ficha' });
  if (f.projeto) corpo.append(el('p', { class: 'proj' }, f.projeto));
  if (f.contexto) corpo.append(el('p', { class: 'ctx' }, f.contexto));
  corpo.append(el('h3', {}, 'Equipe'));
  (f.pessoas || []).forEach(x => corpo.append(el('div', { class: 'pessoa' }, el('b', {}, x.nome), el('span', {}, x.funcao || ''))));
  if (f.instituicao) corpo.append(el('h3', {}, 'Instituição'), el('p', { class: 'instit' }, f.instituicao));
  if (f.programa) corpo.append(el('h3', {}, 'Programa'), el('p', { class: 'instit' }, f.programa));
  if (f.extra) corpo.append(el('h3', {}, 'Agradecimentos e apoio'), el('p', { class: 'instit' }, f.extra));
  mostrarPainel('dir', [cabecalho([], 'Ficha técnica'), corpo]); animar({ k: 1, x: 0, y: 0 });
}
function fechar() { ativ(); painel.hidden = true; state.sel = null; state.painel = null; destacarFios(null); estado(); animar({ k: Math.min(V.k, 1.2), x: V.x, y: V.y }, 500); }
function reiniciar() {
  state.sel = null; state.com = 'todos'; state.painel = null; painel.hidden = true; destacarFios(null); estado(); animar({ k: 1, x: 0, y: 0 }, 900);
  $('#intro').classList.remove('some'); $('#aviso').classList.remove('on'); state.reiniciando = false;
}

/* ---------- inatividade ---------- */
function ativ() { state.ultimo = Date.now(); $('#aviso').classList.remove('on'); }
['pointerdown', 'pointermove', 'keydown', 'wheel'].forEach(ev => document.addEventListener(ev, () => { if (!state.reiniciando) state.ultimo = Date.now(); }, true));
setInterval(() => {
  if (!$('#admin').hidden || $('#intro').classList.contains('some') === false) return;
  const lim = (parseFloat(params.get('idle')) || D.config.inatividadeSegundos || 90) * 1000, ocioso = Date.now() - state.ultimo;
  if (ptrs.size > 0 || anim) { state.ultimo = Date.now(); return; }   // interação em andamento: não interrompe
  const falta = Math.ceil((lim - ocioso) / 1000);
  const av = $('#aviso');
  if (falta <= 10 && falta > 0) { av.textContent = 'Voltando ao início em ' + falta + ' s — toque para continuar'; av.classList.add('on'); } else av.classList.remove('on');
  if (ocioso >= lim) { reiniciar(); }
}, 1000);

/* ---------- barra e introdução ---------- */
function telaCheia() { const d = document; if (!d.fullscreenElement) (d.documentElement.requestFullscreen || (() => {})).call(d.documentElement).catch(() => {}); else d.exitFullscreen(); }
function iniciar(c) { $('#intro').classList.add('some'); ativ(); try { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {}); } catch (e) {} if (c) abrirTerritorio(c); }
$('#i-explorar').onclick = () => iniciar(); $('#i-ma').onclick = () => iniciar('monte-alto'); $('#i-no').onclick = () => iniciar('nogueiras');
$('#b-home').onclick = () => { state.com = 'todos'; fechar(); animar({ k: 1, x: 0, y: 0 }); estado(); };
$('#b-ma').onclick = () => abrirTerritorio('monte-alto'); $('#b-no').onclick = () => abrirTerritorio('nogueiras'); $('#b-linhas').onclick = abrirLinhas; $('#b-ficha').onclick = abrirFicha;
$('#b-mais').onclick = () => zoomEm(vw / 2, (vh - BAR) / 2, V.k * 1.4); $('#b-menos').onclick = () => zoomEm(vw / 2, (vh - BAR) / 2, V.k / 1.4);
$('#b-tela').onclick = telaCheia; $('#b-reiniciar').onclick = reiniciar;
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !painel.hidden) fechar(); });
addEventListener('resize', () => { vw = innerWidth; vh = innerHeight; V = clamp(V); aplicar(); });

/* ---------- inicialização e API para o admin ---------- */
function montar() { indexar(); $('#orient').textContent = D.config.orientacao; $('#mapa').src = D.config.imagem.src; renderFios(); renderPontos(); aplicar(); }
window.RIZOMA = {
  DB, el, svg, get data() { return D; }, set data(d) { D = d; },
  refresh() { montar(); if (state.sel && byId[state.sel]) abrir(state.sel); else { painel.hidden = true; state.sel = null; } },
  escolherPosicao(cb) { const h = e => { const t = e.target; const r = stage.getBoundingClientRect(), s = fit() * V.k; cb(Math.round((e.clientX - r.left) / s), Math.round((e.clientY - r.top) / s)); vp.removeEventListener('click', h, true); e.stopPropagation(); }; vp.addEventListener('click', h, true); },
  ativ, fechar, abrir, get ptrs() { return ptrs; }, indexar, liga
};
(async () => {
  const ov = await DB.get('conteudo'); if (ov && ov.pontos) D = ov; D.linhas = window.RIZOMA_ORIG.linhas;
  montar(); irHome(); window.dispatchEvent(new Event('rizoma-pronto'));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => aplicar());
})();
})();

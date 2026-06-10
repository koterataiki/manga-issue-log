/* =====================================================
   モンファス! 〜モンスターフュージョン〜
   スマホ向け 2Dドット絵モンスター合成RPG
   ===================================================== */
'use strict';

/* ---------- ユーティリティ ---------- */
const $ = sel => document.querySelector(sel);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rnd = (a, b) => a + Math.random() * (b - a);
const rndi = (a, b) => Math.floor(rnd(a, b + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function mixColor(h1, h2) {
  const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [a, b] = [p(h1), p(h2)];
  const c = a.map((v, i) => Math.round((v + b[i]) / 2));
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
}

/* ---------- 効果音 (WebAudio) ---------- */
const AudioFX = {
  ctx: null, on: true,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) { /* noop */ }
  },
  tone(freq, dur, type, vol, slide) {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t + dur);
    g.gain.setValueAtTime(vol || 0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t); o.stop(t + dur);
  },
  noise(dur, vol) {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol || 0.12, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(g).connect(this.ctx.destination);
    src.start(t);
  },
  play(name) {
    switch (name) {
      case 'tap':    this.tone(660, 0.07, 'square', 0.05); break;
      case 'hit':    this.noise(0.15, 0.15); this.tone(180, 0.12, 'sawtooth', 0.08, 60); break;
      case 'crit':   this.noise(0.25, 0.2); this.tone(120, 0.3, 'sawtooth', 0.12, 40); break;
      case 'magic':  this.tone(500, 0.25, 'sine', 0.08, 1400); break;
      case 'ko':     this.tone(300, 0.5, 'sawtooth', 0.1, 50); this.noise(0.4, 0.15); break;
      case 'get':    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone(f, 0.18, 'square', 0.07), i * 110)); break;
      case 'fusion': this.tone(200, 1.2, 'sawtooth', 0.06, 1800); break;
      case 'boom':   this.noise(0.5, 0.25); this.tone(80, 0.5, 'sine', 0.18, 30); break;
      case 'lvup':   [392, 523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone(f, 0.14, 'triangle', 0.08), i * 80)); break;
      case 'lose':   [400, 330, 262, 196].forEach((f, i) => setTimeout(() => this.tone(f, 0.25, 'triangle', 0.08), i * 180)); break;
    }
  }
};

/* ---------- パーティクル等エフェクト ---------- */
const FX = {
  canvas: null, ctx: null, parts: [],
  init() {
    this.canvas = $('#fx');
    this.ctx = this.canvas.getContext('2d');
    const resize = () => {
      this.canvas.width = innerWidth * devicePixelRatio;
      this.canvas.height = innerHeight * devicePixelRatio;
      this.ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    addEventListener('resize', resize);
    const loop = () => {
      this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.parts = this.parts.filter(p => {
        p.life -= 1;
        if (p.life <= 0) return false;
        if (p.attract) {
          const dx = p.attract.x - p.x, dy = p.attract.y - p.y;
          p.vx += dx * p.attract.k; p.vy += dy * p.attract.k;
          p.vx *= 0.92; p.vy *= 0.92;
        }
        p.vy += p.grav || 0;
        p.x += p.vx; p.y += p.vy;
        const a = Math.min(1, p.life / 20);
        this.ctx.globalAlpha = a;
        this.ctx.fillStyle = p.color;
        const s = p.size * (0.5 + 0.5 * a);
        if (p.star) {
          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.life * 0.2);
          this.ctx.fillRect(-s, -s / 3, s * 2, s / 1.5);
          this.ctx.fillRect(-s / 3, -s, s / 1.5, s * 2);
          this.ctx.restore();
        } else {
          this.ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        }
        return true;
      });
      this.ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    };
    loop();
  },
  burst(x, y, colors, n, speed, opts) {
    for (let i = 0; i < (n || 24); i++) {
      const a = Math.random() * Math.PI * 2;
      const v = rnd(1, speed || 6);
      this.parts.push(Object.assign({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
        life: rndi(25, 55), size: rnd(3, 7), color: pick(colors),
        grav: 0.08
      }, opts || {}));
    }
  },
  stars(x, y, colors, n) {
    this.burst(x, y, colors, n || 14, 5, { star: true, grav: 0.02 });
  },
  confetti() {
    const colors = ['#ff5a8a', '#ffd23c', '#41c463', '#3fd2ff', '#9a6cff', '#ff8a5a', '#ffffff'];
    for (let i = 0; i < 90; i++) {
      this.parts.push({
        x: rnd(0, innerWidth), y: rnd(-120, -10),
        vx: rnd(-1, 1), vy: rnd(1.5, 4),
        life: rndi(70, 130), size: rnd(4, 8), color: pick(colors), grav: 0.04
      });
    }
  },
  vortexTimer: null,
  vortexStart(x, y, colors) {
    this.vortexStop();
    this.vortexTimer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = rnd(110, 200);
        this.parts.push({
          x: x + Math.cos(a) * r, y: y + Math.sin(a) * r,
          vx: -Math.sin(a) * 4, vy: Math.cos(a) * 4,
          life: rndi(30, 55), size: rnd(3, 6), color: pick(colors),
          attract: { x, y, k: 0.012 }
        });
      }
    }, 30);
  },
  vortexStop() {
    if (this.vortexTimer) { clearInterval(this.vortexTimer); this.vortexTimer = null; }
  },
  ring(x, y, color) {
    const r = el('div', 'ring');
    r.style.left = (x - 20) + 'px';
    r.style.top = (y - 20) + 'px';
    r.style.borderColor = color || '#fff';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 650);
  },
  pop(x, y, text, cls) {
    const d = el('div', 'dmg-pop' + (cls ? ' ' + cls : ''), text);
    d.style.left = x + 'px';
    d.style.top = y + 'px';
    d.style.transform = 'translateX(-50%)';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 900);
  },
  shake(hard) {
    const app = $('#app');
    app.classList.remove('shake', 'shake-hard');
    void app.offsetWidth;
    app.classList.add(hard ? 'shake-hard' : 'shake');
  },
  flash(color) {
    const f = $('#flash');
    f.style.background = color || '#fff';
    f.classList.remove('go');
    void f.offsetWidth;
    f.classList.add('go');
  }
};

const centerOf = elm => {
  const r = elm.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

/* ---------- タイプ・相性 ---------- */
const TYPES = {
  fire:     { name: 'ほのお',  color: '#ff5a3c', skill: { name: 'ファイアバースト', pow: 1.35 } },
  water:    { name: 'みず',    color: '#3fa7ff', skill: { name: 'アクアスラッシュ', pow: 1.3 } },
  grass:    { name: 'くさ',    color: '#4cba3e', skill: { name: 'リーフストーム',   pow: 1.3 } },
  electric: { name: 'でんき',  color: '#e8b800', skill: { name: 'サンダーボルト', pow: 1.35 } },
  rock:     { name: 'いわ',    color: '#a9824f', skill: { name: 'ロックブラスト',   pow: 1.45 } },
  dark:     { name: 'やみ',    color: '#8a5dde', skill: { name: 'ダークノヴァ',     pow: 1.4 } },
  light:    { name: 'ひかり',  color: '#ff7fc4', skill: { name: 'シャイニングレイ', pow: 1.35 } },
  dragon:   { name: 'りゅう',  color: '#1fbf9e', skill: { name: 'ドラゴンブレス',   pow: 1.5 } }
};
const STRONG = {
  fire: ['grass'], water: ['fire', 'rock'], grass: ['water'],
  electric: ['water'], rock: ['electric', 'fire'], dark: ['light'],
  light: ['dark'], dragon: ['dragon']
};

/* ---------- ドット絵データ (左半分8px、右へミラー) ---------- */
const OUTLINE = '#23203a', EYE_W = '#ffffff', EYE_K = '#191726';

const SPECIES = [
  {
    name: 'フレイモン', type: 'fire',
    colors: { A: '#e84b3c', B: '#ffb13b', C: '#ffd94a' },
    half: [
      '........',
      '......CC',
      '.....CCC',
      '...OOOOO',
      '..OAAAAA',
      '.OAAWKAA',
      '.OAAAAAA',
      '.OAAAWAA',
      '..OAAAAA',
      '..OABBBB',
      '.OAABBBB',
      '.OAABBBB',
      '.OAAABBB',
      '..OAAAAA',
      '..OAAO..',
      '...OO...'
    ]
  },
  {
    name: 'アクアル', type: 'water',
    colors: { A: '#3b9df0', B: '#a8e4ff', C: '#46e0d6' },
    half: [
      '.......O',
      '......OA',
      '......OA',
      '.....OAA',
      '....OAAA',
      '...OAWKA',
      '..OAAAAA',
      '..OAABBB',
      'CCOAABBB',
      'CCOAABBB',
      '.COAABBB',
      '..OAAABB',
      '..OAAAAA',
      '...OAAAA',
      '....OAAA',
      '.....OOO'
    ]
  },
  {
    name: 'リーフィ', type: 'grass',
    colors: { A: '#58c24a', B: '#2f8f3a', C: '#9ae05a' },
    half: [
      '....CC..',
      '...CCCC.',
      '..CCCCCC',
      '......CC',
      '...OOOOO',
      '..OAAAAA',
      '.OAAWKAA',
      '.OAAAAAA',
      '.OAABBAA',
      '.OAABBAA',
      '.OAAAAAA',
      '..OAAAAA',
      '..OAAAAA',
      '...OAAAA',
      '..OAAO..',
      '...OO...'
    ]
  },
  {
    name: 'ボルタス', type: 'electric',
    colors: { A: '#f5cf3a', B: '#fdf0a6', C: '#ff7b4a' },
    half: [
      '..O.....',
      '..OC....',
      '..OAO...',
      '..OAAOOO',
      '.OAAAAAA',
      '.OAWKAAA',
      '.OCAAAAA',
      '.OAAAAAA',
      '..OAABBB',
      '..OAABBB',
      '..OAAABB',
      '..OAAAAA',
      '...OAAAA',
      '..OAAO..',
      '...OO...',
      '........'
    ]
  },
  {
    name: 'ゴロドン', type: 'rock',
    colors: { A: '#a98f6e', B: '#6e5a45', C: '#d8c9ad' },
    half: [
      '........',
      '..OOOOOO',
      '.OAAAAAA',
      '.OAABAAA',
      '.OAWKAAA',
      '.OAWKAAA',
      '.OAAAAAA',
      '.OAAAABA',
      '.OBAAAAA',
      '.OAAAAAA',
      '.OAABAAA',
      '.OAAAAAB',
      '.OAAAAAA',
      '..OAAAAA',
      '..OOOOOO',
      '........'
    ]
  },
  {
    name: 'シャドラ', type: 'dark',
    colors: { A: '#7e5cd6', B: '#5a3fa8', C: '#c08bff' },
    half: [
      '....OOOO',
      '...OAAAA',
      '..OAAAAA',
      '.OAAWKAA',
      '.OAAAAAA',
      '.OAAAAAA',
      '.OAABBAA',
      '.OAABBAA',
      '.OAAAAAA',
      '..OAAAAA',
      '..OAAAAA',
      '..OAAAAA',
      '..OAAOAA',
      '...OA.OA',
      '....O..O',
      '........'
    ]
  },
  {
    name: 'ピクシン', type: 'light',
    colors: { A: '#ff9fd0', B: '#ffd5ec', C: '#fff7b0' },
    half: [
      '....C...',
      '........',
      '....OOOO',
      '...OAAAA',
      '..OAWKAA',
      '..OAAAAA',
      '...OAAAA',
      'WWOAABAA',
      'WWOAABAA',
      '.WOAAAAA',
      '..OAAAAA',
      '..OAAAAA',
      '...OAAAA',
      '...OAAO.',
      '....OO..',
      '........'
    ]
  },
  {
    name: 'ドラゴル', type: 'dragon',
    colors: { A: '#3fc9b0', B: '#a8f0d8', C: '#ff8a5a' },
    half: [
      '...C....',
      '...CC...',
      '...OOOOO',
      '..OAAAAA',
      '.OAAWKAA',
      '.OAAAAAA',
      '.OAAAAAA',
      '..OAAAAA',
      'CCOAABBA',
      'CCOAABBA',
      '.COAABBA',
      '..OAABBA',
      '..OAAAAA',
      '...OAAAA',
      '..OAAO..',
      '...OO...'
    ]
  }
];

const EGG_HALF = [
  '........',
  '.....OOO',
  '....OAAA',
  '...OAABA',
  '...OABAA',
  '..OAABAA',
  '..OAAABB',
  '..OABAAA',
  '..OAAAAB',
  '..OAABAA',
  '..OABAAA',
  '..OAAAAA',
  '...OAAAA',
  '...OAAAA',
  '....OAAA',
  '.....OOO'
];

function expandHalf(half) {
  return half.map(r => {
    const row = r.padEnd(8, '.').slice(0, 8);
    return row + [...row].reverse().join('');
  });
}

function basePalette(colors) {
  return { O: OUTLINE, W: EYE_W, K: EYE_K, A: colors.A, B: colors.B, C: colors.C };
}

function drawSprite(cv, sprite) {
  cv.width = 16; cv.height = 16;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, 16, 16);
  sprite.grid.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      const c = sprite.palette[ch];
      if (!c) return;
      ctx.fillStyle = c;
      ctx.fillRect(x, y, 1, 1);
    });
  });
}

function spriteCanvas(sprite, cls) {
  const cv = el('canvas', 'pixel' + (cls ? ' ' + cls : ''));
  drawSprite(cv, sprite);
  return cv;
}

/* ---------- モンスター生成・成長 ---------- */
const BASE_STATS = {
  fire:     { hp: 44, atk: 16, def: 9,  spd: 13 },
  water:    { hp: 50, atk: 13, def: 12, spd: 11 },
  grass:    { hp: 52, atk: 12, def: 13, spd: 9 },
  electric: { hp: 42, atk: 15, def: 8,  spd: 17 },
  rock:     { hp: 58, atk: 14, def: 17, spd: 5 },
  dark:     { hp: 46, atk: 17, def: 9,  spd: 12 },
  light:    { hp: 48, atk: 13, def: 11, spd: 14 },
  dragon:   { hp: 54, atk: 18, def: 12, spd: 12 }
};

function makeMonster(speciesIdx, lvl) {
  const sp = SPECIES[speciesIdx];
  return {
    id: uid(),
    name: sp.name,
    types: [sp.type],
    lvl: lvl || 1,
    exp: 0,
    rank: 0,
    base: Object.assign({}, BASE_STATS[sp.type]),
    sprite: { grid: expandHalf(sp.half), palette: basePalette(sp.colors) }
  };
}

function statsOf(m) {
  const g = 1 + (m.lvl - 1) * 0.12;
  const rb = 1 + m.rank * 0.18;
  return {
    maxhp: Math.floor(m.base.hp * g * rb),
    atk: Math.floor(m.base.atk * g * rb),
    def: Math.floor(m.base.def * g * rb),
    spd: Math.floor(m.base.spd * g * rb)
  };
}

function expNext(m) { return m.lvl * 60; }

function skillsOf(m) {
  const list = [{ name: 'たいあたり', type: null, pow: 1.0, pp: Infinity }];
  m.types.forEach(t => {
    const s = TYPES[t].skill;
    list.push({ name: s.name, type: t, pow: s.pow, pp: 5 });
  });
  return list;
}

/* ---------- 合成 ---------- */
function fuseName(a, b) {
  const head = a.slice(0, Math.ceil(a.length / 2));
  const tail = b.slice(Math.floor(b.length / 2));
  let n = head + tail;
  if (n === a || n === b) n = b.slice(0, 2) + a.slice(-2);
  return n.slice(0, 8);
}

function fuseMonsters(a, b) {
  const grid = [...a.sprite.grid.slice(0, 8), ...b.sprite.grid.slice(8)];
  const palette = {
    O: OUTLINE, W: EYE_W, K: EYE_K,
    A: a.sprite.palette.A,
    B: b.sprite.palette.A,
    C: mixColor(a.sprite.palette.C, b.sprite.palette.C)
  };
  const types = [...new Set([a.types[0], b.types[0]])];
  const fusedBase = {};
  for (const k of ['hp', 'atk', 'def', 'spd']) {
    const hi = Math.max(a.base[k], b.base[k]);
    const lo = Math.min(a.base[k], b.base[k]);
    fusedBase[k] = Math.round(hi * 0.9 + lo * 0.45);
  }
  return {
    id: uid(),
    name: fuseName(a.name, b.name),
    types,
    lvl: Math.floor((a.lvl + b.lvl) / 2) + 1,
    exp: 0,
    rank: Math.min(9, Math.max(a.rank, b.rank) + 1),
    base: fusedBase,
    sprite: { grid, palette }
  };
}

/* ---------- セーブデータ ---------- */
const SAVE_KEY = 'monfus_save_v1';
const MAX_MONS = 24;
let state = { mons: [] };

function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (e) { /* noop */ } }
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (d && Array.isArray(d.mons) && d.mons.length) { state = d; return true; }
  } catch (e) { /* noop */ }
  return false;
}
function newGame() {
  state = { mons: [makeMonster(0, 5), makeMonster(1, 5), makeMonster(2, 5)] };
  save();
}

/* ---------- 画面遷移 ---------- */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

/* ---------- 共通UI ---------- */
function typeChips(m) {
  const wrap = el('div', 'type-chips');
  m.types.forEach(t => {
    const c = el('span', 'type-chip', TYPES[t].name);
    c.style.background = TYPES[t].color;
    wrap.appendChild(c);
  });
  return wrap;
}

function monCard(m, onTap) {
  const card = el('div', 'mon-card');
  if (m.rank > 0) card.appendChild(el('div', 'mon-rank', '★'.repeat(Math.min(m.rank, 5)) + (m.rank > 5 ? '+' + (m.rank - 5) : '')));
  card.appendChild(spriteCanvas(m.sprite));
  card.appendChild(el('div', 'mon-name', m.name));
  card.appendChild(el('div', 'mon-lv', 'Lv.' + m.lvl));
  card.appendChild(typeChips(m));
  card.addEventListener('click', () => { AudioFX.play('tap'); onTap(m, card); });
  return card;
}

function openModal(content) {
  const bg = el('div', 'modal-bg');
  const box = el('div', 'modal');
  box.appendChild(content);
  bg.appendChild(box);
  $('#modal-root').appendChild(bg);
  return bg;
}
function closeModal(bg) { bg.remove(); }

function simpleDialog(title, body, btnText) {
  return new Promise(resolve => {
    const c = el('div');
    c.appendChild(el('h3', null, title));
    if (body) c.appendChild(el('p', 'note', body));
    const btns = el('div', 'modal-btns');
    const ok = el('button', 'modal-btn primary', btnText || 'OK');
    btns.appendChild(ok);
    c.appendChild(btns);
    const bg = openModal(c);
    ok.addEventListener('click', () => { AudioFX.play('tap'); closeModal(bg); resolve(); });
  });
}

function confirmDialog(title, body, yesText, danger) {
  return new Promise(resolve => {
    const c = el('div');
    c.appendChild(el('h3', null, title));
    if (body) c.appendChild(el('p', 'note', body));
    const btns = el('div', 'modal-btns');
    const no = el('button', 'modal-btn', 'やめる');
    const yes = el('button', 'modal-btn ' + (danger ? 'danger' : 'primary'), yesText || 'OK');
    btns.appendChild(no); btns.appendChild(yes);
    c.appendChild(btns);
    const bg = openModal(c);
    no.addEventListener('click', () => { AudioFX.play('tap'); closeModal(bg); resolve(false); });
    yes.addEventListener('click', () => { AudioFX.play('tap'); closeModal(bg); resolve(true); });
  });
}

/* ---------- ホーム ---------- */
function renderHome() {
  $('#home-info').textContent = `なかま: ${state.mons.length} / ${MAX_MONS}匹  ▶ モンスターをタップで詳細`;
  const grid = $('#monster-grid');
  grid.innerHTML = '';
  state.mons.forEach(m => grid.appendChild(monCard(m, showDetail)));
}

function statRow(label, val, max) {
  const r = el('div', 'stat-row');
  r.appendChild(el('span', 's-label', label));
  const g = el('div', 'stat-gauge');
  const i = el('i');
  i.style.width = Math.min(100, val / max * 100) + '%';
  g.appendChild(i);
  r.appendChild(g);
  r.appendChild(el('span', 's-val', String(val)));
  return r;
}

function showDetail(m) {
  const st = statsOf(m);
  const c = el('div');
  c.appendChild(el('h3', null, m.name));
  const cv = spriteCanvas(m.sprite, 'detail-canvas');
  c.appendChild(cv);
  c.appendChild(typeChips(m));
  c.appendChild(el('p', 'note', `Lv.${m.lvl}  EXP ${m.exp}/${expNext(m)}` + (m.rank ? `  合成ランク★${m.rank}` : '')));
  const rows = el('div', 'stat-rows');
  rows.appendChild(statRow('HP', st.maxhp, 400));
  rows.appendChild(statRow('こうげき', st.atk, 120));
  rows.appendChild(statRow('ぼうぎょ', st.def, 120));
  rows.appendChild(statRow('すばやさ', st.spd, 120));
  c.appendChild(rows);
  const btns = el('div', 'modal-btns');
  const release = el('button', 'modal-btn danger', 'にがす');
  const close = el('button', 'modal-btn primary', 'とじる');
  btns.appendChild(release); btns.appendChild(close);
  c.appendChild(btns);
  const bg = openModal(c);
  close.addEventListener('click', () => { AudioFX.play('tap'); closeModal(bg); });
  release.addEventListener('click', async () => {
    closeModal(bg);
    if (state.mons.length <= 1) { await simpleDialog('にがせない!', '最後の1匹はにがせないよ。'); return; }
    if (await confirmDialog(`${m.name}をにがす?`, 'にがしたモンスターは戻ってこないよ。', 'にがす', true)) {
      state.mons = state.mons.filter(x => x.id !== m.id);
      save(); renderHome();
    }
  });
}

/* ---------- 探索(モンスター入手) ---------- */
const eggSprite = () => ({
  grid: expandHalf(EGG_HALF),
  palette: { O: OUTLINE, A: '#f2e9d8', B: pick(['#ff8a5a', '#3fd2ff', '#9a6cff', '#41c463', '#ffd23c']) }
});

async function doExplore() {
  if (state.mons.length >= MAX_MONS) {
    await simpleDialog('いっぱいだ!', 'なかまがいっぱいだよ。合成かにがすで整理しよう。');
    return;
  }
  const overlay = el('div', 'overlay');
  $('#overlay-root').appendChild(overlay);

  const eggCv = spriteCanvas(eggSprite(), 'egg');
  const caption = el('div', 'reveal-caption', 'なにかが見つかった…!');
  overlay.appendChild(eggCv);
  overlay.appendChild(caption);

  await sleep(400);
  eggCv.classList.add('shaking');
  AudioFX.play('tap');
  for (let i = 0; i < 3; i++) {
    await sleep(500);
    AudioFX.play('hit');
    FX.shake();
    const p = centerOf(eggCv);
    FX.burst(p.x, p.y, ['#fff', '#ffd23c'], 8, 4);
  }
  await sleep(300);

  const avg = Math.max(1, Math.round(state.mons.reduce((s, m) => s + m.lvl, 0) / state.mons.length));
  const mon = makeMonster(rndi(0, SPECIES.length - 1), Math.max(1, avg + rndi(-2, 1)));
  state.mons.push(mon);
  save();

  const p = centerOf(eggCv);
  AudioFX.play('boom');
  FX.flash();
  FX.shake(true);
  FX.burst(p.x, p.y, ['#fff', '#ffd23c', mon.sprite.palette.A], 50, 9);
  FX.ring(p.x, p.y, '#ffd23c');

  overlay.innerHTML = '';
  const wrap = el('div', 'reveal-wrap');
  wrap.appendChild(el('div', 'rays'));
  wrap.appendChild(spriteCanvas(mon.sprite, 'reveal-mon'));
  wrap.appendChild(el('div', 'reveal-name', mon.name));
  wrap.appendChild(el('div', 'reveal-caption', `${TYPES[mon.types[0]].name}タイプ Lv.${mon.lvl} があらわれた!`));
  const ok = el('button', 'modal-btn primary', 'なかまにする!');
  ok.style.cssText = 'margin-top:18px;padding:14px 40px;border-radius:14px;';
  wrap.appendChild(ok);
  overlay.appendChild(wrap);
  AudioFX.play('get');
  FX.stars(innerWidth / 2, innerHeight / 2 - 40, ['#ffd23c', '#fff', '#ff9ad5'], 16);

  await new Promise(r => ok.addEventListener('click', r, { once: true }));
  AudioFX.play('tap');
  overlay.remove();
  renderHome();
}

/* ---------- 合成画面 ---------- */
const fusionSel = { a: null, b: null };

function renderFusion() {
  fusionSel.a = null; fusionSel.b = null;
  updateFusionSlots();
  const list = $('#fusion-list');
  list.innerHTML = '';
  state.mons.forEach(m => {
    const card = monCard(m, () => toggleFusionPick(m, card));
    card.dataset.mid = m.id;
    list.appendChild(card);
  });
}

function toggleFusionPick(m, card) {
  if (fusionSel.a && fusionSel.a.id === m.id) fusionSel.a = null;
  else if (fusionSel.b && fusionSel.b.id === m.id) fusionSel.b = null;
  else if (!fusionSel.a) fusionSel.a = m;
  else if (!fusionSel.b) fusionSel.b = m;
  else { fusionSel.a = fusionSel.b; fusionSel.b = m; }
  document.querySelectorAll('#fusion-list .mon-card').forEach(c => {
    const id = c.dataset.mid;
    c.classList.toggle('selected', (fusionSel.a && fusionSel.a.id === id) || (fusionSel.b && fusionSel.b.id === id));
  });
  updateFusionSlots();
}

function updateFusionSlots() {
  const fill = (slot, m, label) => {
    slot.innerHTML = '';
    if (m) {
      slot.classList.add('filled');
      slot.appendChild(spriteCanvas(m.sprite));
      slot.appendChild(el('div', 'slot-name', `${m.name} Lv.${m.lvl}`));
    } else {
      slot.classList.remove('filled');
      slot.appendChild(el('span', 'slot-empty', label));
    }
  };
  fill($('#slot-a'), fusionSel.a, '素材①<br>を選択');
  fill($('#slot-b'), fusionSel.b, '素材②<br>を選択');
  $('#btn-do-fusion').disabled = !(fusionSel.a && fusionSel.b);
}

async function doFusion() {
  const a = fusionSel.a, b = fusionSel.b;
  if (!a || !b) return;
  const child = fuseMonsters(a, b);

  const overlay = el('div', 'overlay');
  const stage = el('div', 'fusion-stage');
  const cvA = spriteCanvas(a.sprite, 'fusion-mon from-left');
  const cvB = spriteCanvas(b.sprite, 'fusion-mon from-right');
  stage.appendChild(cvA); stage.appendChild(cvB);
  overlay.appendChild(stage);
  overlay.appendChild(el('div', 'reveal-caption', '✨ 合成中… ✨'));
  $('#overlay-root').appendChild(overlay);

  const cx = innerWidth / 2, cy = innerHeight * 0.42;
  AudioFX.play('fusion');
  FX.vortexStart(cx, cy, [a.sprite.palette.A, b.sprite.palette.A, '#ffffff', '#ffd23c']);
  await sleep(1500);
  FX.vortexStop();

  AudioFX.play('boom');
  FX.flash();
  FX.shake(true);
  FX.ring(cx, cy, '#fff');
  FX.ring(cx, cy, child.sprite.palette.A);
  setTimeout(() => FX.ring(cx, cy, child.sprite.palette.B), 120);
  FX.burst(cx, cy, ['#fff', '#ffd23c', child.sprite.palette.A, child.sprite.palette.B], 60, 10);
  await sleep(250);

  // データ反映
  state.mons = state.mons.filter(m => m.id !== a.id && m.id !== b.id);
  state.mons.push(child);
  save();

  overlay.innerHTML = '';
  const wrap = el('div', 'reveal-wrap');
  wrap.appendChild(el('div', 'rays'));
  wrap.appendChild(spriteCanvas(child.sprite, 'reveal-mon'));
  wrap.appendChild(el('div', 'reveal-name', child.name));
  wrap.appendChild(el('div', 'reveal-caption',
    `${child.types.map(t => TYPES[t].name).join('・')}タイプ Lv.${child.lvl} ★ランク${child.rank}<br>新たなモンスターが誕生した!!`));
  const ok = el('button', 'modal-btn primary', 'やったー!!');
  ok.style.cssText = 'margin-top:18px;padding:14px 40px;border-radius:14px;';
  wrap.appendChild(ok);
  overlay.appendChild(wrap);
  AudioFX.play('lvup');
  FX.confetti();
  FX.stars(cx, cy, ['#ffd23c', '#fff', child.sprite.palette.A], 20);

  await new Promise(r => ok.addEventListener('click', r, { once: true }));
  AudioFX.play('tap');
  overlay.remove();
  renderHome();
  show('#screen-home');
}

/* ---------- バトル ---------- */
const battle = { me: null, foe: null, meHp: 0, foeHp: 0, meSt: null, foeSt: null, skills: [], busy: false };

function makeEnemy() {
  const avg = Math.max(1, Math.round(state.mons.reduce((s, m) => s + m.lvl, 0) / state.mons.length));
  const lvl = Math.max(1, avg + rndi(-1, 2));
  if (avg >= 7 && Math.random() < 0.3) {
    const x = makeMonster(rndi(0, SPECIES.length - 1), lvl);
    const y = makeMonster(rndi(0, SPECIES.length - 1), lvl);
    const f = fuseMonsters(x, y);
    f.lvl = lvl;
    return f;
  }
  return makeMonster(rndi(0, SPECIES.length - 1), lvl);
}

function pickBattleMon() {
  const c = el('div');
  c.appendChild(el('h3', null, '⚔️ だれで戦う?'));
  const grid = el('div', 'monster-grid small');
  grid.style.cssText = 'max-height:46dvh;padding:4px 0;';
  const bg = openModal(c);
  state.mons.forEach(m => grid.appendChild(monCard(m, () => { closeModal(bg); startBattle(m); })));
  c.appendChild(grid);
  const btns = el('div', 'modal-btns');
  const cancel = el('button', 'modal-btn', 'やめる');
  btns.appendChild(cancel);
  c.appendChild(btns);
  cancel.addEventListener('click', () => { AudioFX.play('tap'); closeModal(bg); });
}

function hpPlate(plateEl, m, hp, st) {
  const pct = Math.max(0, hp / st.maxhp * 100);
  const cls = pct <= 25 ? 'low' : pct <= 55 ? 'mid' : '';
  plateEl.innerHTML =
    `<div class="p-name"><span>${m.name}</span><span class="p-lv">Lv.${m.lvl}</span></div>
     <div class="hp-bar"><div class="hp-fill ${cls}" style="width:${pct}%"></div></div>
     <div class="hp-num">${Math.max(0, hp)} / ${st.maxhp}</div>`;
}

function logMsg(html) { $('#battle-log').innerHTML = html; }

function renderCmds() {
  const box = $('#battle-cmds');
  box.innerHTML = '';
  battle.skills.forEach((s, i) => {
    const color = s.type ? TYPES[s.type].color : null;
    const b = el('button', 'skill-btn',
      `${s.name}<span class="pp">${s.pp === Infinity ? '∞' : 'のこり' + s.pp + '回'}</span>`);
    if (color) b.style.background = `linear-gradient(180deg, ${color}, ${mixColor(color, '#000000')})`;
    b.disabled = s.pp <= 0;
    b.addEventListener('click', () => playerAct(i));
    box.appendChild(b);
  });
  const run = el('button', 'skill-btn run', 'にげる');
  run.addEventListener('click', tryRun);
  box.appendChild(run);
}

function startBattle(mon) {
  battle.me = mon;
  battle.foe = makeEnemy();
  battle.meSt = statsOf(mon);
  battle.foeSt = statsOf(battle.foe);
  battle.meHp = battle.meSt.maxhp;
  battle.foeHp = battle.foeSt.maxhp;
  battle.skills = skillsOf(mon);
  battle.foeSkills = skillsOf(battle.foe);
  battle.busy = false;

  drawSprite($('#player-canvas'), mon.sprite);
  drawSprite($('#enemy-canvas'), battle.foe.sprite);
  $('#player-wrap').className = 'sprite-wrap';
  $('#enemy-wrap').className = 'sprite-wrap';
  hpPlate($('#player-plate'), mon, battle.meHp, battle.meSt);
  hpPlate($('#enemy-plate'), battle.foe, battle.foeHp, battle.foeSt);
  renderCmds();
  show('#screen-battle');
  logMsg(`野生の <b>${battle.foe.name}</b> (Lv.${battle.foe.lvl}) があらわれた!`);
  AudioFX.play('magic');
  const p = centerOf($('#enemy-wrap'));
  FX.burst(p.x, p.y, ['#fff', battle.foe.sprite.palette.A], 20, 5);
}

function calcDamage(attSt, defSt, skill, attTypes, defTypes) {
  let eff = 1;
  if (skill.type) {
    defTypes.forEach(dt => {
      if ((STRONG[skill.type] || []).includes(dt)) eff *= 1.8;
      if ((STRONG[dt] || []).includes(skill.type)) eff *= 0.6;
    });
  }
  const crit = Math.random() < 0.12 ? 1.6 : 1;
  const raw = attSt.atk * skill.pow * eff * crit * rnd(0.85, 1.15) - defSt.def * 0.45;
  return { dmg: Math.max(1, Math.round(raw)), eff, crit: crit > 1 };
}

async function attackAnim(isPlayer, skill, result, target) {
  const atkWrap = $(isPlayer ? '#player-wrap' : '#enemy-wrap');
  const defWrap = $(isPlayer ? '#enemy-wrap' : '#player-wrap');
  atkWrap.classList.add(isPlayer ? 'lunge-right' : 'lunge-left');
  await sleep(260);

  const p = centerOf(defWrap);
  const color = skill.type ? TYPES[skill.type].color : '#ffffff';
  if (result.crit) {
    AudioFX.play('crit');
    FX.flash(color);
    FX.shake(true);
    FX.burst(p.x, p.y, [color, '#fff', '#ffd23c'], 44, 9);
    FX.ring(p.x, p.y, color);
    FX.ring(p.x, p.y, '#fff');
  } else {
    AudioFX.play(skill.type ? 'magic' : 'hit');
    FX.shake();
    FX.burst(p.x, p.y, [color, '#fff'], 26, 7);
    FX.ring(p.x, p.y, color);
  }
  if (result.eff > 1) FX.stars(p.x, p.y - 20, ['#ffd23c', '#fff'], 10);
  defWrap.classList.add('hit');
  FX.pop(p.x, p.y - 30, String(result.dmg), result.crit ? 'crit' : '');
  if (result.eff > 1) FX.pop(p.x, p.y - 70, 'こうかばつぐん!', 'label');
  if (result.eff < 1) FX.pop(p.x, p.y - 70, 'いまひとつ…', 'label');

  await sleep(420);
  atkWrap.classList.remove('lunge-right', 'lunge-left');
  defWrap.classList.remove('hit');
}

async function playerAct(skillIdx) {
  if (battle.busy) return;
  battle.busy = true;
  const skill = battle.skills[skillIdx];
  if (skill.pp !== Infinity) skill.pp--;
  renderCmds();
  disableCmds(true);

  const meFirst = battle.meSt.spd >= battle.foeSt.spd;
  const foeSkill = pickFoeSkill();

  if (meFirst) {
    if (await doAttack(true, skill)) return;
    if (await doAttack(false, foeSkill)) return;
  } else {
    if (await doAttack(false, foeSkill)) return;
    if (await doAttack(true, skill)) return;
  }
  battle.busy = false;
  disableCmds(false);
  logMsg('どうする?');
}

function pickFoeSkill() {
  const usable = battle.foeSkills.filter(s => s.pp > 0 || s.pp === Infinity);
  const typed = usable.filter(s => s.type);
  const s = (typed.length && Math.random() < 0.65) ? pick(typed) : usable[0];
  if (s.pp !== Infinity) s.pp--;
  return s;
}

function disableCmds(dis) {
  document.querySelectorAll('#battle-cmds button').forEach((b, i) => {
    const s = battle.skills[i];
    b.disabled = dis || (s && s.pp <= 0);
  });
}

/* 戻り値 true = バトル終了 */
async function doAttack(isPlayer, skill) {
  const att = isPlayer ? battle.me : battle.foe;
  const attSt = isPlayer ? battle.meSt : battle.foeSt;
  const defSt = isPlayer ? battle.foeSt : battle.meSt;
  const defTypes = isPlayer ? battle.foe.types : battle.me.types;

  logMsg(`<b>${att.name}</b> の ${skill.name}!`);
  const result = calcDamage(attSt, defSt, skill, att.types, defTypes);
  await attackAnim(isPlayer, skill, result);

  if (isPlayer) {
    battle.foeHp -= result.dmg;
    hpPlate($('#enemy-plate'), battle.foe, battle.foeHp, battle.foeSt);
    if (battle.foeHp <= 0) { await winBattle(); return true; }
  } else {
    battle.meHp -= result.dmg;
    hpPlate($('#player-plate'), battle.me, battle.meHp, battle.meSt);
    if (battle.meHp <= 0) { await loseBattle(); return true; }
  }
  await sleep(350);
  return false;
}

async function tryRun() {
  if (battle.busy) return;
  battle.busy = true;
  disableCmds(true);
  AudioFX.play('tap');
  if (Math.random() < 0.6) {
    logMsg('うまく にげきれた!');
    await sleep(800);
    show('#screen-home');
    renderHome();
    return;
  }
  logMsg('にげられなかった!');
  await sleep(600);
  if (await doAttack(false, pickFoeSkill())) return;
  battle.busy = false;
  disableCmds(false);
  logMsg('どうする?');
}

async function winBattle() {
  const foeWrap = $('#enemy-wrap');
  const p = centerOf(foeWrap);
  AudioFX.play('ko');
  foeWrap.classList.add('ko');
  FX.burst(p.x, p.y, [battle.foe.sprite.palette.A, '#fff', '#ffd23c'], 50, 9);
  FX.ring(p.x, p.y, '#fff');
  FX.shake(true);
  logMsg(`<b>${battle.foe.name}</b> をたおした!!`);
  await sleep(900);

  // 経験値
  const gain = battle.foe.lvl * 25 + (battle.foe.rank > 0 ? 40 : 0);
  battle.me.exp += gain;
  logMsg(`${gain} の経験値をかくとく!`);
  AudioFX.play('get');
  let lvUp = false;
  while (battle.me.exp >= expNext(battle.me)) {
    battle.me.exp -= expNext(battle.me);
    battle.me.lvl++;
    lvUp = true;
  }
  await sleep(900);
  if (lvUp) {
    const pp = centerOf($('#player-wrap'));
    AudioFX.play('lvup');
    FX.flash('#ffd23c');
    FX.stars(pp.x, pp.y, ['#ffd23c', '#fff'], 18);
    FX.ring(pp.x, pp.y, '#ffd23c');
    FX.pop(pp.x, pp.y - 50, 'LEVEL UP!', 'crit');
    logMsg(`<b>${battle.me.name}</b> は Lv.${battle.me.lvl} にあがった!!`);
    await sleep(1100);
  }
  save();

  // 仲間勧誘
  if (state.mons.length < MAX_MONS && Math.random() < 0.45) {
    const join = await confirmDialog(
      `${battle.foe.name}が おきあがって こちらを見ている…`,
      'なかまに しますか?', 'なかまにする!');
    if (join) {
      battle.foe.exp = 0;
      state.mons.push(battle.foe);
      save();
      AudioFX.play('get');
      FX.confetti();
      await simpleDialog(`${battle.foe.name}が なかまになった!`, '', 'やったー!');
    }
  }
  show('#screen-home');
  renderHome();
}

async function loseBattle() {
  const meWrap = $('#player-wrap');
  const p = centerOf(meWrap);
  AudioFX.play('lose');
  meWrap.classList.add('ko');
  FX.burst(p.x, p.y, ['#888', '#aaa'], 30, 6);
  logMsg(`<b>${battle.me.name}</b> はたおれてしまった… 目の前がまっくらになった!`);
  await sleep(1600);
  await simpleDialog('まけてしまった…', 'なかまは元気をとりもどした。また挑戦しよう!');
  show('#screen-home');
  renderHome();
}

/* ---------- 初期化 ---------- */
function init() {
  FX.init();

  // タイトルのマスコット
  const titleMon = makeMonster(rndi(0, SPECIES.length - 1), 1);
  drawSprite($('#title-mon'), titleMon.sprite);
  setInterval(() => {
    const p = centerOf($('#title-mon'));
    if ($('#screen-title').classList.contains('active')) {
      FX.stars(p.x + rnd(-80, 80), p.y + rnd(-70, 50), ['#ffd23c', '#ff9ad5', '#7fd8ff'], 2);
    }
  }, 600);

  $('#screen-title').addEventListener('click', () => {
    AudioFX.init();
    AudioFX.play('get');
    FX.flash();
    FX.confetti();
    if (!load()) newGame();
    renderHome();
    show('#screen-home');
  }, { once: false });

  $('#btn-explore').addEventListener('click', () => { AudioFX.play('tap'); doExplore(); });
  $('#btn-fusion').addEventListener('click', () => {
    AudioFX.play('tap');
    if (state.mons.length < 2) { simpleDialog('合成できない!', 'モンスターが2匹以上ひつようだよ。探索でなかまを見つけよう!'); return; }
    renderFusion();
    show('#screen-fusion');
  });
  $('#btn-battle').addEventListener('click', () => { AudioFX.play('tap'); pickBattleMon(); });
  $('#btn-do-fusion').addEventListener('click', () => { AudioFX.play('tap'); doFusion(); });

  document.querySelectorAll('[data-back]').forEach(b =>
    b.addEventListener('click', () => { AudioFX.play('tap'); renderHome(); show('#screen-home'); }));

  $('#btn-sound').addEventListener('click', e => {
    AudioFX.on = !AudioFX.on;
    e.currentTarget.textContent = AudioFX.on ? '🔊' : '🔇';
    AudioFX.play('tap');
  });
  $('#btn-reset').addEventListener('click', async () => {
    if (await confirmDialog('データをリセット?', 'すべてのモンスターが消えて最初からになるよ。', 'リセットする', true)) {
      newGame();
      renderHome();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

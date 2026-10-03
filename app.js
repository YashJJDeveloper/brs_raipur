const rows = [
  [
    "7003",
    "variety.7003",
    "hybrid",
    "115–120",
    "105–110",
    "250–300",
    "28–30",
    "sowing.summerWinter",
    "grain.mediumFine",
    "12–14"
  ],
  [
    "7004",
    "variety.7004",
    "hybrid",
    "120–125",
    "100–105",
    "200–250",
    "26–28",
    "sowing.summerWinter",
    "grain.boldPoha",
    "10–12"
  ],
  [
    "7005",
    "variety.7005",
    "hybrid",
    "130–135",
    "108–112",
    "280–300",
    "25–28",
    "sowing.summer",
    "grain.mediumBold",
    "12–14"
  ],
  [
    "7006",
    "variety.7006",
    "hybrid",
    "130–135",
    "100–105",
    "225–250",
    "26–28",
    "sowing.summer",
    "grain.boldPoha",
    "10–12"
  ],
  [
    "7008",
    "variety.7008",
    "hybrid",
    "135–140",
    "110–115",
    "250–300",
    "26–28",
    "sowing.summer",
    "grain.boldPoha",
    "10–12"
  ],
  [
    "8602",
    "variety.8602",
    "improved",
    "105–110",
    "100–105",
    "200–220",
    "25–28",
    "sowing.summerWinter",
    "grain.shortBold",
    "8–10",
    "ANNADHA"
  ],
  [
    "8603",
    "variety.8603",
    "improved",
    "105–110",
    "110–115",
    "210–225",
    "28–30",
    "sowing.summerWinter",
    "grain.mediumBold",
    "8–10",
    "BAHAR"
  ],
  [
    "8605",
    "variety.8605",
    "improved",
    "115–120",
    "110–115",
    "180–200",
    "26–28",
    "sowing.summerWinter",
    "grain.boldPoha",
    "7–8",
    "MAHABALI"
  ],
  [
    "8606",
    "variety.8606",
    "improved",
    "100–105",
    "110–115",
    "250–280",
    "26–28",
    "sowing.summerWinter",
    "grain.mediumFineThin",
    "8–10",
    "SHATANSH"
  ],
  [
    "8607",
    "variety.8607",
    "improved",
    "115–120",
    "105–110",
    "200–250",
    "28–30",
    "sowing.summerWinter",
    "grain.mediumBold",
    "8–10",
    "SADABAHAR"
  ],
  [
    "8609",
    "variety.8609",
    "improved",
    "125–130",
    "105–110",
    "200–220",
    "26–28",
    "sowing.summerWinter",
    "grain.shortBold",
    "8–10",
    "SILK"
  ],
  [
    "8611",
    "variety.8611",
    "improved",
    "130–135",
    "110–115",
    "250–300",
    "28–30",
    "sowing.summerWinter",
    "grain.mediumFineThin",
    "10–12",
    "ANNAPURNA"
  ],
  [
    "8612",
    "variety.8612",
    "improved",
    "135–140",
    "105–110",
    "280–320",
    "26–28",
    "sowing.summer",
    "grain.fine",
    "10–12",
    "BHUVAN"
  ],
  [
    "8613",
    "variety.8613",
    "improved",
    "130–135",
    "110–115",
    "200–220",
    "26–28",
    "sowing.summer",
    "grain.boldPoha",
    "8–10",
    "BALWAN"
  ],
  [
    "8614",
    "variety.8614",
    "improved",
    "130–135",
    "105–110",
    "180–200",
    "26–28",
    "sowing.summer",
    "grain.mediumLongBold",
    "8–10",
    "MUGDHA GOLD"
  ],
  [
    "8617",
    "variety.8617",
    "improved",
    "140–145",
    "115–120",
    "180–200",
    "28–30",
    "sowing.summer",
    "grain.mediumRounded",
    "7–9",
    "SANJANA"
  ],
  [
    "8618",
    "variety.8618",
    "improved",
    "140–145",
    "115–120",
    "200–250",
    "27–29",
    "sowing.summer",
    "grain.bold",
    "8–10",
    "JAMNA"
  ],
  [
    "8620",
    "variety.8620",
    "improved",
    "140–145",
    "100–105",
    "180–200",
    "25–28",
    "sowing.summer",
    "grain.mediumBold",
    "7–9",
    "RED GOLD"
  ],
  [
    "8623",
    "variety.8623",
    "improved",
    "120–125",
    "105–110",
    "200–250",
    "28–30",
    "sowing.summerWinter",
    "grain.mediumBold",
    "8–10",
    "DAKSHYA"
  ],
  [
    "8624",
    "variety.8624",
    "improved",
    "130–135",
    "105–110",
    "180–200",
    "26–28",
    "sowing.summer",
    "grain.mediumLongBold",
    "8–10",
    "GAURAV GOLD"
  ]
];
const translations = window.BRSTranslations;
let language = 'hi';
try { const saved = localStorage.getItem('brs-language'); if (translations[saved]) language = saved; } catch (_) {}
let filter = 'all';
let selectedCode = null;
const grid = document.querySelector('#products');
const search = document.querySelector('#search');
const dialog = document.querySelector('#detail');
function t(key, values = {}) {
    const text = translations[language][key] ?? translations.hi[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
}
// All product and featured images resolve through images.js.
function imageSource(code) {
    const source = window.BRSImages?.products?.[code];
    if (typeof source !== 'string' || !source.trim()) return '';
    const value = source.trim();
    // Allow image paths and web URLs, keeping executable URL schemes out of markup.
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value) && !/^https?:\/\//i.test(value)) return '';
    return value;
}
function imageAttribute(code) {
    return imageSource(code).replace(/[&"<>']/g, character => ({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;',"'":'&#39;'}[character]));
}
function refreshImages() {
    document.querySelectorAll('img[data-product-image]').forEach(image => {
        const source = imageSource(image.dataset.productImage);
        if (source) { image.src = source; image.hidden = false; }
        else { image.removeAttribute('src'); image.hidden = true; }
    });
    render();
    if (dialog.open && selectedCode) renderDetail(selectedCode);
}

function category(row) { return t('category.' + row[2]); }
function productCode(row) { return `BRS-${row[0]}`; }
function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const selected = rows.filter(row => (filter === 'all' || row[2] === filter) &&
        [productCode(row), translations.hi[row[1]], translations.en[row[1]], row[10] || ''].join(' ').toLocaleLowerCase().includes(query));
    grid.innerHTML = selected.map(row => {
        const name = t(row[1]);
        return `<button class="product" data-code="${row[0]}" aria-label="${t('product.details', {name, code: row[0]})}"><div class="product-img"><img ${imageSource(row[0]) ? `src="${imageAttribute(row[0])}"` : 'hidden'} alt="${t('product.alt', {name})}" loading="lazy" width="170" height="205"></div><div class="product-info"><span class="category">${category(row)}</span><h3>${name}</h3><span class="code">${productCode(row)}${language === 'hi' && row[10] ? ' · ' + row[10] : ''}</span><div class="product-stats"><span>${row[3]} ${t('unit.days')}</span><span>${t(row[8])}</span></div></div></button>`;
    }).join('');
    document.querySelector('#count').textContent = t('catalog.count', { count: selected.length });
    document.querySelector('#empty').hidden = selected.length > 0;
}
function renderDetail(code) {
    const row = rows.find(row => row[0] === code);
    const name = t(row[1]);
    const specs = [
        ['detail.duration', `${row[3]} ${t('unit.days')}`],
        ['detail.height', `${row[4]} ${t('unit.cm')}`],
        ['detail.grains', row[5]],
        ['detail.length', `${row[6]} ${t('unit.cm')}`],
        ['detail.sowing', t(row[7])],
        ['detail.rate', `${row[2] === 'hybrid' ? '6–8' : '12'} ${t('unit.kg')}`],
        ['detail.grain', t(row[8])],
        ['detail.tillers', row[9]]
    ];
    document.querySelector('#detail-content').innerHTML = `<div class="detail-top"><img ${imageSource(row[0]) ? `src="${imageAttribute(row[0])}"` : 'hidden'} alt="${t('product.alt', {name})}"><div><p class="eyebrow">${category(row)}</p><h2 id="detail-title">${name}</h2><span class="code">${productCode(row)}${language === 'hi' && row[10] ? ' · ' + row[10] : ''}</span></div></div><dl>${specs.map(([key, value]) => `<div><dt>${t(key)}</dt><dd>${value}</dd></div>`).join('')}</dl><p class="detail-note">${t('detail.note')}${row[0] === '8623' ? ' ' + t('detail.codeNote') : ''}</p><a class="button yellow" href="tel:+916266694949">${t('detail.call')}</a>`;
}
function show(code) { selectedCode = code; renderDetail(code); dialog.showModal(); }
function setLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    language = nextLanguage;
    document.documentElement.lang = language;
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]').content = t('meta.description');
    document.querySelectorAll('[data-i18n]').forEach(element => {
        // Translation files are local, trusted content. Only these static headings include markup.
        const value = t(element.dataset.i18n);
        if (value.includes('<br>')) element.innerHTML = value;
        else element.textContent = value;
    });
    for (const attribute of ['placeholder', 'aria-label', 'alt']) {
        document.querySelectorAll(`[data-i18n-${attribute}]`).forEach(element => {
            element.setAttribute(attribute, t(element.getAttribute(`data-i18n-${attribute}`)));
        });
    }
    document.querySelectorAll('[data-language]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    try { localStorage.setItem('brs-language', language); } catch (_) {}
    render();
    if (dialog.open && selectedCode) renderDetail(selectedCode);
}
grid.addEventListener('click', event => { const button = event.target.closest('[data-code]'); if (button) show(button.dataset.code); });
search.addEventListener('input', render);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => {
        other.classList.toggle('active', other === button);
        other.setAttribute('aria-pressed', String(other === button));
    });
    render();
}));
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { selectedCode = null; });
dialog.addEventListener('click', event => {
    if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
});
setLanguage(language);
refreshImages();
// Use this after updating window.BRSImages in a running page.
window.addEventListener('brs:images-changed', refreshImages);

// A single, subtle entrance per section. Content stays visible without this enhancement.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const entranceObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('motion-enter');
                entranceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.hero-copy, .pack-stage, .section-head, .guide > div, .contact > div').forEach(element => entranceObserver.observe(element));
}

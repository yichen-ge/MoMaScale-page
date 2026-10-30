'use strict';
const $ = (selector) => document.querySelector(selector);
let galleryDataset = 0;
let comparisonControllers = [];
const visibility = new IntersectionObserver(entries => entries.forEach(entry => {
  const video = entry.target;
  video.dataset.visible = String(entry.isIntersecting);
  if (!entry.isIntersecting) video.pause();
  else if (!document.hidden && $('#autoplay').checked) video.play().catch(() => {});
}), { threshold: 0.3 });

function makeVideo(src, label, { compare = false } = {}) {
  const video = document.createElement('video');
  video.src = src;
  video.poster = src.replace(/\.mp4$/, '.jpg');
  video.controls = true;
  video.muted = true;
  video.loop = !compare;
  video.playsInline = true;
  video.preload = 'none';
  video.setAttribute('aria-label', label);
  video.addEventListener('error', () => {
    if (video.parentElement?.querySelector('.video-error')) return;
    const notice = document.createElement('p');
    notice.className = 'video-error';
    notice.textContent = 'This clip could not be loaded. Please reload the page or try another example.';
    video.after(notice);
  });
  if (!compare) visibility.observe(video);
  return video;
}

function setPressed(attribute, value) {
  document.querySelectorAll(`[${attribute}]`).forEach(button => button.setAttribute('aria-pressed', String(Number(button.getAttribute(attribute)) === value)));
}

function renderGallery() {
  $('#gallery-grid').querySelectorAll('video').forEach(video => { video.pause(); visibility.unobserve(video); });
  $('#gallery-grid').replaceChildren();
  const dataset = pageData[galleryDataset];
  const name = galleryDataset ? 'SnapMoGen' : 'HumanML3D';
  $('#gallery-dataset').textContent = `Dataset: ${name}`;
  $('#gallery-description').textContent = dataset.description.replace('{count}', dataset.gallery.length).replace('SnapMogen', 'SnapMoGen');
  $('#gallery-count').textContent = `${String(dataset.gallery.length).padStart(2, '0')} generated motions / ${name}`;
  dataset.gallery.forEach((item, index) => {
    const figure = document.createElement('figure');
    figure.className = 'motion-card';
    const caption = document.createElement('figcaption');
    const number = document.createElement('span');
    number.className = 'card-index';
    number.textContent = `${name.toUpperCase()} / ${String(index + 1).padStart(2, '0')}`;
    const prompt = document.createElement('p');
    prompt.textContent = `“${item.text}”`;
    caption.append(number, prompt);
    figure.append(makeVideo(item.src, item.text), caption);
    $('#gallery-grid').append(figure);
  });
  setPressed('data-gallery', galleryDataset);
}

const results = [
  {
    name: 'HumanML3D', extra: 'MM-Dist ↓',
    rows: [
      ['T2M-GPT', '0.492±.003', '0.679±.002', '0.775±.002', '0.141±.005', '3.121±.009'],
      ['MoMask', '0.521±.002', '0.713±.002', '0.807±.002', '0.045±.002', '2.958±.008'],
      ['MoMask++', '0.517±.002', '0.709±.002', '0.803±.002', '0.069±.003', '2.948±.007'],
      ['MoSa', '0.530±.003', '0.725±.003', '0.821±.003', '0.085±.003', '2.836±.009'],
      ['MoScale', '0.540±.002', '0.727±.002', '0.817±.002', '0.046±.002', '2.830±.005'],
      ['MoMaScale (Ours)', '0.551±.003', '0.743±.002', '0.833±.002', '0.044±.003', '2.767±.008']
    ]
  },
  {
    name: 'SnapMoGen', extra: 'CLIP Score ↑',
    rows: [
      ['T2M-GPT', '0.618±.002', '0.773±.002', '0.812±.002', '32.629±.087', '0.573±.001'],
      ['MARDM', '0.659±.002', '0.812±.002', '0.860±.002', '26.878±.131', '0.602±.001'],
      ['MoMask', '0.777±.002', '0.888±.002', '0.927±.002', '17.404±.051', '0.664±.001'],
      ['MoMask++', '0.802±.001', '0.905±.002', '0.938±.001', '15.060±.065', '0.685±.001'],
      ['MoScale†', '0.764±.002', '0.877±.002', '0.918±.001', '16.885±.045', '0.666±.001'],
      ['MoMaScale (Ours)', '0.837±.002', '0.926±.002', '0.955±.001', '14.565±.066', '0.706±.001']
    ]
  }
];
function renderResults(index) {
  const data = results[index];
  $('#results-caption').textContent = `${data.name} test set · Selected methods`;
  const header = document.createElement('tr');
  ['Method', 'R-Precision Top-1 ↑', 'Top-2 ↑', 'Top-3 ↑', 'FID ↓', data.extra].forEach(label => {
    const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; header.append(th);
  });
  $('#results-head').replaceChildren(header);
  $('#results-body').replaceChildren(...data.rows.map(row => {
    const tr = document.createElement('tr');
    if (row[0].startsWith('MoMaScale')) tr.className = 'ours';
    row.forEach((value, column) => {
      const cell = document.createElement(column === 0 ? 'th' : 'td');
      if (!column) cell.scope = 'row';
      const [main, uncertainty] = value.split('±');
      cell.textContent = main;
      if (uncertainty) { const span = document.createElement('span'); span.className = 'uncertainty'; span.textContent = `±${uncertainty}`; cell.append(span); }
      tr.append(cell);
    }); return tr;
  }));
  setPressed('data-results', index);
}

function createComparisonBlock(item, number) {
  const article = document.createElement('article');
  article.className = 'comparison-block';
  article.setAttribute('aria-label', `Comparison example ${number + 1}: ${item.prompt}`);
  const toolbar = document.createElement('div');
  toolbar.className = 'comparison-toolbar';
  const label = document.createElement('h4');
  label.className = 'prompt-label'; label.textContent = 'Prompt:';
  const controls = document.createElement('div'); controls.className = 'comparison-controls';
  const playButton = document.createElement('button');
  playButton.type = 'button'; playButton.className = 'button compact comparison-play'; playButton.textContent = '▷ Play all';
  const resetButton = document.createElement('button');
  resetButton.type = 'button'; resetButton.className = 'button compact comparison-reset'; resetButton.textContent = '↺ Reset';
  controls.append(playButton, resetButton); toolbar.append(label, controls);
  const prompt = document.createElement('blockquote'); prompt.textContent = item.prompt;
  const grid = document.createElement('div'); grid.className = 'comparison-grid';
  const status = document.createElement('p');
  status.className = 'fine-print comparison-status'; status.setAttribute('role', 'status');
  status.textContent = 'Use Play all to start the three clips together. Individual playback controls are also available.';
  const videos = item.videos.map((clip, index) => {
    const figure = document.createElement('figure'); figure.className = `comparison-card${index === 0 ? ' is-ours' : ''}`;
    const caption = document.createElement('figcaption');
    const name = document.createElement('span'); name.textContent = ['MoMaScale', 'MoMask++', 'MoScale'][index];
    caption.append(name);
    if (!index) { const badge = document.createElement('span'); badge.className = 'method-badge'; badge.textContent = 'OURS'; caption.append(badge); }
    const video = makeVideo(clip.src, `${clip.method}: ${item.prompt}`, { compare: true });
    figure.append(video, caption); grid.append(figure); return video;
  });
  let generation = 0;
  let running = false;
  let busy = false;
  function pause(reset = false) {
    generation++;
    running = false; busy = false;
    videos.forEach(video => { video.pause(); if (reset && video.readyState) video.currentTime = 0; });
    playButton.textContent = '▷ Play all'; playButton.disabled = false;
  }
  playButton.addEventListener('click', async () => {
    if (running) { pause(); status.textContent = 'All three clips paused.'; return; }
    if (busy) return;
    const currentGeneration = generation;
    busy = true; playButton.disabled = true;
    status.textContent = 'Preparing all three clips…';
    try {
      await Promise.all(videos.map(ready));
      if (currentGeneration !== generation) return;
      videos.forEach(video => { video.currentTime = 0; });
      await Promise.all(videos.map(video => video.play()));
      if (currentGeneration !== generation) { videos.forEach(video => video.pause()); return; }
      running = true; playButton.textContent = 'Ⅱ Pause all';
      status.textContent = 'Playing the three results from the beginning. Clip durations may differ.';
    } catch {
      if (currentGeneration !== generation) return;
      pause(); status.textContent = 'Unable to start every clip. Try again or use the individual video controls.';
    } finally {
      if (currentGeneration === generation) { busy = false; playButton.disabled = false; }
    }
  });
  resetButton.addEventListener('click', () => { pause(true); status.textContent = 'All clips reset to the beginning.'; });
  videos.forEach(video => video.addEventListener('ended', () => {
    if (videos.every(clip => clip.ended)) { running = false; playButton.textContent = '▷ Play all'; }
  }));
  comparisonControllers.push({ pause });
  article.append(toolbar, prompt, grid, status);
  return article;
}
function selectComparisonDataset(index) {
  comparisonControllers.forEach(controller => controller.pause());
  comparisonControllers = [];
  $('#comparison-dataset').textContent = `Dataset: ${index ? 'SnapMoGen' : 'HumanML3D'}`;
  $('#comparison-examples').replaceChildren(...pageData[index].comparisons.map(createComparisonBlock));
  setPressed('data-comparison', index);
}
function ready(video) {
  if (video.readyState >= 3) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => finish(new Error('Loading timed out')), 15000);
    const loaded = () => finish(); const failed = () => finish(new Error('Clip unavailable'));
    function finish(error) { clearTimeout(timer); video.removeEventListener('canplay', loaded); video.removeEventListener('error', failed); error ? reject(error) : resolve(); }
    video.addEventListener('canplay', loaded); video.addEventListener('error', failed); video.load();
  });
}
document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => { galleryDataset = Number(button.dataset.gallery); renderGallery(); }));
document.querySelectorAll('[data-results]').forEach(button => button.addEventListener('click', () => renderResults(Number(button.dataset.results))));
document.querySelectorAll('[data-comparison]').forEach(button => button.addEventListener('click', () => selectComparisonDataset(Number(button.dataset.comparison))));
$('#autoplay').addEventListener('change', () => $('#gallery-grid').querySelectorAll('video').forEach(video => {
  if ($('#autoplay').checked && video.dataset.visible === 'true') video.play().catch(() => {});
  else video.pause();
}));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { document.querySelectorAll('video').forEach(video => video.pause()); comparisonControllers.forEach(controller => controller.pause()); }
});
$('#copy-citation').addEventListener('click', async () => {
  const text = $('#bibtex').textContent;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text); $('#copy-status').textContent = 'Citation copied.';
  } catch {
    const selection = getSelection(); const range = document.createRange(); range.selectNodeContents($('#bibtex')); selection.removeAllRanges(); selection.addRange(range);
    $('#copy-status').textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
  }
});
renderGallery(); renderResults(0); selectComparisonDataset(0);

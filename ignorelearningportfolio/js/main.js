// main.js

document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    renderDomains();
    renderCompetencies();
    renderFeatured();
    renderFilters();
    renderPortfolio('all');

    // Kick off PDF queue after DOM is ready
    setTimeout(processPDFQueue, 500);
});

// ── Scroll Observer ───────────────────────────────────────
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08 });

    // FIX: observe BOTH .reveal AND .reveal-stagger elements.
    // Previously only .reveal was observed, so grids with .reveal-stagger
    // (but not .reveal) never received the .visible class and their
    // stagger transitions never fired.
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });
}

// ── Render: Domains ───────────────────────────────────────
function renderDomains() {
    const container = document.getElementById('domains-grid');
    if (!container) return;

    const icons = {
        'ai-foundations':    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
        'prompt-engineering':'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/></svg>',
        'responsible-ai':    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        'ai-strategy':       '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        'ai-leadership':     '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>',
        'claude-ecosystem':  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
    };

    container.innerHTML = domains.map(domain => `
        <div class="card domain-card text-center" style="display:flex;flex-direction:column;align-items:center;">
            <div class="domain-icon">${icons[domain.id] || ''}</div>
            <h3 class="text-h3 mb-2">${domain.name}</h3>
            <p class="text-caption mb-4">${domain.count} Experience${domain.count !== 1 ? 's' : ''}</p>
            <p class="text-body" style="font-size:0.9rem;">${domain.description}</p>
        </div>
    `).join('');
}

// ── Render: Competencies ──────────────────────────────────
function renderCompetencies() {
    const container = document.getElementById('competencies-container');
    if (!container) return;
    container.innerHTML = competencies.map(c => `<span class="chip">${c}</span>`).join('');
}

// ── Card Builder ──────────────────────────────────────────
function createExperienceCard(exp) {
    const stackHTML   = generateStackVisual(exp);
    const domainName  = domains.find(d => d.id === exp.domain)?.name || exp.domain;
    const description = exp.description
        ? `<p class="text-body" style="font-size:0.9rem;line-height:1.6;color:var(--text-secondary);margin:0;">${exp.description}</p>`
        : '';

    const skillsHTML = exp.skills.map(skill =>
        `<span class="chip" style="font-size:0.72rem;padding:4px 10px;background:transparent;border:1px solid var(--border-light);">${skill}</span>`
    ).join('');

    const recognizedByHTML = exp.recognizedBy.map(issuer =>
        `<span style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 4px 10px; background: var(--bg-secondary); color: var(--text-secondary); border-radius: 20px; border: 1px solid var(--border-light); display: inline-block;">${issuer}</span>`
    ).join('');

    return `
        <div class="card experience-card" data-domain="${exp.domain}" style="padding: 28px; display: flex; flex-direction: column; gap: 16px;">
            
            <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
                <span class="chip domain-chip" style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;padding:4px 10px;">${domainName}</span>
                <h3 class="text-h3" style="margin:0;line-height:1.25;">${exp.title}</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                    ${recognizedByHTML}
                </div>
            </div>

            <!-- Visual accent: smaller height, tightly integrated -->
            <div style="margin: 4px 0; background: var(--bg-primary); border-radius: var(--radius-sm); overflow: hidden; display: flex; justify-content: center; align-items: center;">
                ${stackHTML}
            </div>

            ${description}

            <div class="competency-tags" style="justify-content:flex-start;gap:6px;margin-top:2px;">
                ${skillsHTML}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-hairline);">
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">
                    <strong style="color: var(--text-primary); font-size: 0.9rem;">${exp.credentialCount}</strong> Verified Credential${exp.credentialCount > 1 ? 's' : ''}
                </span>
                <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.8rem;" onclick="openExperienceModal('${exp.id}')">Explore</button>
            </div>

        </div>
    `;
}

// ── PDF Queue ─────────────────────────────────────────────
window.pdfRenderQueue = [];
let isRenderingQueue  = false;

async function processPDFQueue() {
    if (isRenderingQueue || window.pdfRenderQueue.length === 0) return;
    isRenderingQueue = true;

    while (window.pdfRenderQueue.length > 0) {
        const item = window.pdfRenderQueue.shift();
        try {
            await renderPDFThumbnail(item.url, item.canvasId);
            // Add a small artificial delay to allow UI to breathe
            await new Promise(r => setTimeout(r, 50));
        } catch (e) {
            console.warn('PDF thumbnail failed:', item.url, e);
            const canvas = document.getElementById(item.canvasId);
            if (canvas) {
                canvas.style.display = 'none';
                const parent = canvas.closest('.stack-layer') || canvas.parentElement;
                if (parent && !parent.querySelector('.thumb-error')) {
                    const err = document.createElement('span');
                    err.className = 'thumb-error';
                    err.style.cssText = 'font-size:0.7rem;color:var(--text-tertiary);padding:8px;text-align:center;';
                    err.textContent = 'Preview unavailable';
                    parent.appendChild(err);
                }
            }
        }
    }

    isRenderingQueue = false;
}

async function renderPDFThumbnail(url, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const encodedUrl = url.split('/').map(encodeURIComponent).join('/');
    const pdf  = await pdfjsLib.getDocument(encodedUrl).promise;
    const page = await pdf.getPage(1);

    // Render at a scale that looks sharp but isn't enormous
    const viewport = page.getViewport({ scale: 1.5 });
    const ctx      = canvas.getContext('2d');

    canvas.width  = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
}

// ── Stack Visual ──────────────────────────────────────────
function generateStackVisual(exp) {
    let layers = '';
    const layerCount = Math.min(exp.credentials.length, 5); // Max 5 layers

    for (let i = 0; i < layerCount; i++) {
        const credential = exp.credentials[i];
        // Unique ID: avoids collisions when both featured & portfolio grids render the same card
        const canvasId   = `thumb-${exp.id}-${i}-${Math.random().toString(36).substr(2, 7)}`;

        if (credential?.pdf) {
            window.pdfRenderQueue.push({ url: credential.pdf, canvasId });
        }

        // Apply a data-index so we can target dynamic nth-child styling reliably
        layers += `<div class="stack-layer" data-index="${i + 1}"><canvas id="${canvasId}"></canvas></div>`;
    }

    return `
        <div class="credential-stack" data-layers="${layerCount}" onclick="openExperienceModal('${exp.id}')">
            ${layers}
        </div>
    `;
}

// ── Render: Featured ──────────────────────────────────────
function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;
    container.innerHTML = experiences.filter(e => e.featured).map(createExperienceCard).join('');
}

// ── Render: Filters ───────────────────────────────────────
function renderFilters() {
    const container = document.getElementById('filter-container');
    if (!container) return;

    // Attach click handler to the existing "All" button
    const allBtn = container.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.addEventListener('click', () => filterPortfolio('all'));

    container.innerHTML += domains.map(domain =>
        `<button class="chip" data-filter="${domain.id}" onclick="filterPortfolio('${domain.id}')">${domain.name}</button>`
    ).join('');
}

// ── Filter Portfolio ──────────────────────────────────────
function filterPortfolio(domainId) {
    document.querySelectorAll('#filter-container .chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filter === domainId);
    });
    renderPortfolio(domainId);
}

window.filterPortfolio = filterPortfolio;

// ── Render: Portfolio Grid ────────────────────────────────
function renderPortfolio(filterId = 'all') {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;

    const filtered = filterId === 'all'
        ? experiences
        : experiences.filter(e => e.domain === filterId || e.skills.includes(filterId));

    container.innerHTML = filtered.map(createExperienceCard).join('');

    // Stagger cards in — but DON'T set inline opacity:0 which would
    // fight the CSS animation and leave cards invisible permanently.
    Array.from(container.children).forEach((child, i) => {
        child.style.animationDelay = `${(i % 9) * 80}ms`;
        child.classList.add('animate-slide-up');
    });

    // Re-observe the grid so stagger CSS applies after re-render
    container.classList.remove('visible');
    requestAnimationFrame(() => {
        setTimeout(() => container.classList.add('visible'), 50);
        setTimeout(processPDFQueue, 100);
    });
}

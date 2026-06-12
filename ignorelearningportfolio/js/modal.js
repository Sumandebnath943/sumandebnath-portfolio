// modal.js - Logic for expandable experience modal and fullscreen viewer with PDF.js

// --- Experience Modal ---

let currentActivePdf = null;

async function openExperienceModal(expId) {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;

    const modal = document.getElementById('experience-modal');
    
    // Populate details
    document.getElementById('modal-title').textContent = exp.title;
    
    const domainName = domains.find(d => d.id === exp.domain)?.name || exp.domain;
    document.getElementById('modal-domain').textContent = domainName;
    
    document.getElementById('modal-description').textContent = exp.description || "";
    document.getElementById('modal-why-it-matters').textContent = exp.whyItMatters || "";
    document.getElementById('modal-learning-outcome').textContent = exp.learningOutcome || "";
    
    document.getElementById('modal-skills').innerHTML = exp.skills.map(skill => `<span class="chip">${skill}</span>`).join('');
    
    document.getElementById('modal-issuers').textContent = exp.recognizedBy.join(' • ');
    document.getElementById('modal-count').textContent = exp.credentialCount;
    
    // Populate thumbnail strip
    const strip = document.getElementById('modal-thumbnail-strip');
    strip.innerHTML = exp.credentials.map((cred, index) => `
        <div class="certificate-thumb ${index === 0 ? 'selected' : ''}" id="thumb-${index}" onclick="setActiveCertificate('${cred.pdf.replace(/'/g, "\\'")}', ${index})">
            <canvas id="thumb-canvas-${expId}-${index}"></canvas>
        </div>
    `).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Clear active canvas before rendering new one
    const activeCanvas = document.getElementById('active-certificate-canvas');
    if(activeCanvas) {
        const ctx = activeCanvas.getContext('2d');
        ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    }

    // Render active certificate immediately
    if (exp.credentials.length > 0) {
        currentActivePdf = exp.credentials[0].pdf;
        await renderPdfThumbnail(currentActivePdf, 'active-certificate-canvas', 1.5);
    }

    // Render thumbnails sequentially
    for (let i = 0; i < exp.credentials.length; i++) {
        await renderPdfThumbnail(exp.credentials[i].pdf, `thumb-canvas-${expId}-${i}`, 0.5);
        // Add small delay to prevent blocking UI
        await new Promise(r => setTimeout(r, 50));
    }
}

async function setActiveCertificate(pdfUrl, index) {
    currentActivePdf = pdfUrl;
    
    // Update selected styling
    document.querySelectorAll('.certificate-thumb').forEach((thumb, i) => {
        if (i === index) thumb.classList.add('selected');
        else thumb.classList.remove('selected');
    });

    // Clear previous before rendering
    const activeCanvas = document.getElementById('active-certificate-canvas');
    if(activeCanvas) {
        const ctx = activeCanvas.getContext('2d');
        ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
    }

    // Render active
    await renderPdfThumbnail(pdfUrl, 'active-certificate-canvas', 1.5);
}

function openActiveViewer() {
    if (currentActivePdf) {
        openViewer(currentActivePdf);
    }
}

async function renderPdfThumbnail(url, canvasId, scale = 0.5) {
    try {
        const encodedUrl = url.split('/').map(encodeURIComponent).join('/');
        const loadingTask = pdfjsLib.getDocument(encodedUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const context = canvas.getContext('2d');
        
        // Render at specified scale
        const viewport = page.getViewport({ scale: scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;
    } catch (error) {
        console.error('Error rendering PDF thumbnail:', error);
    }
}

function closeModal() {
    document.getElementById('experience-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside content
document.getElementById('experience-modal').addEventListener('click', (e) => {
    if (e.target.id === 'experience-modal') {
        closeModal();
    }
});

// Ensure functions are global
window.openExperienceModal = openExperienceModal;
window.closeModal = closeModal;
window.setActiveCertificate = setActiveCertificate;
window.openActiveViewer = openActiveViewer;


// --- Fullscreen Certificate Viewer ---

let currentScale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;
let currentPdfPage = null;

async function openViewer(pdfUrl) {
    const viewer = document.getElementById('viewer-overlay');
    const imageContainer = document.getElementById('viewer-image');
    
    // Replace text content with a canvas, using object-fit to preserve aspect ratio without distortion
    imageContainer.innerHTML = '<canvas id="viewer-canvas" style="display: block; max-width: 100%; max-height: 100%; object-fit: contain; border-radius: var(--radius-sm);"></canvas>';
    imageContainer.style.background = 'transparent';
    imageContainer.style.boxShadow = 'none';

    // Reset transforms
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
    
    viewer.classList.add('active');

    try {
        const encodedUrl = pdfUrl.split('/').map(encodeURIComponent).join('/');
        const loadingTask = pdfjsLib.getDocument(encodedUrl);
        const pdf = await loadingTask.promise;
        currentPdfPage = await pdf.getPage(1);
        renderViewerPdf();
    } catch (error) {
        console.error('Error loading PDF in viewer:', error);
        imageContainer.innerHTML = '<p style="color: white;">Error loading PDF. Please try again.</p>';
    }
}

async function renderViewerPdf() {
    if (!currentPdfPage) return;
    
    const canvas = document.getElementById('viewer-canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');

    // Use a higher scale for crisp rendering in the fullscreen viewer
    // Note: The visual zooming is handled by CSS transforms, but the base canvas needs good resolution.
    const viewport = currentPdfPage.getViewport({ scale: 2.0 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Set explicit CSS dimensions so it scales beautifully without stretching
    canvas.style.width = 'auto';
    canvas.style.height = 'auto';
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '100%';
    canvas.style.objectFit = 'contain';
    canvas.style.boxShadow = '0 40px 100px rgba(0,0,0,0.6)';

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    await currentPdfPage.render(renderContext).promise;
}

function closeViewer() {
    document.getElementById('viewer-overlay').classList.remove('active');
    currentPdfPage = null;
}

// Viewer Controls
function zoomIn() {
    currentScale = Math.min(currentScale + 0.25, 3);
    updateTransform();
}

function zoomOut() {
    currentScale = Math.max(currentScale - 0.25, 0.5);
    updateTransform();
}

function resetZoom() {
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

function updateTransform() {
    const container = document.getElementById('viewer-image');
    if (container) {
        container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
}

// Pan Logic
const viewerImage = document.getElementById('viewer-image');

viewerImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    viewerImage.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    viewerImage.style.cursor = 'grab';
});

// Security / UX Restrictions
const viewerOverlay = document.getElementById('viewer-overlay');

// Disable Right Click anywhere on the viewer
viewerOverlay.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Disable native drag (for images/canvas)
viewerImage.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Key bindings
window.addEventListener('keydown', (e) => {
    if (document.getElementById('viewer-overlay').classList.contains('active')) {
        if (e.key === 'Escape') closeViewer();
        if (e.key === '=' || e.key === '+') zoomIn();
        if (e.key === '-') zoomOut();
    } else if (document.getElementById('experience-modal').classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
    }
});

window.openViewer = openViewer;
window.closeViewer = closeViewer;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.resetZoom = resetZoom;

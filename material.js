// PDF Preview Modal
function openPreview(pdfUrl) {
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    const title = document.getElementById('pdf-modal-title');

    viewer.src = pdfUrl;
    title.textContent = pdfUrl.split('/').pop().replace('.pdf', '').replace(/-/g, ' ');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
const modalClose = document.getElementById('pdf-modal-close');
const modal = document.getElementById('pdf-modal');

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.getElementById('pdf-viewer').src = '';
        document.body.style.overflow = '';
    });
}

// Close on backdrop click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.getElementById('pdf-viewer').src = '';
            document.body.style.overflow = '';
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.getElementById('pdf-viewer').src = '';
        document.body.style.overflow = '';
    }
});

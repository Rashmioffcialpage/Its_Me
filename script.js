let scale = 1.3;  // Default zoom level
const minScale = 0.5;
const maxScale = 3;

// Render page with current zoom scale
function renderPage(num) {
  pageIsRendering = true;

  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport: viewport
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    document.getElementById('page-num').textContent = num;
  });
}

// Zoom in
function zoomIn() {
  if (scale < maxScale) {
    scale += 0.2;
    queueRenderPage(pageNum);
  }
}

// Zoom out
function zoomOut() {
  if (scale > minScale) {
    scale -= 0.2;
    queueRenderPage(pageNum);
  }
}
AOS.init({
    duration: 1000, // Add smooth transition
    easing: 'ease-in-out',
    once: true, // Animation happens only once
  });
  
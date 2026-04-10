// ============================================================
// HISTORY — nav.js
// Comportamentos globais: progress bar, sidebar active,
// back-to-top, quiz interativo
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── Progress bar ──────────────────────────────────────────
    const bar = document.getElementById('progress-bar-fill');
    if (bar) {
      const update = () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + '%';
      };
      window.addEventListener('scroll', update, { passive: true });
    }
    
    // ── Back to top ───────────────────────────────────────────
    const btn = document.getElementById('back-to-top');
    if (btn) {
      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
      }, { passive: true });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  
    // ── Sidebar active via IntersectionObserver ───────────────
    const sections = document.querySelectorAll('.section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-item[href]');
  
    if (sections.length && sidebarLinks.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.sidebar-item[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      sections.forEach(s => observer.observe(s));
    }
  
    // ── Quiz interativo ───────────────────────────────────────
    let score = 0;
    let answered = 0;
    const total = document.querySelectorAll('.quiz-question').length;
  
    document.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', function () {
        const question = this.closest('.quiz-question');
        if (question.classList.contains('answered')) return;
        question.classList.add('answered');
  
        const isCorrect = this.dataset.correct === 'true';
        const options = question.querySelectorAll('.quiz-option');
  
        options.forEach(o => {
          o.style.cursor = 'default';
          if (o.dataset.correct === 'true') o.classList.add('correct');
        });
        if (!isCorrect) this.classList.add('wrong');
  
        const just = question.querySelector('.quiz-justificativa');
        if (just) just.classList.add('show');
  
        if (isCorrect) score++;
        answered++;
        updateScore();
      });
    });
  
    function updateScore() {
      const numEl = document.getElementById('score-num');
      const labelEl = document.getElementById('score-label');
      if (numEl) numEl.textContent = score + '/' + answered;
      if (labelEl) labelEl.textContent = answered + ' de ' + total + ' respondidas';
    }
  
    // ── Mobile sidebar toggle ─────────────────────────────────
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
  
  });
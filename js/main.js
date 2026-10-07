/**
 * Rafin Portfolio & Authority Hub Client Controller
 * Lightweight, zero-dependency, high performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Reading Progress Bar for Long-form Articles & Case Studies
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    }, { passive: true });
  }

  // 3. Project Category Filter (for /projects)
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');

        // Update active button state
        filterButtons.forEach(b => {
          b.classList.remove('bg-amber-500', 'text-black', 'border-amber-400');
          b.classList.add('bg-white/5', 'text-gray-300', 'border-white/10');
        });
        btn.classList.remove('bg-white/5', 'text-gray-300', 'border-white/10');
        btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400');

        // Filter cards
        projectCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Code Block Copy Buttons
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(pre => {
    // Only add if not already present
    if (!pre.querySelector('.copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn absolute top-3 right-3 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-gray-300 transition';
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
      pre.style.position = 'relative';
      pre.appendChild(copyBtn);

      copyBtn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        if (code) {
          try {
            await navigator.clipboard.writeText(code.innerText);
            copyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Copied!';
            setTimeout(() => {
              copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy code: ', err);
          }
        }
      });
    }
  });
});

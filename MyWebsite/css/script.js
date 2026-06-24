// Theme toggle: toggles `light` class on body
(function(){
  // Theme Toggle
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn){
    const saved = localStorage.getItem('theme');
    if(saved === 'light') {
      document.body.classList.add('light');
      themeBtn.textContent = 'Light';
    } else {
      themeBtn.textContent = 'Dark';
    }

    themeBtn.addEventListener('click', ()=>{
      const isNowLight = document.body.classList.toggle('light');
      const theme = isNowLight ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      themeBtn.textContent = isNowLight ? 'Light' : 'Dark';
    });
  }

  // Modal Control
  const modal = document.getElementById('contactModal');
  const contactBtns = document.querySelectorAll('.contact-btn, a[href="#contact"]');
  const closeBtn = document.getElementById('closeModal');
  const overlay = document.querySelector('.modal-overlay');

  if(modal){
    const openModal = () => modal.classList.add('active');
    const closeModal = () => modal.classList.remove('active');

    contactBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(overlay) overlay.addEventListener('click', closeModal);
    
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeModal();
    });
  }

  // Parallax on hero
	if(hero){
		window.addEventListener('mousemove', (e)=>{
			const x = (e.clientX / window.innerWidth - 0.5) * 10;
			const y = (e.clientY / window.innerHeight - 0.5) * 8;
			hero.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		});
		window.addEventListener('mouseleave', ()=>{ hero.style.transform = '' });
	}
})();

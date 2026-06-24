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
  const contactForm = document.querySelector('.contact-form');

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

    // Handle form submission
    if(contactForm){
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
          const formData = new FormData(contactForm);
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });

          if(response.ok){
            // Show success message
            const modalContent = modal.querySelector('.modal-content');
            const originalContent = modalContent.innerHTML;
            
            modalContent.innerHTML = `
              <div class="success-message">
                <h2>✓ Message Sent!</h2>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            `;

            // Close modal after 2 seconds
            setTimeout(() => {
              closeModal();
              // Restore form content
              modalContent.innerHTML = originalContent;
              // Re-attach event listeners to the restored form
              const newForm = modalContent.querySelector('.contact-form');
              if(newForm) newForm.addEventListener('submit', arguments.callee);
            }, 2000);
          }
        } catch(error){
          console.error('Error:', error);
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          alert('Error sending message. Please try again.');
        }
      });
    }
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

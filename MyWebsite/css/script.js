// Theme toggle: toggles `light` class on body
(function(){
	const btn = document.getElementById('themeToggle');
	if(!btn) return;
	// restore preference
	const saved = localStorage.getItem('theme');
	if(saved === 'light') {
		document.body.classList.add('light');
		btn.textContent = 'Light';
	} else {
		btn.textContent = 'Dark';
	}

	btn.addEventListener('click', ()=>{
		const isNowLight = document.body.classList.toggle('light');
		const theme = isNowLight ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
		btn.textContent = isNowLight ? 'Light' : 'Dark';
	});

	// subtle parallax on hero
	const hero = document.querySelector('.hero');
	if(hero){
		window.addEventListener('mousemove', (e)=>{
			const x = (e.clientX / window.innerWidth - 0.5) * 10;
			const y = (e.clientY / window.innerHeight - 0.5) * 8;
			hero.style.transform = `translate3d(${x}px, ${y}px, 0)`;
		});
		window.addEventListener('mouseleave', ()=>{ hero.style.transform = '' });
	}
})();

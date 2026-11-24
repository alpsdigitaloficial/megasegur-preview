// Megasegur Franchising — scripts do site
(function () {
  var WHATSAPP = '5511988344721';

  // Menu do celular
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    });
  }

  // Formulários -> WhatsApp do consultor de expansão com os dados preenchidos
  document.querySelectorAll('form.lead').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var valid = el.type === 'checkbox' ? el.checked
          : el.value.trim() !== '' && (el.type !== 'email' || /\S+@\S+\.\S+/.test(el.value));
        (el.type === 'checkbox' ? el.closest('label') : el).classList.toggle('err', !valid);
        if (!valid) ok = false;
      });
      if (!ok) return;
      var linhas = ['Olá! Quero receber a apresentação da franquia Megasegur.', ''];
      form.querySelectorAll('input:not([type=checkbox]):not([type=radio]), select, textarea').forEach(function (el) {
        if (el.value.trim()) linhas.push(el.getAttribute('aria-label') + ': ' + el.value.trim());
      });
      var perfil = form.querySelector('input[type=radio]:checked');
      if (perfil) linhas.push('Perfil: ' + perfil.value);
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n')), '_blank', 'noopener');
    });
  });

  // Cabeçalho fixo: ganha fundo ao rolar
  var head = document.querySelector('.site-header');
  if (head) {
    var marcar = function () { head.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', marcar, {passive: true});
    marcar();
  }

  // Vídeo do YouTube: só carrega o player quando a pessoa clica (página fica leve)
  document.querySelectorAll('.yt').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.id + '?autoplay=1&rel=0';
      f.title = 'Vídeo Megasegur';
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      b.replaceWith(f);
    });
  });

  // Simulador de receita (R$ 500 por seguro/ano, mesma base do site de imobiliárias)
  var c = document.getElementById('carteira'), s = document.getElementById('seguros');
  if (c && s) {
    var simular = function () {
      var total = c.value * s.value * 500;
      document.getElementById('v-carteira').textContent = c.value + (c.value == 1000 ? '+' : '');
      document.getElementById('v-seguros').textContent = s.value;
      document.getElementById('v-receita').textContent = total >= 1e6
        ? 'R$ ' + (total / 1e6).toLocaleString('pt-BR', {maximumFractionDigits: 1}) + ' mi/ano'
        : 'R$ ' + (total / 1000).toLocaleString('pt-BR') + ' mil/ano';
    };
    c.addEventListener('input', simular);
    s.addEventListener('input', simular);
  }

  // Animação ao rolar
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold: .12});
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

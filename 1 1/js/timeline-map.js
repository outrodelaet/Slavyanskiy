(function () {
  'use strict';

  var root = document.getElementById('timeline-map');
  if (!root) {
    return;
  }

  var ERAS = [
    {
      era: '7',
      year: 'VII век',
      desc: 'Появляются первые славянские государственные объединения — государство Само в Центральной Европе и Союз семи племён в Нижнем Подунавье.'
    },
    {
      era: '9',
      year: 'IX век',
      desc: 'У большинства славян идёт складывание государственности. Первым крупным политическим объединением западных славян стала Великая Моравия.'
    },
    {
      era: '11',
      year: 'XI век',
      desc: 'Оформляется государственность у хорватов и сербов, подчинивших себе другие южнославянские племена.'
    }
  ];

  var yearEl = root.querySelector('.tm-year');
  var descEl = root.querySelector('.tm-desc');
  var legendEl = root.querySelector('.tm-legend');
  var slider = root.querySelector('.tm-slider');
  var ticks = Array.prototype.slice.call(root.querySelectorAll('.tm-tick'));
  var layers = Array.prototype.slice.call(root.querySelectorAll('.tm-layer'));

  var current = -1;

  function buildLegend(layer) {
    legendEl.innerHTML = '';
    var regions = layer.querySelectorAll('.tm-region');
    Array.prototype.forEach.call(regions, function (region) {
      var name = region.getAttribute('data-name') || '';
      var color = region.getAttribute('fill') || '#000';
      var item = document.createElement('span');
      item.className = 'tm-legend-item';
      var sw = document.createElement('span');
      sw.className = 'tm-legend-swatch';
      sw.style.background = color;
      item.appendChild(sw);
      item.appendChild(document.createTextNode(name));
      legendEl.appendChild(item);
    });
  }

  function setEra(index) {
    if (index === current || index < 0 || index >= ERAS.length) {
      return;
    }
    current = index;
    var data = ERAS[index];

    layers.forEach(function (layer) {
      var active = layer.getAttribute('data-era') === data.era;
      layer.classList.toggle('is-active', active);
      if (active) {
        buildLegend(layer);
      }
    });

    ticks.forEach(function (tick, i) {
      tick.classList.toggle('is-active', i === index);
      tick.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });

    if (Number(slider.value) !== index) {
      slider.value = String(index);
    }
    slider.setAttribute('aria-valuetext', data.year);

    yearEl.classList.add('is-swapping');
    descEl.classList.add('is-swapping');
    window.setTimeout(function () {
      yearEl.textContent = data.year;
      descEl.textContent = data.desc;
      yearEl.classList.remove('is-swapping');
      descEl.classList.remove('is-swapping');
    }, 200);
  }

  slider.addEventListener('input', function () {
    setEra(Number(slider.value));
  });

  ticks.forEach(function (tick, i) {
    tick.addEventListener('click', function () {
      setEra(i);
    });
  });

  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      setEra(Math.min(current + 1, ERAS.length - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      setEra(Math.max(current - 1, 0));
    }
  });

  setEra(0);
})();

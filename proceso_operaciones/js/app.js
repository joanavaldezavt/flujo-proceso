const steps = [
  {
    role: "Ventas",
    name: "Jefe de Administración",
    avatar: "🧑‍💼",
    heading: "Creación de orden de venta",
    explain: "Registro de cotización, enlistando productos, cantidades y cliente.",
    systemRoute: ["Menú Principal", "Ventas", "Nuevo"],
    systemActionsTitle: "Una vez lleno el formulario: Guardar y Confirmar",
    systemActions: [
      "Da clic en el ícono de <b>Guardar</b> para que Odoo genere el <b>Folio de Cotización</b> (ej. <code>S00088</code>).",
      "Da clic en el botón <b>Confirmar</b>."
    ],
    result: "El pedido queda registrado y, si requiere abastecimiento, se gestiona la compra.",
    video: "video/pt1.mp4",
    tag: "",
    node: 0
  },
  {
    role: "Abastecimiento",
    name: "Jefe de Abastecimiento",
    avatar: "🛒",
    heading: "Reabastecimiento de artículos",
    explain: "Cuando hay faltantes, prepara la orden de compra para pedir los productos al proveedor.",
    systemRoute: ["Menú Principal", "Compras", "Órdenes", "Reabastecimiento"],
    systemActionsTitle: "Acción:",
    systemActions: [
      "Dar clic en el botón <b>Orden</b> de cada artículo para generar la orden de compra."
    ],
    systemNote: "En caso de que algún artículo no cuente con proveedor, notificar vía grupo de soporte para asignar proveedor y poder continuar.",
    result: "La compra pasa a revisión antes de confirmarse.",
    video: "video/pt2.mp4",
    tag: "",
    node: 1
  },
  {
    role: "Abastecimiento",
    name: "Director de compras",
    avatar: "🧑‍💻",
    heading: "Se revisa y autoriza la compra",
    explain: "Comprueba la solicitud. Si necesita cambios, la devuelve al comprador para corregirla; si está bien, la autoriza.",
    systemNote: "Para este paso solicitar vía grupo de soporte la autorización de órdenes de compra para poder continuar.",
    result: "La orden queda autorizada o vuelve para ajustes.",
    video: "video/pt3.mp4",
    tag: "",
    node: 1,
    choices: []
  },
  {
    role: "Compras",
    name: "Jefe de Abastecimiento",
    avatar: "🛒",
    heading: "Confirmación de OC",
    explain: "Confirmar formalmente la Orden de Compra autorizada para que Almacén sepa qué mercancía espera y cuándo.",
    systemRoute: ["Menú Principal", "Compras"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "Abre cada <b>Folio de Orden de Compra</b> (ej. <code>P00071</code>).",
      "Da clic en el botón <b>Confirmar</b> para que quede confirmada."
    ],
    result: "El almacén sabe qué mercancía espera y cuándo.",
    video: "video/pt4.mp4",
    tag: "",
    node: 1
  },
  {
    role: "Almacén",
    name: "Encargado de recepción",
    avatar: "🏬",
    heading: "Recepción de Mercancía",
    explain: "Compara lo recibido con la orden de compra, registra la recepción y actualiza las existencias.",
    systemRoute: ["Menú Principal", "Inventario", "Operaciones", "Recepciones"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "En la barra de búsqueda superior, escribe el <b>Folio de la Orden de Compra</b> (ej. <code>P00071</code>) y presiona <code>Enter</code>.",
      "Abre el registro que tiene ese folio como <b>Documento de origen</b>.",
      "Revisa la tabla de partidas: verifica que la columna <b>Cantidad</b> sea igual a <b>Demanda</b> (si es diferente, ajusta la cantidad al valor de la demanda y guarda).",
      "Da clic en el botón <b>Validar</b>.",
      "<b>Si aparece ventana de error pidiendo Número de Lote/Serie:</b><ul class=\"system-sublist\"><li>Cierra el aviso de error.</li><li>En la fila del producto que solicitó serie, da clic en el enlace <b>Detalles</b>.</li><li>En la ventana <i>Operaciones detalladas</i>, escribe el número de serie en la primera celda (ej. <code>SERIE-12345</code>) y da clic en <b>Guardar</b>.</li><li>Vuelve a dar clic en <b>Validar</b>.</li></ul>"
    ],
    result: "Los productos recibidos ya pueden utilizarse para surtir pedidos.",
    video: "video/pt5.mp4",
    tag: "",
    node: 2
  },
  {
    role: "Almacén",
    name: "Preparador de pedidos",
    avatar: "🧺",
    heading: "Preparamos el pedido para salir",
    explain: "Reúne los productos, verifica que correspondan al pedido y los deja en el área de carga.",
    systemRoute: ["Menú Principal", "Inventario", "Operaciones", "Interno"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "Conservando el filtro <code>Interno</code> en el buscador, escribe el <b>Folio de la Cotización de Venta</b> (ej. <code>S00088</code>) y presiona <code>Enter</code>.",
      "Abre el registro cuyo <b>Documento de origen</b> sea el folio de la cotización.",
      "Si aparece el botón <b>Comprobar Disponibilidad</b>, le da clic.",
      "Da clic en el botón <b>Validar recolección</b>."
    ],
    result: "El pedido queda listo para que Logística lo recoja.",
    video: "video/pt6.mp4",
    tag: "",
    node: 2
  },
  {
    role: "Logística",
    name: "Jefe de logística",
    avatar: "🚚",
    heading: "Planeación de entrega",
    explain: "Asignación del vehículo y al conductor. Si hay espacio, organiza varios pedidos en una misma ruta.",
    systemRoute: ["Menú Principal", "Logística", "Nuevo"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "<b>Tipo de operación:</b> Escribe <b>Nombre de almacén</b> y selecciona la opción que corresponda a <b>Recolectar</b>.",
      "<b>Fecha programada:</b> Coloca la fecha y hora del día de <b>hoy</b>.",
      "<b>Vehículo y Chofer:</b><ul class=\"system-sublist\"><li>Selecciona un <b>Vehículo</b> de la lista (Odoo asigna automáticamente a su <b>Chofer</b> en el campo Chofer).</li><li><i>(Si aparece el aviso de \"Programación duplicada\", cierra el aviso, limpia el campo de Chofer y elige otro Vehículo disponible).</i></li></ul>",
      "<b>Vincular la Recolección:</b><ul class=\"system-sublist\"><li>En la tabla inferior, da clic en <b>Agregar una línea</b>.</li><li>En la ventana emergente (dejando el filtro <code>Transferir</code>), escribe el <b>Folio de la Cotización</b> (<code>S00088</code>) en el buscador y presiona <code>Enter</code>.</li><li>Selecciona el registro encontrado.</li></ul>",
      "<b>Guardar y procesar:</b> Da clic en <b>Guardar</b> ➔ luego en <b>Confirmar</b> ➔ luego en <b>Validar</b>."
    ],
    result: "Cada pedido queda asignado a una ruta de reparto.",
    video: "video/pt7.mp4",
    tag: "",
    node: 3
  },
  {
    role: "Logística",
    name: "Jefe de logística",
    avatar: "🚚",
    heading: "Inicio del recorrido",
    explain: "Logística puede iniciar el recorrido únicamente en la fecha programada para la ruta, confirmando que está listo para salir.",
    systemRoute: ["Menú Principal", "Logística"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "<b>Búsqueda:</b> Busca el Traslado que deseas iniciar y da clic en él.",
      "<b>Iniciar:</b> Da clic en el botón <b>Iniciar ruta</b>."
    ],
    result: "La ruta queda iniciada y el chofer puede comenzar las entregas.",
    video: "video/pt8.mp4",
    tag: "",
    node: 3
  },
  {
    role: "Chofer",
    name: "Chofer",
    avatar: "🛞",
    heading: "Registro de entregas",
    explain: "Si entrega el pedido, registra la entrega y su evidencia. Si no puede entregarlo, anota el motivo.",
    systemRoute: ["Portal Web", "Mis Asignaciones (/my/asignaciones)"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "En su lista de asignaciones pendientes, da clic en el botón <b>Ver Detalles</b>.",
      "<b>Evidencia:</b><ul class=\"system-sublist\"><li>En el campo <b>Nota</b>, agrega un comentario.</li><li>En el campo de archivo (<b>Fotos</b>), carga la imagen de evidencia.</li><li>Da clic en <b>Guardar evidencia</b>.</li></ul>",
      "<b>Firma de recibido:</b><ul class=\"system-sublist\"><li>En el apartado <b>Firma de recibido</b>, traza la firma dentro del espacio de firma y presiona el botón <b>Firmar</b>.</li><li>Regresa al panel principal de <b>Mis Asignaciones</b>.</li></ul>"
    ],
    systemNote: "Es obligatorio permitir el acceso a la ubicación de tu dispositivo para poder cargar las evidencias.",

    result: "Queda constancia de la entrega o de la incidencia.",
    video: "video/pt9.mp4",
    tag: "",
    node: 3,
    choices: ["Entrega realizada", "No se pudo entregar"]
  },
  {
    role: "Chofer",
    name: "Chofer",
    avatar: "🛞",
    heading: "Término de Ruta",
    explain: "Al terminar sus entregas, el conductor cambia el estado de la ruta a “Regreso a la bodega”.",
    systemRoute: ["Portal Web", "Mis Asignaciones (/my/asignaciones)"],
    systemActionsTitle: "Una vez cargadas las evidencias:",
    systemActions: [
      "Da clic en su <b>Avatar / Menú de usuario</b> (esquina superior derecha) ➔ selecciona <b>Terminar ruta</b>.",
      "En la pantalla de confirmación, da clic en <b>Sí, terminé la ruta</b>."
    ],
    result: "La ruta queda marcada como regreso y Ventas retoma el seguimiento del pedido.",
    video: "video/pt10.mp4",
    tag: "",
    node: 3
  },
  {
    role: "Almacén",
    name: "Jefe de Almacén",
    avatar: "🏬",
    heading: "Validación de entrega",
    explain: "Validar la entrega final del pedido tras el cierre de ruta del chofer.",
    systemRoute: ["Menú Principal", "Inventario", "Operaciones", "Entregas"],
    systemActionsTitle: "¿Qué hace paso a paso?",
    systemActions: [
      "En el buscador superior (manteniendo el filtro <code>Entregas</code>), escribe el <b>Folio de la Cotización</b> (ej. <code>S00088</code>) y presiona <code>Enter</code>.",
      "Da clic en el registro cuyo <b>Documento de origen</b> coincide con el folio de la cotización.",
      "Dentro del formulario, da clic en el botón <b>Validar</b>."
    ],
    result: "La entrega queda validada en sistema, la unidad libre para nuevas entregas y las ubicaciones del chofer libres.",
    video: "video/pt11.mp4",
    tag: "",
    node: 4
  }
];

let current = 0;
const roleColors = {
  "Ventas": "#ff9b62",
  "Almacén": "#75c96b",
  "Compras": "#8b5cf6",
  "Abastecimiento": "#8b5cf6",
  "Responsable de compras": "#ffc45c",
  "Logística": "#4ed4d0",
  "Chofer": "#4b91ff"
};
const processGradient = 'linear-gradient(90deg,#ff9b62 0%,#8b5cf6 20%,#8b5cf6 40%,#75c96b 58%,#4ed4d0 76%,#4b91ff 100%)';

function startStory() {
  const fullMap = document.getElementById('fullMap');
  if (fullMap) fullMap.classList.remove('show');
  document.getElementById('story').classList.add('show');
  document.getElementById('nav').style.display = 'flex';
  current = 0;
  renderStep();
}

function renderStep() {
  const s = steps[current];
  document.querySelector('.actor-card').style.setProperty('--current-role', roleColors[s.role] || '#8b5cf6');
  document.getElementById('counter').innerHTML = `PASO <strong>${String(current + 1).padStart(2, '0')}</strong> / ${String(steps.length).padStart(2, '0')} · ${Math.round((current + 1) / steps.length * 100)}%`;
  const pct = (current + 1) / steps.length * 100;
  const progressBar = document.getElementById('progress');
  progressBar.style.width = pct + '%';
  progressBar.style.background = current === steps.length - 1 ? processGradient : (roleColors[s.role] || '#8b5cf6');
  document.getElementById('progressGlow').style.width = pct + '%';
  document.getElementById('progressGlow').style.background = current === steps.length - 1 ? processGradient : (roleColors[s.role] || '#8b5cf6');
  document.getElementById('stepLabel').textContent = `PASO ${String(current + 1).padStart(2, '0')}${s.tag ? ' · ' + s.tag.toUpperCase() : ''}`;
  document.getElementById('avatar').textContent = s.avatar;
  document.getElementById('role').textContent = s.role;
  document.getElementById('personName').textContent = s.name;
  document.getElementById('heading').textContent = s.heading;
  document.getElementById('explain').textContent = s.explain;
  document.getElementById('resultText').textContent = s.result;
  document.getElementById('choices').innerHTML = (s.choices || []).map(x => `<span class="choice">${x}</span>`).join('');
  
  const sysBox = document.getElementById('systemBox');
  if (s.systemRoute || s.systemActions || s.systemNote) {
    sysBox.style.display = 'flex';
    const hasRoute = (Array.isArray(s.systemRoute) && s.systemRoute.length > 0) || (typeof s.systemRoute === 'string' && s.systemRoute.trim() !== '');
    const boxHeader = document.getElementById('systemBoxHeader');
    if (boxHeader) boxHeader.style.display = hasRoute ? 'flex' : 'none';

    const routeEl = document.getElementById('systemRoute');
    if (Array.isArray(s.systemRoute) && s.systemRoute.length) {
      routeEl.innerHTML = s.systemRoute.map((item, idx) => 
        `<span class="route-tag">${item}</span>` + 
        (idx < s.systemRoute.length - 1 ? `<span class="route-arrow">➔</span>` : '')
      ).join('');
      routeEl.style.display = 'flex';
    } else if (typeof s.systemRoute === 'string' && s.systemRoute) {
      routeEl.innerHTML = `<span class="route-tag">${s.systemRoute}</span>`;
      routeEl.style.display = 'flex';
    } else {
      routeEl.style.display = 'none';
    }

    const actionsWrap = document.getElementById('systemActions');
    if (s.systemActions && s.systemActions.length) {
      actionsWrap.style.display = 'block';
      document.getElementById('systemActionsTitle').textContent = s.systemActionsTitle ? `⚡ ${s.systemActionsTitle}` : '⚡ Acciones:';
      document.getElementById('systemActionsList').innerHTML = s.systemActions.map(act => `<li>${act}</li>`).join('');
    } else {
      actionsWrap.style.display = 'none';
    }

    const noteEl = document.getElementById('systemNote');
    if (s.systemNote) {
      noteEl.style.display = 'flex';
      noteEl.innerHTML = `<i class="mdi mdi-alert-circle-outline"></i><div><b>Nota:</b> ${s.systemNote.replace(/^Nota:?\s*/i, '')}</div>`;
    } else {
      noteEl.style.display = 'none';
    }
  } else {
    sysBox.style.display = 'none';
  }

  // Video del paso
  const videoSec = document.getElementById('videoSection');
  const stepVid = document.getElementById('stepVideo');
  const vidSrc = document.getElementById('videoSource');
  if (s.video) {
    closeExpandedVideo();
    videoSec.style.display = 'block';
    if (vidSrc.getAttribute('src') !== s.video) {
      vidSrc.setAttribute('src', s.video);
      stepVid.load();
    }
  } else {
    closeExpandedVideo();
    videoSec.style.display = 'none';
    stepVid.pause();
  }
  const lastStep = steps.length - 1;
  const isLastStepSales = steps[lastStep].role === 'Ventas';
  document.querySelectorAll('.cycle-node').forEach(n => {
    const k = Number(n.dataset.step), step = steps[k];
    const role = n.dataset.role || (step ? step.role : '');
    const hasSharedEnd = n.dataset.sharedEnd !== undefined;
    const sharedEndStep = hasSharedEnd ? Number(n.dataset.sharedEnd) : null;
    const isSalesShared = hasSharedEnd && sharedEndStep === lastStep && isLastStepSales;
    const isCurrent = k === current || (isSalesShared && current === lastStep);
    n.style.setProperty('--node-color', roleColors[role] || (step ? roleColors[step.role] : null) || '#8b5cf6');
    n.classList.toggle('done', (k < current && !isCurrent));
    n.classList.toggle('current', isCurrent);
    n.setAttribute('aria-current', isCurrent ? 'step' : 'false');
    if (hasSharedEnd) {
      const label = n.querySelector('b');
      if (label) label.textContent = 'ADMINISTRACIÓN';
      n.setAttribute('aria-label', (isSalesShared && current === lastStep) ? 'Administración: validación de entrega' : 'Administración');
    }
  });
  const route = document.getElementById('cycleDone');
  if (route) {
    const totalUnits = 1000;
    let cyclePct;
    if (current >= lastStep && isLastStepSales) {
      cyclePct = 1;
    } else {
      let targetIdx = cycleItems.findIndex(item => item.step === current && item.kind === 'sub');
      if (targetIdx === -1) targetIdx = cycleItems.findIndex(item => item.step === current);
      cyclePct = targetIdx >= 0 ? (targetIdx / cycleItems.length) : (current / lastStep);
    }
    route.style.strokeDasharray = totalUnits;
    route.style.strokeDashoffset = totalUnits * (1 - cyclePct);
    route.style.stroke = roleColors[s.role] || '#8b5cf6';
  }
  const isLast = current === lastStep;
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.style.display = isLast ? 'none' : 'inline-flex';
  nextBtn.textContent = 'Siguiente →';
  document.querySelector('.path-panel').animate([{opacity: .65, transform: 'translateY(4px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 380, easing: 'ease-out'});
}

function nextStep() {
  if (current < steps.length - 1) {
    current++;
    renderStep();
  }
}

function previousStep() {
  if (current > 0) {
    current--;
    renderStep();
  } else {
    current = 0;
    renderStep();
  }
}

function restartStory() {
  current = 0;
  renderStep();
}

const isLastStepSales = steps[steps.length - 1].role === 'Ventas';
const cycleItems = [
  {kind: 'area', role: 'Ventas', label: 'ADMINISTRACIÓN', step: 0, ...(isLastStepSales ? {endStep: steps.length - 1} : {})},
  {kind: 'sub', role: 'Ventas', label: 'Crear orden de venta', step: 0},
  {kind: 'area', role: 'Compras', label: 'ABASTECIMIENTO', step: 1},
  {kind: 'sub', role: 'Compras', label: 'Crear orden de compra', step: 1},
  {kind: 'sub', role: 'Compras', label: 'Revisar y autorizar', step: 2},
  {kind: 'sub', role: 'Compras', label: 'Confirmación de OC', step: 3},
  {kind: 'area', role: 'Almacén', label: 'ALMACÉN', step: 4},
  {kind: 'sub', role: 'Almacén', label: 'Recibir mercancía', step: 4},
  {kind: 'sub', role: 'Almacén', label: 'Preparar pedido', step: 5},
  {kind: 'area', role: 'Logística', label: 'LOGÍSTICA', step: 6},
  {kind: 'sub', role: 'Logística', label: 'Asignar vehículo y ruta', step: 6},
  {kind: 'sub', role: 'Logística', label: 'Iniciar recorrido', step: 7},
  {kind: 'area', role: 'Chofer', label: 'CHOFER', step: 8},
  {kind: 'sub', role: 'Chofer', label: 'Registrar entregas', step: 8},
  {kind: 'sub', role: 'Chofer', label: 'Regreso a bodega', step: 9},
  {kind: 'area', role: 'Almacén', label: 'ALMACÉN', step: 10},
  {kind: 'sub', role: 'Almacén', label: 'Validación de entrega', step: 10}
];

const grid = document.getElementById('processGrid');
if (grid) {
  cycleItems.forEach((item, i) => {
    const angleDeg = -90 + i * 360 / cycleItems.length;
    const angle = angleDeg * Math.PI / 180;
    const radius = 40;
    item.x = 50 + Math.cos(angle) * radius;
    item.y = 50 + Math.sin(angle) * radius;
    const b = document.createElement('button');
    b.type = 'button';
    const side = Math.cos(angle) > .34 ? 'right' : Math.cos(angle) < -.34 ? 'left' : (Math.sin(angle) > 0 ? 'bottom' : 'top');
    b.className = 'cycle-node ' + item.kind + (item.kind === 'sub' ? ' label-' + side : '');
    b.dataset.step = item.step;
    b.dataset.role = item.role;
    if (item.endStep !== undefined) b.dataset.sharedEnd = String(item.endStep);
    b.style.left = item.x + '%';
    b.style.top = item.y + '%';
    b.setAttribute('aria-label', item.role + ' — ' + item.label);
    if (item.kind === 'area') {
      b.innerHTML = '<b>' + item.label + '</b>';
    } else {
      b.innerHTML = '<span>' + item.label + '</span>';
      b.title = item.label;
    }
    b.addEventListener('click', () => {
      if (item.endStep !== undefined) {
        current = (current >= Math.floor(steps.length / 2) ? item.endStep : item.step);
      } else {
        current = item.step;
      }
      renderStep();
    });
    grid.appendChild(b);
  });
}

function expandVideo() {
  const modal = document.getElementById('videoModal');
  const modalPlayer = document.getElementById('videoModalPlayer');
  const vid = document.getElementById('stepVideo');
  const s = steps[current];
  if (!modal || !modalPlayer || !vid) return;

  const titleEl = document.getElementById('videoModalTitle');
  if (titleEl && s) {
    titleEl.innerHTML = `<i class="mdi mdi-video-box"></i> ${s.heading} (${s.role})`;
  }

  modalPlayer.appendChild(vid);
  vid.controls = true;
  modal.classList.add('active');
  vid.play().catch(() => {});
}

function closeExpandedVideo() {
  const modal = document.getElementById('videoModal');
  const compactWrap = document.getElementById('videoMediaWrap');
  const vid = document.getElementById('stepVideo');
  const overlay = document.getElementById('videoCompactOverlay');
  if (!modal || !compactWrap || !vid) return;

  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    vid.pause();
    vid.controls = false;
    if (overlay) {
      compactWrap.insertBefore(vid, overlay);
    } else {
      compactWrap.appendChild(vid);
    }
  }
}

const videoMediaWrapEl = document.getElementById('videoMediaWrap');
if (videoMediaWrapEl) {
  videoMediaWrapEl.addEventListener('click', () => {
    expandVideo();
  });
}

const videoExpandBtnEl = document.getElementById('videoExpandBtn');
if (videoExpandBtnEl) {
  videoExpandBtnEl.addEventListener('click', (e) => {
    e.stopPropagation();
    expandVideo();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeExpandedVideo();
    return;
  }
  const modal = document.getElementById('videoModal');
  if (modal && modal.classList.contains('active')) {
    return;
  }
  if (e.key === 'ArrowRight' && document.getElementById('story').classList.contains('show')) nextStep();
  if (e.key === 'ArrowLeft' && document.getElementById('story').classList.contains('show')) previousStep();
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('story').classList.add('show');
  document.getElementById('nav').style.display = 'flex';
  renderStep();
});

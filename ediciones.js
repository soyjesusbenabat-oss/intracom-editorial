(function(){
"use strict";
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const R=(id,p)=>(window.__resources&&window.__resources[id])||p;
const P=t=>`<span class="pend" data-pend="${t}"></span>`;

/* ---------- datos ---------- */
const COLS=[
{id:"gen",slug:"coleccion-estudios-de-genero",name:"Estudios de Género",cc:"var(--c-gen)",short:"Relaciones de género, desigualdades, feminismos y diversidad en el espacio iberoamericano.",
def:"Investigación sobre las relaciones de género en las sociedades contemporáneas: desigualdades estructurales, movimientos feministas, políticas de igualdad, masculinidades, identidades y diversidad sexual, desde las ciencias sociales, las humanidades y el derecho, con especial atención al espacio iberoamericano.",
lines:["Género y comunicación","Violencias machistas","Políticas públicas de igualdad","Trabajo y cuidados","Interseccionalidad y feminismos decoloniales","Masculinidades","Diversidad sexual y derechos"],journal:"Intracom Journal · Media Ethics Journal · DDHHGlobal"},
{id:"ddhh",slug:"coleccion-pensamiento-critico-ddhh",name:"Pensamiento Crítico y Derechos Humanos",cc:"var(--c-ddhh)",short:"Derechos humanos, globalización y los grandes debates contemporáneos desde una mirada crítica.",
def:"Estudios sobre derechos humanos y globalización, y sobre los grandes debates de las sociedades contemporáneas desde una mirada crítica e interdisciplinar: filosofía política y moral, teoría social, derecho y ética aplicada, ante los desafíos de la democracia y de las transformaciones tecnológicas.",
lines:["Derechos humanos","Globalización y justicia global","Ética aplicada y ética de la IA","Teoría política y democracia","Migraciones y ciudadanía","Filosofía del derecho","Memoria y justicia transicional"],journal:"DDHHGlobal"},
{id:"com",slug:"coleccion-estudios-de-comunicacion",name:"Estudios de Comunicación",cc:"var(--c-com)",short:"Periodismo, desinformación, medios digitales e IA en la esfera pública democrática.",
def:"Investigación sobre los procesos comunicativos y su papel en la construcción de la esfera pública democrática: periodismo, ética de la comunicación, medios digitales, desinformación, comunicación política y el impacto de la inteligencia artificial en los sistemas informativos.",
lines:["Ética periodística y deontología","Desinformación y verificación","Comunicación política","Plataformas y medios digitales","IA aplicada al periodismo","Alfabetización mediática","Comunicación de la ciencia"],journal:"Intracom Journal · Media Ethics Journal"}];
const YES=["Monografías de investigación","Obras colectivas temáticas coordinadas","Tesis doctorales revisadas y adaptadas"];
const NO=["Actas y memorias de congresos","Comunicaciones sin ampliar","Manuales, guías y libros de texto","Compilaciones sin estudio introductorio"];
// Los cinco títulos anteriores: datos pendientes. col:"prev" = sin colección.
const BOOKS=[
{col:"prev",tipo:null,lang:"es",year:2024,title:"Comunicación y educación cívica en el entorno digital",isbn:"978-84-09-61989-4",authors:"Jesús Cruz Álvarez, Juan Carlos Suárez Villegas",img:R("bookCivica","libro-comunicacion-educacion-civica.jpg")},
{col:"prev",tipo:null,lang:"es",year:2021,title:"Elementos para una educación global",isbn:"978-84-09-62890-2",sub:"Experiencias extraídas del proyecto europeo The Bigger Picture",authors:"Juan Carlos Suárez Villegas",img:R("bookGlobal","libro-educacion-global.jpg")},
{col:"prev",tipo:"col",lang:"es",year:2019,title:"Competencia multicultural para la movilidad laboral",isbn:"978-84-09-61988-7",authors:"Juan Carlos Suárez Villegas (coord.) · Sergio Marín Conejo (trad.)",img:R("bookMulti","libro-competencia-multicultural.jpg")}];

/* ---------- colecciones ---------- */
const tabs=$("#colTabs"),panels=$("#colPanels");
tabs.innerHTML=COLS.map((c,i)=>`<button class="col-tab" role="tab" id="tab-${c.id}" aria-controls="${c.slug}" aria-selected="${i===0}" style="--cc:${c.cc}"><span class="lab">Colección 0${i+1}</span><h3>${c.name}</h3><p>${c.short}</p></button>`).join("");
panels.innerHTML=COLS.map((c,i)=>`<article class="col-panel" role="tabpanel" id="${c.slug}" aria-labelledby="tab-${c.id}" style="--cc:${c.cc}" ${i?"hidden":""}>
<div class="cp-grid"><div>
<span class="lab" style="color:${c.cc}">Colección · ${c.name}</span>
<p class="cp-def">${c.def}</p>
<div class="cp-block"><span class="lab">Líneas temáticas prioritarias</span><div class="chips">${c.lines.map(l=>`<span class="chip">${l}</span>`).join("")}</div></div>
<div class="cp-block"><div class="yesno"><div><h4>Acepta</h4><ul class="y">${YES.map(x=>`<li>${x}</li>`).join("")}</ul></div><div><h4>No acepta</h4><ul class="n">${NO.map(x=>`<li>${x}</li>`).join("")}</ul></div></div></div>
</div>
<aside class="cp-side">

<div class="empty"><span class="lab" style="color:${c.cc}">Convocatoria abierta</span><h4>Sé parte del primer número</h4><p>La colección aún no tiene títulos publicados. Aceptamos propuestas de monografías y de obras colectivas coordinadas.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-primary btn-sm" href="#convocatorias">Ver convocatoria</a><a class="btn btn-ghost btn-sm" href="#normas">Normas</a></div></div>
</aside></div>
<div class="committee"><div class="committee-head"><h4>Dirección y comité científico</h4><span class="mono" style="color:var(--muted)">Nombre · afiliación · país · ORCID</span></div>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nombre</th><th>Afiliación</th><th>País</th><th>ORCID</th></tr></thead><tbody>
<tr class="role"><td colspan="4">Dirección de la colección</td></tr>
<tr><td class="ph-cell" colspan="3">${P("Dirección de "+c.name+": nombre, afiliación, país")}</td><td><span class="orcid"><i></i>0000-0000-0000-0000</span></td></tr>
<tr class="role"><td colspan="4">Comité científico</td></tr>
<tr><td class="ph-cell" colspan="3">${P("Comité científico de "+c.name+": nombre, afiliación, país y ORCID de cada miembro")}</td><td><span class="orcid"><i></i>0000-0000-0000-0000</span></td></tr>
</tbody></table></div></div>
</article>`).join("");
function selectCol(id,focus){COLS.forEach(c=>{const on=c.id===id;$("#tab-"+c.id).setAttribute("aria-selected",on);$("#"+c.slug).hidden=!on});if(focus)$("#tab-"+id).focus()}
$$(".col-tab").forEach((t,i)=>{t.addEventListener("click",()=>selectCol(COLS[i].id));t.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){const n=(i+(e.key==="ArrowRight"?1:2))%3;selectCol(COLS[n].id,true)}})});

/* ---------- convocatorias ---------- */
const callCard=(c,mini)=>`<div class="call" style="--cc:${c.cc}"><div><span class="lab">${c.name} · Obra colectiva</span><h4>Tema ${P("Tema de la convocatoria · "+c.name)}</h4>${mini?"":`<dl><div><dt>Coordinación</dt><dd>${P("Coordinación · "+c.name)}</dd></div><div><dt>Plazo</dt><dd>${P("Plazo de envío · "+c.name)}</dd></div></dl>`}</div>${mini?"":`<a href="#" class="btn btn-ghost btn-sm">Enviar capítulo →</a>`}</div>`;
$("#callsList").innerHTML=COLS.map(c=>callCard(c)).join("");
$("#callsMini")&&($("#callsMini").innerHTML=COLS.map(c=>callCard(c,true)).join(""));

/* ---------- catálogo ---------- */
const F={col:"*",tipo:"*",lang:"*",year:"*"};
const years=[...new Set(BOOKS.map(b=>b.year).filter(Boolean))].sort().reverse();
const match=b=>(F.col==="*"||b.col===F.col)&&(F.tipo==="*"||b.tipo===F.tipo||!b.tipo)&&(F.lang==="*"||b.lang===F.lang||!b.lang)&&(F.year==="*"||b.year==F.year||!b.year);
const bookHTML=b=>b.pend?`<a class="book" href="ficha-libro.html"><div class="bk-cover"><span>Portada</span></div><div><h4>${b.title} ${P("Datos de "+b.title.toLowerCase()+" (título, autoría, año, ISBN, DOI, portada)")}</h4><p class="bk-meta">Sin colección</p></div></a>`
:`<a class="book" href="ficha-libro.html"><div class="bk-cover has-img"><img src="${b.img}" alt="Portada de ${b.title}" loading="lazy"></div><div><h4>${b.title}</h4><p class="bk-auth">${b.authors}</p><p class="bk-meta">${b.tipo==="col"?"Obra colectiva · ":""}ES · ${b.year}<br>ISBN ${b.isbn}</p></div></a>`;
function renderCat(){
 $("#catalogOut").innerHTML=`<div class="book-grid">${BOOKS.filter(b=>b.col==="prev").map(bookHTML).join("")}</div>`;
 collectPend();
}
$$("#filters .fseg").forEach(seg=>seg.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;$$("button",seg).forEach(x=>x.setAttribute("aria-pressed",x===b));F[seg.dataset.f]=b.dataset.v;renderCat()}));

/* ---------- nav: activa, progreso, menú móvil ---------- */
const nav=$("#nav"),links=$$("#navLinks a"),prog=$("#progress"),where=$("#where");
const secs=$$("main section[id][data-name]");
const linkFor=id=>links.find(a=>a.getAttribute("href")==="#"+id);
function onScroll(){
 nav.classList.toggle("scrolled",scrollY>10);
 const h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+"%";
 const y=scrollY+innerHeight*0.35;let cur=secs[0];
 secs.forEach(s=>{if(s.offsetTop<=y)cur=s});
 if(scrollY>0&&innerHeight+scrollY>=document.documentElement.scrollHeight-4)cur=secs[secs.length-1];
 let id=cur.id;if(id==="transparencia")id="politica-editorial";
 links.forEach(a=>a.classList.toggle("active",a===linkFor(id)));
 where.textContent=(secs.indexOf(cur)+1).toString().padStart(2,"0")+" / 08 · "+cur.dataset.name;
 // índice de la política
 const pl=$$("#polIndex a");let pc=null;
 pl.forEach(a=>{const t=$(a.getAttribute("href"));if(t&&t.getBoundingClientRect().top<innerHeight*0.4)pc=a});
 pl.forEach(a=>a.classList.toggle("active",a===pc));
}
addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onScroll);
const nl=$("#navLinks"),tg=$("#navToggle");
tg.addEventListener("click",()=>{const o=nl.classList.toggle("open");tg.setAttribute("aria-expanded",o)});
links.forEach(a=>a.addEventListener("click",()=>{nl.classList.remove("open");tg.setAttribute("aria-expanded",false)}));

/* ---------- anclas a políticas: abrir el desplegable ---------- */
function openHash(){const h=location.hash;if(!h)return;const el=document.getElementById(h.slice(1));if(!el)return;const d=el.closest("details")||(el.tagName==="DETAILS"?el:null);if(d)d.open=true;const p=el.closest(".col-panel");if(p){const c=COLS.find(x=>x.slug===p.id);if(c)selectCol(c.id)}}
addEventListener("hashchange",openHash);openHash();

/* ---------- idioma (solo interfaz) ---------- */
$$(".lang button").forEach(b=>b.addEventListener("click",()=>{$$(".lang button").forEach(x=>x.setAttribute("aria-pressed",x===b));document.documentElement.lang=b.textContent.toLowerCase()}));

/* ---------- cookies RGPD ---------- */
const ck=$("#cookies"),KEY="ediciones-cookies";
let saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
if(!saved)ck.hidden=false;
ck.addEventListener("click",e=>{const a=e.target.closest("[data-ck]");if(!a)return;const v=a.dataset.ck;
 if(v==="cfg"){ck.classList.toggle("cfg");return}
 const val=v==="accept"?(ck.classList.contains("cfg")?($("#ckAn").checked?"all":"tech"):"all"):"tech";
 try{localStorage.setItem(KEY,val)}catch(e){}ck.hidden=true});
$("#cookieReopen").addEventListener("click",e=>{e.preventDefault();ck.hidden=false;ck.classList.add("cfg")});

/* ---------- pendientes ---------- */
const fab=$("#pendFab"),pp=$("#pendPanel");
function collectPend(){
 const seen=new Map();
 $$(".pend[data-pend]").forEach(el=>{if(el.closest("#callsMini"))return;const k=el.dataset.pend;if(!seen.has(k))seen.set(k,el)});
 $("#pendN").textContent=seen.size;
 $("#pendList").innerHTML=[...seen.keys()].map((k,i)=>`<li><a href="#" data-i="${i}">${k}</a></li>`).join("");
 collectPend.els=[...seen.values()];
}
fab.addEventListener("click",()=>{const o=pp.hidden;pp.hidden=!o;fab.setAttribute("aria-expanded",o)});
$("#pendList").addEventListener("click",e=>{const a=e.target.closest("a");if(!a)return;e.preventDefault();const el=collectPend.els[+a.dataset.i];
 const p=el.closest(".col-panel");if(p&&p.hidden){const c=COLS.find(x=>x.slug===p.id);selectCol(c.id)}
 const d=el.closest("details");if(d)d.open=true;
 const r=el.getBoundingClientRect();scrollTo({top:scrollY+r.top-innerHeight/2,behavior:"smooth"});
 el.classList.remove("pend-flash");void el.offsetWidth;el.classList.add("pend-flash")});

renderCat();onScroll();
addEventListener("load",onScroll);document.fonts&&document.fonts.ready.then(onScroll);
if(window.ResizeObserver)new ResizeObserver(onScroll).observe(document.body);
})();

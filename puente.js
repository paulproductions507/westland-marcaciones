/* Puente · Gestor de Bodega → consultas. Se carga desde el marcador corto. */
(function(){var U=window.__PUENTE_U;if(!U){alert('Puente: falta la dirección de la app. Vuelve a copiar el Puente desde la app.');return}
function BMCODE(U){try{var send=function(o){var j=btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_'),u=U+'#gestor='+j,w=(o.sil||o.k==='fin')?window.open(u,'_blank','popup=yes,width=440,height=660,left='+Math.max(0,(screen.width||900)-500)+',top=60'):window.open(u,'_blank');if(!w)location.href=u},d=document,tx=function(e){return e?e.textContent.replace(/\s+/g,' ').trim():''},g=function(i){return tx(d.getElementById(i))},o=null,i,c,x,m,L,R,t,H,rows,tr,cb,s2,E,dest,st;
t=d.getElementById('MainContent_gvTransferDetail');
var PRE=null,isS=!!(t&&g('MainContent_lblTransferNumber')),ce,bk=0,er,okm,okv;
try{if(!window.__puL){window.__puL=1;window.addEventListener('message',function(e){try{if(e.origin!==new URL(U).origin)return;var m=e.data||{},p;if(m.pu==='arm'){p=JSON.parse(localStorage.getItem('puente_pre')||'null');if(p&&p.tr===String(m.tr)){p.arm=1;if(m.bk)p.bk=m.bk;localStorage.setItem('puente_pre',JSON.stringify(p))}}else if(m.pu==='clr')localStorage.removeItem('puente_pre')}catch(x){}})}}catch(e){}
try{PRE=JSON.parse(localStorage.getItem('puente_pre')||'null');if(PRE&&(!PRE.arm||Date.now()-PRE.ts>108e5))PRE=null}catch(e){PRE=null}
if(PRE){
if(isS){if(g('MainContent_lblTransferNumber').replace(/\D/g,'')===PRE.tr){ce=g('MainContent_lblCompleteMessageError');okm=g('MainContent_lblDispatchUpdate')+' '+g('lblMessage');
if(ce){send({k:'fin',tr:PRE.tr,ok:0,err:ce,bk:PRE.bk});return}
if(/complet(ad|o)|[eé]xito/i.test(okm)){send({k:'fin',tr:PRE.tr,ok:1,err:'',bk:PRE.bk});return}}}
else{er=[].slice.call(d.querySelectorAll('.block-message-error span,#lblError,#MainContent_lblCompleteMessageError,#MainContent_lblMessageError')).map(tx).join(' ').trim();
okm=[].slice.call(d.querySelectorAll('#lblMessage,.block-message span')).map(tx).join(' ');
okv=er?0:((okm.indexOf(PRE.tr)>-1||/complet|[eé]xito|guardad|surtid/i.test(okm))?1:((d.body.innerText||'').indexOf(PRE.tr)>-1?'?':1));
PRE.fs=(PRE.fs||0)+1;try{if(PRE.fs>2)localStorage.removeItem('puente_pre');else localStorage.setItem('puente_pre',JSON.stringify(PRE))}catch(e){}
send({k:'fin',tr:PRE.tr,ok:okv,err:er,bk:PRE.bk});return}}
if(t&&g('MainContent_lblTransferNumber')){L=[];R=t.rows;for(i=1;i<R.length;i++){c=R[i].cells;if(c.length<10)continue;x=function(k){var e=c[k];if(!e)return'';var n=e.querySelector('input[type=number],input[type=text]');return n?n.value:tx(e)};m=x(2).match(/^(?:(\S+)\s+)?(\d{5,9})$/);if(!m)continue;L.push({r:m[1]||'',p:m[2],i:x(3),s:x(4),v:x(5),d:x(6),b:x(7),n:x(9),u:x(10)})}if(!L.length){alert('No encontré productos en esta pantalla');return}for(i=0;i<L.length;i++)bk+=(+L[i].b||0);if(!bk)bk=+((d.getElementById('MainContent_txtTotalBulks')||{}).value)||0;
o={tr:g('MainContent_lblTransferNumber'),fs:g('MainContent_lblCaptureRequestedDate'),org:g('MainContent_lblOrigin'),des:g('MainContent_lblDestiny'),nota:g('MainContent_LblNote'),tot:g('MainContent_lblTotalUnitsDispatched'),l:L,sil:1,bk:bk};
try{localStorage.setItem('puente_pre',JSON.stringify({tr:o.tr.replace(/\D/g,''),ts:Date.now(),bk:bk,arm:0}))}catch(e){}}
else if(d.getElementById('MainContent_gvTransferAssigned')){t=d.getElementById('MainContent_gvTransferAssigned');H={};for(i=0;i<t.rows[0].cells.length;i++)H[tx(t.rows[0].cells[i]).toLowerCase()]=i;rows=[];dest='';s2=d.getElementById('MainContent_ddlEmployeeAssigned');E=d.getElementById('MainContent_gvEmployee');
for(i=1;i<t.rows.length;i++){c=t.rows[i].cells;tr=tx(c[H['transf #']]).replace(/\D/g,'');if(!/^\d{7,9}$/.test(tr))continue;cb=t.rows[i].querySelector('input[type=checkbox]');rows.push({t:tr,e:tx(c[H['estado']]),c:tx(c[H['colaborador']]),n:tx(c[H['nota']]),f:tx(c[H['fecha solicitud']]),x:cb&&cb.checked?1:0})}
if(E)for(i=1;i<E.rows.length;i++){st=E.rows[i].getAttribute('style')||'';if(/009999|0,\s*153,\s*153/i.test(st)&&E.rows[i].cells.length>1)dest=tx(E.rows[i].cells[1])}
if(!rows.length){alert('No encontré transferencias en esta lista');return}o={k:'asg',col:s2?s2.value:'',dest:dest,rows:rows}}
else if(d.getElementById('MainContent_gvTransfer')){t=d.getElementById('MainContent_gvTransfer');H={};for(i=0;i<t.rows[0].cells.length;i++)H[tx(t.rows[0].cells[i]).toLowerCase()]=i;rows=[];
for(i=1;i<t.rows.length;i++){c=t.rows[i].cells;tr=tx(c[H['transf']]).replace(/\D/g,'');if(!/^\d{7,9}$/.test(tr))continue;rows.push({t:tr,n:tx(c[H['notas']]),np:tx(c[H['cant productos']]),pz:tx(c[H['cant piezas']]),des:tx(c[H['inv destino']]),fs:tx(c[H['fecha solicitado']])})}
if(!rows.length){alert('No encontré transferencias en esta lista');return}o={k:'add',rows:rows}}
else if(d.getElementById('DisTablas')){t=d.getElementById('DisTablas');var RW=[],HC,TM=[],q1,cr1,SK=[],kk,ci,rr;
try{if(window.jQuery&&jQuery.fn.dataTable&&jQuery.fn.dataTable.isDataTable(t)){RW=jQuery(t).DataTable().rows().nodes().toArray()}}catch(e){RW=[]}
if(!RW.length)RW=[].slice.call(t.tBodies[0]?t.tBodies[0].rows:[]);
HC=t.tHead&&t.tHead.rows[0]?t.tHead.rows[0].cells:t.rows[0].cells;H={};
for(i=0;i<HC.length;i++){kk=tx(HC[i]).toLowerCase();H[kk]=i;if(/^\d{1,2}$/.test(kk)||kk==='ec'||kk==='crt')SK.push(kk);if(/^descrip/.test(kk))H.desc=i}
for(i=0;i<RW.length;i++){c=RW[i].cells;if(!c||c.length<10)continue;m=tx(c[H['producto']]);if(!/^\d{5,9}$/.test(m))continue;rr={r:tx(c[H['ref. suplidor']]),p:m,d:tx(c[H.desc]),pr:tx(c[H['precio']]),iv:tx(c[H['inventario']]),dis:tx(c[H['dis']]),s:{}};
for(ci=0;ci<SK.length;ci++)rr.s[SK[ci]]=tx(c[H[SK[ci]]]);TM.push(rr)}
if(!TM.length){alert('No encontré productos en la tabla de distribución');return}
q1=d.getElementById('DistributionId');cr1=(d.body.innerText.match(/CREADOR\.?\s*([\w.\-]+)/i)||[])[1]||'';
o={k:'tm',id:q1?q1.value:((location.search.match(/DistributionId=(\d+)/i)||[])[1]||''),cr:cr1,rows:TM}}
else if(d.querySelector('.panel-heading h2')&&/^S\s*#\d+\s*-\s*\d{5,9}/.test(tx(d.querySelector('.panel-heading h2')))){var CD=[],PC='',RF='',HS=d.querySelectorAll('.panel-heading h2'),pn,bt,an,n1,n2,n3,em;
for(i=0;i<HS.length;i++){m=tx(HS[i]).match(/^S\s*#(\d+)\s*-\s*(\d{5,9})/);if(!m)continue;pn=HS[i].closest('.panel');if(!pn)continue;bt=tx(pn.querySelector('.panel-body p')||pn);an=pn.querySelector('a[data-id]');
n1=bt.match(/Distribuir:\s*(\d+)/);n2=bt.match(/Surtidas?:\s*(\d+)/);n3=bt.match(/Disponible:\s*(-?\d+)/);PC=m[2];
if(!RF){em=tx(pn.querySelector('.panel-heading label')).match(/Estilo:\s*(.*)$/);RF=em?em[1].trim():''}
CD.push({t:m[1],dp:n3?+n3[1]:0,di:n1?+n1[1]:0,su:n2?+n2[1]:0,tr:an?(an.getAttribute('data-id')||tx(an)):((bt.match(/Transferencia:\s*(\d+)/)||[])[1]||'')})}
o={k:'ts',dist:(location.search.match(/distributionId=(\d+)/i)||[])[1]||(((d.querySelector('a[href*="istributionId="]')||{}).href||'').match(/istributionId=(\d+)/)||[])[1]||'',p:PC,ref:RF,c:CD}}
else if(d.getElementById('myTables')&&/Proforma/i.test(tx(d.getElementById('myTables')))&&/Cliente/i.test(tx(d.getElementById('myTables')))){
t=d.getElementById('myTables');var PR=[],RW2=[],pf1,pr1,rc1,rf1,an1,hi;
try{if(window.jQuery&&jQuery.fn.dataTable&&jQuery.fn.dataTable.isDataTable(t)){RW2=jQuery(t).DataTable().rows().nodes().toArray()}}catch(e){RW2=[]}
if(!RW2.length)RW2=[].slice.call(t.tBodies[0]?t.tBodies[0].rows:[]);
for(i=0;i<RW2.length;i++){c=RW2[i].cells;if(!c||c.length<12)continue;pf1=tx(c[1]);if(!/^\d{3,}$/.test(pf1))continue;hi=c[5]?c[5].querySelector('input[name=qtyRequest]'):null;
PR.push({pf:pf1,pos:tx(c[2]),c:tx(c[3]),re:tx(c[4]),sol:hi?hi.value:tx(c[5]),su:tx(c[7]),de:tx(c[8]),f:tx(c[11])})}
if(!PR.length){alert('No encontré proformas en esta pantalla');return}
an1=d.querySelector('a.anchorDetail');pr1=an1?(an1.getAttribute('data-id')||tx(an1)):((location.search.match(/product=(\d+)/i)||[])[1]||'');
rc1=(location.search.match(/recibo=(\d+)/i)||[])[1]||((d.querySelector('input[name=recibo]')||{}).value||'');
rf1=tx(d.querySelector('.table-responsive label'))||decodeURIComponent((location.search.match(/referencia=([^&]*)/i)||[])[1]||'').trim();
o={k:'pf',p:pr1,rc:rc1,ref:rf1,rows:PR}}
else{var TB=null,TL=d.querySelectorAll('table'),im,I2;
for(i=0;i<TL.length;i++){if(/^\s*Cod\./i.test(tx(TL[i]))&&/Ref\.?\s*Supl/i.test(tx(TL[i]))&&TL[i].rows.length>1){TB=TL[i];break}}
if(!TB){alert('Puente: abre la pantalla de Surtido de una transferencia, el listado de transferencias por agregar, Liberación y reasignación, la Distribución del túnel manual, el Surtido del producto, las Proformas del producto (Cristal) o Producto - INV (etiqueta)');return}
c=TB.rows[1].cells;o={k:'pi',c:tx(c[0]),d:tx(c[1]),l:tx(c[2]),r:tx(c[3]),t:tx(c[4])};
im=d.querySelector('#mimodal.in img.recibir-imagen')||d.querySelector('img.imagen');
if(im&&im.src&&!/sin_imagen/i.test(im.src)){I2=new Image();I2.crossOrigin='anonymous';
I2.onload=function(){try{var w=I2.naturalWidth,h=I2.naturalHeight,s=Math.min(1,380/Math.max(w,h)),cv=d.createElement('canvas'),cx;cv.width=Math.max(1,Math.round(w*s));cv.height=Math.max(1,Math.round(h*s));cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,cv.width,cv.height);cx.drawImage(I2,0,0,cv.width,cv.height);o.i=cv.toDataURL('image/jpeg',.6)}catch(e){}send(o)};
I2.onerror=function(){send(o)};I2.src=im.currentSrc||im.src;return}}
send(o)}catch(e){alert('Puente: '+e.message)}}
BMCODE(U)})();

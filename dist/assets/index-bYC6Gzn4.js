(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const Be=(e,t)=>e===t,ve=Symbol("solid-track"),J={equals:Be};let G=null,xe=Ce;const C=1,Y=2,Te={owned:null,cleanups:null,context:null,owner:null};var h=null;let ue=null,Me=null,g=null,$=null,k=null,ne=0;function R(e,t){const n=g,s=h,r=e.length===0,l=t===void 0?s:t,o=r?Te:{owned:null,cleanups:null,context:l?l.context:null,owner:l},i=r?e:()=>e(()=>M(()=>re(o)));h=o,g=null;try{return H(i,!0)}finally{g=n,h=s}}function _(e,t){t=t?Object.assign({},J,t):J;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=r=>(typeof r=="function"&&(r=r(n.value)),Ee(n,r));return[ke.bind(n),s]}function N(e,t,n){const s=se(e,t,!1,C);q(s)}function je(e,t,n){xe=Ue;const s=se(e,t,!1,C);(!n||!n.render)&&(s.user=!0),k?k.push(s):q(s)}function X(e,t,n){n=n?Object.assign({},J,n):J;const s=se(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,q(s),ke.bind(s)}function M(e){if(g===null)return e();const t=g;g=null;try{return e()}finally{g=t}}function ge(e){return h===null||(h.cleanups===null?h.cleanups=[e]:h.cleanups.push(e)),e}function De(e,t){G||(G=Symbol("error")),h=se(void 0,void 0,!0),h.context={...h.context,[G]:[t]};try{return e()}catch(n){le(n)}finally{h=h.owner}}function ke(){if(this.sources&&this.state)if(this.state===C)q(this);else{const e=$;$=null,H(()=>z(this),!1),$=e}if(g){const e=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(e)):(g.sources=[this],g.sourceSlots=[e]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function Ee(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&H(()=>{for(let r=0;r<e.observers.length;r+=1){const l=e.observers[r],o=ue&&ue.running;o&&ue.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?$.push(l):k.push(l),l.observers&&Pe(l)),o||(l.state=C)}if($.length>1e6)throw $=[],new Error},!1)),t}function q(e){if(!e.fn)return;re(e);const t=ne;Re(e,e.value,t)}function Re(e,t,n){let s;const r=h,l=g;g=h=e;try{s=e.fn(t)}catch(o){return e.pure&&(e.state=C,e.owned&&e.owned.forEach(re),e.owned=null),e.updatedAt=n+1,le(o)}finally{g=l,h=r}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ee(e,s):e.value=s,e.updatedAt=n)}function se(e,t,n,s=C,r){const l={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:h,context:h?h.context:null,pure:n};return h===null||h!==Te&&(h.owned?h.owned.push(l):h.owned=[l]),l}function Z(e){if(e.state===0)return;if(e.state===Y)return z(e);if(e.suspense&&M(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ne);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===C)q(e);else if(e.state===Y){const s=$;$=null,H(()=>z(e,t[0]),!1),$=s}}function H(e,t){if($)return e();let n=!1;t||($=[]),k?n=!0:k=[],ne++;try{const s=e();return Xe(n),s}catch(s){n||(k=null),$=null,le(s)}}function Xe(e){if($&&(Ce($),$=null),e)return;const t=k;k=null,t.length&&H(()=>xe(t),!1)}function Ce(e){for(let t=0;t<e.length;t++)Z(e[t])}function Ue(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:Z(s)}for(t=0;t<n;t++)Z(e[t])}function z(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const r=s.state;r===C?s!==t&&(!s.updatedAt||s.updatedAt<ne)&&Z(s):r===Y&&z(s,t)}}}function Pe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Y,n.pure?$.push(n):k.push(n),n.observers&&Pe(n))}}function re(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const l=r.pop(),o=n.observerSlots.pop();s<r.length&&(l.sourceSlots[o]=s,r[s]=l,n.observerSlots[s]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)re(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Fe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function we(e,t,n){try{for(const s of t)s(e)}catch(s){le(s,n&&n.owner||null)}}function le(e,t=h){const n=G&&t&&t.context&&t.context[G],s=Fe(e);if(!n)throw s;k?k.push({fn(){we(s,n,t)},state:C}):we(s,n,t)}const he=Symbol("fallback");function ee(e){for(let t=0;t<e.length;t++)e[t]()}function Ge(e,t,n={}){let s=[],r=[],l=[],o=0,i=t.length>1?[]:null;return ge(()=>ee(l)),()=>{let f=e()||[],u,c;return f[ve],M(()=>{let d=f.length,y,x,L,P,B,v,A,T,O;if(d===0)o!==0&&(ee(l),l=[],s=[],r=[],o=0,i&&(i=[])),n.fallback&&(s=[he],r[0]=R(oe=>(l[0]=oe,n.fallback())),o=1);else if(o===0){for(r=new Array(d),c=0;c<d;c++)s[c]=f[c],r[c]=R(p);o=d}else{for(L=new Array(d),P=new Array(d),i&&(B=new Array(d)),v=0,A=Math.min(o,d);v<A&&s[v]===f[v];v++);for(A=o-1,T=d-1;A>=v&&T>=v&&s[A]===f[T];A--,T--)L[T]=r[A],P[T]=l[A],i&&(B[T]=i[A]);for(y=new Map,x=new Array(T+1),c=T;c>=v;c--)O=f[c],u=y.get(O),x[c]=u===void 0?-1:u,y.set(O,c);for(u=v;u<=A;u++)O=s[u],c=y.get(O),c!==void 0&&c!==-1?(L[c]=r[u],P[c]=l[u],i&&(B[c]=i[u]),c=x[c],y.set(O,c)):l[u]();for(c=v;c<d;c++)c in L?(r[c]=L[c],l[c]=P[c],i&&(i[c]=B[c],i[c](c))):r[c]=R(p);r=r.slice(0,o=d),s=f.slice(0)}return r});function p(d){if(l[c]=d,i){const[y,x]=_(c);return i[c]=x,t(f[c],y)}return t(f[c])}}}function Ve(e,t,n={}){let s=[],r=[],l=[],o=[],i=0,f;return ge(()=>ee(l)),()=>{const u=e()||[];return u[ve],M(()=>{if(u.length===0)return i!==0&&(ee(l),l=[],s=[],r=[],i=0,o=[]),n.fallback&&(s=[he],r[0]=R(p=>(l[0]=p,n.fallback())),i=1),r;for(s[0]===he&&(l[0](),l=[],s=[],r=[],i=0),f=0;f<u.length;f++)f<s.length&&s[f]!==u[f]?o[f](()=>u[f]):f>=s.length&&(r[f]=R(c));for(;f<s.length;f++)l[f]();return i=o.length=l.length=u.length,s=u.slice(0),r=r.slice(0,i)});function c(p){l[f]=p;const[d,y]=_(u[f]);return o[f]=y,t(d,f)}}}function b(e,t){return M(()=>e(t||{}))}function Ke(e){const t="fallback"in e&&{fallback:()=>e.fallback};return X(Ge(()=>e.each,e.children,t||void 0))}function qe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return X(Ve(()=>e.each,e.children,t||void 0))}let Q;function He(e){let t;const[n,s]=_(t,void 0);return Q||(Q=new Set),Q.add(s),ge(()=>Q.delete(s)),X(()=>{let r;if(r=n()){const l=e.fallback;return typeof l=="function"&&l.length?M(()=>l(r,()=>s())):l}return De(()=>e.children,s)},void 0,void 0)}function We(e,t,n){let s=n.length,r=t.length,l=s,o=0,i=0,f=t[r-1].nextSibling,u=null;for(;o<r||i<l;){if(t[o]===n[i]){o++,i++;continue}for(;t[r-1]===n[l-1];)r--,l--;if(r===o){const c=l<s?i?n[i-1].nextSibling:n[l-i]:f;for(;i<l;)e.insertBefore(n[i++],c)}else if(l===i)for(;o<r;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[l-1]&&n[i]===t[r-1]){const c=t[--r].nextSibling;e.insertBefore(n[i++],t[o++].nextSibling),e.insertBefore(n[--l],c),t[r]=n[l]}else{if(!u){u=new Map;let p=i;for(;p<l;)u.set(n[p],p++)}const c=u.get(t[o]);if(c!=null)if(i<c&&c<l){let p=o,d=1,y;for(;++p<r&&p<l&&!((y=u.get(t[p]))==null||y!==c+d);)d++;if(d>c-i){const x=t[o];for(;i<c;)e.insertBefore(n[i++],x)}else e.replaceChild(n[i++],t[o++])}else o++;else t[o++].remove()}}}const _e="_$DX_DELEGATE";function Qe(e,t,n,s={}){let r;return R(l=>{r=l,t===document?e():S(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{r(),t.textContent=""}}function m(e,t,n){let s;const r=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>M(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return l.cloneNode=l,l}function Oe(e,t=window.document){const n=t[_e]||(t[_e]=new Set);for(let s=0,r=e.length;s<r;s++){const l=e[s];n.has(l)||(n.add(l),t.addEventListener(l,Ye))}}function ie(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function V(e,t){t==null?e.removeAttribute("class"):e.className=t}function Je(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=l=>r.call(e,n[1],l))}else e.addEventListener(t,n)}function me(e,t,n){if(!t)return n?ie(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let r,l;for(l in n)t[l]==null&&s.removeProperty(l),delete n[l];for(l in t)r=t[l],r!==n[l]&&(s.setProperty(l,r),n[l]=r);return n}function S(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return te(e,t,s,n);N(r=>te(e,t(),r,n),s)}function Ye(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[t];if(s&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?s.call(n,r,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function te(e,t,n,s,r){for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),o){let i=n[0];i&&i.nodeType===3?i.data!==t&&(i.data=t):i=document.createTextNode(t),n=j(e,n,s,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||l==="boolean")n=j(e,n,s);else{if(l==="function")return N(()=>{let i=t();for(;typeof i=="function";)i=i();n=te(e,i,n,s)}),()=>n;if(Array.isArray(t)){const i=[],f=n&&Array.isArray(n);if(pe(i,t,n,r))return N(()=>n=te(e,i,n,s,!0)),()=>n;if(i.length===0){if(n=j(e,n,s),o)return n}else f?n.length===0?Ae(e,i,s):We(e,n,i):(n&&j(e),Ae(e,i));n=i}else if(t.nodeType){if(Array.isArray(n)){if(o)return n=j(e,n,s,t);j(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function pe(e,t,n,s){let r=!1;for(let l=0,o=t.length;l<o;l++){let i=t[l],f=n&&n[l],u;if(!(i==null||i===!0||i===!1))if((u=typeof i)=="object"&&i.nodeType)e.push(i);else if(Array.isArray(i))r=pe(e,i,f)||r;else if(u==="function")if(s){for(;typeof i=="function";)i=i();r=pe(e,Array.isArray(i)?i:[i],Array.isArray(f)?f:[f])||r}else e.push(i),r=!0;else{const c=String(i);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return r}function Ae(e,t,n=null){for(let s=0,r=t.length;s<r;s++)e.insertBefore(t[s],n)}function j(e,t,n,s){if(n===void 0)return e.textContent="";const r=s||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const i=t[o];if(r!==i){const f=i.parentNode===e;!l&&!o?f?e.replaceChild(r,i):e.insertBefore(r,n):f&&i.remove()}else l=!0}}else e.insertBefore(r,n);return[r]}var Ie=m("<div id=MainScreen>"),Ze=m("<div>");const ze=e=>{const t=e.style||{};let n={width:"100%",height:"100%","background-color":"#f006",display:"flex",position:"fixed",top:0,left:0,"flex-direction":"column",flex:1};const s=e.class||"";return n=Object.assign(n,t),(()=>{var r=Ie();return V(r,s),S(r,()=>e.children),N(l=>me(r,n,l)),r})()},ae=e=>{const t=e.style||{};let n={width:"*",height:"*","background-color":"#0f06",display:"flex","justify-content":"center","flex-direction":"row",flex:1};const s=e.id||"",r=e.class||"";return n=Object.assign(n,t),console.log("SubScreen",`
prop_style:`,t,`
props:`,e,`
class:`,r),(()=>{var l=Ie();return ie(l,"id",s),V(l,r),S(l,()=>e.children),N(o=>me(l,n,o)),l})()},D=e=>{const t=e.style||{},n=e.id||"",s=e.class&&Array.isArray(e.class)&&e.class.join(" ")||e.class||"";let r={width:"*",height:"*","background-color":"#00f6",display:"flex","justify-content":"center","align-items":"center","flex-direction":"column"};return r=Object.assign(r,t),console.log("Screen",`
prop_style:`,t,`
props:`,e,`
class:`,s),(()=>{var l=Ze();return ie(l,"id",n),V(l,s),S(l,()=>e.children),N(o=>me(l,r,o)),l})()},K=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],de=(e,t)=>e.reduce((n,s)=>s===t?n+1:n,0),et=(e,t)=>{const n=t==="X"?"O":"X";for(const r of K){const[l,o,i]=r,[f,u,c]=r.map(y=>e[y]),p=+(f===t)+ +(u===t)+ +(c===t),d=+(f===n)+ +(u===n)+ +(c===n);if(p==2&&d==0||d==2&&p==0){if(f=="")return l;if(u=="")return o;if(c=="")return i}}const s=e.reduce((r,l,o)=>(l===""&&r.push(o),r),[]);return s[Math.floor(Math.random()*s.length)]},tt=(e,t)=>{for(const n of K){const s=[e[n[0]],e[n[1]],e[n[2]]],r=de(s,"X"),l=de(s,"O"),o=de(s,"");if(o>1||o==1&&(r==2&&t=="X"||l==2&&t=="O"))return console.log("x:",r,`
o:`,l,`
_:`,o),!1}return!0},nt=(e,t)=>{let n=new Array(8);for(const[s,r]of K.entries())n[s]=+(e[r[0]]===t)+ +(e[r[1]]===t)+ +(e[r[2]]===t);return n},st=e=>{const t=Math.max(...e),n=e.filter(r=>r===t).length,s=e.reduce((r,l,o)=>(l===t&&r.push(o),r),[]);return{maxScore:t,numberOfOccurrence:n,indices:s}},rt=e=>e.maxScore===3;var lt=m("<h1>Tic-Tac-Toe"),it=m("<div id=board>"),ot=m("<select value=P1 class=player-select><option value=P1>Player 1</option><option value=A1>AI 1"),ct=m("<div class=trn-ind>Symbol: X"),Se=m("<div class=score>"),ft=m("<div id=player-sep>"),ut=m("<select value=P2 class=player-select><option value=P2>Player 2</option><option value=A2>AI 2"),at=m("<div class=trn-ind>Symbol: O"),dt=m("<div>");const ht=()=>{const[t,n]=_(["","","","","","","","",""]),[s,r]=_(["unmrk","unmrk","unmrk","unmrk","unmrk","unmrk","unmrk","unmrk","unmrk"]),[l,o]=_(!0),[i,f]=_(!0),[u,c]=_(!0),[p,d]=_(!0),[y,x]=_(!0),[L,P]=_(!1),[B,v]=_(0),[A,T]=_(0),O=X(()=>"player-info "+(l()?"selected":"")),oe=X(()=>"player-info "+(l()?"":"selected")),[Ne,ce]=_("V/S");let fe=new Array(8),W={maxScore:0,numberOfOccurrence:0,indices:[]};const ye=a=>a?"X":"O",be=a=>{if(!t()[a]&&y()){let w=l(),I=ye(w);if(n([...t().slice(0,a),l()?"X":"O",...t().slice(a+1)]),console.log(w,t()),fe=nt(t(),I),W=st(fe),console.log(w,fe),rt(W)){let E=Array.from(t()),U=Array.from(s());console.log("victoryInds",K[W.indices[0]]);for(let F of K[W.indices[0]])U[F]="won";U[a]="vic",console.log(U);for(let F in E)E[F]&&E[F]!==I&&(U[F]="lost");w?v(B()+1):T(A()+1),f(w),x(!1),n(E),r(U)}else r([...s().slice(0,a),"mrkd",...s().slice(a+1)]),P(tt(t(),I))&&(console.log("Drawn"),x(!1),P(!0));o(!w)}};je(()=>{y()||ce("Reset")});const Le=()=>{const a=["","","","","","","","",""],w=["unmrk","unmrk","unmrk","unmrk","unmrk","unmrk","unmrk","unmrk","unmrk"];n(a),x(!0),P(!1),r(w),o(i())},$e=a=>{if(a.target==null)return;const w=a.target.value;console.log(w),w==="P1"&&c(!0),w==="A1"&&c(!1),w==="P2"&&d(!0),w==="A2"&&d(!1)};return setInterval(()=>{const a=ye(l());(!u()&&a==="X"||!p()&&a==="O")&&be(et(t(),a))},690),b(ze,{get children(){return[lt(),b(ae,{id:"sub",get children(){return[b(D,{id:"board-screen",get children(){var a=it();return S(a,b(qe,{get each(){return t()},children:(w,I)=>(()=>{var E=dt();return E.$$click=()=>be(I),ie(E,"id",`board-cell-${I}`),S(E,()=>t()[I]),N(()=>V(E,`board-cell ${s()[I]}`)),E})()})),N(()=>V(a,(y()?"":"pe-non")+" "+(L()?"drw":""))),a}}),b(D,{id:"info-screen",get children(){return[b(ae,{id:"game-info",class:"info-subs",get children(){return[b(D,{get class(){return O()},get children(){return[b(D,{get children(){var a=ot();return a.addEventListener("change",$e),a}}),ct(),(()=>{var a=Se();return S(a,B),a})()]}}),(()=>{var a=ft();return a.$$click=Le,a.$$mouseout=()=>y()?ce("V/S"):void 0,a.$$mouseover=()=>ce("Reset"),S(a,Ne),a})(),b(D,{get class(){return oe()},get children(){return[b(D,{get children(){var a=ut();return a.addEventListener("change",$e),a}}),at(),(()=>{var a=Se();return S(a,A),a})()]}})]}}),b(ae,{id:"game-desc",class:"info-subs",children:"Info"})]}})]}})]}})};Oe(["mouseover","mouseout","click"]);var pt=m('<div style="color:red;font-weight:bold;padding:1rem;border:1px solid red;border-radius:4px;"><h1>Something went wrong!</h1><h4>at App.tsx</h4><p></p><button>Reset'),gt=m("<pre>"),mt=m(`<span style="color:#666;/* Lighter gray for stack trace */ font-family:monospace;margin:0;/* Remove default margin for better formatting */">
`),yt=m('<meta name=description content="Fun Tic-Tac-Toe Game with AI. Modes: PvP, PvAI, AIvAI">'),bt=m('<meta property=og:title content="Tic-Tac-Toe Game">'),$t=m("<meta property=og:url content=https://mayank442000.github.io/Tic-Tac-Toe/>"),wt=m("<meta property=og:image content=./src/assets/Tic-Tac-Toe-icon.png>"),_t=m('<link rel="shortcut icon"type=image/ico href=./src/assets/Tic-Tac-Toe.ico>'),At=m("<title>Tic-Tac-Toe Game");const St=(e,t)=>(()=>{var n=pt(),s=n.firstChild,r=s.nextSibling,l=r.nextSibling,o=l.nextSibling;return S(l,()=>e.message),S(n,(()=>{var i=X(()=>!!e.stack);return()=>i()&&(()=>{var f=gt();return S(f,b(Ke,{get each(){return e.stack.split(`
`)},get fallback(){return[]},children:u=>(()=>{var c=mt(),p=c.firstChild;return S(c,u,p),c})()})),f})()})(),o),Je(o,"click",t,!0),n})(),vt=()=>(_("TicTacToe"),[yt(),bt(),$t(),wt(),_t(),At(),b(He,{fallback:(e,t)=>b(St,{error:e,reset:t}),get children(){return b(ht,{})}})]);Oe(["click"]);const xt=document.getElementById("root");Qe(()=>b(vt,{}),xt);

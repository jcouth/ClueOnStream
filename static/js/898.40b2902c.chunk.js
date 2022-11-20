"use strict";(self.webpackChunkclue_on_stream=self.webpackChunkclue_on_stream||[]).push([[898],{898:function(n,e,t){t.r(e),t.d(e,{default:function(){return _}});var r,i,o,a,c,s,d,l,u,f,h=t(885),w=t(2791),m=t(168),p=t(6444),v=p.ZP.div(r||(r=(0,m.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  padding: 1.319vw 4.749vw;\n\n  max-width: 100vw;\n  max-height: 100vh;\n  width: 100vw;\n  height: 100vh;\n\n  background-color: ",";\n"])),(function(n){return n.theme.colors.primary})),g=p.ZP.div(i||(i=(0,m.Z)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  position: relative;\n\n  width: 100%;\n  height: 100%;\n\n  border-radius: 0.792vw;\n  background-color: ",";\n\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 100%;\n\n    border-radius: inherit;\n    border: 0.264vw solid ",";\n  }\n"])),(function(n){return n.theme.colors.primary}),(function(n){return n.theme.colors.white})),x=p.ZP.div(o||(o=(0,m.Z)(["\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  grid-template-rows: repeat(5, minmax(0, 1fr));\n  grid-gap: 0.528vw;\n"]))),y=p.ZP.div(a||(a=(0,m.Z)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]))),b=p.ZP.p(c||(c=(0,m.Z)(["\n  margin-bottom: 1.319vw;\n\n  font-family: ",";\n  font-weight: ",";\n  font-size: 36px;\n\n  color: ",";\n\n  text-align: center;\n  text-transform: uppercase;\n  text-shadow: 0vw 0.264vw 0.264vw ",";\n"])),(function(n){return n.theme.fonts.primary.family}),(function(n){return n.theme.fonts.primary.weight}),(function(n){return n.theme.colors.white}),(function(n){return n.theme.colors.shadow})),Z=(0,p.ZP)(b)(s||(s=(0,m.Z)(["\n  font-size: 24px;\n"]))),j=t(8613),P=t(254),k=p.ZP.button(d||(d=(0,m.Z)(["\n  position: relative;\n\n  padding: 1.055vw;\n\n  border: none;\n  border-radius: 0.792vw;\n  background-color: ",";\n  box-shadow: 0vw 0.264vw 0.264vw ",";\n\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0.528vw;\n    left: 0.528vw;\n\n    width: calc(100% - 1.055vw);\n    height: calc(100% - 1.055vw);\n\n    border: 0.132vw solid ",";\n    border-radius: 0.792vw;\n\n    opacity: 0.5;\n  }\n"])),(function(n){var e=n.cardType;return P.L3.principal[e]}),(function(n){return n.theme.colors.shadow}),(function(n){var e=n.cardType;return P.L3.before[e]})),L=p.ZP.div(l||(l=(0,m.Z)(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n"]))),S=p.ZP.div(u||(u=(0,m.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  margin-top: 0.396vw;\n  padding: 0.528vw 0.792vw;\n\n  border-radius: 0.264vw;\n  background-color: ",";\n"])),(function(n){var e=n.cardType;return P.L3.before[e]})),O=p.ZP.p(f||(f=(0,m.Z)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  font-family: ",";\n  font-weight: ",";\n  font-size: ",";\n\n  color: ",";\n\n  letter-spacing: -0.033vw;\n  text-align: center;\n  text-transform: uppercase;\n  text-shadow: 0vw 0.264vw 0.264vw ",";\n"])),(function(n){return n.theme.fonts.primary.family}),(function(n){return n.theme.fonts.primary.weight}),(function(n){return n.theme.fonts.primary.subtitle}),(function(n){return n.theme.colors.white}),(function(n){return n.theme.colors.shadow})),T=t(184),C=function(n){var e=n.title,t=n.type;return(0,T.jsxs)(k,{cardType:t,children:[(0,T.jsx)(L,{children:(0,T.jsx)(j.r,{fill:P.L3.before[t]})}),(0,T.jsx)(S,{cardType:t,children:(0,T.jsx)(O,{children:e})})]})},E=(0,w.memo)(C),_=function(){var n=(0,w.useState)({}),e=(0,h.Z)(n,2),t=e[0],r=e[1];return(0,w.useEffect)((function(){var n=localStorage.getItem("@ClueOnStream::cards");n&&r(JSON.parse(n))}),[]),(0,w.useEffect)((function(){var n=function(n){var e=n.key,t=n.newValue;"@ClueOnStream::cards"===e&&r(t?JSON.parse(t):{})};return window.addEventListener("storage",n),function(){return window.removeEventListener("storage",n)}}),[r]),(0,T.jsx)(v,{children:(0,T.jsx)(g,{children:t?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(b,{children:"D\xea as dicas baseado nestas cartas"}),(0,T.jsx)(x,{children:Object.entries(t).map((function(n){var e=(0,h.Z)(n,2),t=e[0],r=e[1],i=r.title,o=r.type;return(0,T.jsx)(E,{title:i,type:o},t)}))})]}):(0,T.jsxs)(y,{children:[(0,T.jsx)(b,{children:"Aguardando in\xedcio da partida"}),(0,T.jsx)(Z,{children:"Posicione esta tela de forma que n\xe3o apare\xe7a na live"})]})})})}}}]);
//# sourceMappingURL=898.40b2902c.chunk.js.map
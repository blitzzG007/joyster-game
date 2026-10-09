/* Integer cube model. Coordinates: right +X, up +Y, front +Z. */
(function(root){
const normals={R:[1,0,0],L:[-1,0,0],U:[0,1,0],D:[0,-1,0],F:[0,0,1],B:[0,0,-1]};
const colors={R:'#dd454f',L:'#fa913d',U:'#e8edf3',D:'#f2cd47',F:'#4db493',B:'#487bdf'};
function rotate(v,a,d){const [x,y,z]=v;return a===0?[x,-d*z,d*y]:a===1?[d*z,y,-d*x]:[-d*y,d*x,z]}
class Cube{
 constructor(){this.reset()}
 reset(){this.pieces=[];for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){if(!x&&!y&&!z)continue;const p=[x,y,z];this.pieces.push({p,stickers:Object.entries(normals).filter(([f,n])=>p.reduce((s,v,i)=>s+v*n[i],0)===1).map(([f,n])=>({n:[...n],color:colors[f]}))})}}
 turn(a,l,d){for(const p of this.pieces)if(p.p[a]===l){p.p=rotate(p.p,a,d);p.stickers.forEach(s=>s.n=rotate(s.n,a,d))}}
 solved(){return Object.values(normals).every(n=>new Set(this.pieces.flatMap(p=>p.stickers.filter(s=>s.n.every((v,i)=>v===n[i])).map(s=>s.color))).size===1)}
 signature(){return JSON.stringify(this.pieces)}
}
const moves={R:[0,1,-1],L:[0,-1,1],U:[1,1,-1],D:[1,-1,1],F:[2,1,-1],B:[2,-1,1]};
const api={Cube,rotate,normals,colors,moves};if(typeof module!=='undefined')module.exports=api;else root.CubeEngine=api;
})(typeof window==='undefined'?globalThis:window);

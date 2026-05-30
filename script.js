const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function loop(){
  cur.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  cur2.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.proj-card,.skill-cat').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur2.style.width='56px';cur2.style.height='56px';cur2.style.borderColor='rgba(6,182,212,.7)';});
  el.addEventListener('mouseleave',()=>{cur2.style.width='36px';cur2.style.height='36px';cur2.style.borderColor='rgba(59,130,246,.5)';});
});


const cv=document.getElementById('bg-canvas'),ctx=cv.getContext('2d');
let W,H;
function rsz(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
rsz();window.addEventListener('resize',rsz);
const pts=Array.from({length:80},()=>({
  x:Math.random()*9999,y:Math.random()*9999,
  vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,
  r:Math.random()*1.5+.3,a:Math.random()*.5+.1
}));
function drawBg(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>W)p.vx*=-1;
    if(p.y<0||p.y>H)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(59,130,246,${p.a})`;ctx.fill();
  });
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
    const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
    ctx.strokeStyle=`rgba(59,130,246,${(1-d/120)*.06})`;ctx.stroke();}
  }
  requestAnimationFrame(drawBg);
}
drawBg();


const roles=['Java Full Stack Developer','Spring Boot Enthusiast','DSA Problem Solver','Frontend Developer','React.js Developer'];
let ri=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
function type(){
  const r=roles[ri];
  tw.innerHTML=`<span style="color:var(--accent2);font-family:'JetBrains Mono',monospace;font-size:1rem;">${del?r.slice(0,ci):r.slice(0,ci)}<span style="animation:blink 1s infinite;color:var(--accent)">|</span></span>`;
  if(!del){ci++;if(ci>r.length){del=true;setTimeout(type,1200);return;}}
  else{ci--;if(ci===0){del=false;ri=(ri+1)%roles.length;}}
  setTimeout(type,del?45:85);
}
type();


const counters=document.querySelectorAll('.stat-n');
const cio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,t=+el.dataset.target,suffix=t===200?'+':t===5?'+':'';
    let c=0;const s=setInterval(()=>{c=Math.min(c+Math.ceil(t/40),t);el.textContent=c+suffix;if(c>=t)clearInterval(s);},30);
    cio.unobserve(el);
  });
},{threshold:.5});
counters.forEach(c=>cio.observe(c));


const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      if(e.target.style.transitionDelay===undefined)e.target.style.transitionDelay='0s';
    }
  });
},{threshold:.15});
document.querySelectorAll('.skill-cat,.proj-card,.titem,.cert-chip,.ach-card').forEach((el,i)=>{
  el.style.transitionDelay=`${(i%4)*.1}s`;
  el.style.transition='opacity .6s ease, transform .6s ease';
  io.observe(el);
});


document.querySelectorAll('.proj-card').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--px',((e.clientX-r.left)/r.width*100)+'%');
    c.style.setProperty('--py',((e.clientY-r.top)/r.height*100)+'%');
  });
});


const st=document.getElementById('scrolltop');
window.addEventListener('scroll',()=>{st.classList.toggle('show',scrollY>500);});

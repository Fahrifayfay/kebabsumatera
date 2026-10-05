/* Live flame border for the spice slider. No external textures or animation library. */
(() => {
  const panel=document.getElementById('spiceLevels');
  const range=document.getElementById('spiceRange');
  const stage=panel?.querySelector('.heat-stage');
  if(!stage || !range)return;
  const canvas=document.createElement('canvas');
  canvas.className='heat-fire';canvas.setAttribute('aria-hidden','true');
  canvas.width=288;canvas.height=144;
  const ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx)return;
  stage.prepend(canvas);panel.classList.add('has-fire');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const w=canvas.width,h=canvas.height,frame=ctx.createImageData(w,h);
  const noiseMap=new Float32Array(128*128);
  let seed=7391;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  noiseMap.forEach((_,i)=>noiseMap[i]=random());
  const embers=Array.from({length:50},()=>({x:random(),phase:random(),speed:.17+random()*.25,size:.5+random()*.8,drift:random()-.5}));
  function noise(x,y){
    const ix=Math.floor(x),iy=Math.floor(y);
    let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);
    const a=noiseMap[(iy&127)*128+(ix&127)],b=noiseMap[(iy&127)*128+((ix+1)&127)];
    const c=noiseMap[((iy+1)&127)*128+(ix&127)],d=noiseMap[((iy+1)&127)*128+((ix+1)&127)];
    return (a+(b-a)*fx)*(1-fy)+(c+(d-c)*fx)*fy;
  }
  function turbulence(x,y){return noise(x,y)*.57+noise(x*2.03,y*2.03)*.28+noise(x*4.07,y*4.07)*.15;}
  const clamp=n=>Math.max(0,Math.min(1,n));
  let target=Number(range.value),level=target,burst=0,visible=false,raf=0,last=0,time=0,active=false;
  function draw(t){
    const strength=(level-1)/4;
    const height=.17+strength*.4+burst*.09;
    const data=frame.data;
    for(let y=0;y<h;y++){
      const up=1-y/(h-1);
      for(let x=0;x<w;x++){
        const u=x/(w-1),offset=(y*w+x)*4;
        const edge=Math.pow(Math.abs(u-.5)*2,1.4);
        // Noise flows upwards; smaller ripples create thin, curling flame tips.
        const bend=noise(u*4,up*3-t*.7)-.5;
        const n=turbulence(u*15+bend*1.7,up*2.8-t*(1.25+strength*.65));
        const flameHeight=height*(.48+edge*.7);
        const heat=clamp(.8-up/flameHeight+(n-.4)*2.5);
        const alpha=clamp(heat*3)*clamp((1-up)*4);
        const core=Math.pow(clamp((heat-.1)*1.15),1.8);
        data[offset]=255;
        data[offset+1]=Math.round(48+core*190);
        data[offset+2]=Math.round(5+Math.pow(core,3)*150);
        data[offset+3]=Math.round(alpha*(.65+strength*.33)*255);
      }
    }
    ctx.putImageData(frame,0,0);
    ctx.globalCompositeOperation='screen';
    const glow=ctx.createLinearGradient(0,h,0,h*(1-height));
    glow.addColorStop(0,'rgba(255,123,20,.5)');glow.addColorStop(1,'rgba(255,64,0,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,h*(1-height),w,h*height);
    const count=Math.round(5+strength*35+burst*10);
    embers.slice(0,count).forEach(ember=>{
      const age=(t*ember.speed+ember.phase)%1;
      const x=(ember.x+Math.sin(age*5+ember.phase*8)*.035+ember.drift*age*.15)*w;
      const y=h-age*h*(.42+strength*.57);
      const alpha=Math.sin(age*Math.PI)*(.35+strength*.65);
      ctx.beginPath();ctx.strokeStyle=`rgba(255,${170+Math.round(ember.phase*60)},80,${alpha})`;
      ctx.lineWidth=ember.size;ctx.shadowBlur=4;ctx.shadowColor='#ff6418';
      ctx.moveTo(x,y);ctx.lineTo(x+ember.drift*2,y+1.5+strength*2);ctx.stroke();
    });
    ctx.shadowBlur=0;ctx.globalCompositeOperation='source-over';
  }
  function tick(now){
    raf=0;
    if(!active || !visible || document.hidden || motion.matches)return;
    if(!last || now-last>=1000/24){
      const dt=Math.min((now-(last||now-42))/1000,.08);last=now;
      level+=(target-level)*Math.min(1,dt*8);burst=Math.max(0,burst-dt*1.7);
      time+=dt;draw(time);
    }
    raf=requestAnimationFrame(tick);
  }
  function sync(){
    cancelAnimationFrame(raf);raf=0;last=0;
    if(!active){ctx.clearRect(0,0,w,h);return;}
    if(!visible || document.hidden)return;
    if(motion.matches){level=target;burst=0;draw(2);return;}
    raf=requestAnimationFrame(tick);
  }
  window.heatFire={setLevel(value,enabled,animate=false){
    const next=Math.max(1,Math.min(5,Number(value)||1));
    if(animate && next>target && !motion.matches)burst=Math.min(1,.35+(next-target)*.18);
    target=next;active=enabled;
    panel.dataset.heat=String(next);panel.classList.toggle('fire-active',active);
    sync();
  }};
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(stage);
  document.addEventListener('visibilitychange',sync);
  motion.addEventListener('change',sync);
  window.heatFire.setLevel(range.value,!range.disabled);
})();

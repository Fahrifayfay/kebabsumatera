// Local repeatable performance/interaction check; no external service calls.
const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/ADVAN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const mode = process.argv[2] || 'after';
const out = path.join(process.env.TEMP, 'kebab-performance');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.addInitScript(()=>{
    window.introTimes={};
    new MutationObserver(()=>{
      if(document.body?.classList.contains('ready')&&!window.introTimes.ready)window.introTimes.ready=performance.now();
      if(window.introTimes.ready&&!document.querySelector('#loader')&&!window.introTimes.finished)window.introTimes.finished=performance.now();
    }).observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  });
  const errors = [], requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => requests.push(r.url()));
  await page.route('https://**/*', r => r.abort());
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto('file:///D:/umkm/index.html', { waitUntil: 'load' });
  await page.waitForFunction(() => document.body.classList.contains('ready'), { timeout: 25000 });
  await page.waitForTimeout(2600);
  const metrics = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
  const a = await metrics();
  await page.waitForTimeout(2200);
  const b = await metrics();
  const diff = (a,b) => Object.fromEntries(['TaskDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'].map(k=>[k, +(b[k]-a[k]).toFixed(4)]));
  await page.evaluate(() => document.querySelector('#bantuan').scrollIntoView({behavior:'instant'}));
  await page.waitForTimeout(1800);
  const c = await metrics(); await page.waitForTimeout(2200); const d = await metrics();
  const summary = { mode, errors, heroIdle: diff(a,b), helpIdle: diff(c,d), requests: requests.length,
    looping: await page.evaluate(() => document.getAnimations().filter(a=>a.effect?.getTiming().iterations===Infinity&&a.playState==='running').length) };
  fs.writeFileSync(path.join(out,mode+'.json'),JSON.stringify(summary,null,2));
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  await page.screenshot({path:path.join(out,mode+'-help.png')});
  if (mode !== 'before') {
    summary.introTimes = await page.evaluate(()=>window.introTimes);
    await page.locator('#mMoreBtn').click();
    await page.locator('#mMore.on').waitFor();
    await page.waitForTimeout(800);
    await page.screenshot({path:path.join(out,'mobile-more.png')});
    if (await page.locator('#mMore [data-mm=bantuan]').count() !== 1) throw Error('Bantuan must appear once');
    await page.locator('#mMore [data-mm=bantuan]').click();
    await page.waitForTimeout(1600);
    summary.helpTarget = await page.locator('#bantuan').evaluate(e => e.getBoundingClientRect().top);
    const question = page.locator('.help-q').first();
    const expanded = await question.getAttribute('aria-expanded'); await question.click();
    if (await question.getAttribute('aria-expanded') === expanded) throw Error('FAQ does not toggle');
    await page.locator('#orderTop').click(); await page.locator('#orderSheet.on').waitFor();
    await page.locator('[data-os-close]').click();
    await page.evaluate(()=>document.querySelector('#cta-final').scrollIntoView({behavior:'instant'}));
    await page.waitForTimeout(1200);
    summary.mobile = await page.evaluate(()=>{const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}};return {logo:box('#navbar .brand-logo'),order:box('#orderTop'),wa:box('.wa-fab'),overflow:document.documentElement.scrollWidth>innerWidth};});
    if(summary.mobile.wa.y < summary.mobile.order.bottom+6) throw Error('WA overlaps order');
    if(summary.mobile.logo.height < 65 || summary.mobile.overflow) throw Error('Mobile sizing');
    await page.screenshot({path:path.join(out,'mobile-contact.png')});
    await page.evaluate(()=>document.querySelector('#galeri').scrollIntoView({behavior:'instant'}));
    await page.waitForTimeout(1200);
    await page.locator('[data-gallery-filter=Burger]').click();
    await page.locator('#gxNext').click(); await page.waitForTimeout(1600);
    await page.locator('.gx-card.on').click(); await page.locator('#lightbox.open').waitFor();
    await page.locator('#lightboxClose').click();
    summary.responsive=[];
    for(const width of [320,390,700]){
      await page.setViewportSize({width,height:844});
      await page.evaluate(()=>document.querySelector('#menu-favorit').scrollIntoView({behavior:'instant'}));
      await page.waitForTimeout(900);
      const size=await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,font:getComputedStyle(document.querySelector('#menu-favorit h2')).fontSize}));
      if(size.overflow)throw Error('Horizontal overflow at '+width);
      summary.responsive.push(size);
      if(width===390)await page.screenshot({path:path.join(out,'mobile-heading.png')});
    }
    await page.setViewportSize({width:1440,height:1000});
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(900);
    await page.screenshot({path:path.join(out,'desktop.png')});
    await page.goto('file:///D:/umkm/menu.html');
    await page.waitForTimeout(600);
    summary.menuCards = await page.locator('.dish-card').count();
    if (!summary.menuCards) throw Error('Catalog missing');
  }
  fs.writeFileSync(path.join(out,mode+'.json'),JSON.stringify(summary,null,2));
  console.log(JSON.stringify({out,...summary},null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

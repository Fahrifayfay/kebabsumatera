// Run: node tools/verify.cjs (Playwright available via package or bundled runtime).
const fs=require('fs'),path=require('path'),http=require('http'),os=require('os'),assert=require('assert/strict');
let playwright;try{playwright=require('playwright');}catch{playwright=require(path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const root=path.resolve(__dirname,'..'),out=path.join(os.tmpdir(),'kebab-visual-qa');fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{let relative;try{relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}const file=path.resolve(root,'.'+(relative==='/'?'/index.html':relative));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
 const browser=await playwright.chromium.launch({channel:'msedge',headless:true});const errors=[],missing=[];
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
 // Deliberately verify the optional remote map can fail without blocking the site.
 await context.route('https://unpkg.com/**',route=>route.abort());
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)missing.push(r.url());});
 await page.goto(base,{waitUntil:'load'});await page.waitForTimeout(2800);assert.equal(await page.locator('#loader').count(),0);assert.equal(await page.locator('.favorite-dish').count(),6);
 await page.screenshot({path:path.join(out,'hero-desktop.png')});
 for(const id of ['promo','tentang','kenapa','review','lokasi','cta-final']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(1300);for(const target of await page.locator('#'+id+' .promo-art, #'+id+' .promo-fine, #'+id+' .social-card').all()){if(!await target.isVisible())continue;await target.scrollIntoViewIfNeeded();await page.waitForTimeout(950);}
 await page.locator('#'+id).screenshot({path:path.join(out,id+'-desktop.png')});}
 await page.locator('#copyAddress').click();await page.waitForTimeout(150);assert.match(await page.locator('.site-toast').innerText(),/berhasil disalin/);
 assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/Jl\. Ps\. 7/);
 await page.locator('[data-promo="burger"]').click();assert.equal(await page.locator('.burger-promo').isVisible(),true);assert.match(await page.locator('.burger-promo .promo-pricing').innerText(),/22.400/);
 await page.locator('[data-promo="kebab"]').click();assert.equal(await page.locator('.burger-promo').isVisible(),false);
 await page.locator('#revNext').click();await page.waitForTimeout(650);assert.ok(await page.locator('#reviewTrack').evaluate(el=>el.scrollLeft)>0);
 await page.locator('.favorite-dish .dish-order').first().click();assert.equal(await page.locator('dialog[open]').count(),1);assert.equal(await page.locator('dialog .platform-action[href]').count(),4);await page.keyboard.press('Escape');
 await page.goto(base+'/menu.html');assert.equal(await page.locator('.dish-card').count(),22);
 await page.locator('#menuSearch').fill('tidak-ada-menu');assert.equal(await page.locator('.menu-empty').count(),1);await page.locator('.menu-empty button').click();
 await page.locator('#menuSort').selectOption('low');const prices=await page.locator('.dish-bottom>strong').allTextContents();assert.ok(prices.length===22);
 await page.locator('[data-category="roti"]').click();await page.locator('.dish-order').first().click();await page.locator('.bread-view-picker button').last().click();assert.equal(await page.locator('.bread-view-picker button[aria-pressed="true"]').count(),1);await page.keyboard.press('Escape');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'menu-mobile.png')});
 await page.goto(base);await page.waitForTimeout(2800);await page.screenshot({path:path.join(out,'hero-mobile.png')});
 const heroBounds=await page.evaluate(()=>({price:document.querySelector('.hero-price').getBoundingClientRect().bottom,dock:document.querySelector('.mobile-dock').getBoundingClientRect().top}));assert.ok(heroBounds.price<heroBounds.dock,JSON.stringify(heroBounds));
 for(const id of ['promo','tentang','kenapa','review','lokasi','cta-final']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(1000);for(const target of await page.locator('#'+id+' .promo-art, #'+id+' .promo-fine, #'+id+' .social-card').all()){if(!await target.isVisible())continue;await target.scrollIntoViewIfNeeded();await page.waitForTimeout(950);}
 await page.locator('#'+id).screenshot({path:path.join(out,id+'-mobile.png')});}
 assert.equal(await page.locator('.mobile-dock a').count(),5);await page.locator('.mobile-dock a').nth(2).click();await page.waitForTimeout(1600);assert.equal(await page.locator('.mobile-dock a[aria-current]').innerText(),'Tentang');
 for(const width of [320,390,768,1024,1440]){await page.setViewportSize({width,height:900});await page.waitForTimeout(120);const measure=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth}));assert.ok(measure.width<=measure.viewport+1,JSON.stringify(measure));}
 const unresolved=await page.locator('[data-platform]:not([href]):not([aria-disabled])').count();assert.equal(unresolved,0);
 await page.locator('#tentang .organic-edge').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);await page.screenshot({path:path.join(out,'wave-desktop.png')});
 const oldLink=await page.evaluate(()=>{const old=SITE.links.gofood;SITE.links.gofood='';applySiteLinks();return old;});assert.equal(await page.locator('.social-gofood').getAttribute('aria-disabled'),'true');await page.evaluate(url=>{SITE.links.gofood=url;applySiteLinks();},oldLink);
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});await reduced.route('https://unpkg.com/**',route=>route.abort());const p=await reduced.newPage();await p.goto(base);await p.waitForTimeout(500);assert.equal(await p.locator('#loader').count(),0);await reduced.close();
 console.log(JSON.stringify({passed:true,screenshots:out,checks:['intro releases scroll','6 favorites','22 catalogue items','promo switch','review slider','copy address','detail platform links','bread variants','5 mobile navigation destinations','320–1440px overflow','reduced motion','optional map unavailable'],pageErrors:errors,missingAssets:missing},null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});

const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const ROOT=path.join(__dirname,'..'), PUB=path.join(ROOT,'public');
const DATA=path.join(ROOT,'data'), PRODUCTS=path.join(DATA,'products.json'), ORDERS=path.join(DATA,'orders.json');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')); const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2));
function send(res,status,data,type='application/json'){res.writeHead(status,{'Content-Type':type,'Access-Control-Allow-Origin':'*'});res.end(type==='application/json'?JSON.stringify(data):data)}
function body(req){return new Promise((resolve,reject)=>{let b='';req.on('data',c=>b+=c);req.on('end',()=>{try{resolve(b?JSON.parse(b):{})}catch(e){reject(e)}})})}
const server=http.createServer(async(req,res)=>{const u=url.parse(req.url,true); try{
 if(u.pathname==='/api/products'&&req.method==='POST'){const b=await body(req);const p=read(PRODUCTS);p.push(b);write(PRODUCTS,p);return send(res,201,b)}
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,PATCH,DELETE,OPTIONS','Access-Control-Allow-Headers':'Content-Type'});return res.end()}
 if(u.pathname==='/api/products'&&req.method==='GET')return send(res,200,read(PRODUCTS));
 if(u.pathname==='/api/orders'&&req.method==='GET')return send(res,200,read(ORDERS));
 if(u.pathname==='/api/orders'&&req.method==='POST'){const b=await body(req);const orders=read(ORDERS);const o={...b,id:'DI'+Date.now().toString().slice(-7),date:new Date().toLocaleString('en-IN'),status:'New'};orders.unshift(o);write(ORDERS,orders);return send(res,201,o)}
 let m=u.pathname.match(/^\/api\/products\/(\d+)$/); if(m){let i=+m[1],p=read(PRODUCTS); if(req.method==='PATCH'){let b=await body(req);p[i]=Object.assign(p[i],b);write(PRODUCTS,p);return send(res,200,p[i])} if(req.method==='DELETE'){p.splice(i,1);write(PRODUCTS,p);return send(res,200,{ok:true})}}
 m=u.pathname.match(/^\/api\/orders\/(\d+)$/); if(m&&req.method==='PATCH'){let i=+m[1],o=read(ORDERS),b=await body(req);if(!o[i])return send(res,404,{error:'Order not found'});o[i]=Object.assign(o[i],b);write(ORDERS,o);return send(res,200,o[i])}
 let file=u.pathname==='/'?'index.html':u.pathname==='/admin'?'admin.html':u.pathname.slice(1);file=path.normalize(file);if(file.includes('..'))return send(res,403,'Forbidden','text/plain');let fp=path.join(PUB,file);if(fs.existsSync(fp)&&fs.statSync(fp).isFile()){let ext=path.extname(fp);let types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};return send(res,200,fs.readFileSync(fp),types[ext]||'application/octet-stream')}
 send(res,404,{error:'Not found'});
 }catch(e){send(res,500,{error:e.message})}});
server.listen(3000,()=>console.log('Drink It V9 running at http://localhost:3000'));

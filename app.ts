// View Engine https://deno.land/x/view_engine/mod.ts;

// Oak https://deno.land/x/oak/mod.ts

// Upload Middleware for Oak https://deno.land/x/upload_middleware_for_oak_framework/mod.ts;

import {Application, Router} from 'https://deno.land/x/oak/mod.ts';

import {viewEngine,
        engineFactory,
        adapterFactory} from 'https://deno.land/x/view_engine/mod.ts';

import {upload} from 'https://deno.land/x/upload_middleware_for_oak_framework/mod.ts';

const ejsEngine = engineFactory.getEjsEngine();

const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();

const router = new Router();

app.use(viewEngine(oakAdapter, ejsEngine));

router
    .get('/', (ctx) => {
        ctx.render('index.ejs')
    })
    .post('/upload', upload('uploads'), async(context: any, next: any)=>{
        const file = context.uploadedFiles;
        console.log(file);
        context.response.redirect('/');
    });

app.use(router.routes());

app.use(router.allowedMethods());

console.log('App is listening on PORT 8000');


await app.listen({port: 8000});


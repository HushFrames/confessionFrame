import { serveStatic } from '@hono/node-server/serve-static'
import { Frog, Button } from 'frog'
import { handle } from 'frog/vercel'
export const app = new Frog ({
    imageOptions: { height: 800, width: 800},
    imageAspectRatio: '1:1',
    assetsPath: '/',
    basePath: '/api',
  })
  app.use('/*', serveStatic({ root: './public' }))
// frame with randomizer image
app.frame('/', (c) => {
  return c.res({
    action: '/siguiente',
    image: '/confession_01.png',
    intents: [
      <Button>Next Image</Button>,
      <Button.Link href="http://wwww.yahoo.com">Yahoo.com</Button.Link>
    ]
  })
})
export const GET = handle(app)
export const POST = handle(app)

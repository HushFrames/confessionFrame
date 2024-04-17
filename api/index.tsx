import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'
import { sql } from '@vercel/postgres';
// frame config
export const app = new Frog({
  imageOptions: { height: 1000, width: 1000},
  imageAspectRatio: '1:1',
  assetsPath: '/',
  basePath: '/api',
})
// frame debugger
app.use('/*', serveStatic({ root: './public' }))
// starting frame
app.frame('/', (c) => {
  return c.res({
    action: '/confession',
    image: '/hfShare.png',
    intents: [
      <TextInput placeholder='Share your Confession!'></TextInput>,
      <Button value="hf_001">Submit Confession</Button>
    ],
  })
})
// saves to database frame
app.frame('/confession', async (c) => {
  const { inputText, buttonValue } = c
  // postgress log
  console.log(`INSERT INTO hf_data(conf, timestamp, hf_id) VALUES (${inputText}, NOW(), ${buttonValue}')`)
  try {
    await sql`INSERT INTO hf_data(conf, timestamp, hf_id) VALUES (${inputText}, NOW(), ${buttonValue})`;
  } catch (error) {
    console.error('Postgres Error:', error);
  }
  return c.res({
    image: '/hfThanks.png',
    intents: [
      <Button.Reset>Start Over</Button.Reset>,
      <Button.Link href="https://warpcast.com/~/channel/confessionframe">ð¤« ConfessionFrame ð¤«</Button.Link>
    ],
  })
})
export const GET = handle(app)
export const POST = handle(app)

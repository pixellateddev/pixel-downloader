import type { DaemonConfig, DownloadTask } from '@pixel/types'

const DAEMON_PORT = 18281

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

let config: DaemonConfig = {
  defaultDownloadDir: '/Users/pixellateddev/Downloads',
}

let tasks: DownloadTask[] = [
  {
    id: 1,
    url: 'https://download.manjaro.org/kde.iso',
    filename: 'manjaro-kde-26.0.2.iso',
    directory: config.defaultDownloadDir,
    size: 5_700_000_000,
    downloadedBytes: 581_000_000,
    status: 'downloading',
    isResumable: true,
    createdAt: new Date().toISOString(),
    speed: 10_930_000,
    eta: 469,
  },
  {
    id: 2,
    url: 'https://figma.com/desktop-app.dmg',
    filename: 'figma-desktop-app.dmg',
    directory: config.defaultDownloadDir,
    size: 182_000_000,
    downloadedBytes: 182_000_000,
    status: 'completed',
    isResumable: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    url: 'https://releases.ubuntu.com/24.04/ubuntu.iso',
    filename: 'ubuntu-24.04-desktop-amd64.iso',
    directory: config.defaultDownloadDir,
    size: 5_810_000_000,
    downloadedBytes: 1_440_000_000,
    status: 'paused',
    isResumable: true,
    createdAt: new Date().toISOString(),
  },
]

const createSseMessage = () => `data: ${JSON.stringify(tasks)}\n\n`

Bun.serve({
  port: DAEMON_PORT,
  async fetch(req) {
    const url = new URL(req.url)

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (req.method === 'GET' && url.pathname === '/status') {
      return Response.json(tasks, { headers: corsHeaders })
    }

    if (req.method === 'GET' && url.pathname === '/config') {
      return Response.json(config, { headers: corsHeaders })
    }

    if (req.method === 'POST' && url.pathname === '/config') {
      const updates = (await req.json()) as Partial<DaemonConfig>
      config = { ...config, ...updates }
      tasks = tasks.map((task) => ({
        ...task,
        directory: updates.defaultDownloadDir ?? task.directory,
      }))

      return Response.json(config, { headers: corsHeaders })
    }

    if (req.method === 'GET' && url.pathname === '/events') {
      const signal = req.signal
      let timer: ReturnType<typeof setInterval> | undefined

      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(createSseMessage())

            timer = setInterval(() => {
              if (signal.aborted) {
                if (timer) clearInterval(timer)
                try {
                  controller.close()
                } catch {}
                return
              }

              controller.enqueue(createSseMessage())
            }, 1000)
          },
          cancel() {
            if (timer) clearInterval(timer)
          },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        }
      )
    }

    return Response.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  },
})

console.log(`Pixel daemon listening on http://localhost:${DAEMON_PORT}`)

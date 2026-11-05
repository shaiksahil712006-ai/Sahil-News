import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function newsApiProxyPlugin() {
  return {
    name: 'newsapi-proxy',
    configureServer(server: any) {
      server.middlewares.use('/api/news', async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/news') && !req.url?.startsWith('/?endpoint')) {
          // req.url in connect middleware mounted at /api/news starts with ? or /
        }
        try {
          const urlObj = new URL(req.url, 'http://localhost:3000/api/news');
          const endpoint = urlObj.searchParams.get('endpoint') || 'top-headlines';
          const apiKey = urlObj.searchParams.get('apiKey') || process.env.NEWS_API_KEY || '';

          if (!apiKey) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'error',
              code: 'apiKeyMissing',
              message: 'No News API key provided. Add your free key in Settings or enjoy our live curated news feed.'
            }));
            return;
          }

          const targetUrl = new URL(`https://newsapi.org/v2/${endpoint}`);
          urlObj.searchParams.forEach((value, key) => {
            if (key !== 'endpoint') {
              targetUrl.searchParams.set(key, value);
            }
          });
          targetUrl.searchParams.set('apiKey', apiKey);

          const apiResponse = await fetch(targetUrl.toString(), {
            headers: {
              'User-Agent': 'SahilNewsApp/1.0 (Android Academic Project)',
              'Accept': 'application/json',
            },
          });

          const data = await apiResponse.json();
          res.statusCode = apiResponse.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'error',
            code: 'serverError',
            message: err.message || 'Failed to proxy NewsAPI request'
          }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), newsApiProxyPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

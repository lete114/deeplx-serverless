# DeepLX Serverless

A free-to-deploy translation API, compatible with [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX), built with serverless platforms to avoid frequent request issues such as HTTP `429 Too Many Requests`.

> [!TIP]
> For better security and to prevent misuse, it’s strongly recommended to configure a `token`.
> Multiple tokens can be set using commas (`,`).

## 🚀 Deployment

Click the one-click deploy buttons below, or [fork the repository](https://github.com/lete114/deeplx-serverless/fork) and configure the deployment manually.

### Vercel

* **One-Click Deploy:**

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flete114%2Fdeeplx-serverless%2Ftree%2Fmain%2Fplatform%2Fvercel&env=token&envDescription=Configure%20the%20token%20to%20be%20more%20secure%20and%20avoid%20misuse%20by%20others.%20Multiple%20tokens%20are%20separated%20by%20commas&project-name=deeplx&repository-name=deeplx-serverless)

* **Manual Deploy:**

  1. Create a new project in Vercel (or import your forked repository)
  2. Go to the project → `Settings` → `Build and Development`
  3. Set `Root Directory` to: `platform/vercel`
  4. Go to `Environment Variables` Add an environment variable: `token` (Optional)

### Netlify

* **One-Click Deploy:**

  [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Flete114%2Fdeeplx-serverless&create_from_path=platform/netlify)

* **Manual Deploy:**

  1. Fork this repository and import it into Netlify
  2. Go to Site Settings `Project configuration` → `Build & Deploy` → `Build settings`
  3. Set `Package directory` to: `platform/netlify`
  4. Go to `Environment Variables` Add an environment variable: `token` (Optional)

### Cloudflare Workers

* **One-Click Deploy:**

  [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Flete114%2Fdeeplx-serverless%2Ftree%2Fmain%2Fplatform%2Fcloudflare)

* **Manual Deploy:**

  1. In a similar way to **Vercel** and **Netlify**, Fork this repository and imported, with access to set up the specified deployment path and configure `token`.

## 📦 Usage

### Request Example

```bash
curl 'https://your-api-address/translate?token=your-token' \
--header 'Content-Type: application/json' \
--data '{
  "text": "Hello, World",
  "from": "en",
  "to": "zh"
}'

# Or use Authorization header
curl 'https://your-api-address/translate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your-token' \
--data '{
  "text": "Hello, World",
  "from": "en",
  "to": "zh"
}'
```

### Response Example

```json
{
  "code": 200,
  "id": 145289000,
  "method": "Free",
  "source_lang": "EN",
  "target_lang": "ZH",
  "data": "你好，世界",
  "alternatives": null
}
```

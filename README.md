# DeepLX Serverless

DeepLX Free Deployment Translation API, API Compatible with [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX), Using Serverless to Avoid Frequent Calls and Error Reporting `429`

> [!TIP]
> Configure the `token` to be more secure and avoid misuse by others. Multiple tokens are separated by commas

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flete114%2Fdeeplx-serverless%2Ftree%2Fmain%2Fplatform%2Fvercel&env=token&envDescription=Configure%20the%20token%20to%20be%20more%20secure%20and%20avoid%20misuse%20by%20others.%20Multiple%20tokens%20are%20separated%20by%20commas&project-name=deeplx&repository-name=deeplx-serverless)

### Cloudflare

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Flete114%2Fdeeplx-serverless%2Ftree%2Fmain%2Fplatform%2Fcloudflare)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Flete114%2Fdeeplx-serverless&create_from_path=platform/netlify)

## Usage

Request example:
``` bash
curl 'https://your-api-address/translate?token=your-token' \
--header 'Content-Type: application/json' \
--data '{
    "text": "Hello, World",
    "from": "en",
    "to": "zh"
}'

# or
curl 'https://your-api-address/translate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your-token' \
--data '{
    "text": "Hello, World",
    "from": "en",
    "to": "zh"
}'
```

Response example:
```json
{
  "code": 200,
  "id": 145289000,
  "method": "Free",
  "from": "EN",
  "to": "ZH",
  "source_lang": "EN",
  "target_lang": "ZH",
  "data": "你好，世界",
  "alternatives": [
    "世界，你好",
    "世界你好",
    "您好，世界"
  ]
}
```

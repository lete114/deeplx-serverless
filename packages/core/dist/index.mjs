import { toWebRequest, bodyData } from 'body-data';
import { translate, parse2DeepLX } from 'deeplx-lib';

function parseToken(token = "") {
  if (Array.isArray(token)) {
    return token;
  }
  const tokens = token.split(",").filter(Boolean).map((i) => i.trim());
  return tokens;
}
function authToken({ tokens, authorization, token }) {
  if (!tokens.length) {
    return true;
  }
  if (authorization) {
    authorization = authorization.replace("Bearer ", "").trim();
    return tokens.includes(authorization);
  }
  if (token) {
    return tokens.includes(token);
  }
  return false;
}

const index = async (options) => {
  const METHODS = ["GET", "HEAD", "POST", "OPTIONS"];
  const method = options.request.method || "GET";
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": METHODS.join(", "),
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json; charset=utf-8"
  });
  if (!METHODS.includes(method)) {
    return new Response(null, { status: 405, headers });
  }
  const responseInit = {
    headers
  };
  if (method === "HEAD") {
    return new Response(null, {
      headers,
      status: 200
    });
  }
  if (method === "OPTIONS") {
    return new Response(null, { headers });
  }
  const data = await handle(options).then((r) => r.json());
  responseInit.status = data.code;
  return new Response(JSON.stringify(data), responseInit);
};
async function handle(options) {
  const { token } = options;
  const request = toWebRequest(options.request);
  const url = new URL(request.url);
  const path = url.pathname;
  const { params, body } = await bodyData(request, { backContentType: "application/json; charset=utf-8" });
  const tokens = parseToken(token);
  const authorization = request.headers.get("authorization");
  const auth = authToken({ tokens, authorization, token: params.token });
  if (!auth) {
    const code = 403;
    const msg = `Request missing authentication information`;
    return Response.json({ code, msg }, { status: code });
  }
  if (request.method.toUpperCase() === "POST" && body) {
    if (body.source_lang) {
      body.from = body.source_lang;
    }
    if (body.target_lang) {
      body.to = body.target_lang;
    }
    body.to = body.to.split("-")[0];
    if (path.startsWith("/translate") && body.to && body.text) {
      const text = body.text;
      const from = (body.from || "AUTO").toUpperCase();
      const to = body.to.toUpperCase();
      const options2 = { text, from, to };
      const response = await translate(options2);
      const raw = await response.text();
      let translateData;
      try {
        translateData = JSON.parse(raw);
      } catch {
      }
      if (!response.ok) {
        const code2 = response.status;
        const msg = translateData?.message ?? translateData?.title ?? "Translation failed";
        return Response.json({ code: code2, message: msg }, { status: code2 });
      }
      if (!translateData) {
        const code2 = 502;
        return Response.json({ code: code2, message: "Invalid response from DeepL" }, { status: code2 });
      }
      const responseData = parse2DeepLX({ ...options2, ...translateData });
      return Response.json(responseData, { status: response.status });
    }
    const code = 404;
    return Response.json({ code, msg: "Not found" }, { status: code });
  } else {
    const code = 404;
    return Response.json({ code, msg: "Not found" }, { status: code });
  }
}

export { index as default, handle };

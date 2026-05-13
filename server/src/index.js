const http = require("http");
const templates = require("./templates");

const PORT = Number(process.env.PORT || 5000);

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(payload));
};

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/templates") {
    const category = url.searchParams.get("category");
    const filteredTemplates = category
      ? templates.filter(
          (template) =>
            template.category.toLowerCase() === category.toLowerCase(),
        )
      : templates;

    sendJson(response, 200, { templates: filteredTemplates });
    return;
  }

  sendJson(response, 404, { error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Custom Greetings API running on http://localhost:${PORT}`);
});

export const CV_APP_RESOURCE_URI = "ui://cv/card.html";

export const cvAppWidgetHtml = () =>
  `
<div style="font-family: system-ui, sans-serif; padding: 12px; max-width: 360px;">
  <p id="title" style="margin: 0 0 12px; font-size: 15px; font-weight: 600;">Curriculum Vitae</p>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <button id="download" type="button" style="cursor: pointer; font: inherit; padding: 8px 14px; border-radius: 8px; border: 1px solid #ccc; background: #111; color: #fff;">Download PDF</button>
    <a id="view" href="#" style="align-self: center; font-size: 14px; color: #2563eb; text-decoration: none;">View online</a>
  </div>
</div>
<script>
(function () {
  const titleEl = document.getElementById("title");
  const downloadBtn = document.getElementById("download");
  const viewLink = document.getElementById("view");
  const pendingRequests = new Map();
  let nextRequestId = 1;

  function request(method, params) {
    const id = nextRequestId++;
    window.parent.postMessage({ jsonrpc: "2.0", id, method, params }, "*");
    return new Promise((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject });
    });
  }

  function openPdf(url) {
    const openai = typeof window !== "undefined" ? window.openai : undefined;
    if (openai && typeof openai.openExternal === "function") {
      void openai.openExternal({ href: url });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function render(data) {
    if (!data || !data.pdfUrl) return;
    titleEl.textContent = data.title || "Curriculum Vitae";
    viewLink.href = data.pageUrl || "#";
    viewLink.textContent = "View online";
    downloadBtn.onclick = () => openPdf(data.pdfUrl);
  }

  window.addEventListener(
    "message",
    (event) => {
      if (event.source !== window.parent) return;
      const message = event.data;
      if (!message || message.jsonrpc !== "2.0") return;

      if (message.id !== undefined && pendingRequests.has(message.id)) {
        const pending = pendingRequests.get(message.id);
        pendingRequests.delete(message.id);
        if (message.error) pending.reject(message.error);
        else pending.resolve(message.result);
        return;
      }

      if (message.method === "ui/notifications/tool-result") {
        render(message.params?.structuredContent);
      }
    },
    { passive: true }
  );

  const openai = typeof window !== "undefined" ? window.openai : undefined;
  if (openai && openai.toolOutput) render(openai.toolOutput);
})();
</script>
`.trim();

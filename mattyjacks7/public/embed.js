// Valley Net Embed Script
// Usage: <script src="https://mattyjacks.com/embed.js"></script>
(function () {
  if (document.getElementById("valley-net-embed")) return;

  var iframe = document.createElement("iframe");
  iframe.id = "valley-net-embed";
  iframe.src = "https://mattyjacks.com/embed";
  iframe.style.cssText =
    "position:fixed;bottom:0;right:0;width:220px;height:220px;border:none;z-index:999999;background:transparent;";
  iframe.allow = "microphone;clipboard-write";
  iframe.setAttribute("loading", "lazy");

  // Expand the iframe when the chat opens, shrink when it closes
  window.addEventListener("message", function (e) {
    if (e.data === "valley-net-open") {
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.right = "auto";
      iframe.style.bottom = "auto";
    } else if (e.data === "valley-net-close") {
      iframe.style.width = "220px";
      iframe.style.height = "220px";
      iframe.style.top = "auto";
      iframe.style.left = "auto";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
    }
  });

  document.body.appendChild(iframe);
})();

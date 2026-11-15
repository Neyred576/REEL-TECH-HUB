import http.server
import socketserver
import os
import webbrowser

PORT = 5173
DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(DIR, 'dist')

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        clean_path = self.path.split('?')[0].lstrip('/')
        local_path = os.path.join(DIST_DIR, clean_path)
        if not clean_path or not os.path.exists(local_path) or os.path.isdir(local_path):
            self.path = '/index.html'
        return super().do_GET()

print("\n" + "=" * 65)
print("  REEL TECH HUB - PREVIEW SERVER")
print(f"  Live Preview:  http://localhost:{PORT}/")
print(f"  Shop Page:     http://localhost:{PORT}/shop")
print("  Press Ctrl+C in terminal to stop.")
print("=" * 65 + "\n")

try:
    webbrowser.open(f"http://localhost:{PORT}/")
except Exception:
    pass

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), SPAServer) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")


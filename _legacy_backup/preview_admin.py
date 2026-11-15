import http.server
import socketserver
import os
import webbrowser
import sys

PORT = 5173
DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(DIR, 'dist')

if not os.path.exists(DIST_DIR):
    import zipfile
    zip_path = os.path.join(DIR, 'reeltech_dist.zip')
    if os.path.exists(zip_path):
        print("Extracting dist archive...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(DIST_DIR)

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        clean_path = self.path.split('?')[0].lstrip('/')
        local_path = os.path.join(DIST_DIR, clean_path)
        if not clean_path or not os.path.exists(local_path) or os.path.isdir(local_path):
            self.path = '/index.html'
        return super().do_GET()

print("\n" + "=" * 55)
print("  REEL TECH HUB - LOCAL ADMIN PREVIEW")
print(f"  Admin Panel:  http://localhost:{PORT}/admin")
print(f"  Home Page:    http://localhost:{PORT}/")
print("  Press Ctrl+C to stop the preview server.")
print("=" * 55 + "\n")

try:
    webbrowser.open(f"http://localhost:{PORT}/admin")
except Exception:
    pass

socketserver.TCPServer.allow_reuse_address = True
try:
    with socketserver.TCPServer(("", PORT), SPAServer) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")


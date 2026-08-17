@echo off
setlocal
set "ROOT=%~dp0"
set "NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE%" (
  set "NODE=node"
)

echo Starting ReliefConnect BD...
start "ReliefConnect Backend - keep this window open" /D "%ROOT%backend" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
start "ReliefConnect Frontend - keep this window open" /D "%ROOT%" cmd /k "npx pnpm --dir frontend run dev --host 127.0.0.1"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"

echo Browser opened at http://localhost:5173
echo Keep the two ReliefConnect windows open while using the website.
pause

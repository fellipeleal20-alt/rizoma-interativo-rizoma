@echo off
set CH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CH% set CH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
start "" %CH% --kiosk --allow-file-access-from-files --disable-pinch --overscroll-history-navigation=0 "file:///%~dp0index.html"

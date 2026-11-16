#!/bin/sh
D="$(cd "$(dirname "$0")" && pwd)"
(google-chrome --kiosk "file://$D/index.html" || open -a "Google Chrome" --args --kiosk "file://$D/index.html") 2>/dev/null

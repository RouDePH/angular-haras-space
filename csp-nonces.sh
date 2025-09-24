#!/bin/bash
# filepath: csp-nonces.sh

NONCE="CSP_NONCE_INJECTION"
INDEX_HTML="./dist/ng-test-project/browser/index.html"

if [ -f "$INDEX_HTML" ]; then
  sed -i "s/<link rel=\"modulepreload\"/<link rel=\"modulepreload\" nonce=\"$NONCE\"/g" "$INDEX_HTML"
else
  echo "index.html not found at $INDEX_HTML"
  exit 1
fi
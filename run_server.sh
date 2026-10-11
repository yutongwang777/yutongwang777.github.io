#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ -x /opt/homebrew/bin/ruby ]; then
  export PATH="/opt/homebrew/bin:$PATH"
fi
export BUNDLE_GEMFILE="$PWD/Gemfile.preview"
export BUNDLE_PATH="$PWD/vendor/bundle"
if [ -d /Library/Developer/CommandLineTools/SDKs/MacOSX15.4.sdk ]; then
  export PATH="/Library/Developer/CommandLineTools/usr/bin:$PATH"
  export SDKROOT="/Library/Developer/CommandLineTools/SDKs/MacOSX15.4.sdk"
fi
if [ -d /opt/homebrew/opt/openssl@3 ]; then
  export BUNDLE_BUILD__EVENTMACHINE="--with-openssl-dir=/opt/homebrew/opt/openssl@3"
fi
if ! bundle check >/dev/null 2>&1; then
  bundle install
fi
bundle exec jekyll serve --host 127.0.0.1 --port 4000 "$@"

#!/bin/bash

node ./dist/src/cli/index.js \
  -a './sample/test.adi' \
  -u './sample/userdata.json' \
  -t './sample/template_standard.json' \
  -o './sample/out.pdf'

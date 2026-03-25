#!/bin/bash

NAME=$1

npm run build

npm run typeorm -- migration:generate -d dist/database/ormconfig.js src/database/migrations/$NAME
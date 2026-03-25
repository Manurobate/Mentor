#!/bin/bash

NAME=$1

npm run build

npm run typeorm -- migration:create src/database/migrations/$NAME
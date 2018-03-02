#! /bin/bash

currentDir=$PWD
cd ./frontend
(npm run dev) &
(sudo mongod) &
(sudo mongo) &
(node ../server/server.js)

#!/bin/bash
docker build -t tharwa/tharwa-backend .
docker push tharwa/tharwa-backend

ssh deploy@$DEPLOY_SERVER << EOF
docker pull tharwa/tharwa-backend
docker stop api-tharwa || true
docker rm api-tharwa || true
docker rmi tharwa/tharwa-backend:current || true
docker tag tharwa/tharwa-backend:latest tharwa/tharwa-backend:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 tharwa/tharwa-backend:current
EOF

#!/bin/bash
sed -i 's|access_log    /var/log/nginx/access.log main|access_log    /var/log/nginx/access.log snappyflow buffer=16k flush=10s|g' /etc/nginx/nginx.conf
/sbin/service nginx reload

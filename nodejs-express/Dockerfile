FROM node:12.18-alpine

#<SFTRACE-CONFIG> Add below 2 lines to copy the sftrace agent binary
ADD https://github.com/snappyflow/apm-agent/releases/download/latest/sftrace-agent.tar.gz /tmp
RUN mkdir /opt/sfagent && tar -xvzf /tmp/sftrace-agent.tar.gz -C /opt/sfagent && rm /tmp/sftrace-agent.tar.gz && mv -f /opt/sfagent/sftrace/java/sftrace /opt/sfagent/sftrace/sftrace


ENV NODE_ENV production
ENV SFTRACE_PROJECT_NAME sftrace
ENV SFTRACE_APP_NAME nodejs
ENV SFTRACE_PROFILE_KEY Iet4nPb/LQLq20okQIjt4MO0LCjjP4tF0+E0oo3yv51uVN0PQ91YZcZx/A155O/Q92wy4G0qpkqlJmehczSqkCfptaykzhrfhlk8oOZ8viCKibKcKeWDQsNZcBM8t0f7UyjeoogK2nsLLJ4z8bV9myaaqT0Ru/kH5synKKejJANKQwg0m/0o/hN1rwuVuFR0UStmSKkb+I1BYnPxx+0yn+ZjD7RDFaqgd5zVLl8w6WoZNJsGJYhPep1VS0XVXYRzayf+ycCpigkYxN9Iwsd4g9mK76kU/TdnbXr48hcZzHqZUID/QtwSjMyD6RRil7XFnx0vMlRNpkK1hpcmCXPBWM263KxBcbLj/lVxzlbHyqS/641B30LJhwI/1RUS3sab3CxoQrBQPQPPjyHXMi8R+A==

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

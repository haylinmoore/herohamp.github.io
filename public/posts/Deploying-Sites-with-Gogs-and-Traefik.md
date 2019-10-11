# Deploying Sites with Gogs and Traefik

### What is Gogs?

Gogs is a super easy to setup and lightweight Gitlab alternative. It has a sleek and nice looking UI, amazing UX, and can be customized however you want. It also supports being run on pretty much any platform including Linux, Mac OS X, Windows and ARM.

### Ok how about Træfik

Træfik (pronounced like traffic) is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease. It supports several backends which includes Docker, Kubernetes, and Amazon ECS to manage its configuration automatically and dynamically.

### The plan

I have been wanting to move my blog to be hosted on my server, but I didn’t know how to do it with my current infrastructure. I wanted the site to be a mirror of my Gogs repo. To set this up would required some work because Gogs is run in its own container and the NGINX server to host my site would be in another. So I started looking around then remembered. I store my Gogs data in a folder on my host machine (/var/gogs). This meant that I could run a git checkout on post-receive on my Gogs docker. This would create a folder at /var/gogs/serve/hampton.pw. Next I mounted that folder on the docker-nginx docker container at /var/www. This then would allow for my site to be auto deployed.

### Code

The post-receive I used was `git --work-tree=/data/serve/hampton.pw/ --git-dir=/data/git/gogs-repositories/herohamp/hampton.pw.git checkout -f` this is run inside my Gogs docker image. Now I started working on docker-compose file. It ended up looking like this.

```docker
hampton:
    image: kyma/docker-nginx
    volumes:
      - /var/gogs/serve/hampton.pw:/var/www
    labels:
      - traefik.backend=Portainer
      - traefik.frontend.rule=Host:hampton.pw
      - traefik.docker.network=proxy
      - traefik.port=80
```

The Traefik labels allows for Traefik to automatically deploy the site for me with https.

### Conclusion

While this does required more work to get setup than github pages, it also supports building and serving php files.

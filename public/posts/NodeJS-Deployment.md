# Deploying NodeJS Programs

A full stack web developer has to manage a lot, and one of the things they must manage is the deployment method of their websites. In theory this process should be easy to manage, but in practice can lead to questionable infrastructure, fragmented monitoring, and make adding any new sites a pain. Since lots of my infrastructure is nodeJS based and that seems to be where people have the most troubles, I will go over my nodeJS deployment setup and others I have seen or used. All the solutions talked about will be self hosted, for a cloud solution look into [Heroku](https://www.heroku.com/home) which offers free nodeJS deployments.

### PM2

PM2 is a process manager for javascript. PM2 has many amazing features, the most useful one being process management. PM2 provides simple commands to start and stop programs and will even auto-start programs on boot. Another key feature of PM2 is its per app log management making it very easy to debug and see the issues in programs. For those that are afraid of the command line there are even some easy to use GUI programs like [pm2-gui](https://github.com/Tjatse/pm2-gui) which provides a command line and web interface for managing the status and logs of deployed applications


### The Screen Method

The screen method is a very simplistic deployment method. It simply involves running the linux command `screen -S <websitename>` then starting up your application. It can be useful for those who don’t want to learn how to use a management program and are new to linux. In addition the logs are stored in the screen session meaning they are easy to access as long as the system doesn’t reboot

### Cron Jobs

Cron jobs are another very simple solution. To get it working you add `@reboot /usr/bin/nodejs /path/to/app.js > /path/to/log.txt &` to your crontab via `crontab -e`. This method takes away the hassle of starting the program at boot like the screen method and comes preinstalled on almost every linux distribution. A notable issue with this method is restarting you app requires a system reboot. To quote my friend who uses it.

>it works, so im fine with it


### Docker

Docker might seem intimidating to some due to the amount of possibilities, but when using for nodejs deployment it can actually be very simple if you use my docker container. To deploy it you simply run the command `docker run -v /folderwithnodeapp:/usr/src/app -d herohamp/node -p externalPort:internalPort --restart unless-stopped`. There are also many tools to manage docker containers like [Portainer](https://www.portainer.io/).



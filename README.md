# Notice

**This is a showcase project, not for production use. I create a lot stuff, so for small projects I don't have time to allocate them.**
**PM2 is not a good choice for production, I would use docker instead.**

```
npm install

npx react-scripts build

npm run start:both  # start frontend and backend, but this is for testing only (not for production)

#download pm2 to run both frontend and backend in production
npm install pm2 -g
pm2 start npm --name "crypto-frontend" -- run start:frontend
pm2 start npm --name "crypto-backend" -- run start:backend

# to manage pm2 processes
pm2 list
pm2 stop crypto-frontend
pm2 stop crypto-backend
pm2 restart crypto-frontend

# startup pm2 on server reboot, If you want your applications to start automatically upon server reboot, you can use pm2's startup functionality:
pm2 startup
# this will give you a command to run, which will set up pm2 to run on startup
# then run
pm2 save
# to save the current pm2 processes so they will start on reboot
pm2 update

```

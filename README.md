# Eat or Starve
Play a game with your friends to get a food recommendation place for their next hangout.
## Project setup
1. Install packages with ``npm install``
2. If dependency error with installing package, try``npm install pinia --legacy-peer-deps``
3. Create a file named ".env" and type in the relevant variables, ``VUE_APP_BACKEND_URL=http://localhost:8081/``
4. Once all packages are installed, run the project with ``npm run start``
5. The project will be running on ``http://localhost:8080/``

### Start the backend and frontend service
```
npm run start
```

### Start only the frontend service
```
npm run client
```

### Start only the backend service
```
npm run server
```

### Configure the backend API host
```
1. Open the file '.env'
2. Change VUE_APP_BACKEND_URL variable
VUE_APP_BACKEND_URL=http://localhost:8081/
```

### Important notes
```
1. The backend service is running on port 8081 and frontend service is running on port 8080
2. Copy Link feature only works if page has SSL certificate or hosted on localhost
3. If issue with Pinia dependency, run "npm install pinia --legacy-peer-deps"
4. Backend Files: /server
5. Frontend Files: /src and /public
```

### Project Contributors
- [Darryl Soh Soon Yong](https://github.com/DarrylSSY)
- [Sim Yan Yi](https://github.com/simyanyi)
- [Seah Yok Sim](https://github.com/Yoksim)
- [Glen Low Jun Jie](https://github.com/glenyoo)
- [Dylan Teoh Jin Sheng](https://github.com/dylantjs)

# Miitti

Minimalistic event scheduling

## Installation

### 1. Get the app

Creates a folder `miitti` to your current path location and downloads the app to it:
```
git clone https://github.com/tunttunen/miitti.git miitti
```

### 2. Install MongoDB

Miitti uses [MongoDB](http://docs.mongodb.org/manual/installation/) for storing data, so make sure you have installed it. If you have Mac OS X and Homebrew, you can install it with:
```
brew install mongodb
```

Also make sure that `/data/db` folder exists with the required permissions, so MongoDB could access the database. The database used will be named `miitti`.

### 3. Install app dependencies

```
npm install
```

## Run the app

Start the MongoDB server, if it is not running already:
```
mongod
```

Start the app:
```
node app
```

## Use the app
```
http://<hostname>
```


## Use the API

```
http://<host>/api/v1
```

For example, locally with the default port: `http://localhost:3000/api/v1`


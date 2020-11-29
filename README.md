# MusicGram

> Social network for musicians

This is a MERN stack application built on the basis of the [DevConnector 2.0](https://github.com/bradtraversy/devconnector_2.0) from Brad Traversy. With modifications to the user profile, including audio upload & streaming and youtube video streaming.

# Quick Start

### Modify the default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

The app should run at localhost:3000

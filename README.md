## Indexsource - Generic Web GUI

### Installation

`npm install`
Get dependencies installed

`npm run start`
Start the server process listening on port 8085.

### Build for Docker

```sudo docker build -t indexsource/web .```

### Run with Docker

```sudo docker run --network="host" -d indexsource/web```

### Setting variables

The `CONFIG_BASE_PATH` can be used to specifify location of config files to use, such as those under /config.

Eg: `export CONFIG_BASE_PATH=/home/dev/Documents/Source/Dev/`

The `TEMPLATES` can be used for setting the directory of the view folder.

Eg: `export TEMPLATES=/home/dev/Documents/Source/Dev/web-public/views/`

The `TEMPLATES_STATIC` can be used for setting the directory of the static files.

Eg: `export TEMPLATES_STATIC=/home/dev/Documents/Source/Dev/web-public/static/assets/`



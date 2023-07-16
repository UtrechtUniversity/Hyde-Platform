# Standalone Database application
## Relation of part to the whole
Part of the backend, returning timeseries per country

## Setup 
### Point to data for the database
change line 56 in txt_psql.py to where the timeseries files are stored
- [] Perhaps this can be automated by accessing the YODA API? could possibly even be request from within python

### Running setup bash script
From the command line change to this directory and do:
`docker compose up -d`
**Now the database is populated, and API launched.**

### Test
`curl http://127.0.0.1:8000/test` Should display "Setup is correct!"
`curl http://127.0.0.1:8000/[indicator]/[isocode]/[start]/[stop]` gives data
example: `curl http://127.0.0.1:8000/uopp/4/bce_1000/ce_700`

This means that it works localy, however, it should already also work remotely:
`curl http://[ip]:8000/test`
where ip can be found using: `hostname -I`
currently: `curl http://192.168.68.128:8000/test`

## Tear down
`docker compose down`
If no permission: `sudo aa-remove-unknown`

## Understanding
There are 4 components that need to be learned in order to understand what is being done here:
1) The setup file, `setup.sh` is a *bash script*
2) This utilizes *docker* to create containers for each component
3) The first container contains a *postgresql database* for our timeseries
4) The second container runs a python file *populating the postgres database*
Here, a quick overview of these components follows and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.

### Bash Script
A bash script is a script containing commands that can be executed immediately within the terminal. Just your regular `ls`, `cd`, `mkdir` etc. commands behave precicely as they would as if you were within the command line. Furthermore, the location from where these commands are executed is the location where the script resides. The writer learned the basics of this [here](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/).
With a basic understanding of bash scrips, one can understand `setup.sh`, points of interests are the need to start a bash script with the line `#!/bin/bash`, and that commands are allowing to be split using \.

### Docker
Docker is used to create *containers* for each piece of software. This creates a dedicated environment for each component, only containing the necessary dependencies. An excelent, understandable tutorial of this topic can be found [here](https://docker-curriculum.com/).
Once the reader understands the workings of Docker, the workings of the docker commands within setup.sh should be clear.

### Postgres database
The first docker container created contains a postgres database called timeseries. Postgresql (postgres) is a relational database management system (rdbms), the reader can learn more about it using various online tutorials, the writer learned it through [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)& [here](https://docs.qgis.org/3.28/en/docs/training_manual/). First

### Production
Flask is not suitable for production, therefore use Gunicorn WSGI server. 
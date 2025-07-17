# mtto_monitoring_service
Application use to monitoring variables of PLC´s brand DELTA

--- 

## Enviroment configuration
### POSTGRESQL
#### Install
```bash
sudo apt install postgresql postgresql-client -y
```
#### Create password postgresql
```bash
sudo -i -u postgres
psql
ALTER USER postgres PASSWORD 'new_password';
```
#### Create database
```bash
sudo -i -u postgres
psql
CREATE DATABASE new_database;
```
#### Open service to the red
```bash
sudo nano /etc/postgresql/<versión>/main/postgresql.conf
#chance 
#"listen_addresses = 'localhost'" 
#to 
listen_addresses = '*'
sudo nano /etc/postgresql/<versión>/main/pg_hba.conf
# Add this line at the end:
host    all             all             192.168.1.0/24         md5
sudo systemctl restart postgresql
```
### NODE
#### Install   
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22
```
### GIT
#### Install
```bash
apt-get install git
```
---

## Instalation

```bash
git clone https://github.com/Julian-Saave/mtto_monitoring_service.git #Copy repository
cd mtto_monitoring_service
npm install #Install dependencies
npm install -g pm2 #Install services manager
pm2 start app.js --name mtto_monitoring_service #add service
pm2 save #Save changes
pm2 startup #Generate command
#Copy and paste generate comand
#Example:
#sudo env PATH=$PATH:/home/est04/.nvm/versions/node/v22.17.0/bin /home/est04/.nvm/versions/node/v22.17.0/lib/node_modules/pm2/bin/pm2 startup systemd -u est04 --hp /home/est04

```
---

## Use

```bash
npm run dev #development execution
npm run start #production execution
```
---

## Enviroment variables

| Variable      | Description       |
| ------------- | ----------------- |
| `PORT`        | Execution port    |
| `DB_USER`     | Database user     |
| `DB_PASS`     | Database password |
| `DB_HOST`     | Database address  |
| `DB_DATABASE` | Database name     |
| `DB_PORT`     | Database port     |
| `PLC_IP`      | Ip plc            |

---

## Features
technologies used: node.js, express, postgresql, modbus rtu

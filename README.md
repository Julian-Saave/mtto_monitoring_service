# mtto_monitoring_service
Application use to monitoring variables of PLC´s brand DELTA
--- 

## enviroment configuration
### POSTGRESQL
#### install
```bash
sudo apt install postgresql postgresql-client -y
```
#### create password postgresql
```bash
sudo -i -u postgres
psql
ALTER USER postgres PASSWORD 'new_password';
```
#### create database
```bash
sudo -i -u postgres
psql
CREATE DATABASE new_database;
```
#### open service to the red
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
#### install   
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22
```
### GIT
#### install
```bash
apt-get install git
```
---

## instalation

```bash
git clone https://github.com/Julian-Saave/mtto_monitoring_service.git
cd mtto_monitoring_service
npm install
```
---

## use

```bash
npm run dev #development execution
npm run start #production execution
```
---

## enviroment variables

| Variable      | Description       |
| ------------- | ----------------- |
| `PORT`        | Execution port    |
| `DB_USER`     | Database user     |
| `DB_PASS`     | Database password |
| `DB_HOST`     | Database address  |
| `DB_DATABASE` | Database name     |
| `DB_PORT`     | Database port     |
---

## features
technologies used: node.js, express, postgresql, modbus rtu

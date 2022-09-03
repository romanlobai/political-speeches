## Description

The goal of this exercise is to calculate some statistics from given input data about political speeches. The application should handle CSV files (UTF-8 encoded)

## Installation
Install NodeJS v18

Use npm to install project dependencies
```bash
$ npm install
```

Install PostgreSQL v14
Default connection options(you can find it in ```shared/application.config.ts``` file):
```
host: localhost
port: 5432
username: postgres
database: postgres
password: root
```
## Running the app
```
$ npm run start:dev
```

## Testing
Download any tool that allows to make HTTP requests
Send GET request to ```http://localhost/evaluation``` link
Use query parameters to provide urls required for evaluation
Link should look like this:
```
http://localhost/evaluation?url=https://fid-recruiting.s3-eu-west-1.amazonaws.com/politics_en.csv&url=https://fid-recruiting.s3-eu-west-1.amazonaws.com/politics_en.csv
```
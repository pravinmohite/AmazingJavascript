npm install	
I:\Passion_for_coding\Angular_Projects\EditableQuestionsAnswers:- nodemon (port 3000)
I:\Passion_for_coding\Angular_Projects\EditableQuestionsAnswers\Client_EditableQuestionsAnswers:-ng serve (port 4200)	
mongodb:-"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath I:\Passion_for_coding\data\db

to run dist folder locally:-

I:\Passion_for_coding\Node_Projects\AmazingJavascript\Client_EditableQuestionsAnswers>angular-http-server --path I:\Passion_for_coding\Node_Projects\AmazingJavascript\Client_EditableQuestionsAnswers\dist\sample-task


to install mongodbon digital ocean:-

https://wiki.crowncloud.net/How_To_Install_Duf_On_Ubuntu_22_04?How_to_Install_Latest_MongoDB_on_Ubuntu_22_04

*------------To take mongodb backup------------*

For all mongodb databases:-

go to folder where you want to take the backup
 
 -> mongodump

To add specific DB(questionAnswers) in new folder i.e frontendinterviewquestion_dump

-> mongodump -d questionAnswers --out frontendinterviewquestion_dump

*------------To restore mongodb backup------------*

For all mongodb databases:-

go to folder where you want to take the backup
 
 -> mongorestore

To add specific DB(questionAnswers) in new folder i.e frontendinterviewquestion_dump

-> mongorestore questionAnswers

Restore database in digitalocean:-

 To restore database questionAnswers with name questionAnswers in digitalocean, use below command

-> mongorestore -d questionAnswers questionAnswers


Important mongodb queries:-
 
 1. To check all databases
  
  ->show dbs

 2. To go inside any database (databasename can be contactList etc)

 -> use databasename

  1. To check all tables inside database

    -> show collections

  2. To check data inside data inside tables

    -> db.contactList.find() //where contactList is table name



To fix mondod.service error(unit mongod service not found) ,check below link:-

https://medium.com/@Sensational_i/failed-to-start-mongod-service-unit-mongod-service-not-found-f0479b637fc0
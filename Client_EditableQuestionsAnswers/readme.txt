npm install	
I:\Passion_for_coding\Angular_Projects\EditableQuestionsAnswers:- nodemon (port 3000)
I:\Passion_for_coding\Angular_Projects\EditableQuestionsAnswers\Client_EditableQuestionsAnswers:-ng serve (port 4200)	
mongodb:-"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath I:\Passion_for_coding\data\db

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath I:\Passion_for_coding\data\db

"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath I:\Passion_for_coding\data\db

/api/loginDetails

    {
        "_id": "5fae892ef40fa01a6460d4a4",
        "username": "test",
        "password": "test",
        "__v": 0
    }

ON AWS:-

    sudo service mongod start

    sudo service mongod status

to change nodejs changes:-
  git pull origin master 
   -> to apply new changes on putty ec2

ec2 server command prompt:-

  sudo rm -rf AmazingJavascript/ :- to delete a directory

Restart nginx
 
    sudo systemctl restart nginx

 Keep running your node application
  screen
  node app.js 

  ->Steps to run On digital ocean first time
  -> run server
     pm2 start app.js

  -> run universal Client

      pm2 start dist/sample-task/server/main.js

  For updating use restart i.e

   -> run server
     pm2 restart app.js

  -> run universal Client

      pm2 restart dist/sample-task/server/main.js
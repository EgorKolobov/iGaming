# iGaming project
## Start a backend
1) After cloning this repo, open the terminal and install all project's requirements with help of this command:

````
pip install -r requirements.txt
````
2) Run the next command to apply db migrations:
````
python manage.py migrate
````

3) Create a superuser using next command:
````
python manage.py createsuperuser
````
Follow the instructions and enter login and password for your superuser.
4) To add some games to your database, run these two commands:
````
python manage.py import_types types_payload.json
````
and
````
python manage.py import_games games_payload.json
````
The first command adds game types, which are necessary for creation of a new games. The second one adds the games.

5) Finally, to start a local server, run the next command:
````
python manage.py runserver
````
* This will start a Django backend server at http://localhost:8000/  
* To access API, go to http://localhost:8000/swagger/  
* To access Django admin page, go to http://localhost:8000/admin/   

**To learn how to deal with the frontend side of this app, go to ***client*** folder**



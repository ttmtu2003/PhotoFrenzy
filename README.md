# PhotoFrenzy
> Xiyuan Zhou, Tu Tran, Mohammad Zaza

# How to run frontend
- clone repo:
    `git clone https://github.com/ttmtu2003/PhotoFrenzy.git`

- change current directory to just cloned repo:
    `cd PhotoFrenzy`

- change directory to the frontend folder:
    `cd frontend`
    
- use the correct `node` version (run installation the correct version as prompted if needed):
    `nvm use`

- install node packages:
    `npm i`

- start frontend:
    `npm start`

- visit localhost:3000 on browser

# How to run backend
- change current directory to backend folder
    `cd ..` >> `cd flask-backend`

- install python enviornments
    `python3 -m venv env`

- activate enviornments
    `source env/bin/activate`

- install all the requirement package needed
    `pip install -r requirements.txt`

- start the backend server
    `python run.py`

- (Optional) if any extra package update requirements files: `pip freeze > requirements.txt`

- (Optional) change localhost proxy address:
    - find source code under flask-backend/app/__ init__.py
    ```python
    app.config['SERVER_NAME'] = 'localhost:5000'
    ```
    - if modify localhost, need fix connection with REACT under the file frontend/package.json
    ```REACT
    "proxy": "http://localhost:5000/"
    ```

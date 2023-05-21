# PhotoFrenzy (CMPE 133 Team 13) 
> This is a full-stack photo-sharing web application for our CMPE 133 software engineering group project. 

> Xiyuan Zhou, Tu Tran, Mohammad Zaza

# Frontend libraries and packages
- MaterialUI: https://mui.com
- Testing Library: https://testing-library.com
- Axios: https://axios-http.com
- React: https://react.dev
- React Feather: https://feathericons.com
- React Router: https://reactrouter.com/en/main
- Reactstrap: https://reactstrap.github.io
- SASS: https://sass-lang.com
- TailwindCSS: https://tailwindcss.com
- Styled components: https://styled-components.com
- Jest: https://jestjs.io

# Backend libraries and packages
- Flask: https://pypi.org/project/Flask/
- Flask-login: https://pypi.org/project/Flask-Login/
- Flask-Migrate: https://pypi.org/project/Flask-Migrate/
- Flask-SQLAlchemy: https://pypi.org/project/Flask-SQLAlchemy/
- SQLAlchemy: https://pypi.org/project/SQLAlchemy/
- Jinja2: https://pypi.org/project/Jinja2/
- jwt: https://pypi.org/project/jwt/
- pycparser: https://pypi.org/project/pycparser/
- python-dotenv: https://pypi.org/project/python-dotenv/
- Werkzeug: https://pypi.org/project/Werkzeug/
- cryptography: https://pypi.org/project/cryptography/
- alembic: https://pypi.org/project/alembic/
- blinker: https://pypi.org/project/blinker/
- cffi: https://pypi.org/project/cffi/
- click: https://pypi.org/project/click/
- itsdangerous: https://pypi.org/project/itsdangerous/
- Mako: https://pypi.org/project/Mako/
- MarkupSafe: https://pypi.org/project/MarkupSafe/
- six: https://pypi.org/project/six/
- typing_extensions: https://pypi.org/project/typing-extensions/

# How to run frontend
- In order to run our website correctly, users will have to have NodeJS installed on their computers.
- clone repo:
    `git clone https://github.com/ttmtu2003/PhotoFrenzy.git`

- change current directory to just cloned repo:
    `cd PhotoFrenzy`

- change directory to the frontend folder:
    `cd frontend`
    
- use the correct `node` version (run installation the correct version as prompted if needed):
    `nvm use`

- install all required packages and dependencies:
    `npm install`

- start frontend:
    `npm start`

- visit localhost:3000 on browser (recommended: Chrome)

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

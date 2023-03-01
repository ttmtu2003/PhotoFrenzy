import os
from flask import render_template, flash, url_for, redirect, request, session

from app import app, oauth

@app.route("/")
def home():
    para =[
        'section1',
        'section2',
        'section3'
    ]

    return render_template('index.html', data=para)


@app.route('/data')
def get_time():
    return {
        'Name': "geek",
        "Age": "22",
        "Date": "x",
        "programming": "python"
    }


@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == "POST":
        username1 = request.form.get("username")
        email1 = request.form.get("email")
        password = request.form.get("psw")
        rpassword = request.form.get("psw-repeat")

        print(f"{username1}, {email1}, {password}, {rpassword}.")
        return redirect('/')
    return render_template('testing.html')


@app.route('/google/')
def google():
    # Google Oauth Config
    # Get client_id and client_secret from environment variables
    # For developement purpose you can directly put it
    # here inside double quotes
    GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')

    CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
    oauth.register(
        name='google',
        client_id="606999141800-gotq56td8vu5ohi660jfcfhh4g2gmd9t.apps.googleusercontent.com",
        client_secret="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",
        server_metadata_url=CONF_URL,
        client_kwargs={
            'scope': 'openid email profile'
        }
    )

    # Redirect to google_auth function
    redirect_uri = url_for('google_auth', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)


@app.route('/google/auth/')
def google_auth():
    token = oauth.google.authorize_access_token()
    user = oauth.google.parse_id_token(token, None)
    print(" Google User ", user)
    return redirect('/signup')
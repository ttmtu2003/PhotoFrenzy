import os
from flask import render_template, flash, url_for, redirect, request, session,jsonify, json
from app.models import User, db
from app import app
import secrets
from flask_login import login_user
from werkzeug.security import generate_password_hash


@app.route("/")
def home():
    para =[
        'section1',
        'section2',
        'section3'
    ]

    return render_template('index.html', data=para)


@app.route('/data', methods=['GET'])
def get_time():
    if request.method == "GET":
        
        return json({
            'Name': "geek",
            "Age": "22",
            "Date": "x",
            "programming": "python"
        })

# @app.route('/signup', methods=['POST'], strict_slashes=False)
# def signup():
#     try:
#         # Get the full name, username, and password from the request body
#         full_name = request.json["body"]['fullName']
#         username = request.json["body"]['username']
#         password = request.json["body"]['password']

#         print(f"{full_name}, {username}, {password}.")
#         # Check if the user already exists
#         user = User.query.filter_by(username=username).first()
#         if user:
#             return jsonify({'message': 'User already exists'}), 400

#         # Hash the password
#         hashed_password = generate_password_hash(password, method='sha256')

#         # Insert the user into the database
#         user = User(full_name=full_name, username=username, password=hashed_password)
#         db.session.add(user)
#         db.session.commit()

#         # Log the user in
#         login_user(user)

#         # Generate a random token
#         token = secrets.token_hex(16)

#         return jsonify({'token': token})

#     except Exception as e:
#         print(e)
#         return jsonify({'message': 'Internal server error'}), 500

@app.route('/signup', methods=['POST', 'GET'], strict_slashes=False)
def signup():
    if request.method == "POST":
        full_name = request.json["body"]['fullName']
        username = request.json['body']["username"]
        password = request.json['body']["password"]
        
        # user1 = User.query.filter_by(email=email1).first()

        # if user1 is not None:
        #     print(f"{username1}, {email1}, {password}, {rpassword}.")
        #     flash("email is exist, enter different one")
        #     return redirect('/signup')
        # else:
        #     u = User(username=username1, email=email1, password=password)
        #     db.session.add(u)
        #     db.session.commit()
        print(f"{full_name}, {username}, {password}.")

        #print(f"{user1[0].username} and {user1[0].email}")
        # return redirect('/')
    return ""

@app.route('/login', methods=['POST'], strict_slashes=False)
def login():
    username = request.json["body"]["username"]
    password = request.json["body"]["password"]

    # print(f"The information from react: {username} and {password}")

    # Check if the username and password are valid
    user = User.query.filter_by(username=username, password=password).first()

    # Check if the username and password are valid
    if user:
        # Return a success message
        return jsonify({'message': 'Login successful'}, user)
    else:
        # Return an error message
        return jsonify({'message': 'Invalid username or password'})

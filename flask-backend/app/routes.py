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

@app.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
    try:
        # Get the full name, username, and password from the request body
        full_name = request.json["body"]['fullName']
        username = request.json["body"]['username']
        password = request.json["body"]['password']

        # print(f"{full_name}, {username}, {password}.")
        # Check if the user already exists
        user = User.query.filter_by(username=username).first()
        if user is not None:
            return jsonify({'message': 'User already exists'}), 400

        # Hash the password
        hashed_password = generate_password_hash(password, method='scrypt')

        # Generate a random token
        token = secrets.token_hex(16)

        # Insert the user into the database
        user = User(token=token, full_name=full_name, username=username, password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()

        # Log the user in
        login_user(user)

        # Return the user's information
        response_body = {'user': {'id': user.id, 'full_name': user.full_name, 'username': user.username, 'token': user.token}, 'status': 'success'}
        response_status = 200

        return response_body, response_status

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error', 'status':'error'})

@app.route('/login', methods=['POST'], strict_slashes=False)
def login():
  try:
    username = request.json["body"]["username"]
    password = request.json["body"]["password"]

    # print(f"The information from react: {username} and {password}")

    # Check if the username and password are valid
    user = User.query.filter_by(username=username).first()

    # print(f"{username}, {password}")

    # Check if the username and password are valid
    if user is not None and user.verify_password(password):
      login_user(user)

      return jsonify({'token': user.token, 'status': 'success'})
    
    # Return an error message
    return jsonify({'message': 'Invalid username or password', 'status': 'error'})
    
  except Exception as e:
    print(e)
    return jsonify({'message': 'Internal server error', 'status': 'error'})

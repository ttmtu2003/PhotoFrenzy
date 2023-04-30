import os
from flask import render_template, flash, url_for, redirect, request, session,jsonify, json
from app.models import User, db, Post
from app import app
import secrets
from flask_login import login_user
from werkzeug.security import generate_password_hash
import base64

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


################ SIGNUP ################
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

################ LOGIN ################
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

    if user is not None and user.verify_password(password):
      login_user(user)

      return jsonify({'token': user.token, 'status': 'success'})
    
    # Return an error message
    return jsonify({'message': 'Invalid username or password', 'status': 'error'})
    
  except Exception as e:
    print(e)
    return jsonify({'message': 'Internal server error', 'status': 'error'})



################ POST PHOTO ################
@app.route('/photos', methods=['POST'])
def post_photo():
    caption = request.form['caption']
    user_token = request.form['user_token']
    file = request.files['file']

    # print('caption:', caption)
    # print('user_id:', user_token)
    # print('file:', file)

    photo_data = file.read()
    photo_data_base64 = base64.b64encode(photo_data).decode('utf-8') # convert bytes object to string

    post = Post(caption=caption, photo_data=photo_data, user_token=user_token)
    db.session.add(post)
    db.session.commit()

    return jsonify({'id': post.id, 'caption': post.caption, 'photo_data': photo_data_base64, 'user_token' : post.user_token}), 200

if __name__ == '__main__':
    app.run(debug=True)


################ GET PHOTOS ################
@app.route('/posts', methods=['GET'])
def get_user_posts():
    user_token = request.args.get('user_token')
    # print(f"{user_token}.")
    if user_token:
        user = User.query.filter_by(token=user_token).first()
        if user:
            posts = Post.query.filter_by(user_token=user_token).all()
            serialized_posts = [post.serialize() for post in posts]
            for post in serialized_posts:
                post['full_name'] = user.full_name
                post['photo_data'] = base64.b64encode(post['photo_data']).decode('utf-8')
            return jsonify(serialized_posts), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    else:
        posts = Post.query.all()
        serialized_posts = [post.serialize() for post in posts]
        return jsonify(serialized_posts), 200

################ LOGIN ################

################ LOGIN ################

################ LOGIN ################

################ LOGIN ################
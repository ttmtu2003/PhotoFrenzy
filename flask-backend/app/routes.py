import os
from flask import render_template, flash, url_for, redirect, request, session,jsonify, json
from app.models import User, db, Post, Comment, Like
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

      return jsonify({'user': user.serialize(), 'status': 'success'})
    
    # Return an error message
    return jsonify({'message': 'Invalid username or password', 'status': 'error'})
    
  except Exception as e:
    print(e)
    return jsonify({'message': 'Internal server error', 'status': 'error'})



################ POST PHOTO ################
@app.route('/photos', methods=['POST'])
def post_photo():
    caption = request.form['caption']
    user_id = request.form['user_id']
    file = request.files['file']

    # print('caption:', caption)
    # print('user_id:', user_id)
    # print('file:', file)

    photo_data = file.read()
    photo_data_base64 = base64.b64encode(photo_data).decode('utf-8') # convert bytes object to string

    post = Post(caption=caption, photo_data=photo_data, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    return jsonify({'id': post.id, 'caption': post.caption, 'photo_data': photo_data_base64, 'user_id' : post.user_id}), 200

################ GET FOLLOWING POSTS ################

@app.route('/posts', methods=['GET'])
def get_posts():
  try:
    curr_user_id = request.args.get('user_id')
    current_user = User.query.get(curr_user_id)

    # Get the IDs of the users followed by the current user
    followed_ids = [user.id for user in current_user.followed]

    # Get the posts of the users followed by the current user
    posts = Post.query.filter(Post.user_id.in_(followed_ids)).all()

    # Serialize the posts and include the username and avatar of the user who posted each post
    serialized_posts = [post.serialize() for post in posts]

    return jsonify(serialized_posts)

  except Exception as e:
      print(e)
      return jsonify({'message': 'Server error'}), 500

################ GET USERS ################
@app.route('/users', methods=['GET'])
def search_users():
  try:
    search_query = request.args.get('search')
    curr_user_id = request.args.get('user_id')

    if search_query:
        users = User.query.filter(User.username.ilike(f'%{search_query}%')).all()
    else:
        users = User.query.all()

    # Filter out the current user from the search results
    filtered_users = [{'id': user.id, 'username': user.username, 'avatar': f'{user.avatar.decode("utf-8")}' if user.avatar else None} for user in users if user.id != int(curr_user_id)]
    return jsonify(filtered_users)
 
  except Exception as e:
    db.session.rollback()
    return jsonify({'success': False, 'error': str(e)})

################ UPDATE PROFILE ################
@app.route('/profile', methods=['PUT'])
def update_profile():
    try:
        user_id = request.args.get('user_id')
        user = User.query.get(user_id)

        # Update the user's bio if provided
        bio = request.json.get('bio')
        if bio is not None:
            user.bio = bio

        # Update the user's avatar if provided
        avatar = request.json.get('avatar')
        if avatar is not None:
            user.avatar = avatar.encode()

        db.session.commit()

        # Return the updated user object
        return jsonify(user.serialize()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)})

################ GET USER DETAIL ################
@app.route('/user-detail', methods=['GET'])
def get_user_info():
    user_id = request.args.get('id')
    user = User.query.get(user_id)
    if user:
        avatar_data = user.avatar
        avatar = None
        if avatar_data is not None:
            avatar = f'{avatar_data.decode("utf-8")}'
        user_info = {
            'id': user.id,
            'username': user.username,
            'full_name': user.full_name,
            'bio': user.bio,
            'avatar': avatar,
            'follower_count': user.follower_count,
            'following_count': user.following_count,
        }
        return jsonify(user_info)
    else:
        abort(404, description="User not found")


################ FOLLOW USER ################
@app.route('/follow', methods=['POST'])
def follow_user():
    user_id = request.args.get('user_id')
    curr_user_id = request.args.get('curr_user_id')

    user_to_follow = User.query.get(user_id)
    print(f"user, {user_id}")
    if user_to_follow:
        current_user = User.query.get(curr_user_id)
        current_user.follow(user_to_follow)
        db.session.commit()
        
        # Check if the current user is following the user being unfollowed
        is_following = current_user.is_following(user_to_follow)

        return jsonify({'follower': {
            'id': user_to_follow.id,
            'username': user_to_follow.username,
            'followingCount': current_user.following_count,
            'isFollowing' : is_following,
        }, 'status': 'success'})
    else:
        return jsonify({'error': 'User not found', 'status': 'error'})


################ UNFOLLOW ################
@app.route('/unfollow', methods=['POST'])
def unfollow_user():
    user_id = request.args.get('user_id')
    curr_user_id = request.args.get('curr_user_id')

    user_to_unfollow = User.query.get(user_id)
    if user_to_unfollow:
        current_user = User.query.get(curr_user_id)
        current_user.unfollow(user_to_unfollow)
        db.session.commit()
        
        # Check if the current user is following the user being unfollowed
        is_following = current_user.is_following(user_to_unfollow)

        return jsonify({'user': {
            'id': user_to_unfollow.id,
            'username': user_to_unfollow.username,
            'followerCount': current_user.follower_count,
            'isFollowing' : is_following,
        }, 'status': 'success'})
    else:
        return jsonify({'error': 'User not found', 'status': 'error'})
    

################ CHECK IF FOLLOWING ################
@app.route('/is-following', methods=['GET'])
def is_following():
    user_id = request.args.get('user_id')
    curr_user_id = request.args.get('curr_user_id')
    current_user = User.query.get(curr_user_id)
    user = User.query.get(user_id)
    print(f"{user_id}, follow")
    # Check if the current user is following the specified user
    is_following = current_user.is_following(user)
    
    return jsonify({'isFollowing': is_following})


################ GET PROFILE POSTS ################
@app.route('/profile/posts', methods=['GET'])
def get_my_posts():
    user_id = request.args.get('user_id')

    # Get the posts made by the current user
    posts = Post.query.filter_by(user_id=user_id).all()

    serialized_posts = []
    for post in posts:
        user = User.query.get(user_id)
        avatar_data = user.avatar
        avatar = None
        if avatar_data is not None:
            avatar = f'{avatar_data.decode("utf-8")}'
        serialized_post = post.serialize()
        serialized_post['username'] = user.username
        serialized_post['avatar'] = avatar
        serialized_post['photo_data'] = base64.b64encode(post.photo_data).decode('utf-8')
        serialized_posts.append(serialized_post)

    return jsonify(serialized_posts)

################ COMMENTS ################
@app.route('/posts/<int:post_id>/comments', methods=['POST'])
def post_comment(post_id):
    comment = request.json["body"]['comment']
    author_id = request.json['body']['author_id']
    post = Post.query.get(post_id)
    new_comment = Comment(text=comment, author_id=author_id, post_id=post_id)

    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'message': 'Comment posted successfully', 'comment': new_comment.serialize() })


@app.route('/posts/<int:postId>/comments', methods=['GET'])
def get_my_comments(postId):
    post1 = Post.query.get(postId)
    if post1 is None:
        return jsonify({'error': 'Post not found'}), 404
    comments = Comment.query.filter_by(post_id=postId).all()
    serialized_comments = []
    for comm in comments:
        
        user = User.query.get(comm.author_id)
        if user is None:
            # Handle case where user does not exist
            continue
        temp = comm.serialize()
        temp['id'] = comm.id
        temp['post_id'] = postId
        temp['commenter_id'] = comm.author_id
        temp['content'] = comm.text
        temp['commenter_username'] = user.username
        if user.avatar is not None:
            temp['commenter_picture'] = user.avatar.decode("utf-8")
        else:
            temp['commenter_picture'] = None
        serialized_comments.append(temp)
    return jsonify(serialized_comments)

################ LIKE STATUS OF POST ################
@app.route('/posts/<int:post_id>/likes', methods=['GET'])
def get_likes(post_id):
    status_like = False
    user_id = request.args.get('user_id')
    
    # print(f"{user_id} + {post_id}")
    post1 = Post.query.get(post_id)
    like1 = Like.query.filter_by(user_id=user_id, post_id=post_id).count()
    if like1 > 0:
        status_like = True
    
    return jsonify({"total_likes": post1.total_likes, "status_like": status_like})

################ LIKE POST ################
@app.route('/posts/<int:post_id>/likes', methods=['POST'])
def like_post(post_id):
    
    user_id = request.json.get('user_id')
    
    post1 = Post.query.get(post_id)
    
    post1.total_likes += 1
    
    new_like = Like(user_id=user_id, post_id=post_id)
    db.session.add(new_like)
    
    db.session.commit()

    return jsonify({"total_likes": post1.total_likes})

################ UNLIKE POST ################
@app.route('/posts/<int:post_id>/likes', methods=['DELETE'])
def unlike_post(post_id):
    user_id = request.args.get('user_id')
    
    like1 = Like.query.filter_by(user_id=user_id, post_id=post_id).count()
    temp = Like.query.filter_by(user_id=user_id, post_id=post_id).first() 
    post1 = Post.query.filter_by(id=post_id).first()

    if like1 > 0:
        db.session.delete(temp)  # Delete the user object
        if post1:
          post1.total_likes -= 1
          db.session.commit()
        else:
            print("Post not found")
        # print("I FOUND THE LIKE RECORDED ")
        
        return jsonify({'success:': True})
    return jsonify({"total_likes": post1.total_likes })

################ UPDATE USER INFO ################
@app.route('/user-detail', methods=['PUT'])
def update_user():
    data = request.get_json()
    user_id = data.get('userId')
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if username:
        user.username = username

    if password:
        user.password_hash = generate_password_hash(password, method='scrypt')

    db.session.commit()

    return jsonify({'message': 'User updated successfully', 'user': {'username': user.username, 'password': user.password_hash}})


################ DELETE USER ################
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        
        if user is None:
            return jsonify({'success': False, 'error': 'User not found'}), 404

        # Delete all related posts
        posts = Post.query.filter_by(user_id=user_id).all()
        
        for post in posts:
            # Decrease the total likes of the post by 1
            post.total_likes -= 1

            # Delete all related comments
            comments = Comment.query.filter_by(post_id=post.id).all()
            for comment in comments:
                db.session.delete(comment)

            db.session.delete(post)

        # Delete all related comments
        comments = Comment.query.filter_by(author_id=user_id).all()
        for comment in comments:
            db.session.delete(comment)

        # Delete all related likes
        likes = Like.query.filter_by(user_id=user_id).all()
        for like in likes:
            db.session.delete(like)
        
        
        # Delete all related followers
        # followers.delete().where(followers.c.follower_id == user_id).execute()
        
        follower_records = followers.delete().where(and_(followers.c.followed_id == user_id, followers.c.follower_id != user_id))
        db.session.execute(follower_records)
        print('sucess')

        db.session.delete(user)
        db.session.commit()

        return jsonify({'success': True}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
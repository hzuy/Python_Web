from flask import render_template, redirect, url_for, request, jsonify, flash
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db

def init_routes(app):
    @app.route('/')
    def home():
        return redirect(url_for('login'))
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if current_user.is_authenticated:
            return redirect(url_for('dashboard'))
        if request.method == 'POST':
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            print('Username:', username)
            print('Password:', password)
            user = User.query.filter_by(username=username).first()
            print('User:', user)
            if user:
                print('User password hash:', user.password)
                print('Check password:', check_password_hash(user.password, password))
            if user and check_password_hash(user.password, password):
                login_user(user)
                return jsonify({'success': True, 'redirect': url_for('dashboard')})
            return jsonify({'success': False, 'message': 'Invalid username or password'})
        
        return render_template('login.html')
    
    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if current_user.is_authenticated:
            return redirect(url_for('dashboard'))
        if request.method == 'POST':
            data = request.get_json()
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            
            if User.query.filter_by(username=username).first():
                return jsonify({'success': False, 'message': 'Username already exists'})
            
            if User.query.filter_by(email=email).first():
                return jsonify({'success': False, 'message': 'Email already exists'})
            
            new_user = User(
                username=username,
                email=email,
                password=generate_password_hash(password)
            )
            
            db.session.add(new_user)
            db.session.commit()
            
            return jsonify({
                'success': True, 
                'message': 'Registration successful! Please login.',
                'redirect': url_for('login')
            })
        
        return render_template('register.html')
    
    @app.route('/dashboard')
    @login_required
    def dashboard():
        return render_template('dashboard.html', user=current_user)
    
    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('login'))
    
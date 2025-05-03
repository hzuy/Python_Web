from flask import Flask
from config import Config
from extensions import db, login_manager
from models import User
from routes import init_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Khởi tạo extensions
    db.init_app(app)
    login_manager.init_app(app)
    
    # Cấu hình Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    login_manager.login_view = 'login'
    
    # Đăng ký routes
    init_routes(app)
    
    # Tạo bảng database
    with app.app_context():
        db.create_all()
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True,port=8001)
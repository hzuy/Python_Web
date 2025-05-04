from app import create_app
from models import User, db
from werkzeug.security import generate_password_hash

def create_admin():
    app = create_app()
    with app.app_context():
        # Xóa tài khoản admin cũ nếu tồn tại
        admin = User.query.filter_by(username='admin').first()
        if admin:
            db.session.delete(admin)
            db.session.commit()
        
        # Tạo tài khoản admin mới với mật khẩu được mã hóa
        admin = User(
            username='admin',
            email='admin@example.com',
            password=generate_password_hash('admin')
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin account created successfully!")

if __name__ == '__main__':
    create_admin() 
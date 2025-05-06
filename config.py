import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'mysql+pymysql://root:Nhd4231.@127.0.0.1:3306/laptrinhweb?charset=utf8mb4'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
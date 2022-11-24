"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_bcrypt import Bcrypt

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)


@api.route('/signup', methods=["POST"])
def signup():
    body = request.get_json()

    email = body.get("email")
    password1 = body.get("password1")
    password2 = body.get("password2")
    
    if email is None or password1 is None or password2 is None:
        return jsonify({"msg": "Email o Password incorrectos!", "data" : None}),400

    if len(password1) < 4:
        return jsonify({"msg": "El tamaño de la contraseña es incorrecto!", "data" : None}),400

    if password1 != password2:
        return jsonify({"msg": "Las contraseñas no coinciden!", "data" : None}),400

    hash = bcrypt.generate_password_hash(password1)
    try:
        user = User(
            email = email,
            password = hash.decode("utf-8"),
            is_active = True
        )

        db.session.add(user)
        db.session.commit()

        return jsonify({"msg": None,"data" : user.serialize()}),201
    except:
        return jsonify({"msg": "Error! Usuario ya existente!"}), 400

@api.route('/login', methods=["POST"])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    if email is None or password is None:
        return jsonify({"msg": "Email o Password incorrectos!", "data" : None}),400
    
    users = User.query.filter_by(email = email).all()
    if(len(users)==0):
        return jsonify({"msg":"El usuario con mail "+email+" no existe","data": None})
    user = users[0]
    hash = user.password

    isValid = bcrypt.check_password_hash(hash, password)
    if not isValid:
        return jsonify({"msg":"Clave incorrecta","data": None})

    token = create_access_token(identity={"rol": "usuario", "data": user.serialize()})
    return jsonify({"msg": None ,"data":token})

@api.route('/private', methods=["GET"])
@jwt_required()
def private():
    data = get_jwt_identity()
    if data["rol"] == "usuario":
        pass
    print(data)
    return jsonify(data)
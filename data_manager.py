import bcrypt
import database_common


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@database_common.connection_handler
def insert_new_user(cursor, user_name, pwd_hash):
    cursor.execute("""
                      INSERT INTO users
                      VALUES (default, %(user_name)s, %(pwd_hash)s );
                      """,
                   {'user_name': user_name, 'pwd_hash': pwd_hash})


@database_common.connection_handler
def get_user_info_from_db(cursor, username):
    cursor.execute("""
                      SELECT * FROM users 
                      WHERE username = %(username)s;
                      """,
                   {'username': username})
    user = cursor.fetchone()
    return user

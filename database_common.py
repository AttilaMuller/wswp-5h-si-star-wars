import psycopg2
import psycopg2.extras
import os
import urllib


def get_connection_string():
    urllib.parse.uses_netloc.append('postgres')
    url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
    connection = psycopg2.connect(
        database=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    return connection

def open_database():
    try:
        connection = get_connection_string()
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print('Database connection problem')
        raise exception
    return connection


def connection_handler(some_function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = some_function(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value
    return wrapper

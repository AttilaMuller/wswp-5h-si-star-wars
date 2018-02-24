from flask import Flask, render_template, request, session, redirect, url_for
import data_manager

app = Flask(__name__)
app.secret_key = 'c3po'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        user_name = request.form['user_name']
        password = request.form['password']
        verify_password = request.form['verify_password']
        if password == verify_password:
            pwd_hash = data_manager.hash_password(password)
            data_manager.insert_new_user(user_name, pwd_hash)
            return redirect(url_for('index'))
    return render_template('registration_form.html')


@app.route('/login', methods=['POST', 'GET'])
def login_page():
    if request.method == 'POST':
        user_name = request.form['username']
        user_info = data_manager.get_user_info_from_db(user_name)
        wrong_data_help = None
        if user_info is None:
            return render_template('login.html', wrong_data_help=wrong_data_help)
        if data_manager.verify_password(request.form['password'], user_info['password']):
            session['username'] = user_info['username']
            session['user_id'] = user_info['id']
            return redirect(url_for('index', signed_in=user_info['username']))
        else:
            return render_template('login.html', wrong_data_help=wrong_data_help)
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('user_id', None)
    return redirect(url_for('index'))




from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('join')
def on_join(data):
    room = data['room']
    username = data['username']
    join_room(room)
    send(f"{username} has joined the room.", to=room)

@socketio.on('message')
def handle_message(data):
    username = data['username']
    message = data['message']
    room = data['room']
    send(f"{username}: {message}", to=room)

if __name__ == '__main__':
    from eventlet import wsgi
    import eventlet
    eventlet.monkey_patch()  # Habilita soporte para WebSockets
    socketio.run(app, host='0.0.0.0', port=5000)
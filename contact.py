from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('contact.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    
    # ここでフォームデータをデータベースに保存するか、他の処理を行います。
    
    return 'Thank you for your submission!'

if __name__ == '__main__':
    app.run(debug=True)

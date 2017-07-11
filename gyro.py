import os
from string import Template

from sanic import Sanic
from sanic.response import html, json

app = Sanic(__name__)

# Serves files from the static folder to the URL /static
app.static('/_static', './_static')

# Load the only template we use globally
with open(os.path.join('templates', 'index.html')) as inf:
    template = Template(inf.read())

@app.route('/<word:[A-z0-9]>', methods=['GET'])
@app.route('/', methods=['GET'])
async def get_wikiword(request, word='Index'):
    path = os.path.join('pages', word + '.md')
    if os.path.isfile(path):
        with open(path) as inf:
            content = inf.read()
    else:
        content = 'No content yet'

    page = template.substitute(content=content)
    return html(page)

@app.route('/<word:[A-z0-9]>', methods=['POST'])
@app.route('/', methods=['POST'])
async def post_wikiword(request, word='Index'):
    path = os.path.join('pages', word + '.md')
    markdown = request.form['markdown'][0]
    with open(path, mode='w', encoding='utf-8') as outf:
        outf.write(markdown)
        return json({'message': 'Saved'})
    

app.run(host="0.0.0.0", port=8000, debug=True)
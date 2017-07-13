import glob
import json
import os

from sanic import Sanic
from sanic import response

app = Sanic(__name__)

# Serves files from the static folder to the URL /static
app.static('/_static', './_static')


@app.route('/_index.js')
async def get_search_index(request):
    if not os.path.isfile(os.path.join('_static', 'index.js')):
        reindex_site()
    return response.redirect('/_static/index.js')


@app.route('/')
async def get_index(request):
    with open(os.path.join('sanic', 'index.html')) as inf:
        content = inf.read()
    return response.html(content)


@app.route('/<word:[A-z0-9]+>', methods=['GET'])
async def get_wikiword(request, word='index'):
    word = word.lower()
    content = ''
    path = os.path.join('pages', word + '.md')
    if os.path.isfile(path):
        with open(path) as inf:
            content = inf.read()
    return response.text(content)


@app.route('/<word:[A-z0-9]*>', methods=['POST'])
@app.route('/', methods=['POST'])
async def post_wikiword(request, word='index'):
    word = word.lower()
    path = os.path.join('pages', word + '.md')
    markdown = request.form['markdown'][0]
    with open(path, mode='w', encoding='utf-8') as outf:
        outf.write(markdown)
        reindex_site()  # FIXME: this can be made more efficient.
        return response.json({'message': 'Saved'})


def reindex_site():
    docs = []
    for doc in glob.glob(os.path.join('pages', '*.md')):
        docname = os.path.splitext(os.path.basename(doc))[0]
        with open(doc, encoding='utf8') as inf:
            text = inf.read()
            docs.append({'name': docname, 'text': text})
    index_path = os.path.join('_static', 'index.js')
    with open(index_path, mode='w', encoding='utf-8') as outf:
        json.dump(docs, outf)


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000, debug=True)

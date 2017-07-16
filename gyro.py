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


@app.route('/<word:path>', methods=['GET'])
async def get_wikiword(request, word='index'):
    word = word.lower()
    if word.startswith('_'):
        abort(403)
    content = ''
    path = os.path.join('pages', word + '.md')
    if os.path.isfile(path):
        with open(path) as inf:
            content = inf.read()
    return response.text(content)


@app.route('/<word:path>', methods=['POST'])
@app.route('/', methods=['POST'])
async def post_wikiword(request, word='index'):
    word = word.lower()
    if word.startswith('_'):
        abort(403)
    path = os.path.join('pages', word + '.md')
    markdown = request.form['markdown'][0]

    out_dir = os.path.dirname(path)
    if not os.path.isdir(out_dir):
        os.makedirs(out_dir)
    with open(path, mode='w', encoding='utf-8') as outf:
        outf.write(markdown)
        reindex_site()  # FIXME: this can be made more efficient.
        return response.json(
            {
                'message': 'Saved'
            }, headers={"Cache-Control": "no-cache"})


@app.route('/<word:path>', methods=['DELETE'])
@app.route('/', methods=['DELETE'])
async def del_wikiword(request, word='index'):
    word = word.lower()
    if word.startswith('_'):
        abort(403)
    path = os.path.join('pages', word + '.md')
    if os.path.isfile(path):
        os.remove(path)
    return response.json({'message': 'Removed'})


def reindex_site():
    docs = []
    for doc in glob.glob(os.path.join('pages', '**', '*.md'), recursive=True):
        docname = os.path.splitext('/'.join(doc.split(os.sep)[1:]))[0]
        with open(doc, encoding='utf8') as inf:
            text = inf.read()
            docs.append({'name': docname, 'text': text})
    index_path = os.path.join('_static', 'index.js')
    with open(index_path, mode='w', encoding='utf-8') as outf:
        json.dump(docs, outf)


@app.route('/_title_list')
async def get_title_list(request):
    titles = glob.glob(os.path.join('pages', '**', '*.md'), recursive=True)
    titles = [
        os.path.splitext('/'.join(t.split(os.sep)[1:]))[0] for t in titles
    ]
    return response.json(titles)


if __name__ == '__main__':
    host = os.environ.get('host', '127.0.0.1')
    port = int(os.environ.get('port', '8000'))
    debug = os.environ.get('debug', 'true').lower() == 'true'
    app.run(host, port, debug=debug)

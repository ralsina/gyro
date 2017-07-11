import glob
import json
import os
from string import Template

from sanic import Sanic
from sanic import response

app = Sanic(__name__)

# Serves files from the static folder to the URL /static
app.static('/_static', './_static')

# Load the only template we use globally
with open(os.path.join('templates', 'index.html')) as inf:
    template = Template(inf.read())
if not os.path.isdir('pages'):
    os.makedirs('pages')


@app.route('/<word:[A-z0-9]*>', methods=['GET'])
@app.route('/', methods=['GET'])
async def get_wikiword(request, word='Index'):
    path = os.path.join('pages', word + '.md')
    if os.path.isfile(path):
        with open(path) as inf:
            content = inf.read()
    else:
        content = 'No content yet'

    page = template.substitute(content=content)
    return response.html(page)


@app.route('/<word:[A-z0-9]*>', methods=['POST'])
@app.route('/', methods=['POST'])
async def post_wikiword(request, word='Index'):
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

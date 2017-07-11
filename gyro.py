from sanic import Sanic
from sanic.response import json

app = Sanic(__name__)

# Serves files from the static folder to the URL /static
app.static('/_static', './_static')

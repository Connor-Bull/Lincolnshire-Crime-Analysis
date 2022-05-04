import json


from website import app
from website.data import map as crimeMap
from website.utils import docache

@app.route('/map', methods=['GET'])
@docache(minutes=60*24*5) # Cache for 5 days since this will not change!
def mapget():
    return json.dumps(crimeMap)


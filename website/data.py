import json

mapData = {}

with open("data/map.geojson", "r") as mapDataFile:
    mapData = json.load(mapDataFile)
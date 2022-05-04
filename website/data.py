import json

map = {}


with open("data/map.geojson", "r") as mapFile:
    map = json.load(mapFile)

print(map)
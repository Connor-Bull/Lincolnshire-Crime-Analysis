
from flask import Flask, render_template
import pandas as pd
import folium
from folium.plugins import MarkerCluster
from folium.plugins import HeatMap

df = pd.read_csv('data/map.csv')
df = df.drop(columns=['Context', 'Crime ID', 'Reported by', 'Falls within', 'Last outcome category', 'LSOA code','LSOA name' ], axis = 1)



map = folium.Map(location=[53.1741,0.4503],
                        zoom_start=11,
                        tiles="openstreetmap")


lat = df['Latitude'].tolist()
lng = df['Longitude'].tolist()
offense = df['Crime type'].tolist()
locations = list(zip(lat, lng))



marker_cluster = MarkerCluster(
    name="Crimes by Marker",
    overlay=True,
    control=True
)

for i in range(len(lat)):
    location = lat[i], lng[i]
    crime_type = offense[i]
    #marker = folium.Marker(location=location)
    html = '''<b> Type of Crime: </b> {}<br>
            Latitude: {}<br>
            Longitude:{}<br>'''.format(crime_type, location[0], location[1])
    iframe = folium.IFrame(html, width=200, height=200)
    popup = folium.Popup(iframe, max_width=200)
    marker = folium.Marker(location= location,popup=popup)
    marker_cluster.add_child(marker)

marker_cluster.add_to(map)

HeatMap(
    data=list(zip(lat, lng)),
    name="Crimes by Heatmap").add_to(map)
folium.LayerControl().add_to(map)

html_map = map._repr_html_()


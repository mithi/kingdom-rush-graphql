import yaml
import json
from os import listdir
from os.path import isfile, join

"""
{ name, kingdom, imageUrl}
"""


path = "./data/raw/image-url.yml"
stream = open(path, "r")
data = yaml.load_all(stream, yaml.Loader)

data_dict = [datum for datum in data]
json_data = { "data": data_dict }

with open("./data/generated/json/image-urls.json", 'w') as fout:
    json_dumps_str = json.dumps(json_data, indent=4)
    print(json_dumps_str, file=fout)


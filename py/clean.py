import pandas


def convert_to_json(datadir='../data'):
    """Convert the raw CSV and save the JSON to disk"""
    data = pandas.io.parsers.read_csv(datadir + '/raw.csv')
    data.to_json(datadir + '/raw.json', orient='records')
    return data


import json
from pprint import pprint
json_data = open('../data/raw.json')

data = json.load(json_data)
pprint(data[0:2])
json_data.close()

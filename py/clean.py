import pandas


def convert_to_json(datadir='../data'):
    """Convert the raw CSV and save the JSON to disk"""
    data = pandas.io.parsers.read_csv(datadir + '/raw.csv')
    data.to_json(datadir + '/raw.json')
    return data

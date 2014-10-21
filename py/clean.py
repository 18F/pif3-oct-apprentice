import json
import pandas
import requests


def convert_to_json(datadir='../data'):
    """Convert the raw CSV and save the JSON to disk"""
    data = pandas.io.parsers.read_csv(datadir + '/raw.csv')
    data.to_json(datadir + '/raw.json', orient='records')
    return data


def encoded_dict(in_dict):
    """ Accepts a dictionary and returns an encoded dictionary, where the
    values are encoded UTF8"""
    out_dict = {}
    for k, v in in_dict.iteritems():
        if isinstance(v, unicode):
            v = v.encode('utf8')
        elif isinstance(v, str):
            # Must be encoded in UTF-8
            v.decode('utf8')
        out_dict[k] = v
    return out_dict


def _process(entry):
    """Returns an enhanced (geocoded) and processed dictionary for each
    apprenticeship sponsor."""
    # geocoder endpoint
    base = 'https://maps.googleapis.com/maps/api/geocode/json'

    # heavy-handed way to process the entries, only process the ones that
    # actually work
    try:
        address = [
            entry['USER_ADDRESS'],
            entry['USER_CITY'],
            entry['USER_STATE'],
            entry['USER_ZIP5']
        ]

        address = ', '.join(address)
        payload = {'address': address}
        res = requests.get(base, params=payload).json()
        coords = res['results'][0]['geometry']['location']

        phone = {'phone': entry['PHONE_NUM']}
        occupation = {'occupation': entry['OCC_TITLE'].strip()}

        data_list = [
            payload, coords, phone, occupation
        ]

        return encoded_dict({k: v for d in data_list for k, v in d.items()})
    except:
        return None


def carto_table(datadir='../data', n=None):
    """Prepare the data for upload to CartoDB, from Raw CSV file to JSON to
    output, geocoded CSV file"""
    convert_to_json()

    with open(datadir + '/raw.json') as f:
        data = json.load(f)

    if n:
        data = data[0:n]

    processed = filter(None, [_process(d) for d in data])
    df = pandas.DataFrame(processed)
    df.to_csv(datadir + '/carto.csv')
    return df

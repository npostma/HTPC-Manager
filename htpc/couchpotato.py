import urllib2
import urllib
import logging;
from settings import readSettings

def cpFetchDataFromUrl(url):
    try:
        data = urllib2.urlopen(url)
        return data
    except:
        return ''


def cpMakeUrl(command):
    config = readSettings()
    if config.has_key('cp_port') and config.has_key('cp_ip') and config.has_key('cp_apikey'):
        url = 'http://' + config.get('cp_ip') + ':' + str(config.get('cp_port')) + '/' + config.get('cp_apikey') + '/' + command;
        return url

def cpGetMovieList():
    data = cpFetchDataFromUrl(cpMakeUrl('movie.list'))
    return data

def cpGetNotificationList():
    data = cpFetchDataFromUrl(cpMakeUrl('notification.list'))
    return data

def cpDeleteMovie(id):
    data = cpFetchDataFromUrl(cpMakeUrl('movie.delete/?id=' + id))
    return data;

def cpRefreshMovie(id):
    data = cpFetchDataFromUrl(cpMakeUrl('movie.refresh/?id=' + id))
    return data;

def cpSearchMovie(q):
    data = cpFetchDataFromUrl(cpMakeUrl('movie.search/?q=' + q))
    return data;

def cpAddMovie(profile_id, identifier, title):
    data = cpFetchDataFromUrl(cpMakeUrl('movie.add/?profile_id=' + str(profile_id) + '&identifier=' + identifier + '&title=' + str(title)))
    return data;
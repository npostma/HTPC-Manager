# Workflow
#
# Every 24 hours call CheckForUpdates()
# 
#

from github import github
import urllib2
import zipfile, tarfile
import os
import shutil
from glob import glob
import cherrypy

Owner = "mhendrikx"
Repo = "HTPC-Manager"
Branch = "master"
GitHubURL = "https://github.com/%s/%s/tarball/%s" % (Owner, Repo, Branch)

BaseUrl = os.getcwd()

def GetHashFromFile():
	
    if not os.path.exists(BaseUrl + '\\' + 'Version.txt'):
    os.makedirs(BaseUrl + '\\' + 'Version.txt')
    
	VersionFile = open(BaseUrl + '\\' + 'Version.txt','r')
	LocalHash = VersionFile.read()
	VersionFile.close()
	return LocalHash

def WriteHashToFile(RemoteHash):
	
    VersionFile = open(BaseUrl + '\\' + 'Version.txt', 'w')
    VersionFile.write(RemoteHash)
    VersionFile.close()

def GetHashFromGitHub():
    
    gh = github.GitHub()
    
    for c in reversed(gh.commits.forBranch(Owner, Repo, Branch)):
        short = (c.id[:7])
        long = (c.id)
        
    shorthash = short.splitlines()[0]
    longhash = long.splitlines()[0]
    
    return (shorthash, longhash)
    		
def DownloadNewVersion():

    cherrypy.engine.exit()
    
    # Download repo
    url = urllib2.urlopen(GitHubURL)
    f = open('%s.tar.gz' % Repo,'wb')
    f.write(url.read())
    f.close()
    
    # Write new hash to file
    WriteHashToFile(GetHashFromGitHub()[1])
    
    # Extract to temp folder
    tar = tarfile.open('%s.tar.gz' % Repo)
    tar.extractall(BaseUrl + '/%s-update' % Repo)
    tar.close()

    # Delete .tar.gz
    os.remove("%s.tar.gz" % Repo)

    # Overwrite old files with new ones
    root_src_dir = BaseUrl + "/%s-update/%s-%s-%s" % (Repo, Owner, Repo, GetHashFromGitHub()[0])
    root_dst_dir = BaseUrl
    
    os.remove ("%s/PIL/_imaging.pyd" % BaseUrl)
    os.remove ("%s/PIL/_imagingcms.pyd" % BaseUrl)
    os.remove ("%s/PIL/_imagingft.pyd" % BaseUrl)
    os.remove ("%s/PIL/_imagingmath.pyd" % BaseUrl)
    os.remove ("%s/PIL/_imagingtk.pyd" % BaseUrl)

    for src_dir, dirs, files in os.walk(root_src_dir):
        dst_dir = src_dir.replace(root_src_dir, root_dst_dir)
        if not os.path.exists(dst_dir):
            os.mkdir(dst_dir)
        for file_ in files:
            src_file = os.path.join(src_dir, file_)
            dst_file = os.path.join(dst_dir, file_)
            if os.path.exists(dst_file):
                os.remove(dst_file)
            shutil.move(src_file, dst_dir)
    
    try:
        os.remove(BaseUrl + "/%s-update" % Repo)
    except Exception:
        pass
            
def CheckForUpdates():
    
    gh = github.GitHub()
    
    L = list((c.id) for c in gh.commits.forBranch(Owner, Repo, Branch))

    try:
		i = L.index(GetHashFromFile())
    except ValueError:
		i = -1 # no match, file empty

    if i == -1:
        DownloadNewVersion() # First time use tell them to update and if they agree call DownloadNewVersion()
        
    elif i == 0:
        raise cherrypy.HTTPRedirect("/") # no update available dont show anything
        
    else:
        DownloadNewVersion() # Update Available and if they agree call DownloadNewVersion()
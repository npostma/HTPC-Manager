<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>$appname - Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/default.css" rel="stylesheet">
    <link href="/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="/css/responsive.css" rel="stylesheet">

    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/jquery-ui-1.8.17.custom.min.js"></script>
    <script src="js/jquery.tablesorter.min.js"></script>
    <script src="js/jquery.metadata.js"></script>
    <script src="/js/default.js"></script>
    #if $varExists('jsfile')
    <script src="/js/$getVar('jsfile')"></script>
    #end if
</head>
<body>

<div id="notify-user" class="alert alert-block">
    <a class="close">&times;</a>
    <h4 class="alert-heading">Warning!</h4>
    <span>weee</span>
</div>

<div id="modal_dialog" class="modal hide">
    <div class="modal-header">
        <a href="javascript:void(0);" class="close" data-dismiss="modal">&times;</a>
        <h3 class="modal-h3"></h3>
    </div>
    <div class="modal-body">
        
    </div>
    <div class="modal-footer">
        <a href="javascript:void(0);" class="btn secondary">Close</a>
    </div>
</div>

<div class="navbar navbar-fixed-top" id="navbar">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <i class="icon-th icon-white"></i>
            </a>
            <a class="brand" href="/">$appname</a>
            <div class="nav-collapse">
                <ul class="nav">

                    #if $getVar('use_nzb', 'no') == "yes"
                        #if $submenu == "sabnzbd"
                        <li class="active">
                        #else
                        <li>
                        #end if
                        <a href="/sabnzbd">SABnzbd</a>
                        </li>
                    #end if

                    #if $getVar('use_sb', 'no') == "yes"
                        #if $submenu == "sickbeard"
                        <li class="active">
                        #else
                        <li>
                        #end if
                        <a href="/sickbeard">SickBeard</a>
                        </li>
                    #end if

                    #if $getVar('use_cp', 'no') == "yes"
                        #if $submenu == "couchpotato"
                        <li class="active">
                        #else
                        <li>
                            #end if
                            <a href="/couchpotato">CouchPotato</a>
                        </li>
                    #end if

                    #if $getVar('use_xbmc', 'no') == "yes"
                        #if $submenu == "xbmc"
                        <li class="active">
                        #else
                        <li>
                        #end if
                        <a href="/xbmc">XBMC</a>
                        </li>
                    #end if

                    #if $getVar('use_nzbmatrix', 'no') == "yes"
                        #if $submenu == "nzbsearch"
                        <li class="active">
                        #else
                        <li>
                            #end if
                            <a href="/nzbsearch">NZB Search</a>
                        </li>
                    #end if
                </ul>

                <ul class="nav pull-right">
                    <li class="dropdown">
                        <a href="#"
                           class="dropdown-toggle"
                           data-toggle="dropdown">
                            System
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a id="btn-restart" href="javascript:;">Restart</a>
                            </li>
                            <li>
                                <a id="btn-shutdown" href="javascript:;">Shutdown</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav pull-right">
                    #if $submenu == "settings"
                    <li class="active">
                    #else
                    <li>
                        #end if
                        <a href="/settings">Settings</a>
                    </li>
                </ul>
            </div>
            #if $getVar('page_can_search', 'no') == "yes"
            <div class="navbar-search pull-right">
                <input type="text" class="search-query" placeholder="Search" id="search-query">
            </div>
            #end if
        </div>
    </div>
</div>
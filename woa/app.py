
import os
import sys
import time
import pwd
import grp

from collections import defaultdict

from flask import Flask, request, render_template, redirect
from flask import send_from_directory

import moa.job
import moa.logger
from moa.sysConf import sysConf

l = moa.logger.getLogger(__name__)

app = Flask(__name__)

METHODS = defaultdict(dict)

##
## Helper functions
##

def _format_time(seconds):
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(seconds))

def _getNiceSize(num):
    """
    Thanks to:
    stackoverflow.com/questions/1094841/reusable-library-to-get-human-readable-version-of-file-size
    """
    for x in ['','k','M','G','T']:
        if num < 1024.0:
            if x == '':
                return num
            else:
                return "%3.1f%s" % (num, x)
        num /= 1024.0


@app.route('/')
def woa_index_root():
    return woa_index('.')

@app.route('/<path:pth>')
def woa_index(pth):

    data = {}

    fullpath = os.path.join(sysConf.job.wd, pth).rstrip('/')

    l.info("path: %s" % fullpath)
    crumbs = pth.split('/')

    data['fullpath'] = fullpath
    data['localurl'] = pth.rstrip('/')
    data['crumbs'] = crumbs
    data['base_job'] = sysConf.job
    data['sysConf'] = sysConf
    data['base_path'] = sysConf.job.wd.rstrip('/')

    if data['localurl'] == '.':
        data['parenturl'] = False
    else:
        data['parenturl'] = './' + os.path.dirname(data['localurl'])

    # are we looking at a file?
    if not os.path.exists(fullpath):
        return 'not so good'

    if os.path.isfile(fullpath):
        basedir = os.path.dirname(fullpath)
        basename = os.path.basename(fullpath)
        return send_from_directory(basedir, basename)

    data['job'] = moa.job.Job(fullpath)
    data['isMoa'] = data['job'].isMoa()

    command = request.args.get('c')
    if command is None or not command in METHODS:
        command = 'index'

    data['allcommands'] = METHODS
    comsort = [x[1] for x in sorted([(METHODS[x]['order'], x) for x in METHODS])]
    data['command_order'] = comsort
    data['command'] = command

    sys.stderr.write('.')
    return METHODS[command]['func'](data)

def woaOnlyWithMoaJob(f):
    name = f._woa_method_name
    METHODS[name]['mustHaveJob'] = True
    return f

def woaFunc(name, order=5):
    def decorator(f):
        l.debug('register func %s' % name)
        METHODS[name]['func'] = f
        METHODS[name]['mustHaveJob'] = False
        METHODS[name]['order'] = order
        f._woa_method_name = name
        return f
    return decorator

@woaFunc('index', 0)
def _index(data):

    data['allfiles'] = {}

    fullpath = data['fullpath']

    for f in os.listdir(fullpath):
        ff = os.path.join(fullpath, f)
        stat = os.stat(ff)
        finf = { 'full' : ff,
                 'stat': stat,
                 'rawsize': stat[6],
                 'atime' : _format_time(stat[7]),
                 'mtime' : _format_time(stat[8]),
                 'ctime' : _format_time(stat[9]),
                 'size': _getNiceSize(stat[6]),
                 'user': pwd.getpwuid(stat[4])[0],
                 }
        try:
            finf['group'] = grp.getgrgid(stat[5])[0]
        except:
            finf['group'] = stat[5]

        data['allfiles'][f] = finf


    data['files'] = [f for f in data['allfiles']
                     if os.path.isfile(os.path.join(fullpath, f))]
    data['dirs'] = [f for f in data['allfiles']
                     if os.path.isdir(os.path.join(fullpath, f))]
    return render_template('index.html', **data)


@woaFunc('files')
def _files(data):
    basepath = data['base_path']
    jobpath = data['fullpath']
    data['fileset'] = sysConf.api.fileset_prepare_display(
        data['job'], basepath, jobpath)
    return render_template('files.html', **data)

@woaOnlyWithMoaJob
@woaFunc('template')
def _template (data):
    data['raw_template'] = data['job'].template.getRaw()
    return render_template('template.html', **data)

@woaOnlyWithMoaJob
@woaFunc('parameters')
def _parameters(data):
    return render_template('parameters.html', **data)

@woaOnlyWithMoaJob
@woaFunc('readme', 1)
def _readme(data):
    data['readme'] = sysConf.api.get_readme(data['job'], format='html')
    print data['readme']
    return render_template('readme.html', **data)

def run():
    host = '0.0.0.0'
    port = 5001
    moa.ui.message("Starting server on %s:%s" % (host, port))
    app.run(host=host, port=port, debug=True)


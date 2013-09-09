Woa - A web interface for Moa!

## Download

    git clone git@github.com:mfiers/Woa.git

## Install

Preferably in a virtual environment (http://www.virtualenv.org/)

    cd Woa
    python setup.py install

 This should install Moa as well (if it wasn't already)

## Download javascript dependencies

	sh ./util/get_jslibs.sh

Note - submodules would have been more elegant, but then you'd need node.js and a few other tools - found that too much. So, now this script downloads all dependencies.

## Installation

after installing (for example, git clone & run python setup.py
develop) you will need to register the application as a Moa plugin by
running:

    moa set -s plugins.system.Woa.module=woa.plugin
    moa set -s plugins.system.Woa.enabled=true

## Run.

Go to the parent directory of a Moa project and run:

    moa woa

 and, if all is well, you should be able to see a webinterface on http://localhost:5001

 Note - this is still very experimental - please post any issues to github

 .m

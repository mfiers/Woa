Woa - A web interface for Moa!

## Download

    git clone git@github.com:mfiers/Woa.git

## Download bootstrap

	cd Woa
	sh ./util/get_jslibs.sh

This script will download the correct version of bootstrap and unpack it in the correct location


## Installation

after installing (for example, git clone & run python setup.py
develop) you will need to register the application as a Moa plugin by
running:

    moa set -s plugins.system.Woa.module=woa.plugin
    moa set -s plugins.system.Woa.enabled=true


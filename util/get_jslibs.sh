#!/bin/sh

if [[ "$(basename $PWD)" != "Woa" ]]
then
	echo "Must run this in the Woa base directory"
	exit -1
fi

#Bootstrap
cd vendor
if [[ ! -f "bootstrap.zip" ]]
then
	wget http://getbootstrap.com/2.3.2/assets/bootstrap.zip
fi
unzip -oq bootstrap.zip

#Jquery
if [[ ! -f "jquery/jquery-1.10.2.min.js" ]]
then
	mkdir -f jquery
	wget http://code.jquery.com/jquery-1.10.2.min.js
	mv jquery-1.10.2.min.js jquery
fi

#Datatables
if [[ ! -f "DataTables-1.9.4.zip" ]]
then
	wget http://datatables.net/releases/DataTables-1.9.4.zip
fi
unzip -oq DataTables-1.9.4.zip

if [[ ! -f "./DataTables-1.9.4/media/css/DT_bootstrap.css" ]]
then
	wget http://datatables.net/media/blog/bootstrap_2/DT_bootstrap.css
	mv DT_bootstrap.css ./DataTables-1.9.4/media/css/
fi

if [[ ! -f "bootstrap-switch.v1.8.zip" ]]
then
	wget https://github.com/nostalgiaz/bootstrap-switch/archive/v1.8.zip
	mv v1.8.zip bootstrap-switch.v1.8.zip
fi
unzip -oq bootstrap-switch.v1.8.zip

echo "Done"
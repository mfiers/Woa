#!/bin/sh

if [[ "$(basename $PWD)" != "Woa" ]]
then
	echo "Must run this in the Woa base directory"
	exit -1
fi

#Bootstrap
cd vendor
rm bootstrap.zip
wget http://getbootstrap.com/2.3.2/assets/bootstrap.zip
unzip -o bootstrap.zip

#Jquery
mkdir -f jquery
wget http://code.jquery.com/jquery-1.10.2.min.js
mv jquery-1.10.2.min.js jquery


#Datatables
rm DataTables-1.9.4.zip
wget http://datatables.net/releases/DataTables-1.9.4.zip
unzip -o DataTables-1.9.4.zip

wget http://datatables.net/media/blog/bootstrap_2/DT_bootstrap.css
mv DT_bootstrap.css ./DataTables-1.9.4/media/css/

echo "Done"
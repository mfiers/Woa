#!/usr/bin/env python
"""
Woa setup script
"""

from setuptools import setup

requires = [
    'Moa>0.11.18',
    'flask',
]

with open('VERSION') as F:
    version = F.read().strip()

packages = [
    'woa',
]

setup(name='woa',
      version=version,
      description='Woa - a web interface for Moa',
      author='Mark Fiers',
      author_email='mark.fiers.42@gmail.com',
      url='http://mfiers.github.com/Woa/',
      # entry_points=entry_points,
      packages=packages,
      include_package_data=True,
      # data_files=data_files,
      zip_safe=False,
      install_requires=requires,
      classifiers=[
          'Development Status :: 4 - Beta',
          'Environment :: Console',
          'Intended Audience :: Science/Research',
          'License :: OSI Approved :: GNU General Public License (GPL)',
          'Operating System :: POSIX',
          'Programming Language :: Python',
          'Programming Language :: Python :: 2.6',
          'Programming Language :: Python :: 2.7',
          'Programming Language :: Unix Shell',
          'Topic :: Scientific/Engineering :: Bio-Informatics'
      ])



"""
Moa Woa
"""

from moa.sysConf import sysConf
import moa.logger
import moa.args

l = moa.logger.getLogger(__name__)
from moa.sysConf import sysConf


#@moa.args.needsJob
#@moa.args.argument('-n', '--no_files', type=int, help="No filesets to show (default 10)", default=10)
#@moa.args.addFlag('-a', '--all', help="Show all filesets")
@moa.args.doNotLog
@moa.args.command
def woa(job, args):
    """
    Serve Moa data over http
    """
    #load a few modules here - 
    import woa.app

    woa.app.run()
    from flask import Flask

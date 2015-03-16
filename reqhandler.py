####################
# Copyright (c) 2007, Perceptive Automation, LLC. All rights reserved.
# http://www.perceptiveautomation.com
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
# EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
# OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
#
# IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
# INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
# NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
#
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
# NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN
# IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
####################

####################
## IMPORTS
import cherrypy
from cherrypy import _cperror

from indigopy import indigoconn as ic
from indigopy import indigodb as idb
from indigopy.basereqhandler import BaseRequestHandler, kTrueStr, kFalseStr, kEmptyStr, kTextPageStr, kHtmlPageStr, kXmlPageStr

####################
## CONSTANTS

####################
# Optional hooks to provide a plugin name and description (shown in Event Log and plugin index)
def PluginName():
	return u"Angular Indigo"

def PluginDescription():
	return u"This is an Angular plugin for Indigo."

def ShowOnControlPageList():
	return True

# Optional hook called when the IndigoWebServer first connects to IndigoServer
def IndigoConnected():
	pass

# Optional hook called when the IndigoWebServer disconnect from IndigoServer
def IndigoDisconnected():
	pass

####################
# The functions in this class are automatically called based on the URL
# requested. This provides a mechanism for easily serving dynamic content.
#
# The URL path is based on the folder path of the plugin. For example,
# this plugin folder name is "sample" so any URL path containing "sample"
# as the first path identifier will call into these functions.
#
# The class name can be called whatever you want, but it must subclass
# from BaseRequestHandler to be loaded by the webserver plugin manager.
class ExampleRequestHandler(BaseRequestHandler):
	""" Handles HTTP page requests. """

	####################
	# The plugin page request handler must subclass from BaseRequestHandler
	# and must call the parent class __init__ method.
	def __init__(self, logFunc, debugLogFunc):
		BaseRequestHandler.__init__(self, logFunc, debugLogFunc)

	####################
	# This example request handler function is called whenever the index
	# page for this plugin is requested:
	#
	#		http://127.0.0.1/sample/
	#
	def index(self):
		# Push a log message to Indigo's Event Log window.
		self._Log("hello there world -- we just received a request for the index page")
		
		# Override the returned content type to be plain text instead of HTML.
		cherrypy.response.headers['Content-Type'] = 'text/plain'
		return u"Hello World"
	index.exposed = True				# exposed = True must be set for handler func to be called

	####################
	# This example request handler function is called whenever the page
	# "template_example" for this plugin is requested:
	#
	#		http://127.0.0.1/sample/template_example
	#
	def template_example(self):
		# Push a log message to Indigo's Event Log window.
		self._Log("template test -- we just received a request for the template_example page")
		
		# Here is an example of loading a Cheetah HTML template file. It is processed
		# according to the Cheetah template rules and then returned to the browser. This
		# is very useful for formatting dynamic content (ex: lists of database elements)
		# for HTML.
		#
		# You can pass arbitrary data to the template file by setting the attributes
		# on the tmpl variable (ex: tmpl.needThisInTemplate = "my dynamic content").
		#
		# In this example we pass three properties: the remote browser IP address,
		# the remote browser agent descriptor, and the Indigo device list.
		tmpl = self._GetAndLockPluginTemplate('sample/templates/template_example.html')
		try:
			tmpl.iphone = self._IsiPhone()
			tmpl.browserIpAddr = cherrypy.request.remote.ip
			tmpl.browserAgent = u"unknown"
			if cherrypy.request.headers.has_key('User-Agent'):
				tmpl.browserAgent = cherrypy.request.headers['User-Agent']
			tmpl.devList = cherrypy.server.indigoDb.GetDevices(cherrypy.server.indigoConn, True)
			return tmpl.RenderTemplate()
		finally:
			tmpl.ReleaseLock();
	template_example.exposed = True		# exposed = True must be set for handler func to be called

	####################
	# The following folders inside the plugin folder will automatically be
	# available to serve static content (HTML pages, images, CSS, JS, etc.):
	#
	#		http://127.0.0.1/sample/css
	#		http://127.0.0.1/sample/js
	#		http://127.0.0.1/sample/images
	#		http://127.0.0.1/sample/video
	#		http://127.0.0.1/sample/static
	#
	# You do *not* need to define any type of request handler function to
	# have content served from these folders. In fact, if you only want
	# to server static content, then you do not need this python module
	# file (requesthandler.py) at all.
	#
	# Example:
	#		http://127.0.0.1/sample/static/static_example.html

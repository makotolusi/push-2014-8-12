Ext.define('Push.controller.Global', {
	extend : 'Ext.app.Controller',
	requires : ['Push.view.*', 'Ext.window.*'],

	stores : ['Navigation'],
	alias : 'controller.global',
	config : {
		control : {
			'navigation-tree' : {
				selectionchange : 'onTreeNavSelectionChange'
			},
			'navigation-breadcrumb breadcrumb' : {
				selectionchange : 'onBreadcrumbNavSelectionChange'
			}
			// ,
			// 'thumbnails': {
			// itemclick: 'onThumbnailClick'
			// },
			// '#codePreview tool[type=maximize]': {
			// click: 'onMaximizeClick'
			// },
			// 'tool[regionTool]': {
			// click: 'onSetRegion'
			// }
		},
		refs : {
			viewport : 'viewport',
			navigationTree : 'navigation-tree',
			navigationBreadcrumb : 'navigation-breadcrumb',
			contentPanel : 'contentPanel',
			// descriptionPanel: 'descriptionPanel',
			codePreview : '#codePreview'//,
			// thumbnails: {
			// selector: 'thumbnails',
			// xtype: 'thumbnails',
			// autoCreate: true
			// }
		},
		routes : {
			':id' : {
				action : 'handleRoute',
				before : 'beforeHandleRoute'
			}
		}
	},

	beforeHandleRoute : function(id, action) {
		var me = this, node = Ext.StoreMgr.get('navigation').getNodeById(id);
		// console.log('beforeHandleRoute--------'+id);
		// console.log(node);
		// var me = this;
		action.resume();
		// var me = this, store = Ext.StoreMgr.get('navigation'),node = store.getNodeById(id);
		// console.log(store.getNodeById(id));
		// console.log("beforeHandleRoute====" + id);
		// if (node.isLeaf()) {
		// Ext.Ajax.request({
		// url : Push.util.Global.ROOT_URL + '/web/manager/isLogin',
		// method : 'POST',
		// headers : {
		// 'Content-Type' : 'application/json; charset=utf-8'
		// },
		// jsonData : {
		// },
		// success : function(response) {
		// var text = response.responseText;
		// console.log(text);
		// var r = Ext.decode(text);
		// if (!r.SUC) {
		// if (!Ext.getCmp('login')) {
		// if ( id = 'app-list-grid') {
		// var session = this.session = new Ext.data.Session();
		// this.login = new Push.view.login.Login({
		// session : session,
		// autoShow : true
		// });
		// } else {
		// Ext.MessageBox.alert('提示', r.msg, function() {
		// var session = this.session = new Ext.data.Session();
		// this.login = new Push.view.login.Login({
		// session : session,
		// autoShow : true
		// });
		// }, this);
		// }
		// }
		// }
		// if (node) {
		// //resume action
		// action.resume();
		// } else {
		// me.showPanelContent(id);
		// Ext.resumeLayouts(true);
		// }
		// },
		// failure : function(response) {
		// var text = response.responseText;
		// console.log(text);
		// Ext.MessageBox.alert('提示', '失败-' + text, function() {
		// win.close();
		// }, this);
		// }
		// });
		// }
	},

	handleRoute : function(id) {
		console.log('handleRoute--------'+id);
		var me = this, navigationTree = me.getNavigationTree(), navigationBreadcrumb = me.getNavigationBreadcrumb(), store = Ext.StoreMgr.get('navigation'), node = store.getNodeById(id);
		console.log(node	);
		if (node!=undefined&&node.isLeaf()) {
			Ext.Ajax.request({
				url : Push.util.Global.ROOT_URL + '/web/manager/handleRoute',
				method : 'POST',
				headers : {
					'Content-Type' : 'application/json; charset=utf-8'
				},
				jsonData : {
					operation : id
				},
				success : function(response) {
					var text = response.responseText;
					console.log(text);
					var r = Ext.decode(text);
					if (r.SUC) {
						if (navigationTree && navigationTree.isVisible()) {
							navigationTree.getSelectionModel().select(node);
							navigationTree.getView().focusNode(node);
						} else {
							navigationBreadcrumb.setSelection(node);
						}
						Ext.suspendLayouts();
						if (node.isLeaf()) {
							me.showPanelContent(id);
							me.updateTitle(node);
							Ext.resumeLayouts(true);
						} else {
							me.updateTitle(node);
							Ext.resumeLayouts(true);
						}
					} else {
						Ext.MessageBox.alert('提示', r.msg, function() {
							var session = this.session = new Ext.data.Session();
							this.login = new Push.view.login.Login({
								session : session,
								autoShow : true
							});

						}, this);
					}
				},
				failure : function(response) {
					var text = response.responseText;
					console.log(text);
					Ext.MessageBox.alert('提示', '失败-' + text, function() {
						win.close();
					}, this);
				}
			});
		}
	},

	updateTitle : function(node) {
		var text = node.get('text'), title = node.isLeaf() ? (node.parentNode.get('text') + ' - ' + text) : text;

		this.getContentPanel().setTitle(title);
		document.title = document.title.split(' - ')[0] + ' - ' + text;
	},
	showPanelContent : function(id) {
		var me = this, contentPanel = me.getContentPanel(), themeName = Ext.themeName, description, cmp, className, ViewClass, clsProto, thumbnailsStore;
		contentPanel.removeAll(true);
		contentPanel.body.addCls('kitchensink-example');
		className = Ext.ClassManager.getNameByAlias('widget.' + id);
		ViewClass = Ext.ClassManager.get(className);
		clsProto = ViewClass.prototype;
		if (clsProto.themes) {
			clsProto.themeInfo = clsProto.themes[themeName];

			if (themeName === 'gray') {
				clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes.classic);
			} else if (themeName !== 'neptune' && themeName !== 'classic') {
				if (themeName === 'crisp-touch') {
					clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes['neptune-touch']);
				}
				clsProto.themeInfo = Ext.applyIf(clsProto.themeInfo || {}, clsProto.themes.neptune);
			}
			// <debug warn>
			// Sometimes we forget to include allowances for other themes, so issue a warning as a reminder.
			if (!clsProto.themeInfo) {
				Ext.log.warn('Example \'' + className + '\' lacks a theme specification for the selected theme: \'' + themeName + '\'. Is this intentional?');
			}
			// </debug>
		}

		cmp = new ViewClass();
		contentPanel.add(cmp);
		this.setupPreview(clsProto);
		if (cmp.floating) {
			cmp.show();
		}
	},
	setupPreview : function(clsProto) {
		var me = this, preview = me.getCodePreview(), otherContent = clsProto.otherContent, prefix = Ext.repoDevMode ? '' : '../../../kitchensink/', resources = [], codePreviewProcessed = clsProto.codePreviewProcessed;

		if (!codePreviewProcessed) {
			resources.push({
				type : 'View',
				path : clsProto.$className.replace(/\./g, '/').replace('KitchenSink', 'app') + '.js'
			});

			if (otherContent) {
				resources = resources.concat(otherContent);
			}

			// Clone everything, since we're about to hook up loaders
			codePreviewProcessed = clsProto.codePreviewProcessed = [];
			Ext.each(resources, function(resource) {
				resource.xtype = 'codeContent';
				resource.rtl = false;
				resource.title = resource.type;
				//resource.tabConfig = {
				//    tooltip: resource.path
				//};
				var clone = Ext.apply({}, resource);
				codePreviewProcessed.push(clone);
				resource.loader = {
					url : prefix + resource.path,
					autoLoad : true,
					rendererScope : me,
					renderer : me.renderCodeMarkup,
					resource : clone,
					themeInfo : clsProto.themeInfo
				};
			});
		} else {
			resources = codePreviewProcessed;
		}

		// preview.removeAll();

		// preview.add(resources);
		// preview.setActiveTab(0);

		// Hide the Tab Panel if there's only one resource
		// preview.tabBar.setVisible(resources.length > 1);
		//
		// preview.activeView = clsProto;
	},

	exampleRe : /^\s*\/\/\s*(\<\/?example\>)\s*$/,
	themeInfoRe : /this\.themeInfo\.(\w+)/g,

	renderCodeMarkup : function(loader, response) {
		var code = this.processText(response.responseText, loader.themeInfo);
		// Passed in from the block above, we keep the proto cloned copy.
		loader.resource.html = code;
		loader.getTarget().setHtml(code);
		prettyPrint();
		return true;
	},

	processText : function(text, themeInfo) {
		var lines = text.split('\n'), removing = false, keepLines = [], len = lines.length, exampleRe = this.exampleRe, themeInfoRe = this.themeInfoRe, encodeTheme = function(text, match) {
			return Ext.encode(themeInfo[match]);
		}, i, line, code;

		for ( i = 0; i < len; ++i) {
			line = lines[i];
			if (removing) {
				if (exampleRe.test(line)) {
					removing = false;
				}
			} else if (exampleRe.test(line)) {
				removing = true;
			} else {
				// Replace "this.themeInfo.foo" with the value of "foo" properly encoded
				// for JavaScript (otherwise strings would not be quoted).
				line = line.replace(themeInfoRe, encodeTheme);
				keepLines.push(line);
			}
		}

		code = Ext.htmlEncode(keepLines.join('\n'));
		return '<pre class="prettyprint">' + code + '</pre>';
	},

	onSetRegion : function(tool) {
		var panel = tool.toolOwner;

		var regionMenu = panel.regionMenu || (panel.regionMenu = Ext.widget({
			xtype : 'menu',
			items : [{
				text : 'North',
				checked : panel.region === 'north',
				group : 'mainregion',
				handler : function() {
					panel.setBorderRegion('north');
				}
			}, {
				text : 'South',
				checked : panel.region === 'south',
				group : 'mainregion',
				handler : function() {
					panel.setBorderRegion('south');
				}
			}, {
				text : 'East',
				checked : panel.region === 'east',
				group : 'mainregion',
				handler : function() {
					panel.setBorderRegion('east');
				}
			}, {
				text : 'West',
				checked : panel.region === 'west',
				group : 'mainregion',
				handler : function() {
					panel.setBorderRegion('west');
				}
			}]
		}));

		regionMenu.showBy(tool.el);
	},

	onTreeNavSelectionChange : function(selModel, records) {
		var record = records[0];

		if (record) {
			console.log(record.getId());
			this.redirectTo(record.getId());
		}
	},

	onBreadcrumbNavSelectionChange : function(breadcrumb, node) {
		if (node) {
			this.redirectTo(node.getId());
		}
	},
	onThumbnailClick : function(view, node) {
		this.redirectTo(node.getId());
	},

	onMaximizeClick : function() {
		var preview = this.getCodePreview();

		var w = new Ext.window.Window({
			rtl : false,
			maximized : true,
			title : 'Code Preview',
			closable : false,
			layout : 'fit',
			items : {
				xtype : 'codePreview',
				tools : [],
				showTitle : false,
				items : preview.activeView.codePreviewProcessed
			},
			tools : [{
				type : 'close',
				handler : function() {
					w.hide(preview, function() {
						w.destroy();
					});
				}
			}]
		});
		w.show(preview);
	}
});

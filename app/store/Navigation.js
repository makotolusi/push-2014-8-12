Ext.define('Push.store.Navigation', {
	extend : 'Ext.data.TreeStore',
	alias : 'store.navigation',
	model : 'Push.model.MenuTree',
	requires : ['Push.util.Global'],
	constructor : function(config) {
		var me = this, queryParams = Ext.Object.fromQueryString(location.search), charts = ('charts' in queryParams) && !/0|false|no/i.test(queryParams.charts);
		//get value
		me.callParent([Ext.apply({
			proxy : {
				type : 'ajax',
				url : Push.util.Global.ROOT_URL + '/web/manageItem/list',
				actionMethods : {
					create : "POST",
					read : "POST",
					update : "POST",
					destroy : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'children'
				}
			},
			root : {
				text : 'All',
				id : 'all',
				expanded : true
			}
		}, config)]);
	},

	getNavItems : function() {
		return [{
			text : '推送',
			id : 'panels',
			expanded : true,
			description : 'Panels are the basic container that makes up the structure ' + 'of most applications. Panels have a header and body, and can be arranged ' + 'in various ways using layouts.',
			children : [{
				id : 'app-list-grid',
				text : '推送管理',
				leaf : true
			}, {
				id : 'push-list',
				text : '推送列表',
				leaf : true
			}, {
				id : 'menu-manager',
				text : '菜单项管理',
				leaf : true
			}, {
				id : 'role-manager',
				text : '角色管理',
				leaf : true
			}, {
				id : 'collection-panels',
				text : '数据收集',
				leaf : true
			}]
		}, {
			text : 'Grids',
			id : 'grids',
			expanded : true,
			children : [{
				id : 'array-grid',
				text : 'Array Grid',
				leaf : true
			}, {
				id : 'grouped-grid',
				text : 'Grouped Grid',
				leaf : true
			}, {
				id : 'locking-grid',
				text : 'Locking Grid',
				leaf : true
			}, {
				id : 'grouped-header-grid',
				text : 'Grouped Header Grid',
				leaf : true
			}, {
				id : 'multi-sort-grid',
				text : 'Multiple Sort Grid',
				leaf : true
			}, {
				id : 'progress-bar-pager',
				text : 'Progress Bar Pager',
				leaf : true
			}, {
				id : 'sliding-pager',
				text : 'Sliding Pager',
				leaf : true
			}, {
				id : 'xml-grid',
				text : 'XML Grid',
				leaf : true
			}, {
				id : 'paging-grid',
				text : 'Paging',
				leaf : true
			}, {
				id : 'grid-plugins',
				text : 'Grid Plugins',
				leaf : true
			}, {
				id : 'grid-filtering',
				text : 'Grid Filtering',
				leaf : true
			}, {
				id : 'reconfigure-grid',
				text : 'Reconfigure Grid',
				leaf : true
			}, {
				id : 'property-grid',
				text : 'Property Grid',
				leaf : true
			}, {
				id : 'cell-editing',
				text : 'Cell Editing',
				leaf : true
			}, {
				id : 'row-expander-grid',
				text : 'Row Expander',
				leaf : true
			}, {
				id : 'big-data-grid',
				text : 'Big Data',
				leaf : true
			}, {
				id : 'widget-grid',
				text : 'Widget grid',
				leaf : true
			}, {
				id : 'customer-grid',
				text : 'Customer/Order grid',
				leaf : true
			}]
		}, {
			text : 'Data Binding',
			id : 'data-binding',
			expanded : true,
			children : [{
				id : 'binding-hello-world',
				text : 'Hello World',
				leaf : true
			}, {
				id : 'binding-dynamic',
				text : 'Dynamic',
				leaf : true
			}, {
				id : 'binding-two-way',
				text : 'Two Way',
				leaf : true
			}, {
				id : 'binding-formulas',
				text : 'Formulas',
				leaf : true
			}, {
				id : 'binding-associations',
				text : 'Associations',
				leaf : true
			}, {
				id : 'binding-component-state',
				text : 'Component State',
				leaf : true
			}, {
				id : 'binding-chained-stores',
				text : 'Chaining Stores',
				leaf : true
			}, {
				id : 'binding-combo-chaining',
				text : 'Chained ComboBoxes',
				leaf : true
			},
			//                    { id: 'binding-gridform', text: 'Grid + Form', leaf: true },
			{
				id : 'binding-model-validation',
				text : 'Model Validation',
				leaf : true
			}, {
				id : 'binding-field-validation',
				text : 'Field Validation',
				leaf : true
			}, {
				id : 'binding-two-way-formulas',
				text : 'Two-Way Formulas',
				leaf : true
			}, {
				id : 'binding-slider-form',
				text : 'Slider and Form Fields',
				leaf : true
			}, {
				id : 'binding-child-session',
				text : 'Isolated Child Sessions',
				leaf : true
			}]
		}, {
			text : 'Trees',
			id : 'trees',
			expanded : true,
			children : [{
				id : 'basic-trees',
				text : 'Basic Trees',
				leaf : true
			}, {
				id : 'tree-reorder',
				text : 'Tree Reorder',
				leaf : true
			}, {
				id : 'tree-grid',
				text : 'Tree Grid',
				leaf : true
			}, {
				id : 'tree-two',
				text : 'Two Trees',
				leaf : true
			}, {
				id : 'check-tree',
				text : 'Check Tree',
				leaf : true
			}, {
				id : 'tree-xml',
				text : 'XML Tree',
				leaf : true
			}, {
				id : 'filtered-tree',
				text : 'Filtered Tree',
				leaf : true
			}, {
				id : 'heterogeneous-tree',
				text : 'Heterogeneous Tree',
				leaf : true
			}]
		}, {
			text : 'Tabs',
			id : 'tabs',
			expanded : true,
			children : [
			// { id: 'basic-tabs', text: 'Basic Tabs', leaf: true },
			// { id: 'plain-tabs', text: 'Plain Tabs', leaf: true },
			// { id: 'framed-tabs', text: 'Framed Tabs', leaf: true },
			// { id: 'icon-tabs', text: 'Icon Tabs', leaf: true },
			// { id: 'ajax-tabs', text: 'Ajax Tabs', leaf: true },
			// { id: 'advanced-tabs', text: 'Advanced Tabs', leaf: true },
			// { id: 'navigation-tabs', text: 'Navigation Tabs', leaf: true },
			// { id: 'side-navigation-tabs', text: 'Side Navigation Tabs', leaf: true },
			// { id: 'header-tabs', text: 'Header Tabs', leaf: true },
			// { id: 'reorderable-tabs', text: 'Reorderable Tabs', leaf: true }
			]
		}, {
			text : 'Windows',
			id : 'windows',
			expanded : true,
			children : [{
				id : 'basic-window',
				text : 'Basic Window',
				leaf : true
			}, {
				id : 'message-box',
				text : 'Message Box',
				leaf : true
			}]
		}, {
			text : 'Buttons',
			id : 'buttons',
			expanded : true,
			children : [{
				id : 'basic-buttons',
				text : 'Basic Buttons',
				leaf : true
			}, {
				id : 'toggle-buttons',
				text : 'Toggle Buttons',
				leaf : true
			}, {
				id : 'menu-buttons',
				text : 'Menu Buttons',
				leaf : true
			}, {
				id : 'menu-bottom-buttons',
				text : 'Menu Bottom Buttons',
				leaf : true
			}, {
				id : 'split-buttons',
				text : 'Split Buttons',
				leaf : true
			}, {
				id : 'split-bottom-buttons',
				text : 'Split Bottom Buttons',
				leaf : true
			}, {
				id : 'left-text-buttons',
				text : 'Left Text Buttons',
				leaf : true
			}, {
				id : 'right-text-buttons',
				text : 'Right Text Buttons',
				leaf : true
			}, {
				id : 'link-buttons',
				text : 'Link Buttons',
				leaf : true
			}, {
				id : 'segmented-buttons',
				text : 'Segmented Buttons',
				leaf : true
			}, {
				id : 'vertical-segmented-buttons',
				text : 'Vertical Segmented Buttons',
				leaf : true
			}]
		}, {
			text : 'DataView',
			id : 'data-view',
			expanded : true,
			children : [{
				id : 'dataview-multisort',
				text : 'Multisort DataView',
				leaf : true
			}]
		}, {
			text : 'Form Fields',
			id : 'form-fields',
			expanded : true,
			children : [{
				id : 'form-number',
				text : 'Number Field',
				leaf : true
			}, {
				id : 'form-date',
				text : 'Date/Month Picker',
				leaf : true
			}, {
				id : 'form-combos',
				text : 'Combo Boxes',
				leaf : true
			}, {
				id : 'form-fileuploads',
				text : 'File Uploads',
				leaf : true
			}, {
				id : 'form-fieldreplicator',
				text : 'Field Replicator',
				leaf : true
			}, {
				id : 'form-grid',
				text : 'Form with Grid',
				leaf : true
			}, {
				id : 'form-tag',
				text : 'Tag Field',
				leaf : true
			}, {
				id : 'multi-selector',
				text : 'Multi-Selector Grid',
				leaf : true
			}, {
				id : 'form-fieldtypes',
				text : 'Field Types',
				leaf : true
			}, {
				id : 'form-fieldcontainer',
				text : 'Field Container',
				leaf : true
			}, {
				id : 'form-checkboxgroup',
				text : 'Checkbox Groups',
				leaf : true
			}, {
				id : 'form-radiogroup',
				text : 'Radio Groups',
				leaf : true
			}, {
				id : 'slider-field',
				text : 'Slider Field',
				leaf : true
			}]
		}, {
			text : 'Forms',
			id : 'forms',
			expanded : true,
			children : [{
				id : 'form-login',
				text : 'Login Form',
				leaf : true
			}, {
				id : 'form-contact',
				text : 'Contact Form',
				leaf : true
			}, {
				id : 'form-register',
				text : 'Register Form',
				leaf : true
			}, {
				id : 'form-checkout',
				text : 'Checkout Form',
				leaf : true
			}, {
				id : 'form-vboxlayout',
				text : 'VBox Layout',
				leaf : true
			}, {
				id : 'form-hboxlayout',
				text : 'HBox Layout',
				leaf : true
			}, {
				id : 'form-multicolumn',
				text : 'Multi Column Form',
				leaf : true
			}, {
				id : 'form-xml',
				text : 'XML Form',
				leaf : true
			}, {
				id : 'form-advtypes',
				text : 'Custom VTypes',
				leaf : true
			}, {
				id : 'form-customfields',
				text : 'Custom fields',
				leaf : true
			}, {
				id : 'form-forumsearch',
				text : 'Forum Search',
				leaf : true
			}, {
				id : 'form-customerrors',
				text : 'Custom Error Handling',
				leaf : true
			}]
		}, {
			text : 'Toolbars',
			id : 'toolbars',
			expanded : true,
			children : [{
				id : 'basic-toolbar',
				text : 'Basic Toolbar',
				leaf : true
			}, {
				id : 'docked-toolbars',
				text : 'Docked Toolbar',
				leaf : true
			}, {
				id : 'breadcrumb-toolbar',
				text : 'Breadcrumb Toolbar',
				leaf : true
			}]
		}, {
			text : 'Layouts',
			id : 'layouts',
			expanded : true,
			children : [{
				id : 'layout-absolute',
				text : 'Absolute Layout',
				leaf : true
			}, {
				id : 'layout-accordion',
				text : 'Accordion Layout',
				leaf : true
			}, {
				id : 'layout-border',
				text : 'Border Layout',
				leaf : true
			}, {
				id : 'layout-card',
				text : 'Card Layout',
				leaf : true
			}, {
				id : 'layout-cardtabs',
				text : 'Card (Tabs)',
				leaf : true
			}, {
				id : 'layout-center',
				text : 'Center Layout',
				leaf : true
			}, {
				id : 'layout-column',
				text : 'Column Layout',
				leaf : true
			}, {
				id : 'layout-fit',
				text : 'Fit Layout',
				leaf : true
			}, {
				id : 'layout-horizontal-box',
				text : 'HBox Layout',
				leaf : true
			}, {
				id : 'layout-table',
				text : 'Table Layout',
				leaf : true
			}, {
				id : 'layout-vertical-box',
				text : 'VBox Layout',
				leaf : true
			}]
		}, {
			text : 'Drag & Drop',
			id : 'drag-drop',
			expanded : true,
			children : [{
				id : 'dd-field-to-grid',
				text : 'Field to Grid',
				leaf : true
			}, {
				id : 'dd-grid-to-form',
				text : 'Grid to Form',
				leaf : true
			}, {
				id : 'user-menu-role',
				text : 'Grid to Grid',
				leaf : true
			}]
		}, {
			text : 'Enterprise',
			id : 'enterprise',
			expanded : true,
			children : [{
				id : 'amf-grid',
				text : 'AMF Grid',
				leaf : true
			}, {
				id : 'soap-grid',
				text : 'Soap Grid',
				leaf : true
			}]
		}];
	}
});

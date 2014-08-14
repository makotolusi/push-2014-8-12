Ext.define('Push.store.ContentResources', {
	extend : 'Ext.data.Store',
	fields : ['index', 'desc', 'uri', 'name'],
	data : [{
		'index' : 1,
		'desc' : 'STRATEGY_VIDEO',
		'uri' : '/cont/strategy/video/',
		'name' : '攻略视频'
	}, {
		'index' : 2,
		'desc' : 'STRATEGY_NEWS',
		'uri' : '/cont/strategy/news/',
		'name' : '攻略新闻'
	}, {
		'index' : 3,
		'desc' : 'POP_GAME_VIDEO',
		'uri' : '/cont/popgame/video/',
		'name' : '新游视频'
	}, {
		'index' : 4,
		'desc' : 'POP_GAME_NEWS',
		'uri' : '/cont/popgame/news/',
		'name' : '新游新闻'
	}, {
		'index' : 5,
		'desc' : 'COLUMN_NEWS',
		'uri' : '/ops/news/',
		'name' : '栏目新闻'
	}, {
		'index' : 6,
		'desc' : 'COLUMN_VIDEO',
		'uri' : '/ops/video/',
		'name' : '栏目视频'
	}]
});

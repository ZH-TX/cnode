/* 
 未写method 默认是get, 
 
 */


// get /topics 主题首页
function getHomeData(options, callback) {
	let apiUrl = "https://cnodejs.org/api/v1/topics?";
	if (typeof options === 'function') {
		callback = options;
		options = {};
	};

	let params = {
		page: options.page || 1,
		limit: options.limit || 10,
		tab: options.tab || 'all',
		mdrender: true // true, 默认值渲染Markdown的格式；
	}
	apiUrl += set(params);
	request(apiUrl, callback);

}

// get /topic/:id 主题详情
function getDetailData(topicId, callback) {
	let apiUrl = 'https://cnodejs.org/api/v1/topic/' + topicId + '?';
	let params = {
		accesstoken: '',
		mdrender: false,
	}
	apiUrl += set(params);
	request(apiUrl, callback);
}


// 获取数据
function request(url, callback) {
	uni.request({
		url: url,
		date: {},
		header: {
			"Content-Type": "application/json"
		},
		success(res) {
			callback(res.data);
		}
	})
}

// 进行url编码， 
function set(object) {
	return Object.keys(object).map((k) => {
		return k + '=' + object[k];
	}).join('&');
}



export {
	getHomeData,
	getDetailData
}

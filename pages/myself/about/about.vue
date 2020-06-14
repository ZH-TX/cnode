<template>
    <view>
		<view class="header">
			 这是关于页面
		</view>
		<view class="content">
			这是一个uni-app开发的一个页面,
			目前实现的功能仅仅是首页数据的展示,还是许多的东西有待完善
			
			0.调整好样式,兼容各大平台,增加交互
			1.添加登录功能,
			2.完善tabBar的其他页面主体页面
			3.添加评论与点赞
		
			
		</view>
       
    </view>
</template>

<script>
    export default {
        
    }
</script>

<style >
.header{
	font-weight: bold;
	text-align: center;
	padding-top: 10px;
}

.content{
	display: flex;
	padding: 10px;
	line-height: 30px;
	
}
</style>
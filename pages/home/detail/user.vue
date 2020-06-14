<template>
	<view>
		<view class="">
			<view class="header-bg">
				<image class="avatar" :src="self.avatar_url" mode=""></image>
				<view class="username">用户名:{{ self.loginname }}</view>
				<view class="user-info">
					<view class="">注册时间:{{ self.create_at | fliter }}</view>
					<view class="">用户积分:{{ self.score }}</view>
				</view>
			</view>

			<view class="detail-info">
				<view :class="{active:currentIndex==0}" @tap="handleTap(0)">主题:{{ self.recent_topics.length }}</view>
				<view :class="{active:currentIndex==1}" @tap="handleTap(1)">回复:{{ self.recent_replies.length }}</view>
				
			</view>
			
			<view class="detail-item" v-for="item in recent" :key="item.id" @tap="navDetail(item.id)">
				<view class="item-content">
					{{item.title}}
				</view>
				<view class="" style="color: #ccc">
					{{item.last_reply_at| fliter}}
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
import {getDateDiff} from '../../../static/assets/js/util.js'

export default {
	components: {},
	
	async onLoad(e) {
		console.log(e.username);
		this.name=e.username
		await this.getDetail()
		this.recent=this.self.recent_topics
		console.log(this.recent);
	},
	filters: {
		fliter(e) {
			// console.log(e);
			return getDateDiff(new Date(e));
		}
	},
	data() {
		return {
			isLogin: false,
			currentIndex:0,
			name:'',
			self: '',
			recent:[]
			
		};
	},
	methods: {
		
		async getDetail() {
			await this.$http
				.get(`/user/${this.name}`)
				.then(res => {
					console.log(res);
					let data = res.data;
					this.self = data.data;
				})
				.catch(err => {
					console.log(err);
				});

		},
		handleTap(e){
			this.currentIndex=e
			this.recent=!e?this.self.recent_topics:this.self.recent_replies
		},
		navDetail(e){
			uni.navigateTo({
				url: `./detail?id=${e}`,
				success: res => {},
				
			});
		}
	}
};
</script>

<style>
.page-body {
	/* padding: 50px 15px; */
	min-height: 400px;
	background-color: #fff;
}

.page-body .txt {
	/* padding: 12px ; */
	/* border: none; */
	border-bottom: 1px solid #4fc08d;
	background-color: transparent;
	width: 100%;
	font-size: 14px;
	color: #313131;
}

.btn {
	display: inline-block;
	width: 99%;
	height: 42px;
	line-height: 42px;
	border-radius: 3px;
	margin-top: 50px;
	color: #fff;
	font-size: 16px;
	background-color: #87c701;
	border: none;
	border-bottom: 2px solid #87c701;
	text-align: center;
	vertical-align: middle;
}
.header-bg {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	background: #87c701;
	color: #fff;
}
.username {
	padding: 20rpx;
}
.user-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.user-info view {
	padding: 20rpx;
}

.detail-info {
	display: flex;
	justify-content: center;
	align-items: center;

	background: #eee;
}
.detail-info view {
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	
}
.detail-item{
	padding: 10px;
	
	border-bottom: 1px solid #eee;
}
	
.item-content{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.active{
	border-bottom: 1px solid #87c701;
	color: #87C701;
}
.avatar {
	margin: 20rpx;
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0);
}
</style>

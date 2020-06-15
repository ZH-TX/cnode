<template>
	<view>
		<!-- <v-header title="消息"></v-header> -->

		<view class="msg-box" v-if="list.length">
			<view class="list">
				<view v-for="(item, index) in list" :key="index">
					<navigate class="user" :url="'pages/home/detail/detail?id=' + item.author.loginname">
						<view class="user-headimg" :style="{ backgroundImage: 'url(' + item.author.avatar_url + ')' }"></view>
					</navigate>
					<view>
						<view class="name">
							{{ item.author.loginname }}
							<time>{{ item.create_at | formatDate }}</time>
						</view>
						<view v-if="item.type == 'at'">
							在话题
							<navigate :url="'pages/home/detail/detail?id=' + item.topic.id">{{ item.topic.title }}</navigate>
							中 @了你
						</view>
						<view v-if="item.type == 'reply'">
							回复你了的话题
							<navigate :url="'pages/home/detail/detail?id=' + item.topic.id">{{ item.topic.title }}</navigate>
						</view>
						<view class="markdown-body" v-html="item.reply.content"></view>
					</view>
					<view class="weidu"><text class="iconfont icon-weidu"></text></view>
				</view>
			</view>
		</view>
		<view class="nomessage" v-else>暂时消息哦,快去发表吧</view>
	</view>
</template>
<script>
import footers from 'components/common/footer';
import {getDateDiff} from '../../static/assets/js/util.js'

export default {
	components: {
		footers
	},
	onShow() {
		this.getCount()
	},
	created() {
		this.token=uni.getStorageSync('user').accesstoken
		this.getMessage();
		
	},
	data() {
		return {//accesstoken没有存
			token: uni.getStorageSync('user').accesstoken,
			list: {}
		};
	},
	filters:{
		formatDate(e){
			return getDateDiff(new Date(e))
		}
			
	},
	methods: {
		
		getCount(){
			//显示角标信息
			this.$http.get('/message/count',{params:{
					accesstoken:this.token
				}}).then(res=>{
					console.log(res);
					uni.setTabBarBadge({
						index:2,
						text:res.data.data
					})
				}).catch(err=>{
					console.log(err);
				})
		},
		getMessage() {
			if (this.token) {
				
				this.$http.get('/messages',{params:{
					accesstoken:this.token
				}}).then(res=>{
					console.log(res);
					let data = res.data;
					this.list = data.data;
				}).catch(err=>{
					console.log(err);
				})
			}	
		}
	}
};
</script>
<style lang="scss">
.msg-box {
	.list {
		padding: 0;
		margin: 0;

		li {
			position: relative;
			padding: 10px;
			list-style: none;
			border-bottom: 1px solid #eee;
			background: #fff;

			.name {
				font-weight: bold;
				line-height: 28px;

				time {
					padding-left: 5px;
					font-size: 12px;
					font-weight: normal;
					color: #999;
				}
			}

			.content {
				padding: 5px 0;
			}

			.weidu {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 1;
				width: auto;
				text-align: right;

				.iconfont {
					font-size: 60px;
					color: #222;
				}
			}
		}
	}
}

.nomessage {
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.user-headimg {
	width: 38px;
	height: 38px;
	margin-right: 10px;
	border-radius: 50%;
	border: 1px solid #ddd;
	background-size: cover;
	background-color: #eee;
}

.markdown-body {
	padding: 5px;
	margin-top: 10px;
	border-radius: 5px;
	background: #eee;
}
</style>

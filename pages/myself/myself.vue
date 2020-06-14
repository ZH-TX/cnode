<template>
	<view>

		<view v-if="self.success" @tap="getDetail"  >
			<view class="user"></view>
			<view class="headimg" :style="{backgroundImage: 'url(' + self.avatar_url + ')'}"></view>
			<view class="user-name">{{ self.loginname }}</view>
		</view>
		<navigator v-else url="login/login">
			<view class="user"></view>
			<view class="headimg"></view>
			<view class="user-name">你还未登录，请先登录！</view>
		</navigator>
		<view class="nav">
			<view>
				<navigator url="../create/create" class="item-list" open-type="switchTab">
					<view class="icon" flex="cross:center">
						<text class="iconfont icon-edit" style="color: #14b11d"></text>
					</view>
					<view class="text">发表主题</view>
					<view class="arrow">
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</navigator>
			</view>
			<view>
				<navigator url="../message/message" class="item-list" open-type="switchTab">
					<view class="icon" flex="cross:center">
						<text class="iconfont icon-msg" style="color: #bd1616;"></text>
					</view>
					<view class="text">我的消息</view>
					<view class="arrow">
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</navigator>
			</view>
		
			<view>
				<navigator url="about/about" class="item-list">
					<view class="icon" >
						<text class="iconfont icon-about"></text>
					</view>
					<view class="text">关于</view>
					<view class="arrow">
						<text class="iconfont icon-arrow-right"></text>
					</view>
				</navigator>
			</view>
		</view>
		<view style="height: 50px;"></view>

	</view>
</template>
<script>
	import footers from 'components/common/footer'

	export default {
		components: {
			footers
		},
		data() {
			return {
				self: uni.getStorageSync('user')

			}
		},
		methods:{
			getDetail(){
				uni.navigateTo({
					url: 'login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				// uni.request({
				// 	url: `https://cnodejs.org/api/v1/user/${this.self.loginname}`,
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		console.log(res.data);
				// 	},
					
				// });
			}
		}
	}
</script>
<style lang="scss">
	.con {
		background: #eee;
	}

	.user {
		position: relative;
		height: 350rpx;
		// 图片的格式需要兼容多个平台
		background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573013152138&di=fbdf5bd3375f15c9010aa220c60cedaa&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F846742ce221ea5eafb1c0bd2b00e6d238a0f36d0ee7a-M5GkEq_fw658);
		background-position: center center;
		background-size: cover;
	}
	.headimg {
		position: absolute;
		top: 180rpx;
		bottom: 0;
		left: 50%;
		z-index: 1;
		width: 120px;
		height: 120px;
		margin: 0 0 -40px -60px;
		border-radius: 50%;
		border: 1px solid #ddd;
		background-color: #eee;
		background-size: cover;
		background-position: center center;
		filter: none;
	}


	.user-name {
		padding-top:  100rpx;
		padding-bottom: 30rpx;
		line-height: 32px;
		border-bottom: 1px dashed #008000;
		text-align: center;
	}

	.item-list {
		display: flex;
		justify-content: space-between;
		padding:10px;
		border-bottom: 1px solid #cae4ca;
	}

</style>
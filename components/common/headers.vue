<template>
	<view>
		<!-- #ifndef H5 -->
		<view class="init-height"></view>
		<!-- #endif -->

		<view class="menu">
			<view class="tab-nav" v-if="isShow">
				<view class="tab-content">
					<!-- <view class="back" @tap="goback"> 返回>>>></view> -->
					<navigator class="login " url="../../pages/myself/login/login">登录</navigator>
					<block v-for="(item, index) in list" :key="index">
						<view class="tab-nav-item" 
							:class="currentIndex === index ? 'active' : ''" 
							:data-tab="item.tab" 
							:data-index="index" 
							:data-name="item.name" 
							@tap="tabTo">
							{{ item.name }}
						</view>
					</block>
				</view>
			</view>
			<view @tap="changeBar" class="menu-icon"><!-- 菜单 --></view>
			<view style="color: #A5CE52;">{{ tabName }}</view>
			<view>
				<!-- #ifndef MP -->
				<navigator  url="../../pages/myself/login/login" class="icon iconfont">&#xe60d;</navigator>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isShow: false,
			tabName: '全部',
			currentIndex: 0,
			list: [{ name: '全部', tab: 'all' }, 
				{ name: '精华', tab: 'good' }, 
				{ name: '分享', tab: 'share' }, 
				{ name: '问答', tab: 'ask' }, 
				{ name: '招聘', tab: 'job' }]
		};
	},
	methods: {
		tabTo(e) {
			// let that = this;
			// console.log(this);
			// console.log(e.target.dataset);
			// console.log(e.currentTarget.dataset.tab);
			this.currentIndex = +e.currentTarget.dataset.index; //使用data传递的数据为字符串,使用+变成数字
			console.log(this.currentIndex);
			let tab = e.currentTarget.dataset.tab;
			let name = e.currentTarget.dataset.name;
			(this.isShow = !this.isShow), (this.tabName = name);
			uni.showLoading({
				title: '加载中...'
			});
			
			this.$emit('my-event', { tab });
			setTimeout(() => {
				uni.hideLoading();
			}, 1000);
		},
		// goback() {
		// 	this.$router.go(-1);
		// },

		// 取反；
		changeBar(e) {
			// console.log(this);
			this.isShow = !this.isShow;
		}
	}
};
</script>

<style>
.init-height {
	height: 25px;
	background: ;
	position: fixed;
}
.menu {
	display: flex;
	border-bottom: 2px solid rgb(214, 210, 210);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
	align-items: center;
	justify-content: space-between;
	background: #fff;
	z-index: 1;
	/* 定位 */
	height: 44px;
	position: fixed;
	top: 0;
	/* #ifdef APP-PLUS||MP */
	top: 25px;
	/* #endif */

	left: 0;
	right: 0;
	padding: 0 40rpx;
}

.tab-content {
	width: 70%;
	height: 100%;
	color: #000000;
	background: #7a7e83;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	/* justify-content: center; */
}
.active {
	color: #80bd01;
}
.back {
	position: absolute;
	top: 0;
	left: 0;
}

.login {
	height: 100px;
	padding: 50px;
	border-bottom: 1px solid rgb(255, 255, 255);
}
.tab-nav {
	position: fixed;
	top: 0;
	/* #ifdef APP-PLUS||MP */
	top: 25px;
	/* #endif */
	left: 0;
	bottom: 0;
	background: rgb(117, 103, 103);
	margin-top: 44px;
	width: 100%;
	border-top: 1px solid #d4d4d4;
	background: rgba(46, 44, 44, 0.8);
	color: #dbdada;
	transition: all 0.3s ease;
}
.tab-nav-item {
	font-size: 14px;
	font-weight: 200;
	padding: 9% 0;
	text-align: left;
	text-indent: 1px;
	line-height: 15px;
	font-weight: 700;
}

.menu-icon {
	background-color: currentcolor;
	height: 2px;
	width: 20px;
	
	/* margin: 30px auto; */
	/* position: relative; */
}

.menu-icon::before {
	content: '';
	background-color: currentcolor;
	height: 2px;
	width: 20px;
	position: absolute;
	top: 15px;
}

.menu-icon::after {
	content: '';
	background-color: currentcolor;
	height: 2px;
	width: 20px;
	position: absolute;
	top: 25px;
}
</style>

<template>
	<view>
		<!-- 头部 -->
		<headers @my-event="changebar" />
		<view class="container">
			<loading v-if="isLoadShow" />
			<!-- 主体部分 -->
			<view class="content">
				<view class="scroll-content">
					<view>
						<!-- 进入刷新 -->
						<view class="refresh-font" v-show="isRefresh">加载中...</view>
						<!-- 主体内容 -->
						<view v-for="topic in homeData" :key="topic.index">
							<navigator tag="view" :url="'detail/detail?id=' + topic.id" class="topic-item">
								<!-- 判断类型 -->
								<view class="topic-h" data-id="topic.id">
									<text class="topic-type top" v-if="topic.top === true">置顶</text>
									<text class="topic-type jh" v-if="topic.good === true">精华</text>
									<text class="topic-type ask" v-if="topic.tab === 'ask'">问答</text>
									<text class="topic-type share" v-if="topic.tab === 'share'">分享</text>
									<text class="topic-type job" v-if="topic.tab === 'job'">招聘</text>
									{{ topic.title }}
									<!-- <text class="topic-title" :tap="viewDetail" data-id="{{topic.id}}">
                                {{topic.title}}
                                </text> -->
								</view>
								<view class="topic-more" :data-id="topic.id">
									<image class="author-face" :src="topic.author.avatar_url" />
									<view class="text">
										<text>{{ topic.author.loginname }}</text>
										<view class="topic-re-vi fr">
											<text class="re">{{ topic.reply_count }}</text>
											/{{ topic.visit_count }}
										</view>
									</view>
									<view class="text">
										<text class="time">时间：{{ topic.create_at }} ,</text>
										<text class="fr">{{ topic.last_reply_at }}</text>
									</view>
								</view>
							</navigator>

							<!-- <router-view></router-view> -->
						</view>
						<!-- 加载 -->
						<view class="refresh-font">
							<text v-show="isLoadMore">正在加载更多数据...</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 回到顶部 -->
		</view>
		<!-- #ifdef APP-PLUS||MP -->
		<backtop v-if="false" />
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<transition name="fade"><backtop v-show="showBackTop" /></transition>
		<!-- #endif -->

		<!-- <footers></footers> -->

		<!-- <button @click="test">点击我有惊喜</button> -->
	</view>
</template>

<script>
import headers from 'components/common/headers.vue';
import loading from 'components/common/loading.vue';
import backtop from 'components/common/backtop.vue';
// import Bscroll from 'components/common/bscroll.vue';
import footers from 'components/common/footer.vue';
import { getHomeData, getDetailData } from 'network/home.js';

const util = require('static/assets/js/util.js');

export default {
	name: 'home',
	components: { headers, loading, backtop, footers },
	data() {
		return {
			page: 1,
			tab: 'all',
			top: 0,
			homeData: [],
			showBackTop: false,
			isLoadShow: true,
			isRefresh: false,
			isLoadMore: false
		};
	},
	// onPageScroll(e) {
	// 	console.log(e.scrollTop);
	// },
	created() {
		this.getData();
		setTimeout(() => {
			this.isLoadShow = false;
		}, 1500);
	},
	computed: {
		showData() {
			return this.homeData;
		}
	},
	onPullDownRefresh() {
		//这里触发更新页面
		setTimeout(() => {
			this.refresh();
			uni.stopPullDownRefresh();
		}, 1500);
	},

	onReachBottom() {
		//这里触发刷新下一页
		this.loadMore();
	},
	onPageScroll(e) {
		this.showBackTop = e.scrollTop > 500;
	},
	methods: {
		refresh() {
			this.isRefresh = true;
			this.getData();
		},
		goTop(e) {
			uni.pageScrollTo({
				scrollTop: 0
			});
		},

		getData(page) {
			getHomeData(
				{
					page: page,
					tab: this.tab
				},
				res => {
					// console.log(res);
					this.homeData = this.isLoadMore ? this.homeData.concat(res.data) : res.data;
					// console.log(this.homeData)

					// 处理数据,时间
					this.homeData.map(topic => {
						topic.create_at = util.formatTime(new Date(topic.create_at));
						const last_reply_at = +new Date(topic.last_reply_at);
						topic.last_reply_at = !last_reply_at ? topic.last_reply_at : util.getDateDiff(last_reply_at);

						// console.log(topic);
						// this.topicId=topic.id
						return topic;
					});
					// console.log(this.homeData)
					this.isRefresh = false;
					this.isLoadMore = false;
				}
			);
		},
		// contentScroll(e) {
		// 	// console.log(e);
		// 	this.showBackTop = e.detail.scrollTop > 500;
		// },
		// 只会执行一次???
		loadMore() {
			this.isLoadMore = true;
			this.page += 1;
			console.log(this.page);
			uni.showLoading({
				title: '正在加载中...',
				mask: false
			});
			this.getData(this.page);
			setTimeout(()=>{
				uni.hideLoading()
			},300)
			
		},

		changebar(e) {
			console.log(e);
			this.tab = e.tab;
			this.getData();
		}
	}
};
</script>

<style>
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 100px 0;
	// background: rgba(0, 0, 0.8);
	box-sizing: border-box;
}
.content {
	/* 利用定位来达到内容全部塞满/也可以使用calc()计算属性来达到相同的效果 */
	position: absolute;
	/* height: 960rpx; */
	top: 44px;
	/* #ifdef APP-PLUS||MP */
	top: 70px;
	/* #endif */
	bottom: 0px;
	left: 0;
	right: 0;
}
/* .scroll-content {
    position: absolute;
    top: 36px;
    bottom: 0;
    width: 100%;
 }
 */
.tab-nav-item {
	display: inline-block;
	width: 20%;
	color: #80bd01;
	text-align: center;
	line-height: 36px;
	font-size: 14px;
	position: relative;
}

.current::after {
	content: '';
	height: 5px;
	position: absolute;
	left: 20%;
	right: 20%;
	bottom: -3px;
	background: #80bd01;
}
.refresh-font {
	position: fixed;
	/* bottom: 10px;
	padding: 10px; */
	text-align: center;
	background: rgb(235, 231, 231);
}

.is-refresh {
	padding-top: 10px;
}
.topic-item:nth-child(1) {
	border-top: 1px solid rgb(201, 200, 200);
}

.topic-item {
	padding: 15px 10px;
	border-bottom: 1px solid #cccccc;
}

.topic-h {
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	height: 25px;
	padding-right: 10px;
	overflow: hidden;
	word-break: break-all;
	margin-bottom: 8px;
}

.topic-type {
	font-size: 15px;
	height: 10px;
	width: 20px;
	border-radius: 5px;
	color: white;
	padding: 2px 4px;
	margin-right: 4px;
}

.top {
	background: #e74c3c;
}

.jh {
	background: #e67e22;
}

.ask {
	background: gray;
}

.share {
	background: #00b4ff;
}

.job {
	background: #ff2ccf;
}

.topic-title {
	font-weight: bold;
	font-size: 28rpx;
	line-height: 40rpx;
}

.topic-more {
	padding-left: 50px;
	overflow: hidden;
}

.author-face {
	float: left;
	height: 40px;
	width: 40px;
	overflow: hidden;
	border-radius: 20px;
	margin-left: -50px;
}
.author-face::after {
	overflow: hidden;
}

.text {
	display: flex;
	justify-content: space-between;
	/* color: #ccc; */
	padding: 10px 5px;
	line-height: 20px;
}
.time {
	width: 60%;
	color: #ccc;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.re {
	color: green;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>

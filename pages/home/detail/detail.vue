<template>
	<view>
		<view class="container">
			<view class="title">
				<span>{{ article.title }}</span>
			</view>
			<view class="info">
				<image class="author-face" :src="article.author.avatar_url" />

				<view class="text">
					<span>作者：{{ article.author.loginname }}</span>
					<span>发布于：{{ article.create_at }}</span>
					<span>浏览次数：{{ article.visit_count }}</span>
					<span>最后一次编辑：{{ article.last_reply_at }}</span>
					<!-- <span class="article.tab">来自：{{article.tabspan}}</span> -->
				</view>
				<view class="mark" v-if="article.mark">{{ article.mark }}</view>
			</view>
			<view class="content">
				<!-- <u-parse :content="article.content"/> -->
				<rich-text class="markdown-body" :nodes="article.content"></rich-text>
			</view>
			<view class="reply" v-if="article.replies.length > 0">
				<view v-for="reply in article.replies" :key="reply.index">
					<view class="reply-item">
						<view class="reply-first">
							<image class="reply-author-face" :src="reply.author.avatar_url" />
							<view class="reply-info">
								<view class="reply-name">{{ reply.author.loginname }}</view>
								<view class="reply-time">{{ reply.create_at }}</view>
							</view>
						</view>
						<view class="reply-two ">
							<!-- <u-parse :content="reply.content" /> -->
							<rich-text class="reply-content markdown-body" :nodes="reply.content"></rich-text>
						</view>
					</view>
				</view>
			</view>
			<loading v-if="isLoadShow" />
			<!-- #ifdef APP-PLUS||MP -->
			<backtop v-if="isShow" />
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<transition name="fade"><backtop v-show="isShow" /></transition>
			<!-- #endif -->
			
		</view>
	</view>
</template>

<script>
	
	
import headers from 'components/common/headers';
import loading from 'components/common/loading';
import backtop from 'components/common/backtop';
import uParse from '@/components/u-parse/u-parse.vue'

import marked from 'marked'
import { getHomeData, getDetailData } from 'network/home.js';

const util = require('static/assets/js/util.js');

export default {
	name: 'detail',
	components: {
		// VHeader,
		loading,
		backtop,
		uParse
	},
	onLoad(e) {
		// console.log(e);
		this.topicId = e.id;
	},
	mounted() {
		// window.addEventListener('scroll', this.getScroll);
		this.getData();
		setTimeout(() => {
			this.isLoadShow = false;
		}, 1500);
	},
	destroyed() {
		// window.removeEventListener('scroll', this.getScroll);
	},
	onPageScroll(e) {
		if(e.scrollTop>=500){
			this.isShow=true
		}else {
			this.isShow=false
		}
		
		// console.log("滚动距离为：" + e.scrollTop);
	},
	data() {
		return {
			topicId: '',
			isShow: false,
			isLoadShow: true,
			scrollTop: 0,
			article: {
				author: {}, //不加这个初始时会报错
				replies: []
			}
		};
	},
	
	methods: {
		getData() {
			let topicId = this.topicId;
			getDetailData(topicId, res => {
				this.article = res.data;
				// console.log(this)
				this.article.content=marked(this.article.content)
				this.article.create_at = util.formatTime(new Date(this.article.create_at));
				const last_reply_at = new Date(this.article.last_reply_at);
				this.article.last_reply_at = !last_reply_at ? this.article.last_reply_at : util.getDateDiff(last_reply_at);

				this.article.replies.map(topic => {
					topic.content=marked(topic.content)
					topic.create_at = util.getDateDiff(new Date(topic.create_at));
					// const last_reply_at = +new Date(topic.last_reply_at);
					// topic.last_reply_at = !last_reply_at ? topic.last_reply_at : util.getDateDiff(last_reply_at);
				});

				return this.article;
			});
		}
	}
};
</script>

<style >
	
/* @import '../../static/assets/css/github-markdown.css'; */

.container {
	padding: 40px 10px;
}

.title {
	padding-top: 10px;
	font-size: 20px;
	font-weight: bold;
}

.info {
	display: flex;
	border-bottom: 1px solid #cccccc;
	padding: 10px;
}

.reply-first {
	display: flex;
	padding: 10px 5px;
}

/* .reply-first image{
  padding: 0 20px;
  border-radius: 20px;
} */
.reply-two {
	height: auto;
}

.reply-info {
	flex: 1;
}

.author-face {
	height: 70px;
	width: 70px;
	border-radius: 35px;
}

.text span {
	display: block;
	padding-left: 15px;
	padding-top: 6px;
	font-size: 14px;
}

.mark {
	padding: 2px 5px;
	position: absolute;
	border: 1px dotted darkred;
	color: darkred;
	font-weight: bold;
	/* font-size: 80rpx; */
	top: 25px;
	right: 15px;
	transform: rotate(45deg);
}

.content {
	/* padding: 20rpx 0; */
	/* overflow: auto; */
	/* word-break: break-all; */
	/* overflow: hidden; */
	border-bottom: 1px solid #cccccc;
}

.ask {
	color: gray;
}

.share {
	color: #00b4ff;
}

.job {
	color: #ff2ccf;
}

.reply {
	padding: 10px 0;
}

.reply-item {
	/* padding: 20rpx 0 20rpx 80rpx; */
	border-bottom: 1px dotted #cccccc;
	width: 100%;
	margin: 10px 0;
	padding: 0 10px;
	display: flex;
	flex-direction: column;
}

.reply-author-face {
	display: inline-block;
	width: 45px;
	height: 45px;
	margin-right: 10px;
	border-radius: 10px;
}

.reply-name {
	color: #00b4ff;
	/* display: inline-block;
  width: 68%; */
}

.reply-time {
	color: #acafb1;
}

.reply-content {
	/* border: 0; */
	font-size: 100%;
	/* vertical-align: baseline; */
	margin: 0;
	padding: 5px;
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

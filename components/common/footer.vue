<template>
    <view class="footer">
        <view class="flex">
			<block v-for="(item,index) in list">
				<view class="list" :class="{ active: item.id=== currentIndex }" :data-id="item.id" @tap="islike">
				    <navigator class="nav" :url="item.name" open-type="switchTab">
				        <text class="i iconfont" :class="[ item.icon ]"></text>
				        <text class="title">{{ item.title }}</text>
				        <view class="count" v-if="item.name == 'messages' ">{{ 1 }}</view>
				    </navigator>
				</view>
			</block>
            
        </view>
    </view>

</template>


<script>
    export default {
        data() {
            return {
				currentIndex:0,
                list: [{
						id:0,
                        title: '首页',
                        name: '../home/home',
                        icon: 'icon-index'
                    },
                    {
						id:1,
                        title: '发表',
                        name: '../create/create',
                        icon: 'icon-edit'
                    },
                    {
						id:2,
                        title: '消息',
                        name: '../message/message',
                        icon: 'icon-msg'
                    },
                    {
						id:3,
                        title: '我的',
                        name: '../myself/myself',
                        icon: 'icon-user'
                    }
                ]
            }
        },
		methods:{
			islike(e){
				console.log(e);
				this.currentIndex=e.currentTarget.dataset.id
				// #ifdef MP
				this.setData({
					currentIndex:e.currentTarget.dataset.id
				})
				// #endif
				// console.log(this.currentIndex,this.$data);
			}
		} 
    }
	
</script>
<style >
    /* @import "assets/font/iconfont.css"; */
    .footer {
        position: fixed;
        background: #fff;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 50;
        height: 49px;
        text-align: center;
        border-top: 1px solid #ddd;

    }

    .footer > view {
        /* padding: 5px 0; */
        margin: 0;
    }

    .flex {
        display: flex;

    }
    .list{
        flex-grow: 1;
    }
    .nav{
        position: relative;
        display: block;
        text-decoration: none;
        color: #222;
    }

    .i {
        display: block;
        line-height: 24px;
    }

    .title {
        line-height: 16px;
        font-size: 13px;
        font-style: normal;
    }

    .count {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 2;
        padding: 1px 4px;
        line-height: 12px;
        border-radius: 50%;
        text-align: center;
        font-size: 12px;
        opacity: 0.9;
        color: #fff;
        background: red;
    }


    .active text {
        color: #80bd01;
    }

 
</style>
<template>
    <view>

        <view class="page-body">
           <view class="" v-if="!isLogin">
				<input  class="txt" placeholder="Access Token" v-model="val" />
				<button class="btn" @tap="login">登录</button>
           </view>
		   <view class="" v-else>
			    <view class="header-bg">
					<image class="avatar" :src="self.avatar_url" mode=""></image>
					<view class="username">
						用户名:{{self.loginname}}
					</view>
					<view class="user-info">
						<view class="">
							注册时间:{{self.create_at|fliter}}
						</view>
						<view class="">
							用户积分:{{self.score}}
						</view>
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

				<button class="btn" type="primary" @tap="logout">退出登录</button>
				
		   </view>
			
        </view>


    </view>
</template>

<script>
	import {getDateDiff} from '../../../static/assets/js/util.js'
	
    export default {
        
        components: {
           
        },
		async onLoad() {
			await this.getDetail()
			this.recent=this.self.recent_topics
			console.log(this.recent);
			this.isLogin=uni.getStorageSync('user').success
			// this.getDetail()
		},
		filters:{
			fliter(e){
				console.log(e);
				return getDateDiff(new Date(e))	
			}
		},
        data() {
            return {
				isLogin:true,
				self: {},
				recent:[],
				currentIndex:0,
				val:'',//ac836285-e3d9-47a1-98a4-9a544736dfee
            }
        },
        methods: {
            login(){
				// uni.setStorageSync('token',this.val)
				this.$http.post('/accesstoken',{},{params:{
						accesstoken:this.val
					}
				}).then(res => {
					console.log(res);
					let data=res.data
					
					if(data.success){
						data.accesstoken=this.val
						uni.setStorageSync('user',data)
						this.isLogin=true //如果需要将下次登录还是存在,需要将状态保存
						// this.$forceUpdate()	
						this.$nextTick(()=>{
							this.getDetail()
						})

						uni.showToast({
							title: '登录成功'
						});
					}else{
						uni.showToast({
							title: data.error_msg,
							icon:'none'
						});
					}
				}).catch(err=>{
					console.log(err);
					uni.showToast({
						title: err.data.error_msg,
						icon:'none'
					});
				})
			},
        
			logout(){
				this.isLogin=false// 这样才会视图更新
				uni.showToast({
					title: '退出成功'
				});
				uni.removeStorageSync('user')
				
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
			},
		
			async getDetail(){
				let name=uni.getStorageSync('user').loginname
				await this.$http.get(`/user/${name}`).then(res=>{
					console.log(res);
					
					let data=res.data
					if(data.success){
						this.self=data.data
					}
					
				}).catch(err=>{
					console.log(err);
				})
				
			}
		},
    }
</script>

<style >
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
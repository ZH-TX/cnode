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
					<view class="">
						主题:{{self.recent_topics}}
					</view>
					<view class="">	
						回复:{{self.recent_replies}}
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
		onLoad() {
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
				isLogin:false,
				self: uni.getStorageSync('user'),
				val:'ac836285-e3d9-47a1-98a4-9a544736dfee'
            }
        },
        methods: {
            login(){
				uni.setStorageSync('token',this.val)
				this.$http.post('/accesstoken',{},{params:{
					accesstoken:this.val
				}
					
				}).then(res => {
						let data=res.data
						console.log(res);
						if(data.success){
							// 登录之后没哟立即刷新, 这是一个问题
							// console.log(data);
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
		
			getDetail(){
				this.$http.get(`/user/${this.self.loginname}`).then(res=>{
					console.log(res.data);
					let data=res.data
					this.self=data.data
				}).catch(err=>{
					console.log(err);
				})
				
				// uni.request({
				// 	url: `https://cnodejs.org/api/v1/user/${this.self.loginname}`,
				// 	method: 'GET',
				// 	data: {},
				// 	success: res => {
				// 		console.log(res.data);
				// 		let data=res.data
				// 		this.self=data.data
				// 	},
					
				// });
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
        background-color: #87C701;
        border: none;
        border-bottom: 2px solid #87C701;
        text-align: center;
        vertical-align: middle;
    }
	.header-bg{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		background: #87C701;
		color: #fff;
		
	}
	.username{
		padding: 20rpx;
	}
	.user-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.user-info view{
		padding: 20rpx;
	}
	
	.detail-info{
		display: flex;
		justify-content: center;
		align-items: center;
		
		background: #eee;
	}
	.detail-info view{
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex:1;
		border-bottom: 1px solid #87C701;
		/* color: #87C701; */
	}
	.avatar{
		margin: 20rpx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background: rgba(0,0,0,0);
	}
</style>
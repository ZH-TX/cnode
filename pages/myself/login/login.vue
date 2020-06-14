<template>
    <view>

        <view class="page-body">
           <view class="" v-if="!isLogin">
				<input  class="txt" placeholder="Access Token"v-model="val" />
				<button class="btn" @tap="login">登录</button>
           </view>
		   <view class="" v-else>
			   <image class="avatar" :src="self.avatar_url" mode=""></image>
				<view class="">
					名字:{{self.loginname}}
				</view>
				<view class="">
					创建时间:{{self.create_at|fliter}}
				</view>
				<view class="">
					score:{{self.score}}
				</view>
				<view class="">
					recent_topics:{{self.recent_topics}}
				</view>
				<view class="">	
					recent_replies:{{self.recent_replies}}
				</view>
				
				
				<button class="btn" type="primary" @tap="logout">退出登录</button>
				
		   </view>
			
        </view>


    </view>
</template>

<script>

    export default {
        
        components: {
           
        },
		onLoad() {
			this.isLogin=uni.getStorageSync('user').success
			// this.getDetail()
		},
		filters:{
			fliter(e){
				return new Date(e).toLocaleString()
				
			}
		},
        data() {
            return {
				isLogin:false,
				self: uni.getStorageSync('user'),
				val:'b23bce69-7b09-4489-a45a-4007820fcef1'
            }
        },
        methods: {
            login(){
				uni.setStorageSync('token',this.val)
            	uni.request({
            		url: 'https://cnodejs.org/api/v1/accesstoken',
            		method: 'POST',
            		data: {accesstoken:this.val},
            		success: res => {
						let data=res.data
						if(data.success){
							// 登录之后没哟立即刷新, 这是一个问题
							console.log(data);
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
						// console.log(res.data);
					},
            		fail: () => {},
            		complete: () => {}
            	});
            },
        
			logout(){
				this.isLogin=false// 这样才会视图更新
				uni.showToast({
					title: '退出成功'
				});
				uni.removeStorageSync('user')
				
			},
		
			getDetail(){
				uni.request({
					url: `https://cnodejs.org/api/v1/user/${this.self.loginname}`,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res.data);
						let data=res.data
						this.self=data.data
					},
					
				});
			}
		},
    }
</script>

<style >
    .page-body {
        padding: 50px 15px;
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
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;
        text-align: center;
        vertical-align: middle;
    }
	
	.avatar{
		width: 50%;
		height: 300rpx;
	}
</style>
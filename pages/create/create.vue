<template>
	<view>
		<!-- <v-header title="发表"></v-header> -->

		<form  >
			<view class="title">
				<input type="text" placeholder="标题...">
			</view>
			<view class="select">
				<picker @change="PickerChange" :value="index" :range="array">
				    <view class="picker">
				      当前选择分类：<text>{{array[index]}}</text>
				    </view>
				</picker>
			</view>
			<view class="con"  >
				<textarea  placeholder="内容..."></textarea>
			</view>
		</form>
		<!-- <footers></footers> -->

	</view>
</template>
<script>
	// import VHeader from 'components/common/VHead'
	import footers from 'components/common/footer';

	export default {
		components: {
			// VHeader,
			footers,
		},
		data() {
			return {
				index:0,
				array:['分享','问答','招聘','开发']
				
			}
		},
		methods: {
			PickerChange(e) {
				// console.log(e);
			    console.log('picker发送选择改变，携带值为', e.detail.value)
			    this.index= e.detail.value
			   
			}
		},

	}
</script>

<style lang="scss" >
	.picker text{
		color: #183691;
	}
	form {
		height: 100%;
	}


	.title {
		padding: 10px 10px;
		padding-top: 50px;
	}


	.select {
		padding: 5px 10px;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;

		select {
			padding: 0;
			border-radius: 5px;
			background: none;
		}
	}


	.con {
		padding: 5px 10px;

		textarea {
			line-height: 24px;
		}
	}


	input,
	select,
	textarea {
		box-sizing: border-box;
		width: 100%;
		height: 32px;
		padding: 0 5px;
		line-height: 28px;
		border: none;
		font-size: 14px;
		resize: none;
	}
</style>
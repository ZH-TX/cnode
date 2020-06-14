<template>
    <view>
        <view class="top" @tap="backtop" >回到顶部</view>
        
    </view>
</template>

<script>
    export default {
		
        methods: {
            backtop(e) {
                // this.$emit('backtop')
				// console.log(e);
				uni.pageScrollTo({
					scrollTop:0,
					duration:300,
					success:res=>console.log(res),
					fail:res=>console.log(res),
				})
            }
        },
    }
</script>

<style >

.top {
    position: fixed;
    bottom: 15%;
    right: 0;
    width: 25px;
    color: gray;
    padding: 10px 5px 10px 8px;
    text-align: center;
    z-index: 20;
    border-radius: 20px 0 0 20px;
    background-color: #42b983;
    border: 1px solid #ccc;
    border-right: 0;
}


</style>
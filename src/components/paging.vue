<template>
    <div class="paging">
        <span @click="paging(1)" :class="{'disabled': current === 1}">首页</span>
        <span @click="paging(current-1)" :class="{'disabled': current === 1}">上一页</span>
        <span v-for="i in pages" :class="{'current': current === i}" :key="i" @click="paging(i)">{{i}}</span>
        <span @click="paging(current+1)" :class="{'disabled': current === totalPage}">下一页</span>
        <span @click="paging(totalPage)" :class="{'disabled': current === totalPage}">末页</span>
    </div>
</template>
<script>
export default {
    data(){
       return {
            current: 1,
            showItem: 5,
        } 
    },
    props: ['totalPage'],
    computed:{
        pages: function(){
            let pag = [];
            let i = null;
            if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                i = Math.min(this.showItem, this.totalPage);
                while(i){
                    pag.unshift(i--);
                }
            }else{ //当前页数大于显示页数了
                let middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                i = this.showItem;
                if( middle >  (this.totalPage - this.showItem)  ){
                    middle = (this.totalPage - this.showItem) + 1
                }
                while(i--){
                    pag.push( middle++ );
                }
            }
            return pag;
        }
    },
    methods: {
        // 翻页
        paging: function (page) {
            if(page === 0 || page > this.totalPage){
                return;
            }
            this.current = page;
            this.$emit('page', page);
        },
    },
    watch: {
        totalPage: function(res){
            this.totalPage = res;
        }
    }
}
</script>


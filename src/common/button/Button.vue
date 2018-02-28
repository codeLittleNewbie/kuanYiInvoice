<template>
    <div class="buttonP" :style="'width:' + width">

       <div>
         <slot></slot>
       </div>

    </div>
</template>

<script>
    export default {
        name: "button",
      props: {
        width: String
      }
    }
</script>

<style scoped lang="less">
  @import "../../style/variable.less";
  .buttonP{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      color: white;
      font-size: 16px;
    }
  }

</style>

/*使用示例*/
scss中
.C9{
    @extend .C7;    //继承C7的样式
    @extend .S3     //继承S3的样式
    width:180px;    //额外的样式
}

页面中
<div class="C8">  //红色
    aaaaa
</div>
<div class="C9">  //蓝色,22px
    bbbbbb
</div>

/*按钮示例*/
    <button class="btn-gray">btn-gray</button>
    <button class="btn-orange">btn-orange</button>
    <button class="btn-orange-full">btn-orange-full</button>
    <button class="btn-submit">btn-submit</button>
    <button class="btn-orange-unfill">btn-orange-unfill</button>
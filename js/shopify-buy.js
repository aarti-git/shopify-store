
import client from 'shopify-buy';
const shopifyBuy ={
    init:function(){
        this._client = client.buildClient({
            domain: 'shopping-dream-store.myshopify.com',
            storefrontAccessToken: '0e2505a0fe7886742e4c9fc6e1604730'
          });
        //   console.log("shopify init done.")
        // this.getData();
    },
    getData:function(){
        var _this = this;
        return this._client.product.fetchAll().then(function(data){
            var shopifydata = data;
            console.log("shopity data",shopifydata); 
            _this.dataManipulation(shopifydata);
            return shopifydata;
          });
    },
    dataManipulation:function(data){
        var dataList = data[0];
       console.log(dataList);
    }
}

export default shopifyBuy;

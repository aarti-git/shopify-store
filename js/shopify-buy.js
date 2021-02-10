
import client from 'shopify-buy';
const shopifyBuy ={
    init:function(){
        this._client = client.buildClient({
            domain: 'shopping-dream-store.myshopify.com',
            storefrontAccessToken: '0e2505a0fe7886742e4c9fc6e1604730'
          });
          console.log("shopify init done.")
    },
    getData:function(){
        this._client.product.fetchAll().then(function(data){
            console.log(data);
          });
          console.log("shopify getData done.")
    }
}

export default shopifyBuy;

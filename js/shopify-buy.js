import client from "shopify-buy-with-tags";
const shopifyBuy = {
  init: function () {
    const _client = client.buildClient({
      domain: "shopping-dream-store.myshopify.com",
      storefrontAccessToken: "0e2505a0fe7886742e4c9fc6e1604730",
    });
    // console.log('client ==>', _client)

    // this.productsQuery = _client.graphQLClient.query(root => {
    //   root.addConnection('products',{args: {}}, (product) => {
    //     product.add('tags');// Add fields to be returned
    //   });
    // })
    this._client = _client
  },
  getProductsData: function () {
    // return this._client.graphQLClient.send(this.productsQuery).then(({data}) => {
    //   // Do something with the products
    //   return data;
    // });
    return this._client.product.fetchAll().then(function (data) {
      var shopifydata = data;
      return shopifydata;
    });
  },
	getCollectionByHandle: function(handle) {
		return this._client.collection.fetchByHandle(handle);
	},
  getProductsByHandle: function (handle) {
    return this._client.product.fetchByHandle(handle);
  },
};

export default shopifyBuy;

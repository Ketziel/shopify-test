const qlRequest = (query) => {
    return fetch(`https://rw-tech-challenge.myshopify.com/api/unstable/graphql.json`, {
      method: 'POST',
      headers: new Headers({
        'X-Shopify-Storefront-Access-Token': 'd2aae2f4409f6a694a359ddb9b35d92a',
        'Content-Type': 'application/graphql',
      }),
      body: query,
    })
};

export const getProducts = ({search ='', types = [], sortKey = null, reverse = false}) => {
    let queryArray = [];

    if (search.trim() !== '') {
        queryArray.push(search);
    }
    if (types.length > 0) {
        queryArray.push(`(${types.map(type => `product_type:${type}`).join(' OR ')})`)
    }

    let sortKeyString = sortKey ? `, sortKey: ${sortKey}` : '';
    return qlRequest(`query {
        products(first: 50, query: "${queryArray.join(' AND ')}", reverse: ${reverse}${sortKeyString}) {
            edges {
                node {
                    id
                    title
                    description
                    productType
                }
            }
        }
    }`);
}
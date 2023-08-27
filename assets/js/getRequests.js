export async function getBestSellerProducts(args) {
  const params = {...args, size: args.size || 6}
  const paramsString = new URLSearchParams(params).toString() 
  const result = await fetch(`https://shopeemockapi-1-t9661588.deta.app/bestSeller?${paramsString}`)
  return result.json()
}

export async function getSuggestedProducts(args) {
  const params = {...args, size: args.size || 6}
  const paramsString = new URLSearchParams(params).toString() 
  const result = await fetch(`https://shopeemockapi-1-t9661588.deta.app/suggested?${paramsString}`)
  return result.json()
}

export async function getProducts(args) {
  const params = {...args, page: args.page || 1, size: args.size || 20}
  const paramsString = new URLSearchParams(params).toString() 

  const result = await fetch(`https://shopeemockapi-1-t9661588.deta.app/products?${paramsString}`)
  return result.json()
}

export async function getSearchResult(args) {
  const params = {...args}
  const paramsString = new URLSearchParams(params).toString() 
  const result = await fetch(`https://shopeemockapi-1-t9661588.deta.app/search?${paramsString}`)
  return result.json()
}
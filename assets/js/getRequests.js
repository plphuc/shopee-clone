export async function getBestSellerProducts(args) {
  const params = {...args, size: args.size || 6}
  const paramsString = new URLSearchParams(params).toString() 
  const result = await fetch(`http://localhost:3000/bestSeller?${paramsString}`)
  return result.json()
}

export async function getSuggestedProducts(args) {
  const params = {...args, size: args.size || 6}
  const paramsString = new URLSearchParams(params).toString() 
  const result = await fetch(`http://localhost:3000/suggested?${paramsString}`)
  return result.json()
}

export async function getProducts(args) {
  const params = {...args, page: args.page || 1, size: args.size || 20}
  const paramsString = new URLSearchParams(params).toString() 

  const result = await fetch(`http://localhost:3000/products?${paramsString}`)
  return result.json()
}

export async function getSearchResult(args) {
  const params = {...args}
  const paramsString = new URLSearchParams(params).toString() 
  const result = await fetch(`http://localhost:3000/search?${paramsString}`)
  return result.json()
}
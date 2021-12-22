export async function getStock(productModel, req) {
  const product = await productModel.findById(req.body.productId).exec();
  if (!product) return; // This will be used in case the product has been placed in cart for a while but then sold out, code updated later.

  const variant = product.variants.find(variant => variant.variantColor === req.body.variantColor);
  const stockQuery = variant.stock.find(item => item.sizeName === req.body.sizeName);
  const sizeStock = stockQuery.sizeStock;
  return sizeStock;
}
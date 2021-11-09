export default function getVariantStock(product, selectedVariant) {
  const stockArray = product.variants[selectedVariant].stock;

  const totalStock = stockArray.reduce((sum, size) => {
    const sizeQty = Object.values(size)[0];
    sum += sizeQty;
    return sum;
  }, 0);
  return totalStock ? 'In Stock' : 'Out of Stock';
}

export default function demo({ id, description, price }) {
  if (price && price !== '') {
    return {
      id,
      name: description.trim(),
      price: (parseFloat(price) + 0.1).toFixed(2),
    };
  }
  return undefined;
}

import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";
async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();
  const response = await fetch(`${process.env.API}/product?${searchQuery}`, {
    method: "GET",
    next: { revalidate: 1 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}
export default async function Home({ searchParams }) {
  // console.log("searchParams => ", searchParams);
  const { products, currentPage, totalPages } = await getProducts(searchParams);
  return (
    <div>
      <h1 className="text-center">
        <strong>Latest Products</strong>
      </h1>
      <div className="row justify-content-center my-5">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product}></ProductCard>
        ))}
      </div>
      {/* <pre>{JSON.stringify(products, null, 4)}</pre> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname="/"
      ></Pagination>
    </div>
  );
}

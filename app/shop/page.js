import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";
export const dynamic = "force-dynamic";
async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page || 1,
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    ratings: searchParams.ratings || "",
    category: searchParams.category || "",
    tag: searchParams.tag || "",
    brand: searchParams.brand || "",
  }).toString();

  try {
    const response = await fetch(
      `${process.env.API}/product/filters?${searchQuery}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      throw new Error("No products returned");
    }
    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  console.log("searchParams in shop page => ", searchParams);
  const { products, currentPage, totalPages } = await getProducts(searchParams);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 overflow-auto" style={{ maxHeight: "90vh" }}>
          <ProductFilter searchParams={searchParams} />
        </div>
        <div className="col-lg-9 overflow-auto" style={{ maxHeight: "90vh" }}>
          <h4 className="text-center fw-bold">Latest products</h4>
          <div className="row justify-content-center my-5">
            {products?.map((product) => (
              <ProductCard key={product?._id} product={product}></ProductCard>
            ))}
          </div>
          {/* <pre>
            {JSON.stringify({ products, currentPage, totalPages }, null, 4)}
          </pre> */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
            pathname="/shop"
          />
        </div>
      </div>
    </div>
  );
}

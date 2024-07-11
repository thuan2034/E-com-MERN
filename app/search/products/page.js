"use client";
import { useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/product";
// import product from "@/models/product";
export default function SearchProductsPage() {
  // context
  const {
    setProductSearchQuery,
    productSearchResults,
    setProductSearchResults,
  } = useProduct();
  // console.log("searchQuery in search page =====> ", searchQuery);
  const productSearchParams = useSearchParams();
  const query = productSearchParams.get("productSearchQuery");
  // to fetch results on page load based on query
  useEffect(() => {
    if (query) {
      console.log(
        "Got search params in search page => ",
        productSearchParams.get("productSearchQuery")
      );
      setProductSearchQuery(query);
      fetchProductResultsOnLoad(query);
    }
  }, [query]);
  const fetchProductResultsOnLoad = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/search/products?
   productSearchQuery=${query}`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProductSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Search result {productSearchResults?.length}</h4>
          <hr/>
          {/* <pre>{JSON.stringify(searchResults, null, 4)}</pre> */}
          <div className="row">
            {productSearchResults?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

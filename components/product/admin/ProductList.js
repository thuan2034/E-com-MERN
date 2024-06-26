"use client";
import { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../Pagination";
export default function ProductList() {
  const {
    products,
    currentPage,
    totalPages,
    fetchProducts,
    setUpdatingProduct,
  } = useProduct();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleClick = (product) => {
    setUpdatingProduct(product);
    router.push("/dashboard/admin/product/");
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center my-4">
        {/* 
<pre>{JSON.stringify(products, null, 4)}</pre> */}
        {products?.map((product) => (
          <div key={product?._id} className="card my-3 shadow col-md-3 mx-2">
            <div className="card-header">
              <Image
                src={product?.images[0]?.secure_url || "/images/default.jpeg"}
                alt={product?.title}
                width={500}
                height={300}
                style={{
                  objectFit: "fill",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
            <div className="card-body">
              <h5
                className="card-title pointer"
                onClick={() => handleClick(product)}
              >
                <Link href={`/product/${product?.slug}`}>
                  ${product?.price?.toFixed(2)} {product?.title}
                </Link>
              </h5>
              <p className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product?.description?.length > 160
                        ? `${product?.description?.substring(0, 160)}..`
                        : product?.description,
                  }}
                />
              </p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={pathname}
      />
    </div>
  );
}

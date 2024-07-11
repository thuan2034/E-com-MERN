import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import Stars from "@/components/product/Stars";
import { calculateAverageRating } from "@/utils/helpers";
// import ProductImage from "@/components/product/ProductImage";
dayjs.extend(relativeTime);
async function getProducts(slug) {
  try {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
      method: "GET",
      next: { revalidate: 1 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export default async function ProductViewPage({ params }) {
  const product = await getProducts(params.slug);
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card">
            {/* images and preview modal */}
            <ProductImage product={product} />
            {/* card body */}
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <div className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.description.replace(/\./g, "<br />"),
                  }}
                ></div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">
                Category: {product.category.name}
              </small>
              <small className="text-muted">
                Tags: {product.tags.map((tag) => tag.name).join(" ")}
              </small>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <ProductLike product={product} />
              <small className="text-muted">
                Added {dayjs(product.createdAt).fromNow()}
              </small>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small>Brand: {product.brand}</small>
            </div>
            <ProductRating product={product}/>
          </div>
        </div>
        <div className="col-lg-4">Add to cart / wishlist</div>
      </div>
      <div className="row">
        <div className="col my-5">
          <p className="lead">Related products</p>
        </div>
      </div>
    </div>
  );
}

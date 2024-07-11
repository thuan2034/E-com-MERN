import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductRating from "@/components/product/ProductRating";
dayjs.extend(relativeTime);
export default function ({ product }) {
  return (
    <div key={product?._id} className="card my-3 shadow col-md-3 mx-2 ">
      <div className="card-header">
        <Image
          src={product?.images?.[0]?.secure_url || "/images/default.jpeg"}
          width={500}
          height={300}
          style={{ objectFit: "fill", width: "100%", height: "100%" }}
          alt={product?.title}
        />
      </div>
      <div className="card-body">
        <Link href={`/product/${product?.slug}`}>
          <h5 className="card-title">{product?.title}</h5>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)}..`
                : product?.description,
          }}
        />{" "}
      </div>
      {/* before accessing category and tags, make sure .populate() is 
      used in api routes and ref: 'Category' models are imported in `Product` 
      model */}
      <div className="card-footer d-flex justify-content-between">
        <small>Category: {product?.category?.name}</small>
        <small>Tags: {product?.tags?.map((t) => t?.name).join(" ")}</small>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <small>❤️ Likes</small>
        <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <small>Brand: {product?.brand}</small>
        <ProductRating product={product} leaveARating={false} />
      </div>
    </div>
  );
}

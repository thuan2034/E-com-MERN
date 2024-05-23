import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default function ({ product }) {
  return (
    <div key={product?._id} className="card my-4 col-lg-4">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Image
          src={product?.images?.[0]?.secure_url || "/images/default.jpeg"}
          width={500}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt={product?.title}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product?.title}</h5>
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
        <small>❤ Likes</small>
        <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <small>Brand: {product?.brand}</small>
        <small>🌟 Stars</small>
      </div>
    </div>
  );
}

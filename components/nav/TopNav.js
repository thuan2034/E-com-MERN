import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/product";
import { FaSearch } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useCart } from "@/context/cart";
export default function TopNav() {
  const { data, status, loading } = useSession();
  const { cartItems } = useCart();
  const {
    productSearchQuery,
    setProductSearchQuery,
    fetchProductSearchResults,
  } = useProduct();
  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <div className="d-flex">
        <Link className="nav-link" href="/">
          🛒NEXTCOM
        </Link>
        <Link className="nav-link" href="/shop">
          Lọc sản phẩm
        </Link>
      </div>
      <form
        className="d-flex mx-2"
        role="search"
        onSubmit={fetchProductSearchResults}
      >
        <input
          type="search"
          className="form-control"
          placeholder="Nhập tên sản phẩm..."
          aria-label="Search"
          onChange={(e) => setProductSearchQuery(e.target.value)}
          value={productSearchQuery}
        />
        <button className="btn btn-outline-success" type="submit">
          <FaSearch />
        </button>
      </form>
      <div className="d-flex justify-content-end">
        <Link className="nav-link text-danger" href="/cart">
          <BsFillCartCheckFill size={25} /> {cartItems?.length}
        </Link>
        {status === "authenticated" ? (
          <>
            <Link
              className="nav-link"
              href={`/dashboard/${
                data?.user?.role === "admin" ? "admin" : "user"
              }`}
            >
              {data.user.name} ({data?.user?.role})
            </Link>
            <a
              className="nav-link pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </a>
          </>
        ) : status === "loading" ? (
          <>
            <a className="nav-link text-danger">Loading</a>
          </>
        ) : (
          <>
            <Link className="nav-link" href="/login">
              Login
            </Link>
            <Link className="nav-link" href="/register">
              Register
            </Link>
          </>
        )}{" "}
      </div>
    </nav>
  );
}

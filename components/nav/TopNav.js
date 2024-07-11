import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/product";
import { FaSearch } from "react-icons/fa";
export default function TopNav() {
  const { data, status, loading } = useSession();
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
        <input type="search"
        className="form-control"
        placeholder="Nhập tên sản phẩm..."
        aria-label="Search"
        onChange={(e) => setProductSearchQuery(e.target.value)}
        value={productSearchQuery}
        />
        <button className="btn btn-outline-success" type="submit"><FaSearch /></button>
      </form>
      {status === "authenticated" ? (
        <div className="d-flex">
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
        </div>
      ) : status === "loading" ? (
        <div className="d-flex">
          <a className="nav-link text-danger">Loading</a>
        </div>
      ) : (
        <div className="d-flex">
          <Link className="nav-link" href="/login">
            Login
          </Link>
          <Link className="nav-link" href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import getPostApiProduct from "../api/postApi";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Menuheader from "./Menuheader";
import Slide from "./Slide";
import CustomFooter from "../footer/CustomFooter";
import "../css/searchResult.css";
const SearchResult = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPostApiProduct.getAll();
      const filtered = response.data.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setResults(filtered);
    };

    if (query) fetchData();
  }, [query]);

  return (
    <div>
      <Menuheader />
      <Slide />

      <div className="search-result-container">
        <h2 className="search-result-title">Kết quả tìm kiếm cho: "{query}"</h2>

        {results.length === 0 ? (
          <p className="search-result-empty">Không tìm thấy sản phẩm nào.</p>
        ) : (
          <div className="search-result-list">
            {results.map((product) => (
              <div className="search-result-card" key={product._id}>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="search-result-image"
                  preview={false}
                />
                <Link
                  to={`/Product-each/${product._id}`}
                  className="search-result-link"
                >
                  <p className="search-result-name">{product.name}</p>
                  <p className="search-result-price">${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <CustomFooter />
    </div>
  );
};

export default SearchResult;

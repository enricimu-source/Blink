import React, { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const loadingArrayCard = new Array(10).fill(null);

  // ✅ Correct query parsing
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchText = query.get("q") || "";

  // ✅ Reset when search changes
  useEffect(() => {
    setPage(1);
    setData([]);
  }, [searchText]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        params: {
          searchText,
          page,
          limit: 10,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }

        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      fetchData();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">
          Search Results: {data.length}
        </p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            
            {data.map((p, index) => (
              <CardProduct
                data={p}
                key={p?._id + "searchProduct" + index}
              />
            ))}

            {loading &&
              loadingArrayCard.map((_, index) => (
                <CardLoading key={"loading" + index} />
              ))}
          </div>
        </InfiniteScroll>

        {!data.length && !loading && (
          <div className="flex flex-col justify-center items-center w-full">
            <img
              src={noDataImage}
              className="max-w-xs"
              alt="No data"
            />
            <p className="font-semibold my-2">No Data found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

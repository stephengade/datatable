import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableUI from "@/components/TableUI/TableUI";
import axios from "axios";
import { Columns } from "./Column";

const VehicleTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);


  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=${currentPage}&PageSize=${ITEMS_PER_PAGE}`
        );
        
        setItems(response.data.Items);
        setTotalPageCount(response.data.TotalPageCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };


  // handleSearch

  const handleSearch = (query: string) => {


    if (query.trim() === "") {
      // Restore the original data when the search query is empty
      setItems(items);
    } else {
      const filteredData = items.filter((item: any) =>
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.PhoneNumber.includes(query) ||
        item.PolicyNumber.includes(query)
      );
      setItems(filteredData || []);
    }
  };
  

  const DataLength = items.length;

  if (loading) {
    return (
      <div className="grid place-items-center mt-[4rem]">
      <p className="font-graphik self-center">Something good is loading...</p>
      </div>
    )
  }

  return (
    <section className="mt-5">

      <h3 className="font-title text-[18px] mb-2 md:text-[24px] text-siloBlack">
        {DataLength} Vehicles
      </h3>
      <Box>
        <TableUI
          data={items}
          columns={Columns}
          searchLabel="Search by Name, Policy or Phone number"
          EmptyText="No vehicle yet!"
          isFetching={loading}
          pageCount={totalPageCount}
          page={handlePageChange}
          search={handleSearch}
        />
      </Box>
    </section>
  );
};

export default VehicleTable;

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
          `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=${currentPage}&PageSize=${ITEMS_PER_PAGE}`
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

  // const handleSearch = async (query: string) => {
  //   const response = await axios.get(
  //     `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=${currentPage}&PageSize=${ITEMS_PER_PAGE}`
  //   );
  //   if (query.trim() === "") {
  //     setItems(response.data.Items);
  //   } else {
  //     const filteredData = allUserData?.fetchCustomers.results.filter(
  //       (item: any) => 
  //       item.email
  //       .toLowerCase()
  //       .includes(query.toLowerCase()) ||
  //        item.homesilo_user_type
  //           .toLowerCase()
  //           .includes(query.toLowerCase()) || 
  //         item.firstname
  //           .toLowerCase()
  //           .includes(query.toLowerCase()) ||
  //         item.username.toLowerCase().includes(query.toLowerCase()) ||
  //         item.lastname
  //           .toLowerCase()
  //           .includes(query.toLowerCase()) || item._id
  //           .toLowerCase()
  //           .includes(query.toLowerCase()) 
  //     );
  //     setUserData(filteredData);
  //   }
  // };



  const DataLength = items.length;

  return (
    <section className="mt-5">
      <h3 className="font-title text-[18px] mb-2 md:text-[24px] text-siloBlack">
        {DataLength} Vehicles
      </h3>
      <Box>
        <TableUI
          data={items}
          columns={Columns}
          searchLabel="Search by title"
          EmptyText="No vehicle yet!"
          isFetching={loading}
          pageCount={totalPageCount}
          page={handlePageChange}
        />
      </Box>
    </section>
  );
};

export default VehicleTable;

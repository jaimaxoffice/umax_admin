import React from "react";
import Table from "../../components/Tables/Table";
import Pagination from "../../components/Pagination/Pagination";
import StatCard from "../../components/StatCards/StatsCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import PerPageSelector from "../../components/Filter/PerPageSelector";
import useTableState from "../../hooks/useTableState";
import NOtfound from "../../components/Tables/NoDataFound";
import { useGetOrdersQuery } from "../../features/orders/orderApiSlice";
import { ShoppingBag, Package, Truck } from "lucide-react";
import { formatDateWithAmPm } from "../../utils/dateUtils";

const OrderManagement = () => {
  const { state, setState, handlePageChange } = useTableState({
    initialPerPage: 10,
    searchDelay: 1000,
  });

  const queryParams = `page=${state.currentPage}&limit=${state.perPage}`;

  const { data: ordersData, isLoading, isError } =
    useGetOrdersQuery(queryParams);

  const TableData = ordersData?.data?.orders || [];

  const totalOrders =
    ordersData?.data?.pagination?.total ||
    ordersData?.data?.total ||
    0;

  const totalPages =
    ordersData?.data?.pagination?.totalPages ||
    Math.ceil(totalOrders / state.perPage) ||
    1;

  if (isError) {
    return <NOtfound />;
  }

  const columns = [
    {
      header: "S.No",
      render: (_, index) =>
        (state.currentPage - 1) * state.perPage + index + 1,
    },
    {
      header: "Order ID",
      render: (row) => (
        <span className="text-white">
          {row?.orderId || row?._id || "N/A"}
        </span>
      ),
    },
    {
      header: "User",
      render: (row) => (
        <span>
          {row?.userId?.username ||
            row?.user?.username ||
            "N/A"}
        </span>
      ),
    },
    {
      header: "Created Date",
      render: (row) => (
        <span className="text-xs">
          {formatDateWithAmPm(
            row?.createdAt || row?.createdOn
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="p-2 sm:p-2 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          variant="blue"
        />

        <StatCard
          title="Processed Orders"
          value={0}
          icon={Package}
          variant="green"
        />

        <StatCard
          title="Delivered Orders"
          value={0}
          icon={Truck}
          variant="purple"
        />
      </div>

      {/* Table */}
      <div className="bg-[#282f35] rounded-[5px] overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-[#282f35]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex w-full">
              <div className="flex items-center gap-3 w-full sm:w-auto ml-auto">
                <PerPageSelector
                  value={state.perPage}
                  options={[10, 20, 40, 60, 80, 100]}
                  onChange={(value) =>
                    setState((prev) => ({
                      ...prev,
                      perPage: value,
                      currentPage: 1,
                    }))
                  }
                />

                <SearchBar
                  placeholder="Search..."
                  onSearch={(e) => {
                    clearTimeout(window._searchTimeout);

                    window._searchTimeout = setTimeout(() => {
                      setState((prev) => ({
                        ...prev,
                        search: e.target.value,
                        currentPage: 1,
                      }));
                    }, 1000);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={TableData}
          isLoading={isLoading}
          currentPage={state.currentPage}
          perPage={state.perPage}
          noDataTitle="No Orders Found"
          noDataMessage="No orders available at the moment."
          noDataIcon="search"
        />
      </div>

      {/* Pagination */}
      {TableData?.length > 0 && (
        <Pagination
          currentPage={state.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default OrderManagement;
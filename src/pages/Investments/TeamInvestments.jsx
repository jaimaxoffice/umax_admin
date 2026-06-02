import React, { useState } from "react";
import Table from "../../components/Tables/Table";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modals/Modal";
import StatCard from "../../components/StatCards/StatsCard";
import ReadOnlyField from "../../components/Inputs/ReadOnlyField";
import Button from "../../components/Buttons/Button";
import SearchBar from "../../components/searchBar/SearchBar";
import PerPageSelector from "../../components/Filter/PerPageSelector";
import useTableState from "../../hooks/useTableState";

import { Eye, Wallet, TrendingUp, Clock } from "lucide-react";

import { useGetInvestmentsQuery } from "../../features/investments/investmentsApiSlice";

const ModalContent = ({ investment, isLoading, modalKey, setModals }) => (
  <>
    {!isLoading && investment ? (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadOnlyField label="Investment ID" value={investment?.id} />

          <ReadOnlyField label="User ID" value={investment?.userId.username} />

          <ReadOnlyField label="Amount" value={`₹${investment?.amountINR}`} />
        </div>

        <div className="text-center mt-6">
          <Button
            variant="primary"
            size="md"
            onClick={() =>
              setModals((prev) => ({
                ...prev,
                [modalKey]: false,
              }))
            }
          >
            Close
          </Button>
        </div>
      </>
    ) : (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-[#2a2c2f] rounded-xl animate-pulse" />
        ))}
      </div>
    )}
  </>
);

const TeamInvestment = () => {
  const { state, handlePageChange, handleSearch, handlePerPageChange } =
    useTableState({
      initialPerPage: 10,
      searchDelay: 1000,
    });

  const [modals, setModals] = useState({
    viewInvestment: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const [input, setInput] = useState({
    fromDate: "",
    toDate: "",
  });

  const { data: investmentsData, isLoading } = useGetInvestmentsQuery({
    page: state.currentPage,
    limit: state.perPage,
    userId: state.search || undefined,
    status: selectedStatus || undefined,
    startDate: input.fromDate || undefined,
    endDate: input.toDate || undefined,
  });

  const investments = investmentsData?.data?.investments || [];

  //   console.log(investments)
  const pagination = investmentsData?.data?.pagination || {};

  const totalInvestments = pagination?.total || 0;

  const activeInvestments = pagination?.active || 0;

  const completedInvestments = pagination?.completed || 0;

  const handleViewInvestment = (row) => {
    setSelectedInvestment(row);

    setModals((prev) => ({
      ...prev,
      viewInvestment: true,
    }));
  };

  const columns = [
    {
      header: "S.No",
      render: (_, index, currentPage, perPage) =>
        currentPage * perPage - (perPage - 1) + index,
    },
    {
      header: "Plan",
      accessor: "planName",
    },
    {
      header: "User ID",
      render: (row) => row.userId?.username,
    },
    {
      header: "Name",
      render: (row) => row.userId?.name,
    },
    //   {
    //     header: "Email",
    //     render: (row) => row.userId?.email,
    //   },
    {
      header: "INR",
      render: (row) => `₹${row.amountINR}`,
    },
    {
      header: "USDT",
      render: (row) => `$${row.amountUSDT}`,
    },
    {
      header: "Tokens Received",
      render: (row) => `${row.tokensToReceive}`,
    },
    {
      header: "Rate (INR)",
      render: (row) => `${row.rateUsed}`,
    },
    {
      header: "Network",
      render: (row) => `${row.network}`,
    },
    {
      header: "Wallet",
      render: (row) => `${row.depositWallet}`,
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            row.status === "approved"
              ? "text-[#b9fd5c]"
              : row.status === "pending"
                ? "text-yellow-400"
                : "text-red-400"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="p-2 sm:p-2 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Investments"
            value={totalInvestments}
            icon={Wallet}
            variant="blue"
          />

          <StatCard
            title="Active Investments"
            value={activeInvestments}
            icon={TrendingUp}
            variant="green"
          />

          <StatCard
            title="Completed"
            value={completedInvestments}
            icon={Clock}
            variant="yellow"
          />
        </div>

        {/* Filters */}
        <div className="bg-[#282f35] rounded-[5px] p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* From Date */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">
                From Date
              </label>

              <input
                type="date"
                value={input.fromDate}
                onChange={(e) =>
                  setInput({
                    ...input,
                    fromDate: e.target.value,
                  })
                }
                className="w-full bg-[#111214] border border-[#2a2c2f] text-white rounded-xl
                py-3 px-4 text-sm focus:outline-none focus:border-[#b9fd5c]
                focus:ring-1 focus:ring-[#b9fd5c]/30 transition-colors
                [color-scheme:dark]"
              />
            </div>

            {/* To Date */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">
                To Date
              </label>

              <input
                type="date"
                value={input.toDate}
                onChange={(e) =>
                  setInput({
                    ...input,
                    toDate: e.target.value,
                  })
                }
                className="w-full bg-[#111214] border border-[#2a2c2f] text-white rounded-xl
                py-3 px-4 text-sm focus:outline-none focus:border-[#b9fd5c]
                focus:ring-1 focus:ring-[#b9fd5c]/30 transition-colors
                [color-scheme:dark]"
              />
            </div>

            {/* Status */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wide mb-2">
                Status
              </label>

              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="w-full bg-[#111214] border border-[#2a2c2f] text-white rounded-xl
      py-3 px-4 text-sm focus:outline-none focus:border-[#b9fd5c]
      focus:ring-1 focus:ring-[#b9fd5c]/30 transition-colors cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-3 flex items-end">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by User ID..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#282f35] rounded-[5px] overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-[#2f363d]">
            <div className="flex justify-end">
              <PerPageSelector
                value={state.perPage}
                options={[10, 20, 40, 60, 80, 100]}
                onChange={handlePerPageChange}
              />
            </div>
          </div>

          <Table
            columns={columns}
            data={investments}
            isLoading={isLoading}
            currentPage={state.currentPage}
            perPage={state.perPage}
            noDataTitle="No Investments Found"
            noDataMessage="No investment records available."
            noDataIcon="search"
          />
        </div>

        {/* Pagination */}
        {investments.length > 0 && (
          <Pagination
            currentPage={state.currentPage}
            totalPages={Math.ceil(totalInvestments / state.perPage) || 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <Modal
        isOpen={modals.viewInvestment}
        onClose={() =>
          setModals((prev) => ({
            ...prev,
            viewInvestment: false,
          }))
        }
        title="Investment Details"
      >
        <ModalContent
          investment={selectedInvestment}
          isLoading={false}
          modalKey="viewInvestment"
          setModals={setModals}
        />
      </Modal>
    </>
  );
};

export default TeamInvestment;

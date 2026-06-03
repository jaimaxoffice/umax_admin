import React, { useState } from "react";
import Table from "../../components/Tables/Table";
import Pagination from "../../components/Pagination/Pagination";
import {
  useGetBonusTransactionByIdQuery,
  useGetBonusTransactionsQuery,
} from "../../features/bonusTransaction/bonusTransactionApiSlice";
import SearchBar from "../../components/SearchBar/SearchBar";
import { formatDateWithAmPm } from "../../utils/dateUtils";
import NOtfound from "../../components/Tables/NoDataFound";
import PerPageSelector from "../../components/Filter/PerPageSelector";
import useTableState from "../../hooks/useTableState";
import { Eye } from "lucide-react";
import ReadOnlyField from "../../components/Inputs/ReadOnlyField";
import Modal from "../../components/Modals/Modal";
import Button from "../../components/Buttons/Button";

const TransactionDetailsContent = ({
  transactionDetails,
  isTransactionLoading,
}) => {
  const data = transactionDetails?.data;

  if (isTransactionLoading) {
    return (
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 bg-[#2a2c2f] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ReadOnlyField label="User Name" value={data?.userId?.name} />

      <ReadOnlyField label="User ID" value={data?.userId?.username} />

      <ReadOnlyField label="Email" value={data?.userId?.email} />

      <ReadOnlyField label="Transaction ID" value={data?.transactionId} />

      <ReadOnlyField label="Transaction Type" value={data?.transactionType} />

      <ReadOnlyField
        label="Transaction Amount"
        value={data?.transactionAmount}
      />

      <ReadOnlyField label="Helped User" value={data?.comssionHelpedUser} />

      <ReadOnlyField label="Position" value={data?.position} />

      <ReadOnlyField
        label="Eligible Percentage"
        value={`${data?.elegiblePercentag}%`}
      />

      <ReadOnlyField
        label="Created On"
        value={formatDateWithAmPm(data?.createdAt)}
      />

      <div className="md:col-span-2">
        <ReadOnlyField label="Note" value={data?.note} />
      </div>
    </div>
  );
};

const BonusTransaction = () => {
  const BONUS_TYPES = {
    DIRECT: "DIRECT_REFERAL_INCOME",
    GRADUAL: "GRADUAL_BONUS_DAILY",
  };

  const [bonusType, setBonusType] = useState(BONUS_TYPES.DIRECT);

  const [selectedTransactionId, setSelectedTransactionId] = useState("");

  const [modals, setModals] = useState({
    viewTransaction: false,
  });

  const { state, setState, handlePageChange } = useTableState({
    initialPerPage: 10,
    initialStatus: "",
    searchDelay: 1000,
  });

  const queryParams = `page=${state.currentPage}&limit=${state.perPage}${
    state.search ? `&search=${state.search}` : ""
  }&type=${bonusType}`;

  const {
    data: bonusLogs,
    isLoading,
    isError,
  } = useGetBonusTransactionsQuery(queryParams);

  const TableData = bonusLogs?.data?.transactions || [];

  const totalItems =
    bonusLogs?.data?.pagination?.total || bonusLogs?.data?.total || 0;

  const totalPages = bonusLogs?.data?.pagination?.totalPages || 1;

  const { data: transactionDetails, isLoading: isTransactionLoading } =
    useGetBonusTransactionByIdQuery(selectedTransactionId, {
      skip: !selectedTransactionId,
    });

  const handleTransactionView = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setModals((prev) => ({
      ...prev,
      viewTransaction: true,
    }));
  };

  if (isError) {
    return (
      <div>
        <NOtfound />
      </div>
    );
  }

  const columns = [
    {
      header: "S.No",
      render: (_, index) =>
        `${(state.currentPage - 1) * state.perPage + index + 1}.`,
    },
    {
      header: "User Name",
      render: (row) => (
        <span className="text-white font-medium">
          {row?.userId?.username || row?.userId?.name || "N/A"}
        </span>
      ),
    },
    {
      header: "Transaction ID",
      render: (row) => <span>{row?.transactionId || row?.id || "N/A"}</span>,
    },
    {
      header: "Transaction Amount",
      render: (row) => <span>{row?.transactionAmount || 0}</span>,
    },
    {
      header: "Position",
      render: (row) => <span>{row?.position || "N/A"}</span>,
    },
    {
      header: "Helped User",
      render: (row) => (
        <span className="text-xs">{row?.comssionHelpedUser || "N/A"}</span>
      ),
    },
    {
      header: "Percentage",
      render: (row) => <span>{row?.elegiblePercentag || 0}%</span>,
    },
    {
      header: "Created Date",
      render: (row) => (
        <span className="text-xs">
          {formatDateWithAmPm(row?.createdOn || row?.createdAt)}
        </span>
      ),
    },
    {
      header: "View",
      render: (row) => (
        <Button
          onClick={() => handleTransactionView(row.transactionId)}
          variant="icon"
          size="sm"
          className="text-white hover:text-[#b9fd5c]"
        >
          <Eye size={18} />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="p-2 sm:p-2 space-y-6">
        {/* Bonus Type Toggle */}
        <div className="flex justify-center">
          <div className="bg-[#282f35] border border-[#2a2c2f] p-1 rounded-lg flex gap-1">
            <button
              onClick={() => {
                setBonusType("DIRECT_REFERAL_INCOME");
                setState((prev) => ({
                  ...prev,
                  currentPage: 1,
                }));
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                bonusType === "DIRECT_REFERAL_INCOME"
                  ? "bg-[#b9fd5c] text-black"
                  : "text-gray-300 hover:bg-[#363d43]"
              }`}
            >
              Direct Referral
            </button>

            <button
              onClick={() => {
                setBonusType("GRADUAL_BONUS_DAILY");
                setState((prev) => ({
                  ...prev,
                  currentPage: 1,
                }));
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                bonusType === "GRADUAL_BONUS_DAILY"
                  ? "bg-[#b9fd5c] text-black"
                  : "text-gray-300 hover:bg-[#363d43]"
              }`}
            >
              Gradual Bonus
            </button>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-[#282f35] border border-[#2a2c2f] rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-[#2a2c2f] space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
              <PerPageSelector
                options={[10, 20, 40, 60, 80, 100]}
                onChange={(value) =>
                  setState((prev) => ({
                    ...prev,
                    perPage: value,
                    currentPage: 1,
                  }))
                }
              />

              {/* <SearchBar
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
                placeholder="Search..."
              /> */}
            </div>
          </div>

          <Table
            columns={columns}
            data={TableData}
            isLoading={isLoading}
            currentPage={state.currentPage}
            perPage={state.perPage}
          />
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={state.currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Modal
  isOpen={modals.viewTransaction}
  onClose={() =>
    setModals((prev) => ({
      ...prev,
      viewTransaction: false,
    }))
  }
  title="Bonus Transaction Details"
>
  <TransactionDetailsContent
    transactionDetails={transactionDetails}
    isTransactionLoading={isTransactionLoading}
  />
</Modal>
    </div>
  );
};

export default BonusTransaction;

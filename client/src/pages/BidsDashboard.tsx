/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  ChartBar,
  Clock,
  Download,
  FileCheck,
  Plus,
  Search,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Bid, Contract } from "../types/bidTypes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { clearError, fetchAllBids } from "../features/bid/bidSlice";
import { fetchAllContracts } from "../features/contract/contractSlice";
import { Alert, AlertDescription } from "../components/ui/alert";
import BidsContracts from "./BidsContracts";

const DashboardStatCard = ({
  title,
  value,
  change,
  variant = "default",
  icon,
  isLoading = false,
}: {
  title: string;
  value: string;
  change: string;
  variant?: "default" | "warning" | "success";
  icon: React.ReactNode;
  isLoading?: boolean;
}) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    warning: "bg-warning text-warning-foreground",
    success: "bg-success text-success-foreground",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div
          className={`h-8 w-8 rounded-full ${variantClasses[variant]} flex items-center justify-center`}
        >
          {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{isLoading ? "..." : value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};

const BidsDashboard = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    bids,
    loading: bidsLoading,
    error: bidsError,
  } = useAppSelector((state) => state.bid);
  const {
    contracts,
    loading: contractsLoading,
    error: contractsError,
  } = useAppSelector((state) => state.contract);

  // Calculate dynamic stats from Redux data
  const stats = useMemo(() => {
    const totalBids = bids.length;
    const pendingBids = bids.filter(
      (bid: Bid) => bid.status === "PENDING" || bid.status === "UNDER_REVIEW"
    ).length;
    const activeContracts = contracts.filter(
      (contract: Contract) => contract.status === "ACTIVE"
    ).length;

    return {
      totalBids,
      pendingBids,
      activeContracts,
    };
  }, [bids, contracts]);

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchAllBids());
    dispatch(fetchAllContracts());
  }, [dispatch]);

  // Handle data refresh
  const handleRefreshData = () => {
    dispatch(fetchAllBids());
    dispatch(fetchAllContracts());
  };

  // Handle export functionality with real data
  const handleExport = () => {
    if (bids.length === 0) {
      alert("No data to export");
      return;
    }

    const csvHeaders = [
      "ID",
      "Title",
      "Description",
      "Amount",
      "Status",
      "Created Date",
    ];

    const csvRows = bids.map((bid: Bid) => [
      bid.id,
      `"${bid.projectName || ""}"`,
      `"${bid.contractor || ""}"`,
      bid.value || 0,
      bid.status || "",
      bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : "",
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row: (string | number)[]) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bids-export-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleNewBidSuccess = () => {
    setIsDialogOpen(false);
    // Data will be automatically updated through Redux
    // No need to manually update stats
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const isLoading = bidsLoading || contractsLoading;
  const hasError = bidsError || contractsError;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Procurement Dashboard</h1>
          <p className="text-muted-foreground">
            Manage all bids and contracts in one place
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleRefreshData}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            disabled={bids.length === 0}
          >
            <Download className="h-4 w-4" />
            Export ({bids.length})
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Bid
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Bid</DialogTitle>
              </DialogHeader>
              {/* <NewBidForm onSuccess={handleNewBidSuccess} /> */}
              <p className="text-sm text-muted-foreground">
                New bid form component will be integrated here
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Display */}
      {hasError && (
        <Alert variant="destructive">
          <AlertDescription className="flex justify-between items-center">
            <span>
              {bidsError && `Bids: ${bidsError}`}
              {bidsError && contractsError && " | "}
              {contractsError && `Contracts: ${contractsError}`}
            </span>
            <Button variant="ghost" size="sm" onClick={handleClearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStatCard
          title="Total Bids"
          value={stats.totalBids.toString()}
          change={`${
            stats.totalBids > 0 ? `${stats.totalBids} active` : "No bids yet"
          }`}
          icon={<ChartBar />}
          isLoading={bidsLoading}
        />
        <DashboardStatCard
          title="Pending Review"
          value={stats.pendingBids.toString()}
          change={`${
            stats.pendingBids > 0
              ? `${stats.pendingBids} awaiting review`
              : "All reviewed"
          }`}
          variant="warning"
          icon={<Clock />}
          isLoading={bidsLoading}
        />
        <DashboardStatCard
          title="Active Contracts"
          value={stats.activeContracts.toString()}
          change={`${
            stats.activeContracts > 0
              ? `${stats.activeContracts} in progress`
              : "No active contracts"
          }`}
          variant="success"
          icon={<FileCheck />}
          isLoading={contractsLoading}
        />
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              Bid Management
              {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Review and manage all incoming bids ({bids.length} total)
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bids..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-380px)]">
            <BidsContracts
              searchTerm={searchTerm}
              bidsData={bids}
              contractsData={contracts}
              isLoading={isLoading}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default BidsDashboard;

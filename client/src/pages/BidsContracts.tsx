import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Bid, Contract } from "../types/bidTypes";

interface BidsContractsProps {
  searchTerm?: string;
  bidsData: Bid[];
  contractsData: Contract[];
  isLoading?: boolean;
}

const BidsContracts = ({
  searchTerm = "",
  bidsData,
  contractsData,
}: BidsContractsProps) => {
  const getStatusVariant = (
    status: string
  ): "destructive" | "secondary" | "default" | "outline" => {
    switch (status) {
      case "APPROVED":
      case "ACTIVE":
        return "default";
      case "REJECTED":
      case "TERMINATED":
        return "destructive";
      case "UNDER_REVIEW":
        return "outline";
      default:
        return "secondary";
    }
  };

  const filteredBids = bidsData.filter(
    (bid) =>
      bid.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.contractor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <Tabs defaultValue="bids">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bids">Bids</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="bids">
          <Table>
            <TableCaption>List of all received bids</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attachments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell className="font-medium">
                    {bid.projectName}
                  </TableCell>
                  <TableCell>{bid.contractor}</TableCell>
                  <TableCell>${bid.value?.toLocaleString()}</TableCell>
                  <TableCell>
                    {bid.dueDate
                      ? (Object.prototype.toString.call(bid.dueDate) ===
                        "[object Date]"
                          ? (bid.dueDate as unknown as Date)
                          : new Date(bid.dueDate as string)
                        ).toLocaleDateString()
                      : ""}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(bid.status)}>
                      {bid.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {bid.attachments?.length ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="contracts">
          <Table>
            <TableCaption>List of all contracts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Related Bid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Signed Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractsData.map((contract) => {
                const relatedBid = bidsData.find(
                  (b) => b.id === contract.bidId
                );
                return (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      {contract.title}
                    </TableCell>
                    <TableCell>{relatedBid?.projectName}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(contract.status)}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {contract.signedAt
                        ? (Object.prototype.toString.call(contract.signedAt) ===
                          "[object Date]"
                            ? (contract.signedAt as unknown as Date)
                            : new Date(contract.signedAt as string)
                          ).toLocaleDateString()
                        : "Not signed"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default BidsContracts;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Users = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const pageSize = 4;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => api.getUsers(page, pageSize),
  });

  const formatAddress = (user: any) => {
    const { street, city, zipcode } = user.address;
    return `${street}, ${city}, ${zipcode}`;
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Error Loading Users</h2>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        <h1 className="text-5xl font-bold text-foreground mb-8">Users</h1>

        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full name</TableHead>
                <TableHead>Email address</TableHead>
                <TableHead style={{ width: "392px" }}>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-32">
                    <Loader className="mx-auto" />
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => navigate(`/users/${user.id}/posts`)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium text-foreground">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell 
                      className="text-foreground truncate" 
                      style={{ maxWidth: "392px" }}
                      title={formatAddress(user)}
                    >
                      {formatAddress(user)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {data && (
            <div className="flex items-center justify-center gap-2 p-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              {(() => {
                const totalPages = data.totalPages;
                const currentPage = page;
                const pageNumbers: (number | string)[] = [];
                
                if (totalPages <= 7) {
                  // Show all pages if 7 or fewer
                  for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                  }
                } else {
                  // Always show first page
                  pageNumbers.push(1);
                  
                  if (currentPage <= 3) {
                    // Near start: 1, 2, 3, 4, ..., last
                    pageNumbers.push(2, 3, 4, '...', totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    // Near end: 1, ..., last-3, last-2, last-1, last
                    pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                  } else {
                    // Middle: 1, ..., current-1, current, current+1, ..., last
                    pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                  }
                }
                
                return pageNumbers.map((pageNum, idx) => {
                  if (pageNum === '...') {
                    return <span key={`ellipsis-${idx}`} className="text-muted-foreground px-2">...</span>;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(pageNum as number)}
                      className={`w-8 h-8 p-0 ${
                        page === pageNum 
                          ? "bg-background border border-[#E2E8F0] hover:bg-background" 
                          : ""
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                });
              })()}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

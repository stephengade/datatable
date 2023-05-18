import {
    Box,
    Paper,
    Skeleton,
    Table as MuiTable,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Menu,
    MenuItem,
  } from "@mui/material";
  import {
    Cell,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
  } from "@tanstack/react-table";
  import { debounce } from "lodash";
  import { ChangeEvent, FC, memo, ReactElement, useMemo, useState } from "react";
  import { StyledPagination, StyledTableRow } from "./Styled";
  
  
  
  interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
    isFetching?: boolean;
    skeletonCount?: number;
    skeletonHeight?: number;
    headerComponent?: JSX.Element;
    pageCount?: number;
    page?: (page: number) => void;
    search?: (search: string) => void;
    onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
    searchLabel?: string;
    EmptyText?: string;
    children?: React.ReactNode | React.ReactElement
    handleRow?: () => void
  
  }
  
  const Table: FC<TableProps> = ({
    data,
    columns,
    isFetching,
    skeletonCount = 10,
    skeletonHeight = 28,
    headerComponent,
    pageCount,
    search,
    onClickRow,
    page,
    searchLabel = "Search",
    EmptyText,
  children,
  
    handleRow
  
  }) => {
    const [paginationPage, setPaginationPage] = useState(1);
  
    const memoizedData = useMemo(() => data, [data]);
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoisedHeaderComponent = useMemo(
      () => headerComponent,
      [headerComponent]
    );
  
    const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
      data: memoizedData,
      columns: memoizedColumns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount,
    });
  
    const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);
  
    const columnCount = getAllColumns().length;
  
    const noDataFound =
      !isFetching && (!memoizedData || memoizedData.length === 0);
  
    const handleSearchChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      search && search(e.target.value);
    };
  
    const handlePageChange = (
      event: ChangeEvent<unknown>,
      currentPage: number
    ) => {
      setPaginationPage(currentPage === 0 ? 1 : currentPage);
      page?.(currentPage === 0 ? 1 : currentPage);
    };
  
    return (
      <Paper elevation={2} style={{ padding: "0 0 1rem 0" }}>
        <Box paddingX="1rem">
          {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
          {search && (
            <TextField
              onChange={debounce(handleSearchChange, 1000)}
              size="string"
              label={searchLabel}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )}
        </Box>
        <Box style={{ overflowX: "auto" }}>
          <MuiTable>
            {!isFetching && (
              <TableHead>
                {getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-[#000]">
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} className="text-white text-sm font-cambon" >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableCell>
  
  
                    ))}
  
  
                  </TableRow>
                ))}
              </TableHead>
            )}
            <TableBody>
              {!isFetching ? (
                getRowModel()?.rows.map((row) => (
                  <StyledTableRow key={row.id} onClick={handleRow}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        onClick={() => onClickRow?.(cell, row)}
                        key={cell.id}
                        className="text-[#2E353A] text-base font-graphik"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                      
                    ))}
  
                 
  
  
  
                  </StyledTableRow>
  
  
  
  
                )
  
  
                )
              ) : (
                <>
                  {skeletons.map((skeleton) => (
                    <TableRow key={skeleton}>
                      {Array.from({ length: columnCount }, (x, i) => i).map(
                        (elm) => (
                          <TableCell key={elm}>
                            <Skeleton height={skeletonHeight} />
                          </TableCell>
  
  
                        )
                      )}
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </MuiTable>
        </Box>
        {noDataFound && (
          <Box my={2} textAlign="center">
            {EmptyText}
          </Box>
        )}
        {pageCount && page && (
         <StyledPagination
         count={pageCount}
         page={paginationPage}
         onChange={handlePageChange}
         color="primary"
         showFirstButton 
         showLastButton
       />
        )}
      </Paper>
    );
  };
  
  Table.defaultProps = {
    EmptyText: "No Data is found"
  }
  
  
  export default memo(Table);
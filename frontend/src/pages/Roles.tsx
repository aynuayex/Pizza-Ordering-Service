import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_GlobalFilterTextField,
  // MRT_GlobalFilterTextInput,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};

type User = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
};

const Roles = () => {
  //data and fetching state
  const [data, setData] = useState<User[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await axiosPrivate.get<UserApiResponse>("/role", {
          params: {
            start: pagination.pageIndex * pagination.pageSize,
            size: pagination.pageSize,
            filters: JSON.stringify(columnFilters ?? []),
            globalFilter: globalFilter ?? "",
            sorting: JSON.stringify(sorting ?? []),
          },
        });
        setData(response.data.data);
        setRowCount(response.data.meta.totalRowCount);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters, //re-fetch when column filters change
    globalFilter, //re-fetch when global filter changes
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    sorting, //re-fetch when sorting changes
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!data.length) {
  //       setIsLoading(true);
  //     } else {
  //       setIsRefetching(true);
  //     }

  //     const url = new URL('/api/data', location.origin);
  //     url.searchParams.set(
  //       'start',
  //       `${pagination.pageIndex * pagination.pageSize}`,
  //     );
  //     url.searchParams.set('size', `${pagination.pageSize}`);
  //     url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
  //     url.searchParams.set('globalFilter', globalFilter ?? '');
  //     url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

  //     try {
  //       const response = await fetch(url.href);
  //       const json = (await response.json()) as UserApiResponse;
  //       setData(json.data);
  //       setRowCount(json.meta.totalRowCount);
  //     } catch (error) {
  //       setIsError(true);
  //       console.error(error);
  //       return;
  //     }
  //     setIsError(false);
  //     setIsLoading(false);
  //     setIsRefetching(false);
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   columnFilters, //re-fetch when column filters change
  //   globalFilter, //re-fetch when global filter changes
  //   pagination.pageIndex, //re-fetch when page index changes
  //   pagination.pageSize, //re-fetch when page size changes
  //   sorting, //re-fetch when sorting changes
  // ]);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Role Name",
      },
      //column definitions...
      {
        accessorKey: "createdAt",
        header: "Created at",
      },
      // {
      //   accessorKey: 'address',
      //   header: 'Address',
      // },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      // },
      // {
      //   accessorKey: 'phoneNumber',
      //   header: 'Phone Number',
      // },
      //end
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    // enableColumnFilters: false,
    enableSorting: false,
    enablePagination: false,
// enableGlobalFilter: true,

    initialState: { showColumnFilters: false , showGlobalFilter: true,},

    //add custom action buttons to top-left of top toolbar
    renderTopToolbarCustomActions: () => (
      <Button
        sx={{
          bgcolor: "#FF8100",
          textTransform: "none",
          width: "105px",
          height: "34px",
          padding: "5px 20px 5px 20px",
          borderRadius: "5px",
        }}
        onClick={() => {
          alert("Create New Account");
        }}
        variant="contained"
      >
        Add Role
      </Button>
    ),
    //customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        {/* add custom button to print table  */}
        {/* <IconButton
          onClick={() => {
            window.print();
          }}
        >
          <PrintIcon />
        </IconButton> */}
        {/* along-side built-in buttons in whatever order you want them */}
        {/* <MRT_GlobalFilterTextField  table={table} />  */}
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),

    defaultColumn: {
    minSize: 20, //allow columns to get smaller than default
    maxSize: 90, //allow columns to get larger than default
    size: 30, //make columns wider by default
  },

  muiTablePaperProps: {
    elevation: 0, //change the mui box shadow
    //customize paper styles
    sx: {
      // boxSizing: "border-box",
      // borderRadius: '0',
        padding: "49px 44px 194px 45px",

      // border: '1px dashed #0000001F',
    },
  },

    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        // width: "100%",
        // margin: "49px 44px 194px 45px",
        border: "1px solid #0000001F",
        borderBottom: "none",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        // border: '1px solid rgba(81, 81, 81, .5)',
        // caption: {
          //   captionSide: "top",
          // },
        },
      },
      muiTopToolbarProps: {
        sx: {
        border: "1px solid #0000001F",
        borderBottom: "none",
        borderRadius: "4px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
      }
    },
    muiTableHeadCellProps: {
      sx: {
        // border: "1px solid #0000001F",
        // border: '1px solid rgba(81, 81, 81, .5)',
        bgcolor: "#F6F6F6",
        // backgroundClip: "padding-box",
        // fontStyle: "italic",
        // fontWeight: "normal",
      },
    },
    muiPaginationProps: {
      sx: {
        // boxShadow: "none",
        boxShadow: "0 1px 2px -1px #FFF inset",
        height: 0,
        elevation: "none"
      }
    },
    // muiTableBodyCellProps: {
    //   sx: {
    //     border: "1px solid #0000001F",
    //     // border: '1px solid rgba(81, 81, 81, .5)',
    //   },
    // },
    // enableRowSelection: true,
    
    getRowId: (row) => row.phoneNumber,
    // initialState: { showColumnFilters: false, showGlobalFilter: true,},
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return (
    // <Box
    //   sx={{
    //     //       width: 1142px,
    //     // height: "483px",
    //     // padding: "49px 44px 194px 45px",
    //     // border-radius: 5px 0px 0px 0px;
    //     // opacity: 0px;
    //   }}
    // >
      <MaterialReactTable table={table} />
    // </Box>
  );
};

export default Roles;

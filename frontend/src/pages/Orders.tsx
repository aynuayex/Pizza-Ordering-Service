import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { format, parseISO } from "date-fns";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { mkConfig, generateCsv, download } from "export-to-csv";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

import fileDownload from "@/assets/fileDownload.svg";
import Toast from "@/components/Toast";

type OrderApiResponse = {
  data: Array<Order>;
  meta: {
    totalRowCount: number;
  };
};

type Order = {
  id: string;
  pizzaId: string;
  pizza: string;
  customerId: string;
  customer: string;
  quantity: number;
  totalAmount: number;
  status: "Preparing" | "Ready" | "Delivered";
  toppings: string;
  createdAt: string;
  updatedAt: string;
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const chipColors = ["#01C550", "#C50101", "#008000", "#008077", "#FF992180"];

const Orders = () => {
  const [selectedRow, setSelectedRow] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  // const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);
  //manage our own state for stuff we want to pass to the API
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const axiosPrivate = useAxiosPrivate();

  //consider storing this code in a custom hook (i.e useFetchUsers)
  const {
    data: { data = [], meta } = {}, //your data and api response will probably be different
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<OrderApiResponse>({
    queryKey: [
      "table-data",
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const response = await axiosPrivate.get<OrderApiResponse>("/order", {
        params: {
          start: pagination.pageIndex * pagination.pageSize,
          size: pagination.pageSize,
          filters: JSON.stringify(columnFilters ?? []),
          globalFilter: globalFilter ?? "",
          sorting: JSON.stringify(sorting ?? []),
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData, //don't go to 0 rows when refetching or paginating to next page
  });

  console.log({ data });
  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({row}) => JSON.parse(row.original.customer ?? "{}").fullName
      },
      {
        accessorKey: "toppings",
        header: "Topping",
        Cell: ({ row }) => (
          <Button
            sx={{ display: "flex", gap: "5px", color: "#FF8100" }}
            onClick={() => {
              setOpenDialog(true);
              setSelectedRow(row.original.id);
            }}
            // onClick={() => handleRoleUpdate(row.original.id)}
          >
            <VisibilityIcon />
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "14.52px",
                textTransform: "none",
              }}
            >
              Toppings
            </Typography>
          </Button>
        ),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "phoneNumber",
        header: "Customer No",
        Cell: ({row}) => JSON.parse(row.original.customer ?? "{}").phoneNumber
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        Cell: ({ cell }) =>
          format(parseISO(cell.getValue<string>()), "h:mm a d/MM/yy"),
      },
    ],
    []
  );

  // const handleOrderStatusChange = (id: string, isChecked: boolean) => {
  //   // if (!checked[id]) checked[id] = false;
  //   console.log({ id, isChecked, checked });
  //   setChecked((prevChecked) => ({
  //     ...prevChecked,
  //     [id]: isChecked,
  //   }));
  // };

  const handleOrderStatusChange = async (event: SelectChangeEvent, id: string) => {
    try {
      const response = await axiosPrivate.patch("/order/status", {
        id,
        status: event.target.value,
      });
      if (response.status === 200) {
        <Toast
          message={`order successfully ${
            response.data.active ? "activated" : "deactivated"
          }`}
          severity="success"
        />;
        refetch();
      }
    } catch (err: any) {
      <Toast
        message={`operation error ${err.response.data}`}
        severity="error"
      />;
    }
    // setStatus(event.target.value as string);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    // enableColumnFilters: false,
    enableSorting: false,
    enablePagination: false,
    enableGlobalFilter: true,
    enableToolbarInternalActions: true,
    // initialState: { showGlobalFilter: false },
    enableRowActions: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Status", //change header text
        // size: 532, //make actions column wider
      },
    },
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      // <Box
      //   sx={{
      //     display: "flex",
      //     alignItems: "center",
      //     flexWrap: "nowrap",
      //     gap: "8px",
      //   }}
      // >
      //   <Button
      //     color="inherit" // Set to inherit to use custom colors from sx
      //     sx={{
      //       width: "112px",
      //       height: "30px",
      //       padding: "7px 16.6px 8px 17.4px",
      //       fontFamily: "Inter",
      //       fontSize: "12px",
      //       fontWeight: 400,
      //       lineHeight: "14.52px",
      //       "& .MuiFormControlLabel-label": {
      //         width: "45px",
      //         mr: checked[row.original.id] ? "3px" : "15px",
      //       },
      //       textTransform: "none",
      //       borderRadius: "15px",
      //       color: checked[row.original.id] ? "#008000" : "#FF0000",
      //       bgcolor: checked[row.original.id] ? "#0080001A" : "#FF00001A",
      //     }}
      //   >
      //     <FormControlLabel
      //       control={
      //         <Switch
      //           size="small"
      //           checked={checked[row.original.id] ?? false}
      //           onChange={(event) =>
      //             handleOrderStatusChange(row.original.id, event.target.checked)
      //           }
      //           sx={{
      //             mr: 2,
      //             "& .MuiSwitch-thumb": {
      //               width: "9px",
      //               height: "9px",
      //               borderRadius: "40px",
      //               mt: "2px",
      //               color: checked[row.original.id]
      //                 ? "success.main"
      //                 : "error.main",
      //             },
      //             "& .MuiSwitch-track": {
      //               width: "18px",
      //               height: "7px",
      //               // bgcolor: "error.light",
      //               bgcolor: checked[row.original.id]
      //                 ? "success.light !important"
      //                 : "error.light",
      //             },
      //             "& .Mui-checked+.MuiSwitch-track": {
      //               bgcolor: "success.light",
      //             },
      //           }}
      //         />
      //       }
      //       label={checked[row.original.id] ? "Active" : "Inactive"}
      //       labelPlacement="start"
      //     />
      //   </Button>
      // </Box>
      // <Box sx={{ minWidth: 120 }}>
      // <FormControl fullWidth>
      //   <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select 
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          // value={status}
          value={row.original.status}
          onChange={(e) => handleOrderStatusChange(e, row.original.id)}
        >
          <MenuItem value="Preparing">Preparing</MenuItem>
          <MenuItem value="Ready">Ready</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      // </FormControl>
    // </Box>
    ),
    // renderCaption: 'Packages',
    //add custom label to the top-left of top toolbar
    renderTopToolbarCustomActions: () => (
      <Typography
        variant="subtitle1"
        sx={{
          ml: "16px",
          alignSelf: "center",
          // fontFamily: "Roboto",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          letterSpacing: "0.15px",
          color: "#00000099",
        }}
      >
        Packages
      </Typography>
    ),
    //customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* add custom buttons */}
        <Tooltip arrow title="Refresh Data">
          <IconButton sx={{ color: "#00000099" }} onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        {/* Global Filter positioned here, visible only when toggled */}
        {showGlobalFilter ? (
          <Tooltip arrow title="Hide search">
            <IconButton
              sx={{ color: "#00000099" }}
              onClick={() => setShowGlobalFilter(false)}
            >
              <SearchOffIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip arrow title="Show search">
            <IconButton
              sx={{ color: "#00000099" }}
              onClick={() => setShowGlobalFilter(true)}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* add custom buttons */}
        <Tooltip arrow title="Export to CSV">
          <IconButton
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
          >
            <Box
              component={"img"}
              sx={{
                color: "#00000099",
              }}
              src={fileDownload}
              alt="file download Icon"
            />
          </IconButton>
        </Tooltip>

        {/* along-side built-in buttons in whatever order you want them */}
        <Divider orientation="vertical" variant="middle" flexItem />
        <MRT_ToggleFiltersButton table={table} sx={{ color: "#00000099" }} />
        <MRT_ShowHideColumnsButton table={table} sx={{ color: "#00000099" }} />
        <MRT_ToggleDensePaddingButton table={table} sx={{ color: "#606060" }} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <MRT_ToggleFullScreenButton table={table} sx={{ color: "#000000BF" }} />
      </Box>
    ),

    defaultColumn: {
      // minSize: 20, //allow columns to get smaller than default
      // maxSize: 90, //allow columns to get larger than default
      // size: 266, //make columns wider by default
    },

    muiTableBodyRowProps: { hover: false },
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow
      //customize paper styles
      sx: {
        boxSizing: "border-box",
        borderRadius: "5px",
        padding: "49px 44px 194px 45px",
        boxShadow: "0px 0px 15px 0px #0000000D",
      },
    },

    muiTableProps: {
      sx: {
        border: "1px solid #0000001F",
        borderBottom: "none",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
        // caption: {
        //   captionSide: 'top',
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
      },
    },
    muiTableHeadCellProps: {
      sx: {
        bgcolor: "#F6F6F6",
      },
    },
    muiPaginationProps: {
      sx: {
        // "& .MuiBox-root": {
        //   border: "none",
        //   height: 0,
        //   boxShadow: "none !important",
        //   elevation: "none",
        // },
        elevation: "none",
        height: 0,
        boxShadow: "none !important",
        border: "none",
      },
    },
    getRowId: (row) => row.id,
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
    // manually toggle global search field
    onShowGlobalFilterChange: setShowGlobalFilter,
    rowCount: meta?.totalRowCount ?? 0,
    state: {
      showGlobalFilter,
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
    <>
      <MaterialReactTable table={table} />

      <BootstrapDialog
        PaperProps={{
          sx: {
            width: "457px",
            height: "283px",
            padding: "47px 24px 0px 24px",
            borderRadius: "20px",
          },
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpenDialog(false)}
          sx={{
            // w: "102px", h: "32px",
            position: "absolute",
            right: 8,
            top: 8,
            color: "#000000BF",
          }}
        >
          <CancelOutlinedIcon sx={{ fontSize: "32px" }} />
        </IconButton>
        <DialogContent>
          <Typography
            gutterBottom
            sx={{
              textAlign: "center",
              textTransform: "none",
              // fontFamily: "Roboto",
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: "24px",
              color: "#000000",
              mb: "30px",
            }}
          >
            Order Details
          </Typography>
          <Box
            sx={{
              fontsize: "30px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={3}>
              <Typography
                gutterBottom
                sx={{
                  textAlign: "left",
                  textTransform: "none",
                  // fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#00000080",
                }}
              >
                Name:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                sx={{
                  textAlign: "left",
                  textTransform: "none",
                  // fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#000",
                }}
              >
                {JSON.parse(data.filter((order) => order.id === selectedRow)[0]?.pizza ?? "{}").name}
              </Typography>
            </Stack>
            <Typography
              gutterBottom
              sx={{
                textAlign: "left",
                textTransform: "none",
                // fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#00000080",
              }}
            >
              Toppings:
              {JSON.parse(
                data.filter((order) => order.id === selectedRow)[0]?.toppings ??
                  "[]"
              ).map((topping: string, index: number) => (
                <Chip
                  sx={{ ml: 1, color: "#FFF", bgcolor: chipColors[index] }}
                  label={
                    <Typography>
                      {topping
                        .split("_")
                        .map((word) => {
                          return (
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                          );
                        })
                        .join(" ")}
                    </Typography>
                  }
                />
              ))}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography
                gutterBottom
                sx={{
                  textAlign: "left",
                  textTransform: "none",
                  // fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#00000080",
                }}
              >
                Quantity:
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                sx={{
                  textAlign: "left",
                  textTransform: "none",
                  // fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#000",
                }}
              >
                {data.filter((order) => order.id === selectedRow)[0]?.quantity}
              </Typography>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default Orders;

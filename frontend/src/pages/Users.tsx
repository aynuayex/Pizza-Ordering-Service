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
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { mkConfig, generateCsv, download } from "export-to-csv";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

import fileDownload from "@/assets/fileDownload.svg";
import Toast from "@/components/Toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { addAdminSchema, AddAdminSchema } from "@/schema/addAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  location: string;
  phoneNumber: string;
  refreshToken: string;
  // please check here to make the value to be stringified before sending
  //  as a json resp, otherwise error with exporting to csv
  // refreshToken: string[];
  active: boolean;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Users = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
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
  } = useQuery<UserApiResponse>({
    queryKey: [
      "table-data",
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const response = await axiosPrivate.get<UserApiResponse>("/user", {
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
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "User Name",
        Cell: ({ row }) => (
          <span>
            {row.original.fullName &&
              row.original.fullName
                .split(" ")
                .map((word) => {
                  return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  );
                })
                .join(" ")}
          </span>
        ),
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone No",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    []
  );

  // const updatedrole = useMutation({
  //   mutationKey: ['UPDATE_ROLE_ACTIVE_STATUS'],
  //   mutationFn: async (id: string, isChecked: boolean) => {
  //     const response = await axiosPrivate.put("/role",{id, isChecked});
  //     return response;
  //   },
  //   onSuccess: (data) => {
  //     if (data.status === 200) {
  //       <Toast message={`role successfully ${data.data.active? "activated": "deactivated"}`} severity="success" />
  //     }
  //   },
  //   onError: (error) => {
  //     <Toast message={`operation error ${error.message}`} severity="error" />
  //   },
  // });
  const handleChange = async (id: string, isChecked: boolean) => {
    try {
      const response = await axiosPrivate.put("/user", { id, isChecked });
      if (response.status === 200) {
        <Toast
          message={`role successfully ${
            response.data.active ? "activated" : "deactivated"
          }`}
          severity="success"
        />;
        refetch();
        // data.forEach((role) =>
        //   role.id === id ? { ...role, active: isChecked } : role
        // );
      }
    } catch (err: any) {
      <Toast
        message={`operation error ${err.response.data}`}
        severity="error"
      />;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosPrivate.delete("/user", { data: { id } });
      if (response.status === 200) {
        <Toast message={`role successfully deleted`} severity="success" />;
        refetch();
      }
    } catch (err: any) {
      <Toast
        message={`operation error ${err.response.data}`}
        severity="error"
      />;
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    control,
  } = useForm<AddAdminSchema>({
    resolver: zodResolver(addAdminSchema),
    defaultValues: {
      adminName: "",
      email: "",
      phoneNumber: "",
      location: "",
      password: "",
      // permissions: permissions.map((item) => ({
      //   label: item.label,
      //   permission: item.permission,
      //   checked: item.label === "Create Roles" ? false : true, // default state
      // })),
    },
  });

  const onSubmit: SubmitHandler<AddAdminSchema> = async (data) => {
    try {
      // setOpen(true);
      // console.log({ data });
      // let response;
      // if (roleAction === "Create") {
      //   response = await axiosPrivate.post("/role", {
      //     roleName: data.roleName,
      //     permissions: JSON.stringify(data.permissions),
      //   });
      // }
      // response = await axiosPrivate.patch("/role", {
      //   roleName: data.roleName,
      //   permissions: JSON.stringify(data.permissions),
      // });
      // console.log({ responseData: response.data });
      // <Toast
      //   message={`role successfully ${roleAction}!`}
      //   severity="success"
      // />;
    } catch (err: any) {
      console.error(err);
      <Toast
        message={`operation error ${err.response.data}`}
        severity="error"
      />;
    }
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

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
        // header: 'Change Account Settings', //change header text
        // size: 532, //make actions column wider
      },
    },
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: "8px",
        }}
      >
        <Button
          color="inherit" // Set to inherit to use custom colors from sx
          sx={{
            width: "112px",
            height: "30px",
            padding: "7px 16.6px 8px 17.4px",
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "14.52px",
            "& .MuiFormControlLabel-label": {
              width: "45px",
              mr: row.original.active ? "3px" : "15px",
            },
            textTransform: "none",
            borderRadius: "15px",
            color: row.original.active ? "#008000" : "#FF0000",
            bgcolor: row.original.active ? "#0080001A" : "#FF00001A",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={row.original.active ?? false}
                onChange={(event) =>
                  handleChange(row.original.id, event.target.checked)
                }
                sx={{
                  mr: 2,
                  "& .MuiSwitch-thumb": {
                    width: "9px",
                    height: "9px",
                    borderRadius: "40px",
                    mt: "2px",
                    color: row.original.active ? "success.main" : "error.main",
                  },
                  "& .MuiSwitch-track": {
                    width: "18px",
                    height: "7px",
                    // bgcolor: "error.light",
                    bgcolor: row.original.active
                      ? "success.light !important"
                      : "error.light",
                  },
                  "& .Mui-checked+.MuiSwitch-track": {
                    bgcolor: "success.light",
                  },
                }}
              />
            }
            label={row.original.active ? "Active" : "Inactive"}
            labelPlacement="start"
          />
        </Button>

        <IconButton
          sx={{ color: "#000000BF" }}
          onClick={() => console.info("Edit")}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#000000BF" }}
          onClick={() => handleDelete(row.original.id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    ),
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
        onClick={() => setOpenFormDialog(true)}
        variant="contained"
      >
        Add User
      </Button>
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
      <MaterialReactTable table={table} />;
      <Dialog
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        PaperProps={{
          sx: {
            // padding: 50px 0px 0px 0px;
            // gap: 20px;

            width: "654px",
            height: "584px",
            paddingX: "50px",

            borderRadius: "20px",
          },
        }}
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title" textAlign={"center"}>
          Add User
        </DialogTitle>
        <DialogContent>
          <Controller
            name="adminName"
            control={control}
            render={({ field }) => (
              <TextField
                autoFocus
                required
                fullWidth
                margin="dense"
                {...field}
                label="Admin Name"
                type="text"
                disabled={isSubmitting}
                error={!!errors.adminName}
                helperText={errors.adminName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                margin="dense"
                {...field}
                label="Email"
                type="text"
                disabled={isSubmitting}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                margin="dense"
                {...field}
                label="Phone Number"
                type="text"
                disabled={isSubmitting}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                margin="dense"
                {...field}
                label="Location"
                type="text"
                disabled={isSubmitting}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                margin="dense"
                {...field}
                label="Password"
                type="text"
                disabled={isSubmitting}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                select
                required
                margin="dense"
                {...field}
                // value={formData.category}
                // onChange={handleInputChange}
                label="Select Role"
                disabled={isSubmitting}
                error={!!errors.role}
                helperText={errors.role?.message}
                // fullWidth
                // variant="filled"
              >
                <MenuItem value="FICTION">Fiction</MenuItem>
                <MenuItem value="SELF_HELP">Self Help</MenuItem>
                <MenuItem value="BUSINESS">Business</MenuItem>
              </TextField>
            )}
          />

          <Button
            variant="contained"
            // fullWidth
            autoFocus
            sx={{ textTransform: "none", m: 2, bgcolor: "primary.light" }}
            onClick={() => setOpenFormDialog(false)}
          >
            Add
          </Button>

          {/* <TextField
            autoFocus
            required
            margin="dense"
            name="book"
            value={formData.book}
            onChange={handleInputChange}
            label="Book Name"
            fullWidth
            variant="filled"
          />
          <TextField
            required
            margin="dense"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            label="Author Name"
            fullWidth
            variant="filled"
          /> */}
          {/* <TextField
            select
            required
            margin="dense"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            label="Category"
            fullWidth
            variant="filled"
          >
            <MenuItem value="FICTION">Fiction</MenuItem>
            <MenuItem value="SELF_HELP">Self Help</MenuItem>
            <MenuItem value="BUSINESS">Business</MenuItem>
          </TextField> */}
        </DialogContent>
        {/* <DialogActions>
          <Button
            variant="contained"
            fullWidth
            autoFocus
            sx={{ textTransform: "none", m: 2, bgcolor: "primary.light" }}
            onClick={() => setOpenFormDialog(false)}
          >
            Add
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default Users;

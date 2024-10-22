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
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { mkConfig, generateCsv, download } from "export-to-csv";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

import fileDownload from "@/assets/fileDownload.svg";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { roleSchema, RoleSchema } from "@/schema/roleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "@/components/Toast";

type RoleApiResponse = {
  data: Array<Role>;
  meta: {
    totalRowCount: number;
  };
};

type Role = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  permissions: string; // CASL abilities in JSON format
  // permissions: {action: string, subject: string}[]; // CASL abilities in JSON format
  createdAt: string;
  updatedAt: string;
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const permissions = [
  // { name: "update_order_status", label: "Update Order Status" },
  // { name: "see_customers", label: "See Customers" },
  // { name: "see_orders", label: "See Orders" },
  // { name: "create_roles", label: "Create Roles" },
  // { name: "add_users", label: "Add Users" },
  {
    permission: [{ action: "update", subject: "Order Status" }],
    label: "Update Order Status",
  },
  {
    permission: [{ action: "read", subject: "Customers" }],
    label: "See Customers",
  },
  { permission: [{ action: "read", subject: "Orders" }], label: "See Orders" },
  {
    permission: [{ action: "create", subject: "Roles" }],
    label: "Create Roles",
  },
  { permission: [{ action: "create", subject: "Users" }], label: "Add Users" },
];

const Roles = () => {
  const [roleAction, setRoleAction] = useState("Create");
  const [openDialog, setOpenDialog] = useState(false);
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
  } = useQuery<RoleApiResponse>({
    queryKey: [
      "table-data",
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const response = await axiosPrivate.get<RoleApiResponse>("/role", {
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
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Role Name",
        Cell: ({ row }) => (
          <span>
            {row.original.name &&
              row.original.name
                .split("_")
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
        accessorKey: "createdAt",
        header: "Created at",
        Cell: ({ cell }) =>
          format(parseISO(cell.getValue<string>()), "d/MM/yy"),
      },
    ],
    []
    //end
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
  const handleRoleStatusChange = async (id: string, isChecked: boolean) => {
    try {
      const response = await axiosPrivate.patch("/role/status", {
        id,
        isChecked,
      });
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

  const handleRoleDelete = async (id: string) => {
    try {
      const response = await axiosPrivate.delete("/role", { data: { id } });
      if (response.status === 200) {
        <Toast message={`role successfully deleted`} severity="success" />;
        refetch();
      }
    } catch (err: any) {
      console.log({ err: err.response.data.message });
      <Toast
        message={`operation error ${err.response.data.message}`}
        severity="error"
      />;
    }
  };

  const handleRoleUpdate = async (id: string) => {
    setRoleAction("Update");
    const role = data.filter((role) => role.id === id)[0];

    const roleName = role.name;
    const description = role.description;

    setValue("roleName", roleName);
    setValue(
      "permissions",
      permissions.map((item) => ({
        label: item.label,
        permission: item.permission,
        checked: description.split(", ").includes(item.label) ? true : false, // default state
      }))
    );
    setOpenDialog(true);
  };

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    control,
  } = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: "",
      permissions: permissions.map((item) => ({
        label: item.label,
        permission: item.permission,
        checked: item.label === "Create Roles" ? false : true, // default state
      })),
    },
  });

  const onSubmit: SubmitHandler<RoleSchema> = async (data) => {
    try {
      // setOpen(true);
      console.log({ data });
      let response;
      if (roleAction === "Create") {
        response = await axiosPrivate.post("/role", {
          roleName: data.roleName,
          permissions: JSON.stringify(data.permissions),
        });
      }
      response = await axiosPrivate.patch("/role", {
        roleName: data.roleName,
        permissions: JSON.stringify(data.permissions),
      });
      console.log({ responseData: response.data });

      <Toast
        message={`role successfully ${roleAction}!`}
        severity="success"
      />;
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
        size: 532, //make actions column wider
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
        {/* <Button
          // fullWidth
          // add circle here
          //   startIcon={checked ? <CheckIcon /> : <ClearIcon />}
          color={row.original.name === "CUSTOMER" ? "error" : "success"}
          sx={{
            textTransform: "none",
            borderRadius: 6,
            p: 0,
            // color: row.original.name === "CUSTOMER" ? "#0080001A" : "error",
            bgcolor: row.original.name === "CUSTOMER" ? "#0080001A" : "error",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                sx={{
                  '& .MuiSwitch-input': {
                    color: "error"
                  }
                  // color:
                  //   row.original.name === "CUSTOMER" ? "#0080001A" : "error",
                }}
                // checked={checked}
                // onChange={(event) => handleChange(id, event.target.checked)}
                color={row.original.name === "CUSTOMER" ? "error" : "success"}
              />
            }
            label={row.original.name === "CUSTOMER" ? "Inactive" : "Active"}
            labelPlacement="start"
          />
        </Button> */}
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
                checked={row.original.active}
                onChange={(event) =>
                  handleRoleStatusChange(row.original.id, event.target.checked)
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
                      ? "success.light "
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
          onClick={() => handleRoleUpdate(row.original.id)}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#000000BF" }}
          onClick={() => handleRoleDelete(row.original.id)}
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
        onClick={() => {
          setRoleAction("Create");
          setValue("roleName", "");
          setOpenDialog(true);
        }}
        variant="contained"
      >
        Add Role
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
      <MaterialReactTable table={table} />

      <Dialog
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        PaperProps={{
          sx: {
            width: "505px",
            height: "461px",
            padding: "36px 67px 36px 68px",

            borderRadius: "20px",
          },
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogContent>
          <Box
            sx={{
              fontsize: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              gutterBottom
              sx={{
                width: "44px",
                height: "24px",
                color: "#00000080",
                textTransform: "none",
                fontFamily: "Roboto",
                fontSize: "22px",
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "0.15000000596046448px",
              }}
            >
              Role
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Controller
                name="roleName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Role Name"
                    type="text"
                    disabled={isSubmitting}
                    error={!!errors.roleName}
                    helperText={errors.roleName?.message}
                  />
                )}
              />
              <Typography
                sx={{
                  mt: "20px",
                  width: "124px",
                  height: "24px",
                  fontFamily: "Roboto",
                  fontSize: "22px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                  color: "#00000080",
                }}
              >
                Permissions
              </Typography>

              <Controller
                name="permissions"
                control={control}
                render={({ field: { value = [], onChange } }) => (
                  <Grid container spacing="5px">
                    {permissions.map((permission, index) => (
                      <Grid item xs={6} key={permission.label}>
                        <FormControl
                          error={!!errors.permissions?.[index]?.checked}
                        >
                          <FormControlLabel
                            label={permission.label}
                            control={
                              <Checkbox
                                checked={value[index]?.checked || false}
                                onChange={(e) => {
                                  let updatedPermissions = [...value];
                                  updatedPermissions[index] = {
                                    ...updatedPermissions[index],
                                    checked: e.target.checked,
                                  };
                                  onChange(updatedPermissions);
                                }}
                                disabled={isSubmitting}
                                size="large"
                                sx={{
                                  "&.Mui-checked": {
                                    color: "#FF8100",
                                  },
                                }}
                              />
                            }
                          />
                          {errors.permissions?.[index]?.checked && (
                            <FormHelperText>
                              {errors.permissions[index].checked.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            sx={{
              width: "184px",
              height: "44px",
              p: "10px 20px",
              borderRadius: "5px",
              bgcolor: "#FF8100",
              mb: 2,
              textTransform: "none",
              fontFamily: "Roboto",
              fontSize: "22px",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "0.15000000596046448px",
            }}
            // autoFocus
            // onClick={() => setOpenDialog(false)}
            variant="contained"
          >
            {roleAction}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Roles;

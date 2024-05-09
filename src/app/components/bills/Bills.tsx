"use client";

import { FC, useState } from "react";
import Link from "next/link";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridValidRowModel,
  GridPaginationModel,
  GridCallbackDetails,
  GridSortModel,
  GridFilterModel,
  getGridStringOperators,
  getGridDateOperators,
} from "@mui/x-data-grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, styled } from "@mui/material";
import useSWR from "swr";
import { BillsResType } from "@/app/types/bills";

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["equals", "contains"].includes(value)
);

const filterDateOperators = getGridDateOperators().filter(({ value }) =>
  ["is", "after", "before"].includes(value)
);

const columns: GridColDef<GridValidRowModel>[] = [
  {
    field: "id",
    filterOperators,
    width: 60,
  },
  {
    field: "createdAt",
    headerName: "Fecha Creacion",
    type: "date",
    filterOperators: filterDateOperators,
    valueGetter: (createdAt: string) => new Date(createdAt),
    valueFormatter: (value: Date) => {
      return (
        value.getUTCDate() +
        "/" +
        (value.getMonth() + 1) +
        "/" +
        value.getFullYear()
      );
    },
    minWidth: 110,
    flex: 0.1,
  },
  {
    field: "delivery_date",
    headerName: "Fecha Entrega",
    type: "date",
    filterOperators: filterDateOperators,
    valueGetter: (deliveryDate: Date | null) =>
      deliveryDate ? new Date(deliveryDate) : null,
    valueFormatter: (value: Date) => {
      if (value)
        return (
          value.getUTCDate() +
          "/" +
          (value.getMonth() + 1) +
          "/" +
          value.getFullYear()
        );
    },
    minWidth: 110,
    flex: 0.1,
  },
  {
    editable: false,
    sortable: false,
    field: "hour",
    headerName: "Hora",
    minWidth: 80,
    filterOperators,
  },
  {
    editable: false,
    field: "name",
    headerName: "Nombre",
    minWidth: 150,
    flex: 0.2,
    filterOperators,
  },
  {
    editable: false,
    field: "note",
    headerName: "Nota",
    minWidth: 150,
    flex: 0.1,
    filterOperators,
  },
  {
    editable: false,
    field: "phone",
    headerName: "Telefono",
    minWidth: 110,
    flex: 0.1,
    filterOperators,
  },
  {
    editable: false,
    field: "sign",
    headerName: "Seña",
    type: "number",
    valueParser: (e) => Number(e),
    valueFormatter: (value: number) => `$ ${value}`,
    minWidth: 110,
    flex: 0.1,
    filterOperators,
  },
  {
    editable: false,
    field: "state",
    headerName: "Estado",
    minWidth: 110,
    flex: 0.1,
    filterOperators,
  },
  {
    field: "actions",
    type: "actions",
    minWidth: 40,
    getActions: (params: any) => [
      <GridActionsCellItem
        icon={
          <Link href={`/bill/${params.id}`}>
            <ArrowForwardIosIcon />
          </Link>
        }
        label="Editar"
      />,
    ],
  },
];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  background: "#0d1117",
  color: "white",
  ".MuiDataGrid-columnHeaders div": {
    background: "#121212",
  },
  // Pinned columns sections
  pinnedBackground: "#340606",
  // Headers, and top & bottom fixed rows
  containerBackground: "#343434",
}));

type GridParamsType = {
  page: number;
  sortField: { field: string; sort: string };
  filter?: {
    field: string;
    operator: string;
    value: string;
  };
};

interface BillsProps {
  initialData: BillsResType;
}

const Bills: FC<BillsProps> = ({ initialData }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [data, setData] = useState(initialData);
  const [gridParams, setGridParams] = useState<GridParamsType>({
    page: -1,
    sortField: { field: "id", sort: "desc" },
  });

  const handlePagination = (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => {
    setPaginationModel(model);
    setGridParams({ ...gridParams, page: model.page });
  };

  const processData = (data: BillsResType) => {
    setData(data);
  };

  let url = `/api/bills?page=${gridParams.page}&sortField=${JSON.stringify(
    gridParams.sortField
  )}`;

  if (gridParams?.filter)
    url = url + `&filter=${JSON.stringify(gridParams.filter)}`;

  const { isLoading, error } = useSWR(
    gridParams.page != -1 ? url : null,
    (url) => fetch(url).then((res) => res.json()),
    {
      onSuccess: processData,
    }
  );

  const handleSortModelChange = (sortModel: GridSortModel) => {
    if (sortModel && sortModel.length > 0) {
      const newSort = {
        field: sortModel[0].field || "id",
        sort: sortModel[0].sort || "desc",
      };
      setGridParams({ ...gridParams, page: 0, sortField: newSort });
    }
  };

  const onFilterChange = (filterModel: GridFilterModel) => {
    // Here you save the data you need from the filter model
    if (filterModel.items[0]?.value) {
      const filter = {
        field: filterModel.items[0].field,
        operator: filterModel.items[0].operator,
        value: filterModel.items[0].value,
      };
      setGridParams({ ...gridParams, page: 0, filter });
    } else {
      if (gridParams?.filter) {
        let newGridParams = { ...gridParams };
        delete newGridParams.filter;
        setGridParams(newGridParams);
      }
    }
  };

  return (
    <Box width={"100%"}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
        <Link href="/bill">
          <Button variant="contained">Agregar</Button>
        </Link>
      </Box>

      <StyledDataGrid
        columns={columns}
        rows={data.rows}
        rowCount={data.total}
        loading={isLoading}
        className="customDataGrid"
        autoHeight
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          columnMenu: {
            color: "red",
          },
        }}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePagination}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        sortingOrder={["desc", "asc"]}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        filterDebounceMs={500}
      />
    </Box>
  );
};

export default Bills;

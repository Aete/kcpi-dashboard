import { data } from '../../../../utils/data/data';
import {
  DataGrid,
  GridRowClassNameParams,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import {
  Black,
  Black400,
  Black600,
  Black800,
  Blue50,
  BlueMyFavorite,
  LightGray100,
  Red,
  White,
} from '../../../../utils/colors';
import { Box } from '@mui/material';

const columns = [
  {
    field: 'city',
    headerName: '시도',
    type: 'number',
    width: 90,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
  },
  {
    field: 'p',
    headerName: '생산성',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
    flex: 1,
  },
  {
    field: 'infra',
    renderHeader: () => (
      <p>
        {'인프라'} <br /> {'개발'}
      </p>
    ),
    type: 'number',
    width: 90,
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
    flex: 1,
  },
  {
    field: 'qol',
    headerName: '삶의질',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
    flex: 1,
  },
  {
    field: 'esi',
    renderHeader: () => (
      <p>
        {'공정과'} <br /> {'사회통합'}
      </p>
    ),
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
    flex: 1,
  },
  {
    field: 'es',
    renderHeader: () => (
      <p>
        {'환경적'} <br /> {'지속가능성'}
      </p>
    ),
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
    flex: 1,
  },
  {
    field: 'ugl',
    renderHeader: () => (
      <p>
        {'도시화'} <br /> {'거버넌스'}
      </p>
    ),
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerClassName: 'tableHeader',
    flex: 1,
  },
];

export default function OverallTable({ sCity, hCity, setSCity }) {
  const handleClick = (params, event, details) => {
    setSCity(params.row.city);
  };

  return (
    <Box
      sx={{
        height: '75%',
        color: Black,
        flexGrow: 1,
        marginTop: '20px',
        '& .MuiDataGrid-root': {
          fontFamily: 'Pretendard, sans-serif',
        },
        '& p': {
          lineHeight: '18px',
          textAlign: 'center',
        },
        '& .tableHeader': {
          fontWeight: 700,
          color: Black,
          height: '50px',
          borderBottom: `1px solid ${Black800}`,
        },
        '& .sCity': {
          color: BlueMyFavorite,
          fontWeight: 700,
        },

        '& .hCity': {
          color: Red,
          fontWeight: 700,
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.city}
        rows={data}
        onRowClick={handleClick}
        columns={columns}
        getRowClassName={(row) => {
          if (row.id === sCity) return 'sCity';

          if (row.id === hCity) return 'hCity';

          return '';
        }}
      />
    </Box>
  );
}

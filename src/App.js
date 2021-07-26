import React, { useMemo } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

const payments = [
  {
    id: "0",
    date: 1625993399652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 500
  },
  {
    id: "1",
    date: 1625993399652,
    type: "online",
    psychologist: "Анна",
    price: 100
  },
  {
    id: "2",
    date: 1625993399652,
    type: "offline",
    psychologist: "Анна Коваль",
    price: 2300
  },
  {
    id: "3",
    date: 1625993399652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 500
  },
  {
    id: "4",
    date: 1625993299652,
    type: "offline",
    psychologist: "Анна",
    price: 52100
  },
  {
    id: "5",
    date: 1625992499652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 50012
  },
  {
    id: "6",
    date: 1625993499652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 5010
  },
  {
    id: "7",
    date: 1625993399652,
    type: "offline",
    psychologist: "Анна Коваль",
    price: 5020
  },
  {
    id: "8",
    date: 1525993399652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 50
  },
  {
    id: "9",
    date: 1225993399652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 5100
  },
  {
    id: "10",
    date: 1125993399652,
    type: "online",
    psychologist: "Анна Коваль",
    price: 5030
  }
];

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    thead > tr {
      :first-of-type {
        display: none;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "" : "") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Header",
        columns: [
          {
            Header: "Date",
            accessor: "date"
          },
          {
            Header: "Type",
            accessor: "type"
          },
          {
            Header: "Psychologist",
            accessor: "psychologist"
          },
          {
            Header: "Price",
            accessor: "price"
          }
        ]
      }
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={payments} />
    </Styles>
  );
}

export default App;

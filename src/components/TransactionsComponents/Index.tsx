import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import HeaderTransactionComponent from "./HeaderTransactionComponent";
import TableTransactionComponent from "./TableTransactionComponent";
import { getBalancesPerPerson } from "@/services/BalanceFetch";
import { useRouter } from "next/navigation";
import { BalanceValues } from "@/@types/BalanceType";

const TableComponent = () => {
  const [balances, setBalances] = useState<BalanceValues[]>([]);
  const [atualizeTable, setAtualizeTable] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      if (id && token) {
        getBalancesPerPerson(id).then((response) => {
          setBalances(response);
          setAtualizeTable(true);
        });
      } else {
        router.push("/auth");
      }
    } catch (error) {
      throw error;
    }
  }, [atualizeTable]);

  return (
    <div style={{ marginLeft: "180px" }}>
      <CssBaseline />
      <HeaderTransactionComponent
        title="Saldos"
        setAtualizeTable={setAtualizeTable}
      />
      <Container sx={{ marginTop: 4 }}>
        {balances && <TableTransactionComponent rows={balances} />}
        {/* <TableTransactionComponent rows={rows} /> */}
      </Container>
    </div>
  );
};

export default TableComponent;

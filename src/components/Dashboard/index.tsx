import React from "react";
import { Summary } from "../Summary";
import { TranscationsTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Summary/>
            <TranscationsTable/>
        </Container>
    )
}
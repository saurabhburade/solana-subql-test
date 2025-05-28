import assert from "node:assert";

import { SolanaInstruction } from "@subql/types-solana";
import { TransactionForFullJson } from "@solana/kit";
import { AddLiquidity, TokenAccount, Transfer } from "../types/models";
import {
  AddLiquidityInstruction,
  AddLiquidityOneSideInstruction,
} from "../types/handler-inputs/LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo";
import { BlockFilter, LogFilter } from "@subql/common-solana";

function bnReplacer(value: any): any {
  if (typeof value === "bigint") {
    return `${value.toString()}n`;
  }
  return value;
}

function allAccounts(transaction: TransactionForFullJson<0>) {
  return [
    ...transaction.transaction.message.accountKeys,
    ...(transaction.meta?.loadedAddresses.writable ?? []),
    ...(transaction.meta?.loadedAddresses.readonly ?? []),
  ];
}

const TOKEN_ADDR = "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof";

export function getAccountByIndex(
  instruction: SolanaInstruction,
  index: number
): string {
  return allAccounts(instruction.transaction)[index];
}

export async function handleLiquidity(
  instruction: AddLiquidityOneSideInstruction
) {
  const decoded = await instruction.decodedData;
  if (decoded) {
    const accounts = instruction.accounts.map((account) => account.toString());
    logger.info("handleLiquidity : programAddress : {}", [decoded.name]);
    const newLiq = AddLiquidity.create({
      id: `${instruction.transaction.transaction.signatures[0]}-${instruction.index.join(".")}`,
      accounts: JSON.stringify(accounts),
      blockNumber: instruction.block.blockHeight,
      data: JSON.stringify(decoded?.data.liquidityParameter),
      program: decoded.name,
      transactionHash: instruction.transaction.transaction.signatures[0],
    });

    await newLiq.save();
  }
}

import assert from "node:assert";

import { SolanaInstruction } from "@subql/types-solana";
import { TransactionForFullJson } from "@solana/kit";
import { TokenAccount, Transfer } from "../types/models";
import {
  AddLiquidityInstruction,
  AddLiquidityOneSideInput,
  AddLiquidityOneSideInstruction,
} from "../types/program-interfaces/LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo";
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
  logger.info("handleLiquidity : programAddress : {}", [
    instruction.programAddress.toString(),
  ]);
}

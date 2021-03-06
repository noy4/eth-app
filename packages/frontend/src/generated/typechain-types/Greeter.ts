/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface GreeterInterface extends utils.Interface {
  contractName: "Greeter";
  functions: {
    "getMyNumber()": FunctionFragment;
    "getMyString()": FunctionFragment;
    "greet()": FunctionFragment;
    "myAddress()": FunctionFragment;
    "myNumber()": FunctionFragment;
    "myString()": FunctionFragment;
    "setGreeting(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getMyNumber",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMyString",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "greet", values?: undefined): string;
  encodeFunctionData(functionFragment: "myAddress", values?: undefined): string;
  encodeFunctionData(functionFragment: "myNumber", values?: undefined): string;
  encodeFunctionData(functionFragment: "myString", values?: undefined): string;
  encodeFunctionData(functionFragment: "setGreeting", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getMyNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMyString",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "greet", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "myAddress", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "myNumber", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "myString", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGreeting",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Greeter extends BaseContract {
  contractName: "Greeter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GreeterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getMyNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    getMyString(overrides?: CallOverrides): Promise<[string]>;

    greet(overrides?: CallOverrides): Promise<[string]>;

    myAddress(overrides?: CallOverrides): Promise<[string]>;

    myNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    myString(overrides?: CallOverrides): Promise<[string]>;

    setGreeting(
      _greeting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getMyNumber(overrides?: CallOverrides): Promise<BigNumber>;

  getMyString(overrides?: CallOverrides): Promise<string>;

  greet(overrides?: CallOverrides): Promise<string>;

  myAddress(overrides?: CallOverrides): Promise<string>;

  myNumber(overrides?: CallOverrides): Promise<BigNumber>;

  myString(overrides?: CallOverrides): Promise<string>;

  setGreeting(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getMyNumber(overrides?: CallOverrides): Promise<BigNumber>;

    getMyString(overrides?: CallOverrides): Promise<string>;

    greet(overrides?: CallOverrides): Promise<string>;

    myAddress(overrides?: CallOverrides): Promise<string>;

    myNumber(overrides?: CallOverrides): Promise<BigNumber>;

    myString(overrides?: CallOverrides): Promise<string>;

    setGreeting(_greeting: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getMyNumber(overrides?: CallOverrides): Promise<BigNumber>;

    getMyString(overrides?: CallOverrides): Promise<BigNumber>;

    greet(overrides?: CallOverrides): Promise<BigNumber>;

    myAddress(overrides?: CallOverrides): Promise<BigNumber>;

    myNumber(overrides?: CallOverrides): Promise<BigNumber>;

    myString(overrides?: CallOverrides): Promise<BigNumber>;

    setGreeting(
      _greeting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getMyNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMyString(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    greet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    myAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    myNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    myString(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setGreeting(
      _greeting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

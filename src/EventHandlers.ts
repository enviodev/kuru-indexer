/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  MarginAccount,
  MarginAccount_Deposit,
  MarginAccount_Withdrawal,
  MonadDeployer,
  MonadDeployer_PumpingTime,
  Router,
  Router_Initialized,
  Router_MarketRegistered,
  Router_OwnershipHandoverCanceled,
  Router_OwnershipHandoverRequested,
  Router_OwnershipTransferred,
  Router_Upgraded,
} from "generated";

MarginAccount.Deposit.handler(async ({ event, context }) => {

  // queue -> save the data
  // console.log(event.params.token);

});

MarginAccount.Withdrawal.handler(async ({ event, context }) => {

  const amount = event.params.amount;
  const token = event.params.token;
  const owner = event.params.owner;

  const tokenEntity = await context.Token.get(token); 

  const currentDeposits = tokenEntity ? tokenEntity.deposits : 0n;

  context.Token.set( {
    id: token,
    deposits: currentDeposits - amount,
  });

  const entity: MarginAccount_Withdrawal = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    owner: owner,
    token: token,
    amount: amount,
  };

  context.MarginAccount_Withdrawal.set(entity);
});

MonadDeployer.PumpingTime.handler(async ({ event, context }) => {
  const entity: MonadDeployer_PumpingTime = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token: event.params.token,
    tokenURI: event.params.tokenURI,
    dev: event.params.dev,
    supplyToDev: event.params.supplyToDev,
    market: event.params.market,
  };

  context.MonadDeployer_PumpingTime.set(entity);
});

Router.Initialized.handler(async ({ event, context }) => {
  const entity: Router_Initialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    version: event.params.version,
  };

  context.Router_Initialized.set(entity);
});

Router.MarketRegistered.contractRegister(async ({ event, context }) => {
  context.addMarket(event.params.market)
}, {preRegisterDynamicContracts: true});

Router.MarketRegistered.handler(async ({ event, context }) => {

  const entity: Router_MarketRegistered = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    baseAsset: event.params.baseAsset,
    quoteAsset: event.params.quoteAsset,
    market: event.params.market,
    vaultAddress: event.params.vaultAddress,
    pricePrecision: event.params.pricePrecision,
    sizePrecision: event.params.sizePrecision,
    tickSize: event.params.tickSize,
    minSize: event.params.minSize,
    maxSize: event.params.maxSize,
    takerFeeBps: event.params.takerFeeBps,
    makerFeeBps: event.params.makerFeeBps,
  };

  context.Router_MarketRegistered.set(entity);
});

Router.OwnershipHandoverCanceled.handler(async ({ event, context }) => {
  const entity: Router_OwnershipHandoverCanceled = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pendingOwner: event.params.pendingOwner,
  };

  context.Router_OwnershipHandoverCanceled.set(entity);
});

Router.OwnershipHandoverRequested.handler(async ({ event, context }) => {
  const entity: Router_OwnershipHandoverRequested = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pendingOwner: event.params.pendingOwner,
  };

  context.Router_OwnershipHandoverRequested.set(entity);
});

Router.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: Router_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldOwner: event.params.oldOwner,
    newOwner: event.params.newOwner,
  };

  context.Router_OwnershipTransferred.set(entity);
});

Router.Upgraded.handler(async ({ event, context }) => {
  const entity: Router_Upgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    implementation: event.params.implementation,
  };

  context.Router_Upgraded.set(entity);
});

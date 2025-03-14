## **1. Issues & Anti-Patterns**

#### **1.1 Inefficient `useMemo` Hook Usage**
- `useMemo` is used for sorting and filtering `balances`, but it depends on both `balances` and `prices`, even though only `balances` is being used inside `useMemo`. This can lead to unnecessary recomputations whenever `prices` changes.
- Optimize dependencies to only those that affect computation.

#### **1.2 Unnecessary `useMemo` for Sorting**
- The `sortedBalances` computation is already pure (i.e., it does not modify state directly). If `balances` itself doesn’t change often, there may be no need to memoize it at all.
- Remove `useMemo` and compute inside `useEffect` or cache outside of the component if necessary.

#### **1.3 Inefficient `.map()` Calls**
- The function first maps over `balances` to create `formattedBalances`, then iterates again to generate `rows`. This results in **two passes** over the same data.
- Combine the `.map()` operations to process everything in one go.

#### **1.4 `getPriority` Function Design**
- `blockchain` is typed as `any`, which removes TypeScript’s ability to enforce correct values.
- Define a proper `enum` or `type` for blockchain names.

#### **1.5 Inline Computation in JSX**
- `usdValue = prices[balance.currency] * balance.amount` is computed inside `.map()`, meaning that if `prices` updates frequently, this could cause performance degradation.
- Precompute outside of `.map()` and store the results in a variable.

---

## **2. Refactored Code**

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockchainType;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type BlockchainType = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

const blockchainPriorityMap: Record<BlockchainType, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
};

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const processedBalances = useMemo(() => {
    return balances
      .filter(balance => {
        const priority = blockchainPriorityMap[balance.blockchain] ?? -99;
        return priority > -99 && balance.amount > 0;
      })
      .sort((lhs, rhs) => (blockchainPriorityMap[rhs.blockchain] ?? -99) - (blockchainPriorityMap[lhs.blockchain] ?? -99))
      .map(balance => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        usdValue: prices[balance.currency] * balance.amount
      }));
  }, [balances, prices]);

  return (
    <div {...rest}>
      {processedBalances.map((balance, index) => (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
```

---

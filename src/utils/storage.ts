import { AssetMetadata } from '@/config';
import { Transaction } from '@/store/modules/account';

const PREFERENCES = 'preferences';
const TRANSACTIONS = 'transactions';
const ASSETS = 'assets';

interface Preferences {
    connector: string | null;
    slippage: number;
    pairs: Record<number, Pair>;
    list: string;
}

interface Pair {
    inputAsset: string;
    outputAsset: string;
}

type Transactions = Record<string, Record<number, Record<string, Transaction>>>;
type Assets = Record<number, Record<string, AssetMetadata>>;

export default class Storage {
    static getConnector(): string | null {
        const preferences = getPreferences();
        return preferences.connector;
    }

    static getSlippage(): number {
        const preferences = getPreferences();
        return preferences.slippage;
    }

    static getPair(chainId: number): Pair {
        const preferences = getPreferences();
        return preferences.pairs[chainId];
    }

    static getList(): string {
        const preferences = getPreferences();
        return preferences.list;
    }

    static getTransactions(account: string, chainId: number): Record<string, Transaction> {
        const transactionString = localStorage.getItem(TRANSACTIONS);
        const transactions: Transactions = transactionString
            ? JSON.parse(transactionString)
            : {};
        if (!transactions ||
            !transactions[account] ||
            !transactions[account][chainId]
        ) {
            return {};
        }
        return transactions[account][chainId];
    }

    static getAssets(chainId: number): Record<string, AssetMetadata> {
        const assetString = localStorage.getItem(ASSETS);
        const assets: Assets = assetString
            ? JSON.parse(assetString)
            : {};
        if (!assets[chainId]) {
            return {};
        }
        return assets[chainId];
    }

    static saveConnector(connector: string): void {
        const preferences = getPreferences();
        preferences.connector = connector;
        localStorage.setItem(PREFERENCES, JSON.stringify(preferences));
    }

    static saveSlippage(slippage: number): void {
        const preferences = getPreferences();
        preferences.slippage = slippage;
        localStorage.setItem(PREFERENCES, JSON.stringify(preferences));
    }

    static saveInputAsset(chainId: number, asset: string): void {
        const preferences = getPreferences();
        preferences.pairs[chainId].inputAsset = asset;
        localStorage.setItem(PREFERENCES, JSON.stringify(preferences));
    }

    static saveOutputAsset(chainId: number, asset: string): void {
        const preferences = getPreferences();
        preferences.pairs[chainId].outputAsset = asset;
        localStorage.setItem(PREFERENCES, JSON.stringify(preferences));
    }

    static saveList(list: string): void {
        const preferences = getPreferences();
        preferences.list = list;
        localStorage.setItem(PREFERENCES, JSON.stringify(preferences));
    }

    static saveTransaction(account: string, chainId: number, transaction: Transaction): void {
        const transactionString = localStorage.getItem(TRANSACTIONS);
        const transactions: Transactions = transactionString
            ? JSON.parse(transactionString)
            : {};
        if (!transactions[account]) {
            transactions[account] = {};
        }
        if (!transactions[account][chainId]) {
            transactions[account][chainId] = {};
        }
        transactions[account][chainId][transaction.hash] = transaction;
        localStorage.setItem(TRANSACTIONS, JSON.stringify(transactions));
    }

    static saveAssets(chainId: number, assets: Record<string, AssetMetadata>): void {
        const assetString = localStorage.getItem(ASSETS);
        const assetList: Assets = assetString
            ? JSON.parse(assetString)
            : {};
        if (!assetList[chainId]) {
            assetList[chainId] = {};
        }
        for (const address in assets) {
            assetList[chainId][address] = assets[address];
        }
        localStorage.setItem(ASSETS, JSON.stringify(assetList));
    }

    static clearConnector(): void {
        const preferences = getPreferences();
        preferences.connector = null;
        localStorage.setItem(PREFERENCES, JSON.stringify(preferences));
    }

    static clearTransactions(): void {
        localStorage.removeItem(TRANSACTIONS);
    }

    static clearAssets(): void {
        localStorage.removeItem(ASSETS);
    }
}

function getPreferences(): Preferences {
    const defaultPreferences: Preferences = {
        connector: null,
        slippage: 0.005,
        pairs: {
            1: {
                inputAsset: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                outputAsset: '0xba100000625a3754423978a60c9317c58a424e3D',
            },
            42: {
                inputAsset: '0x1528F3FCc26d13F7079325Fb78D9442607781c8C',
                outputAsset: '0xef13C0c8abcaf5767160018d268f9697aE4f5375',
            },
            77: {
                inputAsset: '0xc655c6D80ac92d75fBF4F40e95280aEb855B1E87',
                outputAsset: '0x705581f5830Cfd11715020543f5309ADEBdbd074',
            },
            100: {
                inputAsset: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
                outputAsset: '0xC45b3C1c24d5F54E7a2cF288ac668c74Dd507a84',
            },
            44787: {
                inputAsset: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
                outputAsset: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
            },
            42220: {
                inputAsset: '0x471EcE3750Da237f93B8E339c536989b8978a438',
                outputAsset: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
            },
        },
        list: 'balancer',
    };
    const preferenceString = localStorage.getItem(PREFERENCES);
    const preferences = JSON.parse(preferenceString || '{}');
    return {
        ...defaultPreferences,
        ...preferences,
    };
}
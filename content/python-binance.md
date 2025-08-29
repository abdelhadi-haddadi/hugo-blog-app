+++
title = "Python Binance"
date = 2025-08-29T20:10:00.441+01:00
draft = false
description = "Python for loop tutorials shows how to create loops in Python with the for statement. A loop is a sequence of instructions that is continually repeated until a certain condition is reached."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Binance

last modified January 29, 2024

In this article we show how to work with Binance exchange in Python using 
the python-binance library.

The python-binance an unofficial Python wrapper for the Binance
exchange REST API v3. Binance is a popular cryptocurrency exchange.

Binance offers both public and private APIs. For private APIs, we need to
provide the API keys. The APIs are asynchronous.

$ pip install python-binance

We install the library with pip.

## Python Binance list of symbols

The get_exchange_info function provides some basic information
about the exchange, including rate limits and list of symbols.

A symbol is a trading pair. It consists of a base asset and a quote asset. Given
a symbol BTCBUSD, BTC stands for the base asset and BUSD stands for the quote
asset.

symbols.py
  

#!/usr/bin/python

import asyncio
from binance import AsyncClient

async def main():

    client = await AsyncClient.create()
    res = await client.get_exchange_info()

    print(f'# of symbols: {len(res["symbols"])}')

    for sym in res['symbols']:
       print(f"{sym['symbol']}: base {sym['baseAsset']}, quote {sym['quoteAsset']}")

    await client.close_connection()

asyncio.run(main())

The example prints the number of symbols lists all available symbols.

from binance import AsyncClient

From the module, we import the AsyncClient.

res = await client.get_exchange_info()

We call the get_exchange_info function. The response in translated
into a Python dictionary.

print(f'# of symbols: {len(res["symbols"])}')

The symbols key contains the list of available symbols on Binance.

for sym in res['symbols']:
    print(f"{sym['symbol']}: base {sym['baseAsset']}, quote {sym['quoteAsset']}")

We go through the list and print them to the console.

$ ./symbols.py
# of symbols: 2183
ETHBTC: base ETH, quote BTC
LTCBTC: base LTC, quote BTC
BNBBTC: base BNB, quote BTC
NEOBTC: base NEO, quote BTC
QTUMETH: base QTUM, quote ETH
EOSETH: base EOS, quote ETH
SNTETH: base SNT, quote ETH
BNTETH: base BNT, quote ETH
BCCBTC: base BCC, quote BTC
GASBTC: base GAS, quote BTC
BNBETH: base BNB, quote ETH
BTCUSDT: base BTC, quote USDT
ETHUSDT: base ETH, quote USDT
...

## Python Binance ticker

A *ticker* is a report of the price of a certain cryptocurrency, updated
continuously throughout the trading session. To get a ticker, we use the 
get_ticker function.

get_ticker.py
  

#!/usr/bin/python

import asyncio
import json
from binance import AsyncClient

async def main():

    client = await AsyncClient.create()

    res = await client.get_ticker(symbol='LTCBUSD')
    print(json.dumps(res, indent=2))

    print('--------------------')

    res = await client.get_symbol_ticker(symbol='LTCBUSD')
    print(json.dumps(res, indent=2))

    await client.close_connection()

asyncio.run(main())

The example retrieves the ticker for the LTCBUSD symbol.

res = await client.get_ticker(symbol='LTCBUSD')

We fetch the ticker for LTCBUSD.

print(json.dumps(res, indent=2))

We pretty-print the output with json.dumps.

$ ./get_ticker.py
{
  "symbol": "LTCBUSD",
  "priceChange": "-1.06000000",
  "priceChangePercent": "-1.146",
  "weightedAvgPrice": "92.12663737",
  "prevClosePrice": "92.47000000",
  "lastPrice": "91.45000000",
  "lastQty": "0.05500000",
  "bidPrice": "91.45000000",
  "bidQty": "0.27400000",
  "askPrice": "91.47000000",
  "askQty": "4.38700000",
  "openPrice": "92.51000000",
  "highPrice": "93.58000000",
  "lowPrice": "90.46000000",
  "volume": "153099.54200000",
  "quoteVolume": "14104545.98719000",
  "openTime": 1680448413900,
  "closeTime": 1680534813900,
  "firstId": 38620441,
  "lastId": 38681137,
  "count": 60697
}
--------------------
{
  "symbol": "LTCBUSD",
  "price": "91.47000000"
}

## Python Binance deposit address

A *deposit address* is a unique address used to send and receive 
cryptocurrency on Binance. The address does not belong to the user. 

deposit_address.py
  

#!/usr/bin/python

import asyncio
import os
from binance import AsyncClient

async def main():

    api_key = os.getenv('BINANCE_API_KEY')
    api_secret = os.getenv('BINANCE_SECRET_KEY')

    client = await AsyncClient.create(api_key, api_secret)

    btc_address = await client.get_deposit_address(coin='BTC')
    print(btc_address)

    ltc_address = await client.get_deposit_address(coin='LTC')
    print(ltc_address)

    doge_address = await client.get_deposit_address(coin='DOGE')
    print(doge_address)

    await client.close_connection()

asyncio.run(main())

In the example, we print three deposits addresses for the BTC, LTC, and DOGE 
coins.

api_key = os.getenv('BINANCE_API_KEY')
api_secret = os.getenv('BINANCE_SECRET_KEY')

To get a deposit address, we need to use the API keys. We load our keys from 
the environment variables.

btc_address = await client.get_deposit_address(coin='BTC')
print(btc_address)

We get the address with get_deposit_address for the BTC and 
print it.

## Python Binance asset balance

The get_asset_balance function retrieves the balance for the given 
asset.

asset_balance.py
  

#!/usr/bin/python

import asyncio
import os
from binance import AsyncClient

async def main():

    api_key = os.getenv('BINANCE_API_KEY')
    api_secret = os.getenv('BINANCE_SECRET_KEY')

    client = await AsyncClient.create(api_key, api_secret)

    ltc_balance = await client.get_asset_balance(asset='LTC')
    print(f"Asset: {ltc_balance['asset']}")
    print(f"Free: {ltc_balance['free']}")
    print(f"Locked: {ltc_balance['locked']}")

    await client.close_connection()

asyncio.run(main())

The example retrieves the ballance for the LTC coin.

## Python Binance withdrawals

With the get_withdraw_history function, we get the cryptocurrency
withdrawals from the Binance exchange.

withdrawals.py
  

#!/usr/bin/python

import asyncio
import os
from binance import AsyncClient

async def main():

    api_key = os.getenv('BINANCE_API_KEY')
    api_secret = os.getenv('BINANCE_SECRET_KEY')

    client = await AsyncClient.create(api_key, api_secret)
    withdraws = await client.get_withdraw_history()

    for e in withdraws:
        print(f"{e['amount']} {e['transactionFee']} {e['coin']} {e['completeTime']}")

    await client.close_connection()

asyncio.run(main())

In the example, we fetch all the withdrawals for the last ninety days.

withdraws = await client.get_withdraw_history()

We fetch the withdrawals. If we do not specify the start time, the default last
90 days is applied.

for e in withdraws:
    print(f"{e['amount']} {e['transactionFee']} {e['coin']} {e['completeTime']}")

From the withdrawal data, we get the amount, transaction fee, coin name and 
completion time.

## Python Binance my trades

The get_my_trades function retrieves trades for the specific
symbol.

$ pip install rich

To organize the data in a nice table, we use the rich library.

mytrades.py
  

#!/usr/bin/python

import asyncio
import os
from datetime import datetime
from binance import AsyncClient
from rich import box
from rich.console import Console
from rich.table import Table

async def main():

    api_key = os.getenv('BINANCE_API_KEY')
    api_secret = os.getenv('BINANCE_SECRET_KEY')

    client = await AsyncClient.create(api_key, api_secret)
    trades = await client.get_my_trades(symbol='SHIBBUSD')

    now = f'{datetime.today()}'
    table = Table(title='My SHIBA trades', box=box.ASCII,
                  caption=now, caption_justify='left')

    table.add_column('Complete time', justify='center', style='steel_blue')
    table.add_column('Price', justify='right', style='cadet_blue')
    table.add_column('Quantity', justify='right')
    table.add_column('Quote quantity', justify='right')
    table.add_column('Commision fee', justify='right', style='indian_red')
    table.add_column('Commision asset', justify='center')

    for e in trades:

        trade_time = datetime.utcfromtimestamp(e['time']/1000.0)
        price = float(e["price"])
        quantity = float(e["qty"])
        quote_quantity = float(e["quoteQty"])
        commision = float(e["commission"])
        commission_asset = e["commissionAsset"]

        table.add_row(f'{trade_time:%m/%d/%Y}', f'{price:.8f}', f'{quantity}',
                      f'{quote_quantity:.8f}', f'{commision:.2f}', f'{commission_asset}')

    console = Console()
    console.print(table)

    await client.close_connection()

asyncio.run(main())

The example retrieves trades for the SHIBBUSD symbol. The quantity
is the amount of the base asset that we have bought; in our case it is the
amount of the SHIBA token. The quote quantity is the amount of the quote asset
(BUSD) needed to buy the given mount of the SHIBA token.

trades = await client.get_my_trades(symbol='SHIBBUSD')

We retrieve the trades for the SHIBBUSD symbol with
get_my_trades.

table = Table(title='My SHIBA trades', box=box.ASCII,
                caption=now, caption_justify='left')

table.add_column('Complete time', justify='center', style='steel_blue')
table.add_column('Price', justify='right', style='cadet_blue')
table.add_column('Quantity', justify='right')
table.add_column('Quote quantity', justify='right')
table.add_column('Commision fee', justify='right', style='indian_red')
table.add_column('Commision asset', justify='center')

We create a table with six columns.

for e in trades:

    trade_time = datetime.utcfromtimestamp(e['time']/1000.0)
    price = float(e["price"])
    quantity = float(e["qty"])
    quote_quantity = float(e["quoteQty"])
    commision = float(e["commission"])
    commission_asset = e["commissionAsset"]

    table.add_row(f'{trade_time:%m/%d/%Y}', f'{price:.8f}', f'{quantity}',
                  f'{quote_quantity:.8f}', f'{commision:.2f}', f'{commission_asset}')

We add rows to the table.

console = Console()
console.print(table)

Finally, we print the table to the console.

## Pyton Binance fiat payments

To get fiat payments, we use the get_fiat_payments_history
function.

fiat_payments.py
  

#!/usr/bin/python

import asyncio
import os
from binance import AsyncClient
from binance.helpers import date_to_milliseconds
from datetime import datetime

from rich import box
from rich.console import Console
from rich.table import Table

async def main():

    api_key = os.getenv('BINANCE_API_KEY')
    api_secret = os.getenv('BINANCE_SECRET_KEY')

    begin = '2023/01/01'
    begin_ts = date_to_milliseconds(begin)

    end = 'March 31, 2023'
    end_ts = date_to_milliseconds(end)

    client = await AsyncClient.create(api_key, api_secret)

    fiat_history = await client.get_fiat_payments_history(transactionType=0,
                                                          beginTime=begin_ts, endTime=end_ts)
    now = f'{datetime.today()}'
    table = Table(title='Fiat payments', box=box.ASCII,
                  caption=now, caption_justify='left')

    table.add_column('Create time', justify='right', style='cadet_blue')
    table.add_column('Fiat amount', justify='center', style='steel_blue')
    table.add_column('Fiat')
    table.add_column('Crypto amount', justify='right', style='dark_slate_gray2')
    table.add_column('Crypto')
    table.add_column('Price', style='dark_sea_green4')
    table.add_column('Fee', style='indian_red')

    for e in fiat_history['data']:
        d = datetime.utcfromtimestamp(e['createTime']/1000.0)

        source_amount = float(e["sourceAmount"])
        fiat_currency = e["fiatCurrency"]
        obtain_amount = float(e["obtainAmount"])
        crypto_currency = e["cryptoCurrency"]
        price = float(e["price"])
        total_fee = float(e["totalFee"])

        table.add_row(f'{d:%m/%d/%Y}', f'{source_amount:.8f}', f'{fiat_currency}',
                      f'{obtain_amount:.8f}', f'{crypto_currency}', 
                      f'{price:.8f}', f'{total_fee:.8f}')

    console = Console()
    console.print(table)

    await client.close_connection()

asyncio.run(main())

In the program we list all transactions where we bought cryptocurrency with 
fiat money.

begin = '2023/01/01'
begin_ts = date_to_milliseconds(begin)

end = 'March 31, 2023'
end_ts = date_to_milliseconds(end)

We specify the begin and end dates. We use the date_to_milliseconds
helper functions to transform the string dates into milliseconds.

fiat_history = await client.get_fiat_payments_history(transactionType=0,
                                                      beginTime=begin_ts, endTime=end_ts)

The transactionType 0 is for buys, 1 is for sells.

source_amount = float(e["sourceAmount"])
fiat_currency = e["fiatCurrency"]
obtain_amount = float(e["obtainAmount"])
crypto_currency = e["cryptoCurrency"]
price = float(e["price"])
total_fee = float(e["totalFee"])

We have six columns. The source amount is the amount of the fiat currency we use
to buy cryptocurrency. The fiat currency is the type of the fiat currency, such
as USD or EUR. The obtain amount is the amount of cryptocurrency that we have
bought. The cryptocurrency is the cryptocurrency that we received. The price is 
the price of the cryptocurrency expressed in the fiat currency. Finally, the 
total fee is the fee we have paid for the transaction.

## Source

[Python binance documentation](https://docs.pytest.org/en/8.0.x/)

In this article we have worked with Binance exchange in Python with
python-binance module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).
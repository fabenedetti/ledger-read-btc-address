const AppBtc = require("@ledgerhq/hw-app-btc").default;

const TransportObject = require("@ledgerhq/hw-transport-webusb").default;

const getTransport = async () => {
  try {
    let transportInstance;
    transportInstance = await TransportObject.openConnected();
    if (!transportInstance) {
      console.log("Create new transport");
      transportInstance = await TransportObject.request();
    } else {
      console.log("Reusing transport");
    }
    return transportInstance;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getWallet = async (config) => {
  const transport = await getTransport();
  const appBtc = new AppBtc(transport);
  const path = "44'/0'/0'/0/0";
  const accountType = "legacy";

  try {
    const result = await appBtc.getWalletPublicKey(path, {
      format: accountType
    });
    return { address: result.bitcoinAddress, error: null };
  } catch (err) {
    console.log(err);
    return { address: null, error: err.message || err}
  } finally {
    transport.close();
  }
};

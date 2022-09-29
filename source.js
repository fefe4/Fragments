var wallet;
let time = Math.round(Date.now() / 1000);
console.log(time);

user.addEventListener("change", getWallet);

function getWallet() {
  const user = document.getElementById("user");
  wallet = user.value;
}

function checkKeychain() {
  if (typeof hive_keychain === "undefined") {
    console.log("3");
  } else {
    clearTimeout(checkKeychain);
    console.log("2");
    const install = document.getElementById("install");
    install.remove();
    const login = document.getElementById("login");
    const join = document.createElement("input");
    join.setAttribute("type", "submit");
    join.setAttribute("value", "WHERE IS IT?");
    login.append(join);
    join.addEventListener("click", changeInterface);
  }
}
const myTimeout = setTimeout(checkKeychain, 1000);

function changeInterface() {
  const login = document.getElementById("login");
  login.remove();
  secondInterface();
}

async function secondInterface() {
  const main = document.getElementById("main");
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = "then, try your luck";
  const form1 = document.createElement("form");
  const form10 = document.createElement("form");
  const form100 = document.createElement("form");
  const label1 = document.createElement("label");
  label1.textContent = "1% chance";
  const label10 = document.createElement("label");
  label10.textContent = "10% chance";
  const label100 = document.createElement("label");
  label100.textContent = "100% chance";
  const input1 = document.createElement("input");
  const input10 = document.createElement("input");
  const input100 = document.createElement("input");
  input1.setAttribute("type", "submit");
  input10.setAttribute("type", "submit");
  input100.setAttribute("type", "submit");
  form1.append(label1);
  form10.append(label10);
  form100.append(label100);
  form1.append(input1);
  form10.append(input10);
  form100.append(input100);

  form1.classList.add("formbets");
  form10.classList.add("formbets");
  form100.classList.add("formbets");

  const counter = document.createElement("p");
  counter.id = "counter";
  counter.textContent = "0";
  const lastTransaction = await findTransactions(wallet);
  console.log(lastTransaction);
  let timeleft = lastTransaction - time + 3600;
  if (timeleft < 0) {
    counterContent = "You can try to claim an NFT now!";
    counter.textContent = `${counterContent}`;
  } else {
    counter.textContent = `you can claim again in  and ${timeleft} seconds`;
  }

  main.append(p);
  div.append(form1);
  div.append(form10);
  div.append(form100);
  main.append(div);
  main.append(counter);

  form1.addEventListener("submit", function (e) {
    e.preventDefault();
    openForm();
    sendReward();
  });
  form10.addEventListener("submit", function (e) {
    e.preventDefault();
    openForm();

    sendReward10();
  });
  form100.addEventListener("submit", function (e) {
    e.preventDefault();
    openForm();

    sendReward100();
  });

  const x = setInterval(function () {
    counter.textContent = `you can claim again in  and ${timeleft} seconds`;
    timeleft--;
    if (timeleft < 0) {
      clearInterval(x);
      counterContent = "You can try to claim an NFT now!";
      counter.textContent = `${counterContent}`;
    }
  }, 1000);

  // form10.addEventListener("submit")
  // form1.action =
  // form10.action =
  // form100.action =
}

// function startInterval(timeleft, counter){
//   while (timeleft>0){
//   setTimeout(() => {
//     timeleft === timeleft--
//   }, 1000)
//     console.log("3")
//     counter.textContent = `you can claim again in ${timeleft%3600}mins ${timeleft%60} seconds`
//   }
// }

async function findTransactions(wallet) {
  let i = 0;
  let tokenData = [];
  while (tokenData.length % 500 === 0) {
    const response = await fetch(
      `https://enginehistory.rishipanthee.com/accountHistory?account=fefe.dev&ops=tokens_transfer&symbol=BUDS`
    );
    const data = await response.json();
    console.log(data);
    tokenData = tokenData.concat(data);
    i = i + 500;
    if (data.length < 500) {
      // if (true) {
      break;
    }
  }

  tokenData = tokenData.filter((v) => v.to === wallet);
  tokenData = tokenData.filter((v) => v.from === "fefe.dev");
//   tokenData1 = tokenData.filter(
//     (v) =>
//       v.memo === "better luck next time" );

//       tokenData2 = tokenData.filter(
//         (v) =>
//           v.memo === "congratulations, you won an NFT" );
      
//  tokenData = tokenData2.concat(tokenData1)
  console.log(tokenData);
  // console.log(typeof(tokenData[0].timestamp));

  if (tokenData.length === 0) {
    return 0;
  }
  return Math.round(tokenData[0].timestamp);
}

async function sendReward() {
  console.log(wallet);
  const response = await fetch(
    "https://safe-tor-86739.herokuapp.com/createNFT",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user: `${wallet}`,
      }),
    }
  );
  const data = await response.text();
  const rewardsParagraph = document.getElementById("rewards");
  rewardsParagraph.textContent = data;
}

async function sendReward10() {
  console.log(wallet);
  const response = await fetch(
    "https://safe-tor-86739.herokuapp.com/createNFT10",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user: `${wallet}`,
      }),
    }
  );
  const data = await response.text();
  const rewardsParagraph = document.getElementById("rewards");
  rewardsParagraph.textContent = data;
}
async function sendReward100() {
  console.log(wallet);
  const response = await fetch(
    "https://safe-tor-86739.herokuapp.com/createNFT100",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user: `${wallet}`,
      }),
    }
  );
  const data = await response.text();
  const rewardsParagraph = document.getElementById("rewards");
  rewardsParagraph.textContent = data;
}

const login = document.getElementById("login");
login.addEventListener("submit", function (e) {
  e.preventDefault();
});

function closeForm() {
  document.getElementById("popup").style.display = "none";
}

function openForm() {
  document.getElementById("popup").style.display = "block";
}
// function giveFefeMoney1 () {
//   brrr(1)
// }

// function giveFefeMoney10 () {
//   brrr(10)
// }

// function giveFefeMoney100 () {
//   brrr(100)
// }

// function brrr(quantity) {
//   let json_payload = {
//     contractName: "tokens",
//     contractAction: "transfer",
//     contractPayload: {
//       symbol: "BUDS",
//       to: "fefe99",
//       quantity: "" + quantity,
//       memo: "1 buds for 1/100th chance",
//     },
//   };

//   json_payload = JSON.stringify(json_payload);

//   hive_keychain.requestCustomJson(
//     wallet,
//     "ssc-testnet-hive",
//     "Active",
//     json_payload,
//     "blablabla testing"
//   );
// }

let wallet;

function getWallet() {
  const user = document.getElementById("user");
  wallet = user.textContent;
}

function giveFefeMoney1 () {
  brrr(1)
}

function giveFefeMoney10 () {
  brrr(10)
}

function giveFefeMoney100 () {
  brrr(100)
}

function brrr(quantity) {
  let json_payload = {
    contractName: "tokens",
    contractAction: "transfer",
    contractPayload: {
      symbol: "FRAG",
      to: "fefe99",
      quantity: "" + quantity,
      memo: "Im testing stuff",
    },
  };

  json_payload = JSON.stringify(json_payload);

  hive_keychain.requestCustomJson(
    wallet,
    "ssc-testnet-hive",
    "Active",
    json_payload,
    "blablabla testing"
  );
}

function changeInterface() {
  const login = document.getElementById("login");
  login.remove();
  secondInterface();
}



function secondInterface() {
  const main = document.getElementById("main");
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = "then, try your luck";
  const form1 = document.createElement("form");
  const form10 = document.createElement("form");
  const form100 = document.createElement("form");
  const label1 = document.createElement("label");
  label1.textContent ="pay 1 token get 1% chance";
  const label10 = document.createElement("label");
  label10.textContent = "pay 10 token get 10% chance";
  const label100 = document.createElement("label");
  label100.textContent = "pay 100 token get 100% chance";
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

  form1.classList.add('formbets')
  form10.classList.add('formbets')
  form100.classList.add('formbets')
  main.append(p);
  div.append(form1);
  div.append(form10);
  div.append(form100);
  main.append(div);

  
  form1.addEventListener("submit", function (e) {
    e.preventDefault();
    giveFefeMoney1();
    sendReward();
  });
  // form10.addEventListener("submit")
  // form1.action =
  // form10.action = 
  // form100.action = 
}


async function sendReward () {
  const response = await fetch("http://localhost:8000/createNFT", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      "user":wallet
    }),
  });
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
    join.addEventListener("click", getWallet);
    join.addEventListener("click", changeInterface);
  }
}
const myTimeout = setTimeout(checkKeychain, 1000);

/* <input type="submit" value="WHERE IS IT?" id="submit"> */

const login = document.getElementById("login");
  login.addEventListener("submit", function (e) {
    e.preventDefault();
  });

const account1 = {
  owner: 'Jack Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDate:[
    '2010-11-01T21:31:17.1782Z',
    '2011-11-01T21:31:17.1782Z',
    '2012-11-01T21:31:17.1782Z',
    '2013-11-01T21:31:17.1782Z',
    '2014-11-01T21:31:17.1782Z',
    '2022-09-15T21:31:17.1782Z',
    '2022-09-17T21:31:17.1782Z',
    '2022-09-18T21:31:17.1782Z',
    
  ]
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate:[
    '2010-11-01T21:31:17.1782Z',
    '2011-11-01T21:31:17.1782Z',
    '2012-11-01T21:31:17.1782Z',
    '2013-11-01T21:31:17.1782Z',
    '2014-11-01T21:31:17.1782Z',
    '2015-11-01T21:31:17.1782Z',
    '2016-11-01T21:31:17.1782Z',
    '2019-11-01T21:31:17.1782Z',
    
  ]
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate:[
    '2010-11-01T21:31:17.1782Z',
    '2011-11-01T21:31:17.1782Z',
    '2012-11-01T21:31:17.1782Z',
    '2013-11-01T21:31:17.1782Z',
    '2014-11-01T21:31:17.1782Z',
    '2015-11-01T21:31:17.1782Z',
    '2016-11-01T21:31:17.1782Z',
    '2019-11-01T21:31:17.1782Z',
    
  ]
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate:[
    '2010-11-01T21:31:17.1782Z',
    '2011-11-01T21:31:17.1782Z',
    '2012-11-01T21:31:17.1782Z',
    '2013-11-01T21:31:17.1782Z',
    '2014-11-01T21:31:17.1782Z',
    '2015-11-01T21:31:17.1782Z',
    '2016-11-01T21:31:17.1782Z',
    '2019-11-01T21:31:17.1782Z',
    
  ]
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////?????????????????????
const formatMovementDays= function(date){//????????????
 
    const calcdayspassed=(date1,date2)=>Math.round(Math.abs(date2-date1)/(1000*60*60*24));
    const daysPassed=calcdayspassed(new Date(),date);
    console.log(daysPassed)
    
    if(daysPassed===0){   
      const hour=`${date.getHours()}`.padStart(2,0);
      const min=`${date.getMinutes()}`.padStart(2,0);
      const seconds=`${date.getSeconds()}`.padStart(2,0);
    return `?????????${hour}:${min}:${seconds}`}
    if(daysPassed===1){   
      const hour=`${date.getHours()}`.padStart(2,0);
      const min=`${date.getMinutes()}`.padStart(2,0);
      const seconds=`${date.getSeconds()}`.padStart(2,0);
    return `?????????${hour}:${min}:${seconds}`}
    if(daysPassed<=7)return `${daysPassed}??????`
    else
    { const day=`${date.getDate()}`.padStart(2,0);
      const month=`${date.getMonth()+1}`.padStart(2,0);;
      const year=date.getFullYear();
      return `${day}/${month}/${year}`//????????????}
    }}

/////////????????????
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //?????????????????????????????????innnerhtml???????????????

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements; //???????????????????????? sort???False

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date= new Date(  acc.movementsDate[i])
    const displaydate=formatMovementDays(date)
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <div class="movements__date">${displaydate}</div>   
        <div class="movements__value">${mov}Y</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); //j???html????????????html????????????????????????
  });
};

//????????????
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}Y`;
};

/////?????????????????????????????????????????????????????????
const calcDisplaySummary = function (acc) {
  //????????????????????????
  const incomes = acc.movements
    .filter(mov => mov > 0) //fileter??????????????????0?????????
    .reduce((acc, mov) => acc + mov, 0); //reduce??????????????????
  labelSumIn.textContent = `${incomes}Y`; //?????????dom

  const out = acc.movements
    .filter(mov => mov < 0) //????????????
    .reduce((acc, mov) => acc + mov, 0); //????????????
  labelSumOut.textContent = `${Math.abs(out)}Y`; //?????????dom???abs????????????

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100) //??????????????????????????????????????????????????????????????????????????????1?????????????????????????????????240???????????????0.1????????????2.4
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}Y`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//???????????? UI?????? ?????? ??????  ??????
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


///////////////////////////////////////
// ?????????????????????UI
let currentAccount,timer;//??????????????????,????????????


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault(); //??????????????????

  currentAccount = accounts.find(
    //Find??????????????????????????????
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //??????????????????????????????
    // Display UI and message
    labelWelcome.textContent = `??????,????????? ${
      currentAccount.owner //.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; //????????????????????????UI????????????0
    //????????????
    const now=new Date();
    const day=`${now.getDate()}`.padStart(2,0);
    const month=`${now.getMonth()+1}`.padStart(2,0);;
    const year=now.getFullYear();
    const hour=`${now.getHours()}`.padStart(2,0);
    const min=`${now.getMinutes()}`.padStart(2,0);
    const seconds=`${now.getSeconds()}`.padStart(2,0);
    labelDate.textContent=`${day}/${month}/${year},${hour}:${min}:${seconds}`//????????????
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //???????????????
    inputLoginPin.blur(); //?????????????????????

    //Timer????????????????????????,??????????????????????????????????????????????????????
    if(timer)clearInterval(timer)
    timer=startLoginTimer()
    // Update UI
    updateUI(currentAccount);
  }
});


//????????????
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value); //??????????????????
  const receiverAcc = accounts.find(
    //??????????????????????????????
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ''; //????????????

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username //??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDate.push(new Date().toISOString());//??????????????????
    receiverAcc.movementsDate.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount); //????????????amount?????????UI
    clearInterval(timer);//???????????????????????????
    timer=startLoginTimer()
  }
});


//??????
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //some??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

    setTimeout(function(){// ????????????????????????????????????????????????
    currentAccount.movements.push(amount);
    currentAccount.movementsDate.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount); 
     clearInterval(timer);//???????????????????????????
    timer=startLoginTimer()
  },3000)
  }
  inputLoanAmount.value = '';
});


//????????????
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin //q??????????????????
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username //findindex????????????????????????id
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1); //?????????????????? ???index???????????????????????????????????????????????????

    // Hide UI
    containerApp.style.opacity = 0; //??????UI??????????????????
  }

  inputCloseUsername.value = inputClosePin.value = '';
});
//l????????????
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
}) ;




const startLoginTimer=function(){
 const tick=function(){
    const min=String(Math.trunc(time/60)).padStart(2,0)
    const sec=String(time%60).padStart(2,0)
    labelTimer.textContent=`${min}:${sec}`

    
    if(time===0){//????????????????????????????????????
      clearInterval(timer);
      labelWelcome.textContent = `????????????????????????`;
      containerApp.style.opacity = 0;
    }
    time--
  };
  
  let time=30
  tick()
  const timer=setInterval(tick,1000)
  return timer;
}










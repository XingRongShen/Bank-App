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

/////////流水账记录界面
const formatMovementDays= function(date){//时间记录
 
    const calcdayspassed=(date1,date2)=>Math.round(Math.abs(date2-date1)/(1000*60*60*24));
    const daysPassed=calcdayspassed(new Date(),date);
    console.log(daysPassed)
    
    if(daysPassed===0){   
      const hour=`${date.getHours()}`.padStart(2,0);
      const min=`${date.getMinutes()}`.padStart(2,0);
      const seconds=`${date.getSeconds()}`.padStart(2,0);
    return `今天，${hour}:${min}:${seconds}`}
    if(daysPassed===1){   
      const hour=`${date.getHours()}`.padStart(2,0);
      const min=`${date.getMinutes()}`.padStart(2,0);
      const seconds=`${date.getSeconds()}`.padStart(2,0);
    return `昨天，${hour}:${min}:${seconds}`}
    if(daysPassed<=7)return `${daysPassed}天前`
    else
    { const day=`${date.getDate()}`.padStart(2,0);
      const month=`${date.getMonth()+1}`.padStart(2,0);;
      const year=date.getFullYear();
      return `${day}/${month}/${year}`//时间显示}
    }}

/////////账单显示
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; //清除容器内已有的元素，innnerhtml只清除文本

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements; //默认流水账不排序 sort为False

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

    containerMovements.insertAdjacentHTML('afterbegin', html); //j将html数据写入html页面。模板化语法
  });
};

//余额计算
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}Y`;
};

/////流水总收入，总支出以及存款获得利息计算
const calcDisplaySummary = function (acc) {
  //计算流水中总收入
  const incomes = acc.movements
    .filter(mov => mov > 0) //fileter方法过滤大于0的数值
    .reduce((acc, mov) => acc + mov, 0); //reduce方法进行求和
  labelSumIn.textContent = `${incomes}Y`; //输出到dom

  const out = acc.movements
    .filter(mov => mov < 0) //支出获取
    .reduce((acc, mov) => acc + mov, 0); //支出求和
  labelSumOut.textContent = `${Math.abs(out)}Y`; //打印到dom，abs取绝对值

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100) //利息计算，每存一笔钱可以获得一笔收益，只计算收益大于1的钱款并加权求和，比如240存入，利率0.1，则利息2.4
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

//页面更新 UI显示 收入 余额  流水
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


///////////////////////////////////////
// 用户登录并刷新UI
let currentAccount,timer;//当前用户定义,全局变量


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault(); //阻止页面刷新

  currentAccount = accounts.find(
    //Find方法找到对象中用户名
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //判断用户密码是否正确
    // Display UI and message
    labelWelcome.textContent = `您好,尊敬的 ${
      currentAccount.owner //.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; //通过不同明度显示UI，原始为0
    //当前时间
    const now=new Date();
    const day=`${now.getDate()}`.padStart(2,0);
    const month=`${now.getMonth()+1}`.padStart(2,0);;
    const year=now.getFullYear();
    const hour=`${now.getHours()}`.padStart(2,0);
    const min=`${now.getMinutes()}`.padStart(2,0);
    const seconds=`${now.getSeconds()}`.padStart(2,0);
    labelDate.textContent=`${day}/${month}/${year},${hour}:${min}:${seconds}`//时间显示
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //清空输入框
    inputLoginPin.blur(); //模糊输入框光标

    //Timer开始注销安全锁定,如果当前页面存在定时器则清除重新设置
    if(timer)clearInterval(timer)
    timer=startLoginTimer()
    // Update UI
    updateUI(currentAccount);
  }
});


//转账功能
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value); //获取转账数额
  const receiverAcc = accounts.find(
    //确认转账用户是否存在
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ''; //清空输入

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username //判断转账条件是否合理，保证转账用户存在且转账数额小于余额且转账用户不能是自己
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDate.push(new Date().toISOString());//转账日期记录
    receiverAcc.movementsDate.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount); //转账数额amount并更新UI
    clearInterval(timer);//转账后重新安全计时
    timer=startLoginTimer()
  }
});


//贷款
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //some方法用于检测数组中是否含有符合条件的值，返回值为布尔值，这里贷款条件呢是用户某一笔交易的数额要大于贷款金额的百分之十

    setTimeout(function(){// 定时器三秒后转账模拟贷款批准过程
    currentAccount.movements.push(amount);
    currentAccount.movementsDate.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount); 
     clearInterval(timer);//转账后重新安全计时
    timer=startLoginTimer()
  },3000)
  }
  inputLoanAmount.value = '';
});


//注销用户
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin //q确认用户存在
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username //findindex方法获取删除用户id
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1); //注销用户信息 为index值之后的第一个对象，也就是当前用户

    // Hide UI
    containerApp.style.opacity = 0; //隐藏UI返回登录界面
  }

  inputCloseUsername.value = inputClosePin.value = '';
});
//l流水排序
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

    
    if(time===0){//停止计时器并返回登录界面
      clearInterval(timer);
      labelWelcome.textContent = `欢迎登录数字银行`;
      containerApp.style.opacity = 0;
    }
    time--
  };
  
  let time=30
  tick()
  const timer=setInterval(tick,1000)
  return timer;
}










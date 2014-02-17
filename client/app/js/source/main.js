(function(){

  'use strict';

//global variables
  var userArray = [];
  var itemArray =[];

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getUsers();
    getItems();
    $('#createItemButton').click(popUpItemInput);
    $('#createUserButton').click(popUpUserInput);
    $('#createUser').click(createUser);
    $('#createItem').click(createItem);
    $('#closePop').click(closeBuy);
    $('#closeItem').click(closeItemsInput);
    $('#closeUser').click(closeUsersInput);
    $('#itemTable').on('click', '.buy', purchaseItem);
    $('#confirmBuy').click(confirmBuy);
  }

//----------------------------USERS--------------------------------//
  function getUsers(){
  //fills User Table with users from database on page load
    var url = window.location.origin.replace(/3000/, '4000') + '/users';
    $.getJSON(url, fillUserTable);
  }

  function fillUserTable(data){
  // called on succcess of GET request
    var users = data.users;
    console.log(users);
    for(var i = 0; i < users.length; i++){
      userArray.push(users[i]);
      putUserOnScreen(users[i]);
    }
  }
  function popUpUserInput(){
    darkenBG();
    $('#usersInput').show();
  }

  function createUser(event){
  //Called when createUser button is clicked
    var name = $('#userName').val();
    var deposit = $('#deposit').val();

    var obj = {name:name, deposit: deposit};
    var url = window.location.origin.replace(/3000/, '4000') + '/users';
    var type = 'POST';
    var success = postSuccess;

    $.ajax({url: url, type: type, data:obj, success: success});

    event.preventDefault();
  }

  function postSuccess(response){
  //Takes in an object from server response, adds to user Array, and calls putUSerOnScreen function
    console.log('Post Successful');
    console.log(response[0]);
    putUserOnScreen(response[0]);
    userArray.push(response[0]);
    closeUsersInput();
  }

  function putUserOnScreen(user){
  // Will take in one user object and post to user table with a data-id of the _id in mongo database
    var $userName = $('<td>').text(user.name).addClass('userName');
    var $userBalance = $('<td>').text(user.cash).addClass('userBalance');
    var $userItems = $('<td>').text('No Items Bought').addClass('userItems');
    var $row = $('<tr>').attr('data-id', user._id);
    $row.append($userName, $userBalance, $userItems);
    $('#userTable').append($row);
  }

//-----------------------------ITEMS-----------------------------------//

  function getItems(){
    var url = window.location.origin.replace(/3000/, '4000') + '/items';
    $.getJSON(url, fillItemTable);
  }

  function fillItemTable(data){
  // called on succcess of GET request
    var items = data.items;
    for(var i = 0; i < items.length; i++){
      itemArray.push(items[i]);
      putItemOnScreen(items[i]);
    }
  }

  function putItemOnScreen(item){
  // Will take in one item object and post to item table with a data-id of the _id in mongo database
    var $itemName = $('<td>').text(item.name).addClass('itemName');
    var $itemCost = $('<td>').text(item.cost).addClass('itemCost');
    var $quantity = $('<td>').text(item.quantity).addClass('itemQuantity');
    var $row = $('<tr>').attr('data-id', item._id);
    var $buttonTD = $('<td>');
    var $button = $('<button>').text('BUY').addClass('tiny round buy');
    $buttonTD.append($button);
    $row.append($buttonTD, $itemName, $itemCost, $quantity);
    $('#itemTable').append($row);
  }
  function popUpItemInput(){
    darkenBG();
    $('#itemInput').show();
  }

  function createItem(event){
    // On button click, adds item to database and displays in item table
    debugger;
    var name = $('#itemName').val();
    var cost = $('#cost').val();
    var quantity = $('#quantity').val();
    var obj = {name:name, cost:cost, quantity:quantity};
    var url = window.location.origin.replace(/3000/, '4000') + '/items';
    var type = 'POST';
    var success = itemPostSuccess;

    $.ajax({data:obj, url: url, type: type, success:success});

    event.preventDefault();
  }

  function itemPostSuccess(response){
    // function is called when post request is successful
    debugger;
    putItemOnScreen(response[0]);
    itemArray.push(response[0]);
    closeItemsInput();
  }

//------------------------------Transactions----------------------------//

  function purchaseItem(event){
    debugger;
    $('#popUpBuy').show(); //reveal form
    darkenBG();
    //retrieve info from row of table that buy buton was pushed
    var id = $(this).parent().parent().data('id');
    var selectedRow = $('tr[data-id='+ id + ']');
    var selectName = selectedRow.children('.itemName').text();
    var selectCost = selectedRow.children('.itemCost').text();
    var selectQuantity = selectedRow.children('.itemQuantity').text();
    fillUserDropDown();
    fillQuantityDropDown(selectQuantity);

    $('#popUpBuy h2').text(selectName).attr('data-id', id);
    $('#popUpBuy  h3').text('Cost is $' +selectCost+ ' each');
    $('#popUpBuy  h4').text('There are ' + selectQuantity + ' available');
    event.preventDefault();
  }

  function fillUserDropDown(){
    debugger;
    for(var i = 0; i < userArray.length; i++){
      var user = userArray;
      var name = user[i].name;
      var id = user[i]._id;
      var cash = user[i].cash;
      var $option = $('<option>').attr('data-id', id).text(name + ': ( $' + cash+')');
      $option.attr('data-cash', cash);
      $('#usersBuy').append($option);
    }
  }

  function fillQuantityDropDown(quan){
    for(var i = 1; i <= quan; i ++){
      var $option = $('<option>').text(i);
      $('#quantityBuy').append($option);
    }
  }

  function confirmBuy(){
    debugger;
    var userCash = $('#usersBuy').data('cash');
    var user = $('#usersBuy').val();
    var quantity = $('#quantityBuy').val();
    var id = $('#popUpBuy h2').data('id');
    var row = $('#itemTable[data-id='+id+']');
    var selectCost = row.children('.itemCost').text();
    var itemData = _.find(userArray, {'_id' : id});
    console.log(itemData);

    if((selectCost * quantity) > userCash){
      alert(user + ' doesnt have enough money');
      return;
    }else{
      alert('Thanks for the purchase');
    }
    console.log(user, quantity);
  }


//-----------------Utility Functions-----------------//
  function closeBuy(){
    $('#popUpBuy').hide(); //hide form
    resetBG();
    $('#quantityBuy').empty();
    $('#usersBuy').empty();
  }

  function closeUsersInput(){
    resetBG();
    $('#userName').empty();
    $('#deposit').empty();
    $('#usersInput').hide();
  }

  function closeItemsInput(){
    resetBG();
    $('#itemName').empty();
    $('#cost').empty();
    $('#quantity').empty();
    $('#itemInput').hide();
  }

  function darkenBG(){
    $('body').css('background-color', 'gray');
  }

  function resetBG(){
    $('body').css('background-color', 'lightblue');
  }
})();
